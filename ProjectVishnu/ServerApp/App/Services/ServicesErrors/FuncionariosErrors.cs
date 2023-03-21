using System.Collections;
using System.Runtime.Serialization;
using ProjectVishnu.DataAccess;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.ServerApp.App.Services.ServicesErrors
{
    public class FuncionariosError : Exception
    {
        public FuncionariosError(string? message, int statusCode) : base(message)
        {
            StatusCode = statusCode;
        }
        public override string Message => base.Message;

        public int StatusCode { get; set; }
    }

    public class AlreadyInObraError : FuncionariosError
    {
        public AlreadyInObraError() : base("Funcionario já se encontra numa Obra", 409)
        {

        }
    }

}

