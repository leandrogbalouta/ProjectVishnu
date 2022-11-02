using System;
using System.Collections.Generic;

namespace ProjectVishnu.ServerApp.App.Models
{
    public partial class DiaTrabalho
    {
        public string Funcionario { get; set; } = null!;
        public string Codigoobra { get; set; } = null!;
        public int Dia { get; set; }
        public decimal Horas { get; set; }
        public string Mes { get; set; } = null!;
        public int Ano { get; set; }
        public decimal Valor { get; set; }

        public virtual Obra CodigoobraNavigation { get; set; } = null!;
        public virtual Funcionario FuncionarioNavigation { get; set; } = null!;
    }
}
