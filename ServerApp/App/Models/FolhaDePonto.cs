using System;
using System.Collections.Generic;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Models
{
    public partial class FolhaDePonto
    {
        public FolhaDePonto()
        {
            IdSalarios = new HashSet<SalarioFinal>();
        }

        public int Id { get; set; }
        public string Mes { get; set; } = null!;
        public string Ano { get; set; }
        public string Obra { get; set; } = null!;
        public string Mercado { get; set; }

        public virtual Mercado MercadoNavigation { get; set; }
        public virtual Obra ObraNavigation { get; set; } = null!;

        public virtual ICollection<SalarioFinal> IdSalarios { get; set; }

        public FolhaDePontoInfoModel toFolhaDePontoInfoModel()
        {
            return new FolhaDePontoInfoModel
            {
                Mes = Mes,
                Ano = Ano.ToString()
            };
        }
    }
}
