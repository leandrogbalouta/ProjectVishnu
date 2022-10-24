using Microsoft.EntityFrameworkCore;
using ProjectVishnu.Models;
using System.Linq;

namespace ProjectVishnu.DataAccess.Repository.Concrete
{
    public class FuncionarioRepository : IFuncionarioRepository
    {
        private readonly vishnuContext _context;

        public FuncionarioRepository(vishnuContext context)
        {
            _context = context;
        }
        public string ListByMarket(string mercado)
        {
            return "na";
        }

        public Funcionario ListAlphabetically()
        {
            IQueryable<Funcionario> funcionarios =
               from funcionario in _context.Funcionarios
               orderby funcionario.Nome
               select funcionario;
            return funcionarios.Last();
        }

        public string Get(int id)
        {
            return _context.Set<Funcionario>().SingleOrDefault(func => func.Id == id).Nome;
        }

    }
}
