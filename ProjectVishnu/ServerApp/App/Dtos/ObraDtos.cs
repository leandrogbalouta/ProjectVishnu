using ProjectVishnu.Models;
using System.Globalization;

namespace ProjectVishnu.ServerApp.App.Dtos
{
    public class ObraInputModel
    {
        public string? CodigoInterno { get; set; } = null;
        public string Designacao { get; set; } = null!;
        public string Cliente { get; set; } = null!;
        public string? Datainicio { get; set; }
        public string Estado { get; set; } = null!;
        public string? Datafim { get; set; }
        public string Mercado { get; set; } = null!;

        public Obra ToObra(string CodigoInterno) 
        {
            return new Obra
            {
                Codigointerno = CodigoInterno,
                Designacao = Designacao,
                Cliente = Cliente,
                Datainicio = Datainicio == null ? null : DateOnly.Parse(Datainicio),
                Estado = Estado,
                Datafim = Datafim == null ? null : DateOnly.Parse(Datafim),
                Mercado = Mercado,
                Autosdemedicao = "HARDCODED"
            };
        }
    }

    public class ObraOutputModel
    {
        public string CodigoInterno { get; set; } = null!;
        public string Designacao { get; set; } = null!;
        public string Cliente { get; set; } = null!;
        public string? Datainicio { get; set; }
        public string Estado { get; set; } = null!;
        public FuncionarioOutputModel? ChefeDeObra { get; set; }
        public string Mercado { get; set; } = null!;
        public string Autosdemedicao { get; set; } = null!;
    }

    public class FuncionarioObraInputModel
    {
        public string CodigoInterno { get; set; }
        public string Date { get; set; }
    }

    public class FuncionarioObraOutputModel{
        public FuncionarioOutputModel Funcionario {get; set;}
        public DateOnly? DataInicio {get; set;}
        public DateOnly? DataFim {get; set;}
    }
}
