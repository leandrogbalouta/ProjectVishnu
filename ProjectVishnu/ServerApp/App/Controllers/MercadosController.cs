using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Services;

namespace ProjectVishnu.ServerApp.App.Controllers
{
    [Route("api/[controller]")]
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
            try
            {
                if (Request.QueryString.HasValue) return BadRequest();
                var result = _mercadosService.ListAlphabetically();
                return Ok(result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
            
        }

        [HttpGet("{name}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Mercado))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(string name)
        {
            try
            {
                var result = _mercadosService.GetMercado(name);
                return Ok();
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
            
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Mercado))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Create([FromBody] MercadoDto mercado)
        {
            try
            {
                var result = _mercadosService.CreateMercado(mercado);
                var actionName = nameof(MercadosController.Get);
                var routeValues = new 
                {
                    name = result.Mercadoname
                };
                return CreatedAtAction(actionName, routeValues, result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }
    }
}
