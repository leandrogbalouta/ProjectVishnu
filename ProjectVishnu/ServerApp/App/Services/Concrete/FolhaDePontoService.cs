using NUnit.Framework.Constraints;
using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Utils;
using System.Linq;
using System;

namespace ProjectVishnu.ServerApp.App.Services.Concrete
{
    public class FolhaDePontoService : IFolhaDePontoService
    {

        private readonly IUnitOfWork _unitOfWork;
        public FolhaDePontoService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public FolhaDePontoEmptyOutputModel GenerateWithInfo(string obraID, FolhaDePontoInfoModel info)
        {

            FolhaDePontoEmptyOutputModel model = new FolhaDePontoEmptyOutputModel();
            model.Limits = new List<int>();
            List<int> saturdays;
            List<int> sundays;
            List<int> holidays;


            Mercado interval = _unitOfWork.Obras.GetMercado(obraID); // TODO: MUDAR ISTO

            DateOnly startDate;
            DateOnly endDate;

            CalendarUtils.GetStartAndEndDates(interval, info.Ano, info.Mes, out startDate, out endDate);

            model.Funcionarios = _unitOfWork.FuncionariosObra.GetFuncsDuringInterval(obraID, startDate, endDate).Select(func => func.toOutputModel()).ToList();

            int midLimit = CalendarUtils.GetMidLimit(info.Ano, info.Mes);
            model.Limits.Add((int)interval.DiaInicio);
            model.Limits.Add(midLimit);
            model.Limits.Add((int)interval.DiaFim);

            CalendarUtils.GetNonWorkDays(info.Ano, info.Mes, interval, out saturdays, out sundays, out holidays);

            model.Saturdays = saturdays;
            model.Sundays = sundays;
            model.Holidays = holidays;
            model.Info = info;

            if(info.WorkDays <= 0 && info.WorkDays > 31){} //TODO: THROW ERROR

            FolhaDePonto folha = new FolhaDePonto {
                Mes = info.Mes,
                Ano = info.Ano,
                Obra = obraID,
                Mercado = interval.Mercadoname,
                WorkDays = info.WorkDays
            };

            model.Funcionarios.ForEach(func => {
                SalarioFinal salarioFunc = new SalarioFinal{
                    Funcionario = func.Nif,
                    Mes = folha.Mes,
                    Ano = folha.Ano,
                    Valorfinal = 0
                };
                folha.IdSalarios.Add(salarioFunc);
            });

            _unitOfWork.FolhaDePontos.Add(folha);
            _unitOfWork.Complete();

            return model;
        }

        

        public List<FolhaDePontoInfoModel> GetAllFromMercado(string mercado)
        {
            return _unitOfWork.FolhaDePontos.GetAllFromMercado(mercado).Select(x => x.toFolhaDePontoInfoModel()).ToList();
        }

        public List<FolhaDePontoInfoModel> GetAllFromObra(string obraID)
        {
            return _unitOfWork.FolhaDePontos.GetAllFromObra(obraID).Select(x => x.toFolhaDePontoInfoModel()).ToList();
        }

