using Microsoft.EntityFrameworkCore;
using ProjectVishnu.Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace ProjectVishnu.DataAccess.Repository.Concrete
{
    public class FuncionarioRepository : Repository<Funcionario>, IFuncionarioRepository
    {

        int VALIDATY_WARNING_DAYS = 45;
        public FuncionarioRepository(vishnuContext context)
            : base(context)
        {
        }
        public IEnumerable<Funcionario> ListByMarket(string mercado)
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists).Where(func => func.Mercado!.Contains(mercado)).OrderBy(func => func.Nome);
        }
        // Testin'
        public IEnumerable<Funcionario> ListByMarketAndName(string mercado, string nome)
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists).Where(func => func.Mercado!.Contains(mercado) && func.Nome.Contains(nome)).OrderBy(func => func.Nome);
        }

        public IEnumerable<Funcionario> ListAlphabetically()
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists).OrderBy(func => func.Nome);
        }

        public IEnumerable<Funcionario> SearchByName(string nome)
        {
            return VishnuContext.Funcionarios.Where(FuncionarioExists).Where(func => func.Nome.Contains(nome));
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
            VishnuContext.Funcionarios.Update(funcionario).Property(func => func.Id).IsModified = false; 
        }

        public int GetValidityWarningCount(){
            DateOnly date = DateOnly.FromDateTime(DateTime.Today);
            date.AddDays(VALIDATY_WARNING_DAYS);
            return VishnuContext.Funcionarios.Where(func => date > func.Validadedocident).Count();
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

        public int GetFuncId(string nif)
        {
            return VishnuContext.Funcionarios.Where(func => func.Nif == nif).First().Id;
        }

        public IEnumerable<Funcionario> GetValidityWarningList()
        {
            DateOnly date = DateOnly.FromDateTime(DateTime.Today);
            date.AddDays(VALIDATY_WARNING_DAYS);
            return VishnuContext.Funcionarios.Where(func => date > func.Validadedocident).ToList();
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }
}
