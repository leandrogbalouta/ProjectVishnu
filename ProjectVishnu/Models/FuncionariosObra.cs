using System;
using System.Collections.Generic;

namespace ProjectVishnu.Models
{
    public partial class FuncionariosObra
    {
        public string? Funcionario { get; set; }
        public string? Obra { get; set; }
        public DateOnly Datacomeco { get; set; }
        public DateOnly? Datafim { get; set; }

        public virtual Funcionario? FuncionarioNavigation { get; set; }
        public virtual Obra? ObraNavigation { get; set; }
    }
}
