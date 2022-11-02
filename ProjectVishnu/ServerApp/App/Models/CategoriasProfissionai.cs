using System;
using System.Collections.Generic;

namespace ProjectVishnu.ServerApp.App.Models
{
    public partial class CategoriasProfissionai
    {
        public CategoriasProfissionai()
        {
            Funcionarios = new HashSet<Funcionario>();
        }

        public string Codigo { get; set; } = null!;
        public string Nomenclatura { get; set; } = null!;

        public virtual ICollection<Funcionario> Funcionarios { get; set; }
    }
}
