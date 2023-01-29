using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.Services;

namespace ProjectVishnu.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ObrasController : ControllerBase
    {
        private readonly IObrasService _obrasService;

        public ObrasController(IObrasService obrasService)
        {
            this._obrasService = obrasService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ObraOutputModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult List([FromQuery(Name = "mercado")] string? mercado)
        {
            IEnumerable<Obra> obraList;
            if (mercado == null)
            {
                obraList = _obrasService.ListAlphabetically();
            }
            else if(!Request.QueryString.HasValue)
            {
                obraList = _obrasService.ListByMarket(mercado);

            }
            else
            {
                return BadRequest();
            }
            return obraList == null ? NotFound() : Ok(obraList.Select(obra => obra.toObraOutputModel()));
        }

        [HttpGet("{codigoInterno}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ObraOutputModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(string codigoInterno)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            Obra result = _obrasService.Get(codigoInterno);
            return result == null ? NotFound() : Ok(result.toObraOutputModel());
            
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Create([FromBody] ObraInputModel obraInput) 
        {
            if (Request.QueryString.HasValue) return BadRequest();
            string codigoInterno = _obrasService.Create(obraInput);
            var actionName = nameof(ObrasController.Get);
            var routeValues = new
            {
                codigoInterno = codigoInterno
            };
            ActionResult a = CreatedAtAction(actionName, routeValues, obraInput);
            return a;
        }

        [HttpPut("{codigoInterno}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Edit(string codigoInterno, [FromBody] ObraInputModel obraInput) 
        {
            if (Request.QueryString.HasValue) return BadRequest();
            string result = _obrasService.Update(codigoInterno,obraInput);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("{codigoInterno}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(string codigoInterno)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            string result = _obrasService.Delete(codigoInterno);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost("{codigoInterno}/add")]
        public string AddFuncionario(string codigoInterno, [FromBody] FuncionarioObraInputModel funcInput)
        {
            _obrasService.AddFuncToObra(codigoInterno, funcInput);
            return "";
        }

        [HttpPut("{codigoInterno}/remove")]
        public string RemoveFuncionario(string codigoInterno, [FromBody] FuncionarioObraInputModel funcInput)
        {
            _obrasService.RemoveFuncFromObra(codigoInterno, funcInput);
            return "";
        }
    }
}
