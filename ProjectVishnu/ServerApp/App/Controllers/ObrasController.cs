using Microsoft.AspNetCore.Mvc;
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
        public IEnumerable<ObraOutputModel> List([FromQuery(Name = "mercado")] string? mercado)
        {
            if(mercado == null)
            {
                return _obrasService.ListAlphabetically().Select(obra => obra.toObraOutputModel());
            }
            else
            {
                try
                {
                    return _obrasService.ListByMarket(mercado).Select(obra => obra.toObraOutputModel());
                }
                catch (InvalidOperationException e)
                {
                    throw e;
                }
            }
        }

        [HttpGet("{codigoInterno}")]
        public String Get(string codigoInterno)
        {
            try
            {
                return _obrasService.Get(codigoInterno).Designacao;
            }
            catch (Exception e)
            {
                return "Código interno inválido.";
            }
            
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
