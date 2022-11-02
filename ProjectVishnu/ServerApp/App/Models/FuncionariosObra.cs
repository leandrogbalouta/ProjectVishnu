using System;
using System.Collections.Generic;

namespace ProjectVishnu.Models
{
    public partial class FuncionariosObra
    {
        public string Funcionario { get; set; } = null!;
        public string Obra { get; set; } = null!;
        public DateOnly Datacomeco { get; set; }
        public DateOnly? Datafim { get; set; }

        public virtual Funcionario FuncionarioNavigation { get; set; } = null!;
        public virtual Obra ObraNavigation { get; set; } = null!;
    }
}
