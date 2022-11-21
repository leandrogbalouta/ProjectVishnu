using System;
using System.Collections.Generic;

namespace ProjectVishnu.Models
{
    public partial class SalarioFinal
    {
        public SalarioFinal()
        {
            IdFolhaDePontos = new HashSet<FolhaDePonto>();
        }

        public int Id { get; set; }
        public string Funcionario { get; set; } = null!;
        public string Mes { get; set; } = null!;
        public int Ano { get; set; }
        public decimal Valorfinal { get; set; }
        public decimal? Valorapagar { get; set; }

        public virtual Funcionario FuncionarioNavigation { get; set; } = null!;

        public virtual ICollection<FolhaDePonto> IdFolhaDePontos { get; set; }
    }
}
