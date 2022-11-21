using System;
using System.Collections.Generic;
using ProjectVishnu.Models;

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
        public int Ano { get; set; }
        public string Obra { get; set; } = null!;
        public string? Mercado { get; set; }

        public virtual Mercado? MercadoNavigation { get; set; }
        public virtual Obra ObraNavigation { get; set; } = null!;

        public virtual ICollection<SalarioFinal> IdSalarios { get; set; }
    }
}
