using Microsoft.EntityFrameworkCore;
using ProjectVishnu.Models;
using System.Linq;

namespace ProjectVishnu.Repository
{
    public class FuncionarioRepository
    {
        private readonly vishnuContext _context;

        public FuncionarioRepository() {
            _context = new vishnuContext();
        }
        public String listByMarket(string mercado)
        {
            return "na";
        }

        public Funcionario listAlphabetically()
        {
             IQueryable<Funcionario> funcionarios =
                from funcionario in _context.Funcionarios
                orderby funcionario.Nome
                select funcionario;
            return funcionarios.Last<Funcionario>();
        }

        public string Get(int id)
        {
            return _context.Set<Funcionario>().SingleOrDefault(func => func.Id == id).Nome;
        }
    }
}
