using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Services;
using ProjectVishnu.Services;

namespace ProjectVishnu.ServerApp.App.Controllers
{
    [ApiController]
    public class FolhasDePontoController : ControllerBase
    {

        private readonly IFolhaDePontoService _folhadepontoServices;

        public FolhasDePontoController(IFolhaDePontoService folhadepontoServices)
        {
            this._folhadepontoServices = folhadepontoServices;
        }

        [HttpPost("/obras/{obraID}/folha-de-ponto")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Create(string obraID, [FromBody] FolhaDePontoInfoModel info)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            FolhaDePontoEmptyOutputModel model = _folhadepontoServices.GenerateWithInfo(obraID, info);
            var actionName = nameof(FolhasDePontoController.GetByObra);
            var routeValues = new
            {
                obraID = obraID,
                date = "" + info.Ano + "-" + info.Mes
            };
            ActionResult a = CreatedAtAction(actionName, routeValues, model);
            
            return a;
        }

        [HttpGet("/obras/{obraID}/folha-de-ponto")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<FolhaDePontoInfoModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetAllByObra(string obraID)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            var result = _folhadepontoServices.GetAllFromObra(obraID);
            return result == null ? NotFound() : Ok(result);
            
        }

        [HttpGet("/obras/{obraID}/folha-de-ponto/{date}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FolhaDePontoValuesOutputModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetByObra(string obraID, string date)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            string[] dateValues = date.Split('-');
            string ano = dateValues[0];
            string mes = dateValues[1];
            FolhaDePontoValuesOutputModel output = _folhadepontoServices.GetFromObra(obraID, ano, mes);
            return output == null ? NotFound() : Ok(output);
        }

        [HttpGet("/folha-de-ponto/{mercado}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<FolhaDePontoInfoModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetAllByMercado(string mercado)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            var result = _folhadepontoServices.GetAllFromMercado(mercado);
            return result == null ? NotFound() : Ok(result);   
        }

        [HttpGet("/folha-de-ponto/{mercado}/{date}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FolhaDePontoValuesOutputModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetByMercado(string mercado, string date)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            string[] dateValues = date.Split('-');
            string ano = dateValues[0];
            string mes = dateValues[1];
            var output = _folhadepontoServices.GetFromMercado(mercado, ano, mes);
            return output == null ? NotFound() : Ok(output);
        }

        [HttpPut("/obras/{obraID}/folha-de-ponto/{date}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FolhaDePontoValuesOutputModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult setValues(string obraID, string date, [FromBody] FolhaDePontoValuesInputModel values)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            FolhaDePontoValuesOutputModel folha = _folhadepontoServices.setValues(obraID, date, values);
            return Ok(folha);
        }
    }
}
