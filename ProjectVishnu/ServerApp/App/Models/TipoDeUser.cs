using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Models;
public class TipoDeUser
{
    public int Id { get; set; }
    public string Tipo { get; set; }
    public virtual ICollection<Conta> Contas { get; set; }

    public TiposUserOutputModel toOutputModel()
        {
            return new TiposUserOutputModel
            {
                Tipo = Tipo
            };
    }
}
