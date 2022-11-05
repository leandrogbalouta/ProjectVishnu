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
        public string List([FromQuery(Name = "mercado")] string? mercado)
        {
            if(mercado == null)
            {
                return _obrasService.ListAlphabetically().Last().Designacao;
            }
            else
            {
                try
                {
                    return _obrasService.ListByMarket(mercado).Last().Designacao;
                }
                catch (InvalidOperationException e)
                {
                    return "Mercado inválido.";
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

        [HttpPut("{id}")]
        public string Edit(int id) 
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            throw new NotImplementedException();
        }

    }
}
