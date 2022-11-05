using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.Dtos
{
    public class ObraInputModel
    {
        public string Designacao { get; set; } = null!;
        public string Cliente { get; set; } = null!;
        public string? Datainicio { get; set; }
        public string Mercado { get; set; } = null!;
        public string Autosdemedicao { get; set; } = null!;

        public Obra ToObra() 
        {
            Obra obra = new Obra();
            obra.Designacao = Designacao;
            obra.Cliente = Cliente;
            obra.Datainicio = DateOnly.Parse(Datainicio);
            obra.Mercado = Mercado;
            obra.Autosdemedicao = Autosdemedicao;
            return obra;
        }

        public void generateInternalCodeFirstPart(int count)
        {
            string code = "OB";
            string year = Datainicio.Split("/")[2].Split(new char[]{' '}, 2)[1]; // Obter os dois ultimos digitos do ano
            string _mercado;
            if (Mercado != null) {
                _mercado = "" + Mercado[0]  + "" + Mercado[1];
                _mercado = _mercado.ToUpper();
            }
            
        }
    }

    public class ObraOutputModel
    {

    }
}
