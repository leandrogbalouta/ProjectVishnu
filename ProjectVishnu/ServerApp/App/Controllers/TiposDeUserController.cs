using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.Services;

namespace ProjectVishnu.Controllers;
[ApiController]
[Route("api/tipos-de-user")]
public class TiposDeUserController : ControllerBase
{
    private readonly ITiposDeUserService _tiposDeUserService;
    public TiposDeUserController(ITiposDeUserService tiposDeUserService)
    {
        _tiposDeUserService = tiposDeUserService;
    }
    [HttpGet]
    public IActionResult List()
    {
        IEnumerable<TiposUserOutputModel> output = _tiposDeUserService.List();
        return Ok(output);
    }

    // [HttpGet("{tipoDeUser}")]
    // IActionResult Get(string tipoDeUser)
    // {
    //     var toReturn = _tiposDeUserService.Get(tipoDeUser);
    //     return toReturn is null ? BadRequest() : Ok(toReturn);
    // }
}