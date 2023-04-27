using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
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
        var options = new JsonSerializerOptions
        {
            ReferenceHandler = ReferenceHandler.Preserve,
            MaxDepth = 64 // Increase the maximum allowed depth if necessary
        };

        string output = JsonSerializer.Serialize(_tiposDeUserService.List(), options);
        return Ok(output);
    }

    // [HttpGet("{tipoDeUser}")]
    // IActionResult Get(string tipoDeUser)
    // {
    //     var toReturn = _tiposDeUserService.Get(tipoDeUser);
    //     return toReturn is null ? BadRequest() : Ok(toReturn);
    // }
}