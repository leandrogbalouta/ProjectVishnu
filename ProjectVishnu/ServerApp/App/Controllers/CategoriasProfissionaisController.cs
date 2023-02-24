using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Services;

namespace ProjectVishnu.ServerApp.App.Controllers
{
    [ApiController]
    [Route("categorias-profissionais")]
    public class CategoriasProfissionaisController : ControllerBase
    {

        private readonly ICategoriaProfService _catProfServices;

        public CategoriasProfissionaisController(ICategoriaProfService catProfServices)
        {
            this._catProfServices = catProfServices;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CatProfDto>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult List()
        {
            try
            {
                if (Request.QueryString.HasValue) return BadRequest();
                var result = _catProfServices.ListAlphabetically();
                return Ok(result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
            
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult Create([FromBody] CatProfDto catProf)
        {
            try
            {
                var result = _catProfServices.Create(catProf.Codigo, catProf.Nomenclatura);
                var actionName = nameof(CategoriasProfissionaisController.Get);
                var routeValues = new
                {
                    codigo = result.Codigo
                };
                return CreatedAtAction(actionName, routeValues, result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }

        [HttpGet("{codigo}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CatProfDto))]
        public IActionResult Get(string codigo)
        {
            try
            {
                var result = _catProfServices.Get(codigo);
                return Ok(result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }
    }
}