        public FolhaDePontoValuesOutputModel GetFromMercado(string mercadoName, string ano, string mes)
        {
            List<FolhaDePonto> folhaDePontoList = _unitOfWork.FolhaDePontos.GetFromMercado(mercadoName, ano, mes);
            FolhaDePontoInfoModel info = new FolhaDePontoInfoModel{
                Ano = ano,
                Mes = mes
            };
            Mercado mercado = _unitOfWork.Mercados.GetMercado(mercadoName);
            DateOnly startDate;
            DateOnly endDate;
            CalendarUtils.GetStartAndEndDates(mercado, ano, mes, out startDate, out endDate);
            Dictionary<string, Dictionary<int, decimal>> FuncWorkDays =
            new Dictionary<string, Dictionary<int, decimal>>();
            Dictionary<string, decimal> FinalValue = new Dictionary<string, decimal>();
            List<FuncionarioOutputModel> funcionariosOutputModel = _unitOfWork.Funcionarios.ListWithFilters(mercadoName).Select(f => f.toOutputModel()).ToList();
            foreach(FolhaDePonto folhaDePonto in folhaDePontoList){
                foreach(SalarioFinal sf in folhaDePonto.IdSalarios){
                    Dictionary<int, decimal> WorkDay = new Dictionary<int, decimal>();
                    if(!FinalValue.ContainsKey(sf.Funcionario)){
                        FinalValue.Add(sf.Funcionario, sf.Valorfinal);
                    }else{
                        FinalValue[sf.Funcionario] += sf.Valorfinal;
                    }
                    List<DiaTrabalho> diasTrabalho = _unitOfWork.DiasTrabalho.GetFuncDaysFromMercadoBetweenDates(sf.Funcionario, mercadoName, startDate, endDate);
                    diasTrabalho.ForEach( dt => {
                        WorkDay.Add(dt.Dia, dt.Horas);
                    });
                    FuncWorkDays.Add(sf.Funcionario, WorkDay);
                }
            }
            List<int> Limits = new List<int>();
            List<int> saturdays;
            List<int> sundays;
            List<int> holidays;
            CalendarUtils.GetNonWorkDays(ano, mes, mercado, out saturdays, out sundays, out holidays);
            int midLimit = CalendarUtils.GetMidLimit(info.Ano, info.Mes);
            Limits.Add((int)mercado.DiaInicio);
            Limits.Add(midLimit);
            Limits.Add((int)mercado.DiaFim);
            
            return new FolhaDePontoValuesOutputModel{
                Info = info,
                FuncWorkDays = FuncWorkDays,
                FinalValue = FinalValue,
                Funcionarios = funcionariosOutputModel,
                Limits = Limits,
                Saturdays = saturdays,
                Sundays = sundays,
                Holidays = holidays
            };      
        }

        public FolhaDePontoValuesOutputModel GetFromObra(string obraID, string ano, string mes)
        {
            FolhaDePonto folhaDePonto = _unitOfWork.FolhaDePontos.GetFromObra(obraID, ano, mes);
            
            FolhaDePontoInfoModel info = new FolhaDePontoInfoModel{
                Ano = ano,
                Mes = mes
            };
            Mercado mercado = folhaDePonto.MercadoNavigation;
            DateOnly startDate;
            DateOnly endDate;
            CalendarUtils.GetStartAndEndDates(mercado, ano, mes, out startDate, out endDate);
            Dictionary<string, Dictionary<int, decimal>> FuncWorkDays =
            new Dictionary<string, Dictionary<int, decimal>>();
            Dictionary<string, decimal> FinalValue = new Dictionary<string, decimal>();
            List<FuncionarioOutputModel> funcionariosOutputModel = new List<FuncionarioOutputModel>();
            foreach(SalarioFinal sf in folhaDePonto.IdSalarios){
                Dictionary<int, decimal> WorkDay = new Dictionary<int, decimal>();
                FinalValue.Add(sf.Funcionario, sf.Valorfinal);
                funcionariosOutputModel.Add(sf.FuncionarioNavigation.toOutputModel());
                List<DiaTrabalho> diasTrabalho = _unitOfWork.DiasTrabalho.GetFuncDaysFromObraBetweenDates(sf.Funcionario, obraID, startDate, endDate);
                diasTrabalho.ForEach( dt => {
                    WorkDay.Add(dt.Dia, dt.Horas);
                });
                FuncWorkDays.Add(sf.Funcionario, WorkDay);
            }
            
            List<int> Limits = new List<int>();
            List<int> saturdays;
            List<int> sundays;
            List<int> holidays;
            CalendarUtils.GetNonWorkDays(ano, mes, mercado, out saturdays, out sundays, out holidays);
            int midLimit = CalendarUtils.GetMidLimit(info.Ano, info.Mes);
            Limits.Add((int)mercado.DiaInicio);
            Limits.Add(midLimit);
            Limits.Add((int)mercado.DiaFim);
            
            return new FolhaDePontoValuesOutputModel{
                Info = info,
                FuncWorkDays = FuncWorkDays,
                FinalValue = FinalValue,
                Funcionarios = funcionariosOutputModel,
                Limits = Limits,
                Saturdays = saturdays,
                Sundays = sundays,
                Holidays = holidays
            };            
        }

