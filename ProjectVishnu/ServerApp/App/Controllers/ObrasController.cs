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
        public IActionResult List([FromQuery(Name = "mercado")] string? mercado)
        {
            IEnumerable<Obra> obraList;
            if (mercado == null)
            {
                obraList = _obrasService.ListAlphabetically();
            }
            else
            {
                obraList = _obrasService.ListByMarket(mercado);

            }
            return obraList == null ? NotFound() : Ok(obraList.Select(obra => obra.toObraOutputModel()));
        }

        [HttpGet("{codigoInterno}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ObraOutputModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Get(string codigoInterno)
        {
            Obra result = _obrasService.Get(codigoInterno);
            return result == null ? NotFound() : Ok(result.toObraOutputModel());
            
        }

        [HttpPost]
        public string Create([FromBody] ObraInputModel obraInput) 
        {
            _obrasService.Create(obraInput);
            return "Criado com sucesso";
        }

        [HttpPut("{codigoInterno}")]
        public string Edit(string codigoInterno, [FromBody] ObraInputModel obraInput) 
        {
            _obrasService.Update(codigoInterno,obraInput);
            return "Obra editada com sucesso";
        }

        [HttpDelete("{codigoInterno}")]
        public string Delete(string codigoInterno)
        {
            _obrasService.Delete(codigoInterno);
            return "Obra apagada com sucesso";
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
