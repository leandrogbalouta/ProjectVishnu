using System;
using System.Collections.Generic;

namespace ProjectVishnu.Models
{
    public partial class Mercado
    {
        public Mercado()
        {
            Funcionarios = new HashSet<Funcionario>();
            Obras = new HashSet<Obra>();
        }

        public string Mercado { get; set; } = null!;
        public string? Sigla { get; set; }
        public int? DiaInicio { get; set; }
        public int? DiaFim { get; set; }

        public virtual ICollection<Funcionario> Funcionarios { get; set; }
        public virtual ICollection<Obra> Obras { get; set; }
    }
}
