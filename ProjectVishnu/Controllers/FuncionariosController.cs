using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ProjectVishnu.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FuncionariosController : ControllerBase
    {
        [HttpGet]
        public IActionResult ListAlphabetically()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public IActionResult ListByMarket([FromQuery(Name = "mercado")] string mercado)
        {
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost("{id}")]
        public IActionResult Create(int id) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
            throw new NotImplementedException();
        }
    }
}