        public FolhaDePontoValuesOutputModel setValues(string obraID, string date, FolhaDePontoValuesInputModel values)
        {
            string[] dateArr = date.Split("-");
            string mes = dateArr[1];
            string ano = dateArr[0];

            FolhaDePonto folha = _unitOfWork.FolhaDePontos.GetFromObra(obraID, ano, mes);

            Mercado mercado = _unitOfWork.Obras.Get(obraID).MercadoNavigation;

            int midLimit = CalendarUtils.GetMidLimit(ano, mes);

            values.Values.ForEach(f => {
                f.Dias.ForEach(dia => {
                    string monthStr = mes;
                    string anoStr = ano;

                    if(dia.Dia >= mercado.DiaInicio && dia.Dia <= midLimit){
                        int previousMonth = CalendarUtils.GetPreviousMonth(mes);
                        monthStr = previousMonth >= 10 ? previousMonth.ToString() : "0" + previousMonth.ToString();

                        if(previousMonth == 12) anoStr = (int.Parse(ano)-1).ToString();
                    }
                    DiaTrabalho diaTrabalho = new DiaTrabalho {
                        Funcionario = f.Func.Nif,
                        Codigoobra = obraID,
                        Dia = dia.Dia,
                        Horas = (decimal) dia.Horas,
                        Mes = monthStr,
                        Ano = anoStr,
                        Valor = f.Func.Salarioreal
                    };
                    _unitOfWork.DiasTrabalho.AddOrUpdate(diaTrabalho);
                });
                SalarioFinal salarioFinal = folha.IdSalarios.Where(sf => sf.Funcionario == f.Func.Nif).First();
                if(f.ValorFinal == null)
                {
                    decimal valorFinal = CalculateSalario(f.Func.ToFuncionario(), mercado, ano, mes);
                    salarioFinal.Valorfinal = valorFinal;
                }
                else
                {
                    salarioFinal.Valorfinal = (decimal)f.ValorFinal;
                }
            });
            _unitOfWork.Complete();
            return GetFromObra(obraID, ano, mes);
        }

        private decimal CalculateSalario(Funcionario func, Mercado mercado, string ano, string mes)
        {
            DateOnly startDate;
            DateOnly endDate;

            CalendarUtils.GetStartAndEndDates(mercado, ano, mes, out startDate, out endDate);

            IEnumerable<DiaTrabalho> dtList = _unitOfWork.DiasTrabalho.GetFuncDaysFromMercadoBetweenDates(func.Nif, mercado.Mercadoname, startDate, endDate);

            decimal valorFinal = 0;
            
            if(func.Tiposalario == "horario")
            {

                foreach(DiaTrabalho diaTrabalho in dtList)
                {
                    valorFinal += diaTrabalho.Valor * diaTrabalho.Horas;
                }
            }
            else
            {
                int nonWorkDays = CalendarUtils.GetNonWorkDays(ano, mes, mercado, out _, out _, out _);
                int totalDays = endDate.DayNumber - startDate.DayNumber + 1;
                int workDays = totalDays - nonWorkDays;

                decimal funcWorkedDays = 0;
                foreach(DiaTrabalho diaTrabalho in dtList)
                {
                    if(diaTrabalho.Horas >= 5) funcWorkedDays += 1;
                    else if(diaTrabalho.Horas < 2) continue;
                    else funcWorkedDays = funcWorkedDays + 0.5M;
                }

                valorFinal = funcWorkedDays * func.Salarioreal / workDays;
            }
           
            return valorFinal;
        }
    }
}
