using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.Dtos
{
    public class MercadoDto
    {
        public string Name { get; set; } = null!;
        public string Sigla { get; set; }
        public int DiaInicio { get; set; }
        public int DiaFim { get; set; }

        internal Mercado ToMercado()
        {
            return new Mercado
            {
                Mercadoname = Name,
                Sigla = Sigla,
                DiaInicio = DiaInicio,
                DiaFim = DiaFim
            };
        }
    }
}