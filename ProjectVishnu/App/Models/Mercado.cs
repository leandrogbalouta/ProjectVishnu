using System;
using System.Collections.Generic;
using ProjectVishnu.Models;

namespace ProjectVishnu.Models
{
    public partial class Mercado
    {
        public Mercado()
        {
            FolhaDePontos = new HashSet<FolhaDePonto>();
            Funcionarios = new HashSet<Funcionario>();
            Obras = new HashSet<Obra>();
        }

        public string Mercadoname { get; set; } = null!;
        public string? Sigla { get; set; }
        public int? DiaInicio { get; set; }
        public int? DiaFim { get; set; }

        public virtual ICollection<FolhaDePonto> FolhaDePontos { get; set; }
        public virtual ICollection<Funcionario> Funcionarios { get; set; }
        public virtual ICollection<Obra> Obras { get; set; }
    }
}
