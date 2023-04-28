using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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

    public ContasController(IContaService contaSerice, IConfiguration config)
    {
        _contaService = contaSerice;
        _config = config;
    }

    [HttpGet]
    public IActionResult Get() => Ok("shabba");

    [HttpPost("create")]
    public IActionResult CreateAccount([FromBody] ContaInputModel contaInput)
    {
        // Continuar codigo para introduzir na DB hash da password e adicionar conta na db.
        var result = _contaService.Create(contaInput);
        return result is not null ? Ok() : NotFound();
    }
    [HttpPost("login")]
    public IActionResult Login([FromBody] ContaInputModel contaInput)
    {
        try
        {
            var conta = _contaService.Get(contaInput.Username); // this should be awaitable
            if (conta is null) return NotFound();
            var password = PasswordCrypto.Hash(contaInput.Password);
            bool isValidPassword = (password == conta.PasswordHash);
            if (!isValidPassword) return Unauthorized();
            // Generate token.
            ContaOutputModel outConta = conta.ToContaOutputModel();
            string token = GenerateToken(outConta);
            outConta.Token = token;

            return Ok(outConta);
        }
        catch (System.Exception)
        {
            return BadRequest();
        }
    }
    public string GenerateToken(ContaOutputModel conta)
    {
        string key = _config.GetSection("Key").ToString()!;
        // authentication successful so generate jwt token
        var tokenHandler = new JwtSecurityTokenHandler();
        var asciKey = Encoding.ASCII.GetBytes(key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, conta.Username),
                new Claim(ClaimTypes.Role, conta.TipoDeUser)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(asciKey), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
