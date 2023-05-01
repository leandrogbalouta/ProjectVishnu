using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Common;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Services;
namespace ProjectVishnu.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContasController : ControllerBase
{
    private readonly IContaService _contaService;
    private readonly IConfiguration _config;

    public ContasController(IContaService contaService, IConfiguration config)
    {
        _contaService = contaService;
        _config = config;
    }

    [HttpGet]
    public IActionResult Get() => Ok("shabba");

    [HttpPost("create")]
    [Authorize(Roles = "admin")]
    public IActionResult CreateAccount([FromBody] ContaInputModel contaInput)
    {
        try
        {
            // Continuar codigo para introduzir na DB hash da password e adicionar conta na db.
            var result = _contaService.Create(contaInput);
            var actionName = nameof(FuncionariosController.Get);
            var routeValues = new
            {
                id = result
            };
            return CreatedAtAction(actionName, routeValues, contaInput);
        }
        catch (Exception ex)
        {
            string erroCode = ex.InnerException!.Data["SqlState"]!.ToString()!;
            // 23505 significa primary key duplicada (Postgres).
            bool duplicate = (erroCode.Equals("23505"));
            string errorMessage = duplicate ? "Username duplicado." : "Ocorreu um erro, por favor tente novamente, se o erro persistir, entre em contacto connosco.";
            int errorCode = duplicate ? 409 : 500;
            return Problem(statusCode: errorCode, title: errorMessage);
        }
    }
    [HttpPost("login")]
    public IActionResult Login([FromBody] ContaInputModel contaInput)
    {
        try
        {
            var conta = _contaService.Get(contaInput.Username); // This should be awaitable
            if (conta is null) return NotFound();
            var password = PasswordCrypto.Hash(contaInput.Password);
            bool isValidPassword = (password == conta.PasswordHash);
            if (!isValidPassword) return Unauthorized();
            // Generate token.
            ContaOutputModel outConta = conta.ToContaOutputModel();
            string token = GenerateToken(outConta);
            return Ok(token);
        }
        catch (System.Exception)
        {
            return BadRequest();
        }
    }
    private string GenerateToken(ContaOutputModel conta)
    {
        string key = TokenSettings.Key;
        // Authentication successful so generate jwt token
        var tokenHandler = new JwtSecurityTokenHandler();
        var asciKey = Encoding.ASCII.GetBytes(key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Audience = TokenSettings.Audience,
            Issuer = TokenSettings.Issuer,
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim("username", conta.Username),
                new Claim(ClaimTypes.Role, conta.TipoDeUser)
            }),
            Expires = TokenSettings.Expiration,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(asciKey), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
