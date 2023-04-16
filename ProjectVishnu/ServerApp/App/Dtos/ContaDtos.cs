namespace ProjectVishnu.ServerApp.App.Dtos;
public class ContaInputModel
{
    public string Username { get; set; }
    public string TipoDeUser { get; set; }
    public string Password { get; set; }
}
public class ContaOutputModel
{
    public string Username { get; set; }
    public string TipoDeUser { get; set; }
    public string Token { get; set; }
}