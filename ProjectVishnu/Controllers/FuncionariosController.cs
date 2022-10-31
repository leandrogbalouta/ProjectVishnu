using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using ProjectVishnu.Models;
using ProjectVishnu.Services;
using System.ComponentModel;
using System;

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
        public string List([FromQuery(Name = "mercado")] string? mercado, [FromQuery(Name = "nome")] string? nome)
        {
            if (mercado != null )
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
            else if(nome != null)
            {
                try
                {
                    return _funcionariosService.GetByName(nome).Last().Nome;
                }
                catch (InvalidOperationException e)
                {
                    return "Nome inválido.";
                }
            }
            else
            {
                return _funcionariosService.ListAlphabetically().Last().Nome;
            }
        }

        [HttpGet("{id}")]
        public String Get(int id)
        {
            try
            {
                return _funcionariosService.Get(id).Nome;
            }catch(Exception e)
            {
                return "O id não é válido.";
            }
        }

        [HttpPost]
        public string Create([FromBody] dynamic jsonData) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
                Funcionario funcionario = JsonConvert.DeserializeObject<Funcionario>(jsonData.ToString());
                foreach (PropertyDescriptor descriptor in TypeDescriptor.GetProperties(funcionario))
                {
                    string name = descriptor.Name;
                    object value = descriptor.GetValue(funcionario);
                    Console.WriteLine("{0}={1}", name, value);
                }
                Console.WriteLine(funcionario.Dtnascimento.ToString());
                Console.WriteLine("HERE");
                _funcionariosService.Create(funcionario);
                return "Criado com sucesso";
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
