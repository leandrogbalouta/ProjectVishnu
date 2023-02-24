using System.Text.Json;
using System.Text.Json.Serialization;
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
        public IActionResult List([FromQuery()] string? estado, [FromQuery(Name = "mercado")] string? mercado, [FromQuery(Name = "valor")] string? valor)
        {
            try
            {

            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
            IEnumerable<Obra> obraList;
            if(estado == null && mercado == null && valor == null){
                obraList = _obrasService.ListAlphabetically();
            }
            else
            {
                obraList = _obrasService.ListWithFilters(estado, mercado, valor);
            }

            return obraList == null ? NotFound() : Ok(obraList.Select(obra => obra.toObraOutputModel()));

            
        }
        // New
        [HttpGet("funcionario/{funcionarioId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ObraOutputModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult ListByFuncionario(int funcionarioId)
        {
            try
            {

            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
            if (Request.QueryString.HasValue) return BadRequest();
            IEnumerable<Obra>? result = _obrasService.ListByFuncionario(funcionarioId);
            return result == null ? NotFound() : Ok(result);

        }

        [HttpGet("{codigoInterno}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ObraOutputModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(string codigoInterno)
        {
            try
            {

            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
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

            try
            {
                // TODO verificar se isto é 🍞 ou 💩
                if(obraInput.Datainicio != null)
                {
                    DateTime.TryParse(obraInput.Datainicio, out DateTime dt);
                    obraInput.Datainicio = dt.ToShortDateString();
                }

                if(obraInput.Datafim != null)
                {
                    DateTime.TryParse(obraInput.Datainicio, out DateTime dt);
                    obraInput.Datafim = dt.ToShortDateString();
                }
                // end 
                string codigoInterno = _obrasService.Create(obraInput);

                var actionName = nameof(ObrasController.Get);
                var routeValues = new
                {
                    codigoInterno = codigoInterno
                };
                ActionResult a = CreatedAtAction(actionName, routeValues, obraInput);
                return a;
            }
            catch (Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }

        [HttpPut("{codigoInterno}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Edit(string codigoInterno, [FromBody] ObraInputModel obraInput)
        {
            try
            {
                if (Request.QueryString.HasValue) return BadRequest();
                string result = _obrasService.Update(codigoInterno, obraInput);
                return Ok(result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }

        [HttpDelete("{codigoInterno}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(string codigoInterno)
        {
            try
            {
                if (Request.QueryString.HasValue) return BadRequest();
                string result = _obrasService.Delete(codigoInterno);
                return Ok(result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }

        [HttpPost("{codigoInterno}/add")]
        public IActionResult AddFuncionario(string codigoInterno, [FromBody] FuncionarioObraInputModel funcInput)
        {
            try
            {
                _obrasService.AddFuncToObra(codigoInterno, funcInput);
                return Ok();
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }

        [HttpPut("{codigoInterno}/remove")]
        public IActionResult RemoveFuncionario(string codigoInterno, [FromBody] FuncionarioObraInputModel funcInput)
        {
            try
            {
                _obrasService.RemoveFuncFromObra(codigoInterno, funcInput);
                return Ok();
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }          
        }
    }
}
