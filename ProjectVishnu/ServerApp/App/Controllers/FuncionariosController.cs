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
        public IEnumerable<FuncionarioOutputModel> List([FromQuery(Name = "mercado")] string? mercado, [FromQuery(Name = "nome")] string? nome)
        {
            if (mercado != null )
            {
                try
                {
                    IEnumerable<Funcionario> funcionariosList = _funcionariosService.ListByMarket(mercado);
                    return funcionariosList.Select(x => x.toOutputModel());

                }
                catch (InvalidOperationException e)
                {
                    return null;//"Mercado inválido.";
                }
                
            }
            else if(nome != null)
            {
                try
                {
                    IEnumerable<Funcionario> funcionariosList = _funcionariosService.GetByName(nome);
                    return funcionariosList.Select(x => x.toOutputModel());
                }
                catch (InvalidOperationException e)
                {
                    return null;//"Nome inválido.";
                }
            }
            else
            {
                IEnumerable<Funcionario> funcionariosList = _funcionariosService.ListAlphabetically();
                return funcionariosList.Select(x => x.toOutputModel());
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
        public string Create([FromBody] FuncionarioInputModel funcionario) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
                _funcionariosService.Create(funcionario);
                return "Criado com sucesso";
        }

        [HttpPut("{id}")]
        public string Edit(int id, [FromBody] FuncionarioInputModel funcionario) // levar um segundo parâmetro com os parâmetros necessários para editar um funcionário(possivelmente necessário criar um dto)
        {
            _funcionariosService.Update(funcionario);
            return "Funcionario editado com sucesso.";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {

                _funcionariosService.Delete(id);
                return "Funcionario apagado com sucesso";
            
             
        }
    }
}
