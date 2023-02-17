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
            if (Request.QueryString.HasValue) return BadRequest();
            var result = _catProfServices.ListAlphabetically();
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult Create([FromBody] CatProfDto catProf)
        {
            var result = _catProfServices.Create(catProf.Codigo, catProf.Nomenclatura);
            var actionName = nameof(CategoriasProfissionaisController.Get);
            var routeValues = new
            {
                codigo = result.Codigo
            };
            return result == null ? BadRequest() : CreatedAtAction(actionName, routeValues, result);
        }

        [HttpGet("{codigo}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CatProfDto))]
        public IActionResult Get(string codigo)
        {
            var result = _catProfServices.Get(codigo);
            return result == null ? NotFound() : Ok(result);
        }
    }
}