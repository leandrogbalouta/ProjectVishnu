using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Services;

namespace ProjectVishnu.ServerApp.App.Controllers
{
    [ApiController]
    [Route("tiposdoc")]
    public class TiposDocIntController : ControllerBase
    {

        private readonly ITiposDocService _tiposDocServices;

        public TiposDocIntController(ITiposDocService tiposDocServices)
        {
            this._tiposDocServices = tiposDocServices;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<TiposDocInputModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult List()
        {
            var result = _tiposDocServices.ListAlphabetically();
            return result == null ? NotFound() : Ok(result);
        }
    }
}