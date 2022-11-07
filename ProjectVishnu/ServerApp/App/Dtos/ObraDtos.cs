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
        public string Mercado { get; set; } = null!;
        public string Autosdemedicao { get; set; } = null!;

        public Obra ToObra() 
        {
            Obra obra = new Obra();
            obra.Codigointerno = CodigoInterno;
            obra.Designacao = Designacao;
            obra.Cliente = Cliente;
            obra.Datainicio = DateOnly.Parse(Datainicio);
            obra.Mercado = Mercado;
            obra.Autosdemedicao = Autosdemedicao;
            return obra;
        }

        public string generateInternalCodeFirstPart()
        {
            string code = "OB";
            string year = Datainicio.Split("/")[0].Substring(2); // Obter os dois ultimos digitos do ano
            string _mercado;
            if (Mercado == "portugal")
            {
                _mercado = "PT";
            }
            else if (Mercado == "espanha")
            {
                _mercado = "ES";
            }
            else _mercado = "FR";
            CodigoInterno = code+year+ _mercado;
            return CodigoInterno;
        }

        public void generateInternalCode(int count)
        {
            if (count < 10)
            {
                CodigoInterno = CodigoInterno + "0" + count;
            }
            else CodigoInterno = CodigoInterno + "" + count;
        }

    }

    public class ObraOutputModel
    {

    }
}
