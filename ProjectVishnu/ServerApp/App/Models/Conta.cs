
namespace ProjectVishnu.Models;
public class Conta
{
    public string Username { get; set; }
    public int TipoDeUserId { get; set; }
    public string PasswordHash { get; set; }
    
    public virtual TipoDeUser TipoDeUser { get; set; }
}