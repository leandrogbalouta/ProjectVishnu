﻿using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;
using static ProjectVishnu.ServerApp.App.Dtos.ObraInputModel;

namespace ProjectVishnu.Services.Concrete
{
    public class ObrasService : IObrasService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ObrasService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void AddFuncToObra(string codigoInterno, FuncionarioObraInputModel funcID)
        {
            throw new NotImplementedException();
        }

        public string Create(ObraInputModel obraInput)
        {
            try{

                string CodigoInterno = generateInternalCode(obraInput);
                _unitOfWork.Obras.Add(obraInput.ToObra(CodigoInterno));
                _unitOfWork.Complete();
                return CodigoInterno;

            }catch(Exception e){

                _unitOfWork.UntrackChanges();
                throw e;
            }
            

        }

        public string Delete(string codigoInterno)
        {
            try{

                _unitOfWork.Obras.Delete(codigoInterno);
                _unitOfWork.Complete();
                return "Obra apagada com sucesso.";

            }catch(Exception e){

                _unitOfWork.UntrackChanges();
                throw e;
            }
        }
        public Obra Get(string codigoInterno)
        {
            return _unitOfWork.Obras.Get(codigoInterno);
        }

        public IEnumerable<Obra> ListAlphabetically()
        {
            return _unitOfWork.Obras.ListAlphabetically();
        }
        
        public IEnumerable<Obra> ListWithFilters(string? estado = null, string? mercado = null, string? valor = null)
        {
            return _unitOfWork.Obras.ListByFilters(estado, mercado, valor);
        }

        public IEnumerable<Obra>? ListByFuncionario(int funcionarioId)
        {
           return _unitOfWork.Obras.ListByFuncionario(funcionarioId);
        }

        public IEnumerable<FuncionarioObraOutputModel> GetCurrentFuncs(string codigoInterno)
        {
            IEnumerable<FuncionariosObra> fo = _unitOfWork.Obras.GetCurrentFuncs(codigoInterno);
            return fo.Select(fo => fo.toObraOutputModel());
        }

        public IEnumerable<FuncionarioObraOutputModel> GetPastFuncs(string codigoInterno)
        {
            IEnumerable<FuncionariosObra> fo = _unitOfWork.Obras.GetPastFuncs(codigoInterno);
            return fo.Select(fo => fo.toObraOutputModel());
        }

        public void RemoveFuncFromObra(string codigoInterno, FuncionarioObraInputModel funcInput)
        {
            throw new NotImplementedException();
        }

        public string Update(string codigoInterno, ObraInputModel obraInput)
        {
            try{
                
                _unitOfWork.Obras.Update(codigoInterno, obraInput.ToObra(codigoInterno));
                _unitOfWork.Complete();
                return "Obra atualizada com sucesso.";

            }catch(Exception e){
                
                _unitOfWork.UntrackChanges();
                throw e;
            }
        }

        private string generateInternalCodeFirstPart(ObraInputModel obraInput)
        {
            string code = "OB";
            string year;

            if(obraInput.Datainicio != null)
            {
                year = obraInput.Datainicio.Split("/")[0].Substring(2); // Obter os dois ultimos digitos do ano
            }
            else
            {
                year = DateTime.Today.Year.ToString().Substring(2);
            }

            Mercado mercado = _unitOfWork.Mercados.GetMercado(obraInput.Mercado);
            string siglaMercado = mercado.Sigla;
            
            return code+year+ siglaMercado;
        }

        private string generateInternalCode(ObraInputModel obraInput)
        {
<<<<<<< HEAD
            if(obraInput.CodigoInterno != null) return obraInput.CodigoInterno;
=======
            if(!string.IsNullOrWhiteSpace(obraInput.CodigoInterno)) return obraInput.CodigoInterno;
>>>>>>> feb85df7980104ddb9c83a6ec45468e98b71005d
            string CodigoInterno = generateInternalCodeFirstPart(obraInput);
            int count = _unitOfWork.Obras.CountCodigoOccurrences(CodigoInterno) +1;
            if (count < 10)
            {
                return CodigoInterno + "0" + count;
            }
            return CodigoInterno + "" + count;
        }

    }
}
