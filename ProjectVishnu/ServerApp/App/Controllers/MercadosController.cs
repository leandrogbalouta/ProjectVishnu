using Microsoft.AspNetCore.Mvc;
using ProjectVishnu.ServerApp.App.Services;
using ProjectVishnu.Services;

namespace ProjectVishnu.ServerApp.App.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MercadosController : ControllerBase
    {
        private readonly IMercadosService _mercadosService;

        public MercadosController(IMercadosService mercadosService)
        {
            _mercadosService = mercadosService;
        }

        [HttpGet]
        public IEnumerable<string> List()
        {
            return _mercadosService.ListAlphabetically();
        }
    }
}
