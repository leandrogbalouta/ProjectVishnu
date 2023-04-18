using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.Services;

namespace ProjectVishnu.Controllers
{
    [ApiController]
    [Route("api/shabba")]
    public class TiposDeUserController : ControllerBase
    {
        private readonly ITiposDeUserService _tiposDeUserService;
        public TiposDeUserController(ITiposDeUserService tiposDeUserService)
        {
            _tiposDeUserService = tiposDeUserService;
        }
        [HttpGet]
        IActionResult List() => new JsonResult(_tiposDeUserService.List());

        // [HttpGet("{tipoDeUser}")]
        // IActionResult Get(string tipoDeUser)
        // {
        //     var toReturn = _tiposDeUserService.Get(tipoDeUser);
        //     return toReturn is null ? BadRequest() : Ok(toReturn);
        // }
    }
}