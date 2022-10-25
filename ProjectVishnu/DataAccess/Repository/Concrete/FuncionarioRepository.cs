using Microsoft.EntityFrameworkCore;
using ProjectVishnu.Models;
using System.Linq;
using System.Linq.Expressions;

namespace ProjectVishnu.DataAccess.Repository.Concrete
{
    public class FuncionarioRepository : Repository<Funcionario>, IFuncionarioRepository
    {

        public FuncionarioRepository(vishnuContext context)
            : base(context)
        {
        }
        public IEnumerable<Funcionario> ListByMarket(string mercado)
        {
            return "na";
        }

        public IEnumerable<Funcionario> ListAlphabetically()
        {
            IQueryable<Funcionario> funcionarios =
               from funcionario in VishnuContext.Funcionarios
               orderby funcionario.Nome
               select funcionario;
            return funcionarios.Last();
        }

        public Funcionario Get(int id)
        {
            return VishnuContext.Set<Funcionario>().SingleOrDefault(func => func.Id == id);
        }

        public IEnumerable<Funcionario> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Funcionario> Find(Expression<Func<Funcionario, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public void Add(Funcionario entity)
        {
            throw new NotImplementedException();
        }

        public void AddRange(IEnumerable<Funcionario> entities)
        {
            throw new NotImplementedException();
        }

        public void Remove(Funcionario entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Funcionario> entities)
        {
            throw new NotImplementedException();
        }
        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext;  }
        }
    }
}
