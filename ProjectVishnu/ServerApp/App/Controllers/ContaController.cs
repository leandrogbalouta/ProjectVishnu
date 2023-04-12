using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.ServerApp.Auth;
using ProjectVishnu.Services;

namespace ProjectVishnu.Controllers
{
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
            var result = _contaService.Create(new ServerApp.App.Dtos.ContaInputModel()
            {
                Username = username,
                TipoDeUser = 1, // hard coded for now..
                PasswordHash = hashy
            });
            return result is not null ? Ok() : NotFound();
        }
        [HttpPost("login")]
        public IActionResult Login([FromHeader] string username, [FromHeader] string password)
        {
            // TODO trocar a linha a baixo por uma call a DB e obter hash para user
            string hashy = PasswordCrypto.Hash(password);
            // Continuar codigo para introduzir na DB hash da password e adicionar conta na db.
            var result = _contaService.Get(new ServerApp.App.Models.Conta()
            {
                Username = username,
                PasswordHash = hashy
            });
            return result is not null ? Ok() : NotFound();
        }
    }
}