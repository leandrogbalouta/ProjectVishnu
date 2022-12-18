using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using ProjectVishnu.Models;
using ProjectVishnu.Services;
using System.ComponentModel;
using System;
using ProjectVishnu.ServerApp.App.Dtos;
using System.Linq;
using ProjectVishnu.ServerApp.App.Controllers;

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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<FuncionarioOutputModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult List([FromQuery(Name = "mercado")] string? mercado, [FromQuery(Name = "nome")] string? nome)
        {
            IEnumerable<Funcionario > funcionariosList;
            if (mercado != null )
            {
                    funcionariosList = _funcionariosService.ListByMarket(mercado);
            }
            else if(nome != null)
            {
                    funcionariosList = _funcionariosService.GetByName(nome);
            }
            else
            {
                funcionariosList = _funcionariosService.ListAlphabetically();
            }
            return funcionariosList == null ? NotFound() : Ok(funcionariosList.Select(x => x.toOutputModel()));

        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FuncionarioOutputModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Get(int id)
        {
            Funcionario result = _funcionariosService.Get(id);
            return result == null ? NotFound() : Ok(result.toOutputModel());
            
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Create([FromBody] FuncionarioInputModel funcionario) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
            Console.WriteLine("HERE");
            int result = _funcionariosService.Create(funcionario);
            Console.WriteLine(result);
            Console.WriteLine("Funcionario novo id " + funcionario.ToFuncionario().Id);
            var actionName = nameof(FuncionariosController.Get);
            var routeValues = new
            {
                id = result
            };
            ActionResult a = CreatedAtAction(actionName, routeValues, funcionario);
            return a;
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Edit(int id, [FromBody] FuncionarioInputModel funcionario) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
            string result = _funcionariosService.Update(funcionario);
            return result == null ? BadRequest() : Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(int id)
        {

            string result = _funcionariosService.Delete(id);
            return result == null ? BadRequest() : Ok(result);
            
             
        }
    }
}
