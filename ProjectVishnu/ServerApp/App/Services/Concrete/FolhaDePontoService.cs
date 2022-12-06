using NUnit.Framework.Constraints;
using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Utils;
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
            List<int> saturdays;
            List<int> sundays;
            List<int> holidays;


            Mercado interval = _unitOfWork.Obras.GetMercado(obraID); // TODO: MUDAR ISTO

            int previousMonth = int.Parse(info.Mes) - 1;
            string prevMonthStr = previousMonth >= 10 ? previousMonth.ToString() : "0" + previousMonth.ToString();
            DateOnly startDate = DateOnly.Parse(String.Format("{0}-{1}-{2}", info.Ano, prevMonthStr, interval.DiaInicio));
            DateOnly endDate = DateOnly.Parse(String.Format("{0}-{1}-{2}", info.Ano, info.Mes, interval.DiaFim));

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

        public FolhaDePontoValuesOutputModel GetFromMercado(string mercado, string ano, string mes)
        {
            FolhaDePontoValuesOutputModel model = new FolhaDePontoValuesOutputModel();

            FolhaDePontoInfoModel info = new FolhaDePontoInfoModel();
            info.Mes = mes;
            info.Ano = ano;
            model.Info = info;

            List<FolhaDePonto> folhaDePontoList = _unitOfWork.FolhaDePontos.GetFromMercado(mercado,ano,mes);



            return model;
        }

        public FolhaDePontoValuesOutputModel GetFromObra(string obraID, string ano, string mes)
        {
            throw new NotImplementedException();
        }

        public void setValues(string obraID, string date, FolhaDePontoValuesInputModel values)
        {
            throw new NotImplementedException();
        }
    }
}
