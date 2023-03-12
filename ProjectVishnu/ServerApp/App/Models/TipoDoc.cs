namespace ProjectVishnu.Models
{
    public partial class TipoDoc
    {
        public TipoDoc()
        {
            Funcionarios = new HashSet<Funcionario>();
        }

        public string Sigla { get; set; } = null!;
        public string Designacao { get; set; } = null!;

        public virtual ICollection<Funcionario> Funcionarios { get; set; }
    }
}
