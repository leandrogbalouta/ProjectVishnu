using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProjectVishnu.Models;
using ProjectVishnu.Services;

namespace ProjectVishnu.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FuncionariosController : ControllerBase
    {

        private readonly IFuncionariosService _funcionariosService;

        public FuncionariosController(IFuncionariosService funcionariosService)
        {
            this._funcionariosService = funcionariosService;
        }

        [HttpGet]
        public string List([FromQuery(Name = "mercado")] string? mercado)
        {
            if (mercado == null)
            {
                return _funcionariosService.ListAlphabetically().Last().Nome;
            }
            else
            {
                try
                {
                    return _funcionariosService.ListByMarket(mercado).Last().Nome;
                }
                catch (InvalidOperationException e)
                {
                    return "Mercado inválido.";
                }
                
            }
        }

        [HttpGet("{id}")]
        public String Get(int id)
        {
            return _funcionariosService.Get(id);
        }

        [HttpPost]
        public string Create([FromBody] Funcionario funcionario) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
            try
            {
                _funcionariosService.Create(funcionario);
                return "Criado com sucesso";
            }catch(Exception e)
            {
                return "Erro";
            }
        }

        [HttpPut("{id}")]
        public string Edit(int id) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
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
