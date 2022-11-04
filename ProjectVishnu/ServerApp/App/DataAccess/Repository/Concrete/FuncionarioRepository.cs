using Microsoft.EntityFrameworkCore;
using ProjectVishnu.Models;
using System;
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
            return VishnuContext.Funcionarios.Where(FuncionarioExists).Where(func => func.Mercado.Contains(mercado)).OrderBy(func => func.Nome);

        }

        public IEnumerable<Funcionario> ListAlphabetically()
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists).OrderBy(func => func.Nome);
        }

        public IEnumerable<Funcionario> GetByName(string nome)
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists).Where(func => func.Nome == nome);
        }

        public Funcionario Get(int id) => VishnuContext.Funcionarios.SingleOrDefault(func => func.Id == id);

        public IEnumerable<Funcionario> GetAll()
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists);
        }

        public void Delete(int id)
        {
            VishnuContext.Funcionarios.Where(FuncionarioExists).Where(func => func.Id == id).First().Deleted = DateOnly.FromDateTime(DateTime.Now);
        }

        public void Update(Funcionario funcionario)
        {
            VishnuContext.Funcionarios.Update(funcionario);
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

        private bool FuncionarioExists(Funcionario func)
        {
            return func.Deleted == null;
        }


        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }
}
