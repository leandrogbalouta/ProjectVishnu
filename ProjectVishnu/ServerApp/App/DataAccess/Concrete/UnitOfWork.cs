using Microsoft.EntityFrameworkCore;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Concrete
{
    public class UnitOfWork : IUnitOfWork
    {

        private readonly vishnuContext _context;

        public UnitOfWork(vishnuContext context)
        {
            _context = context;
            Funcionarios = new FuncionarioRepository(_context);
            Obras = new ObraRepository(_context);
        }

        public IFuncionarioRepository Funcionarios { get; private set; }

        public IObraRepository Obras { get; private set; }


        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
