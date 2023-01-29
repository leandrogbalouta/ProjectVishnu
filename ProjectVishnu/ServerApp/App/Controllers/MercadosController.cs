using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.ServerApp.App.Services;

namespace ProjectVishnu.ServerApp.App.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MercadosController : ControllerBase
    {
        private readonly IMercadosService _mercadosService;

        public MercadosController(IMercadosService mercadosService)
        {
            _mercadosService = mercadosService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<string>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult List()
        {
            if (Request.QueryString.HasValue) return BadRequest();
            var result = _mercadosService.ListAlphabetically();
            return result == null ? NotFound() : Ok(result);
        }
    }
}
