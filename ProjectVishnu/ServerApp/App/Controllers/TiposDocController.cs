using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Services;

namespace ProjectVishnu.ServerApp.App.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/tiposdoc")]
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
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult List()
        {
            try
            {
                if (Request.QueryString.HasValue) return BadRequest();
                var result = _tiposDocServices.ListAlphabetically();
                return result == null ? NotFound() : Ok(result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }
    }
}