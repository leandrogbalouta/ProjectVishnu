using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.Models;
using ProjectVishnu.Services;
using ProjectVishnu.ServerApp.App.Dtos;
using Npgsql;
using Microsoft.EntityFrameworkCore;

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
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult List([FromQuery(Name = "mercado")] string? mercado, [FromQuery(Name = "nome")] string? nome)
        {
            IEnumerable<Funcionario> funcionariosList;
            if (mercado != null && nome != null)
            {
                funcionariosList = _funcionariosService.ListByMarketAndName(mercado, nome);
            }
            else if(mercado == null && nome == null)
            {
                funcionariosList = _funcionariosService.ListAlphabetically();
            }
            else if (mercado != null)
            {
                funcionariosList = _funcionariosService.ListByMarket(mercado);
            }
            else if (nome != null)
            {
                funcionariosList = _funcionariosService.GetByName(nome);
            }else
            {
                return BadRequest();
            }
            // TODO BREAKING CHANGES ao usar !Request.QueryString.HasValue,ao carregar funcionarios o valor é sempre true
            
            return funcionariosList == null ? NotFound() : Ok(funcionariosList.Select(x => x.toOutputModel()));

        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FuncionarioOutputModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(int id)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            Funcionario result = _funcionariosService.Get(id);
            return result == null ? NotFound() : Ok(result.toOutputModel());
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Create([FromBody] FuncionarioInputModel funcionarioInput) // TODO levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            try
            {
                int result = _funcionariosService.Create(funcionarioInput);
                var actionName = nameof(FuncionariosController.Get);
                var routeValues = new
                {
                    id = result
                };
                ActionResult a = CreatedAtAction(actionName, routeValues, funcionarioInput);
                return a;
            }
            catch (Exception ex)
            {
                string erroCode = ex.InnerException!.Data["SqlState"]!.ToString()!;
                // 23505 significa primary key duplicada.
                string errorMessage = (erroCode.Equals("23505")) ? "NIF duplicado." : "Ocoreu um erro, por favor tente novamente, se o erro persistir, entre em contacto connosco.";
                return new JsonResult(errorMessage);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Edit(int id, [FromBody] FuncionarioInputModel funcionario) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            string result = _funcionariosService.Update(funcionario);
            return result == null ? BadRequest() : Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(int id)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            string result = _funcionariosService.Delete(id);
            return result == null ? BadRequest() : Ok(result);


        }
    }
}
