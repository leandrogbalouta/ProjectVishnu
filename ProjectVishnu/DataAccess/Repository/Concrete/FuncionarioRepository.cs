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
            return VishnuContext.Set<Funcionario>().Where(func => func.Mercado.Contains(mercado));
        }

        public IEnumerable<Funcionario> ListAlphabetically()
        {
            return VishnuContext.Set<Funcionario>().OrderBy(func => func.Nome);
        }

        public IEnumerable<Funcionario> GetByName(string nome)
        {
            return VishnuContext.Set<Funcionario>().Where(func => func.Nome.Contains(nome));
        }

        public Funcionario Get(int id) => VishnuContext.Set<Funcionario>().SingleOrDefault(func => func.Id == id);

        public IEnumerable<Funcionario> GetAll()
        {
            return base.GetAll();
        }

        public IEnumerable<Funcionario> Find(Expression<Func<Funcionario, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public void Add(Funcionario entity)
        {
            base.Add(entity);
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
            get { return Context as vishnuContext; }
        }
    }
}
