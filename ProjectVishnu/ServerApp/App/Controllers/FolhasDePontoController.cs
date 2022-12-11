using Microsoft.AspNetCore.Mvc;
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
        public IActionResult Create(string obraID, [FromBody] FolhaDePontoInfoModel info)
        {
            FolhaDePontoEmptyOutputModel model = _folhadepontoServices.GenerateWithInfo(obraID, info);
            var actionName = nameof(FolhasDePontoController.GetByObra);
            var controllerName = "FolhasDePonto";
            var routeValues = new
            {
                obraID = obraID,
                date = "" + info.Ano + "-" + info.Mes
            };
            ActionResult a = CreatedAtAction(actionName, routeValues, model);
            
            return a;
        }

        [HttpGet("/obras/{obraID}/folha-de-ponto")]
        public List<FolhaDePontoInfoModel> GetAllByObra(string obraID)
        {
            return _folhadepontoServices.GetAllFromObra(obraID);
            
        }

        [HttpGet("/obras/{obraID}/folha-de-ponto/{date}")]
        public string GetByObra(string obraID, string date)
        {
            string[] dateValues = date.Split('-');
            string ano = dateValues[0];
            string mes = dateValues[1];
            _folhadepontoServices.GetFromObra(obraID, ano, mes);
            return "";
        }

        [HttpGet("/folha-de-ponto/{mercado}")]
        public List<FolhaDePontoInfoModel> GetAllByMercado(string mercado)
        {
            return _folhadepontoServices.GetAllFromMercado(mercado);
        }

        [HttpGet("/folha-de-ponto/{mercado}/{date}")]
        public FolhaDePontoValuesOutputModel GetByMercado(string mercado, string date)
        {
            string[] dateValues = date.Split('-');
            string ano = dateValues[0];
            string mes = dateValues[1];
            return _folhadepontoServices.GetFromMercado(mercado, ano, mes);
        }

        [HttpPut("/obras/{obraID}/folha-de-ponto/{date}")]
        public string setValues(string obraID, string date, [FromBody] FolhaDePontoValuesInputModel values)
        {
            _folhadepontoServices.setValues(obraID, date, values);
            return "";
        }
    }
}
