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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CatProfInputModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult List()
        {
            var result = _catProfServices.ListAlphabetically();
            return result == null ? NotFound() : Ok(result);
        }
    }
}