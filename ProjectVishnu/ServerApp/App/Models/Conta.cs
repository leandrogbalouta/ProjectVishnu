
using ProjectVishnu.ServerApp.App.Dtos;

namespace ProjectVishnu.Models;
public class Conta
{
    public string Username { get; set; }
    public int TipoDeUserId { get; set; }
    public string PasswordHash { get; set; }

    public virtual TipoDeUser TipoDeUser { get; set; }
}
public static class ContaExtention
{
    public static ContaOutputModel ToContaOutputModel(this Conta conta, string? token = null)
    {
        return new ContaOutputModel()
        {
            Username = conta.Username,
            TipoDeUser = conta.TipoDeUser.Tipo
        };
    }
}