using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.Models;
using ProjectVishnu.Services;
using ProjectVishnu.ServerApp.App.Dtos;
using ProjectVishnu.ServerApp.App.Services.ServicesErrors;
using Microsoft.AspNetCore.Authorization;

namespace ProjectVishnu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            try
            {
                IEnumerable<Funcionario> funcionariosList;
                if(mercado == null && nome == null)
                {
                    funcionariosList = _funcionariosService.ListAlphabetically();
                }
                else
                {
                    funcionariosList = _funcionariosService.ListWithFilters(mercado, nome);
                }
                
                return Ok(funcionariosList.Select(x => x.toOutputModel()));
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FuncionarioOutputModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(int id)
        {
            if (Request.QueryString.HasValue) return BadRequest();
            try
            {
                Funcionario result = _funcionariosService.Get(id);
                return Ok(result.toOutputModel());
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
            
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
                // 23505 significa primary key duplicada (Postgres).
                string errorMessage = (erroCode.Equals("23505")) ? "NIF duplicado." : "Ocorreu um erro, por favor tente novamente, se o erro persistir, entre em contacto connosco.";
                return Problem(statusCode: 409, title: errorMessage);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Edit(int id, [FromBody] FuncionarioInputModel funcionario) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
            try
            {
                if (Request.QueryString.HasValue) return BadRequest();
                string result = _funcionariosService.Update(funcionario);
                return Ok(result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
            
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(int id)
        {
            try
            {
                if (Request.QueryString.HasValue) return BadRequest();
                string result = _funcionariosService.Delete(id);
                return Ok(result);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }

        [HttpGet("{id}/obras/current")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ObraFuncionarioOutputModel))]
        public IActionResult GetCurrentObra(int id)
        {
            try
            {
                ObraFuncionarioOutputModel currentObra = _funcionariosService.GetCurrentObra(id);
                return Ok(currentObra);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }

        [HttpGet("{id}/obras/past")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ObraFuncionarioOutputModel>))]
        public IActionResult GetPastObras(int id)
        {
            try
            {
                IEnumerable<ObraFuncionarioOutputModel> pastObras = _funcionariosService.GetPastObras(id);
                return Ok(pastObras);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }
        // TODO check this
        [HttpPost("{id}/obras")]
        public IActionResult AddFuncToObra(int id, [FromBody]ObraInsertionModel body)
        {
            try
            {
                int result = _funcionariosService.AddFuncToObra(id, body.CodigoInterno, body.Date);
                return Ok();
            }
            catch(FuncionariosError customError)
            {
                return Problem(statusCode: customError.StatusCode, title: customError.Message);
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
            
        }

        [HttpPut("{id}/obras")]
        public IActionResult RemoveFuncFromCurrentObra(int id, [FromBody] string date)
        {
            try 
            {
                int result = _funcionariosService.RemoveFuncFromObra(id, date);
                return Ok();
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
            
        }

        [HttpGet("validity/count")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(int))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetDocValidityWarningCount()
        {
            try
            {
                return Ok(_funcionariosService.GetValidityWarningCount());
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }

        [HttpGet("validity/list")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<FuncionarioOutputModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetDocValidityWarningList()
        {
            try
            {
                return Ok(_funcionariosService.GetValidityWarningList().Select(f => f.toOutputModel()));
            }
            catch(Exception e)
            {
                return Problem(statusCode: 500, title: "Erro inesperado");
            }
        }
    }
}