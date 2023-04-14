using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Common;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Services;
namespace ProjectVishnu.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContaController : ControllerBase
{
    private readonly IContaService _contaService;

    public ContaController(IContaService contaSerice)
    {
        this._contaService = contaSerice;
    }

    [HttpGet]
    public IActionResult Get() => Ok("shabba");

    [HttpPost("create")]
    public IActionResult CreateAccount([FromHeader] string username, [FromHeader] string password)
    {
        string hashy = PasswordCrypto.Hash(password);
        // Continuar codigo para introduzir na DB hash da password e adicionar conta na db.
        var result = _contaService.Create(new ContaInputModel()
        {
            Username = username,
            TipoDeUser = "admin", // hard coded for now..
            Password = hashy
        });
        return result is not null ? Ok() : NotFound();
    }
    [HttpPost("login")]
    public IActionResult Login([FromHeader] string username, [FromHeader] string password)
    {
        var conta = _contaService.Get(username); // this should be awaitable
        if (conta is null) return NotFound();
        password = PasswordCrypto.Hash(password);
        bool isValidPassword = (password == conta.PasswordHash);

        return (isValidPassword) ? Ok() : NotFound();
    }

}
