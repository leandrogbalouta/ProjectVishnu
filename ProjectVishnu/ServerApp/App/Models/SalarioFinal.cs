using System;
using System.Collections.Generic;

namespace ProjectVishnu.Models
{
    public partial class SalarioFinal
    {
        public string Funcionario { get; set; } = null!;
        public string Mes { get; set; } = null!;
        public int Ano { get; set; }
        public decimal Valorfinal { get; set; }
        public decimal? Valorapagar { get; set; }

        public virtual Funcionario FuncionarioNavigation { get; set; } = null!;
    }
}
