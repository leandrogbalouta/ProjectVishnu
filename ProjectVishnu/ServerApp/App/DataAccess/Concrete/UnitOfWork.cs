using Microsoft.EntityFrameworkCore;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.DataAccess.Repository;
using ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete;

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
            DiasTrabalho = new DiaTrabalhoRepository(_context);
            CategoriasProfissionais = new CategoriaProfRepository(_context);
            FuncionariosObra = new FuncionariosObraRepository(_context);
            Mercados = new MercadoRepository(_context);
            SalarioFinal = new SalarioFinalRepository(_context);
            FolhaDePontos = new FolhaDePontoRepository(_context);
            TiposDocInt = new TipoDocRepository(_context);
            Contas = new ContaRepository(_context);
            TiposDeUser = new TiposDeUserRepository(_context);
        }

        public IFuncionarioRepository Funcionarios { get; private set; }

        public IObraRepository Obras { get; private set; }

        public IDiaTrabalhoRepository DiasTrabalho { get; private set; }

        public ICategoriaProfRepository CategoriasProfissionais { get; private set; }

        public IFuncionariosObraRepository FuncionariosObra { get; private set; }

        public IMercadoRepository Mercados { get; private set; }

        public ISalarioFinalRepository SalarioFinal { get; private set; }

        public IFolhaDePontoRepository FolhaDePontos { get; private set; }

        public ITipoDocRepository TiposDocInt { get; private set; }

        public IContaRepository Contas { get; private set; }

        public ITiposDeUserRepository TiposDeUser { get; private set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void UntrackChanges()
        {
            _context.ChangeTracker.Clear();
        }
    }
}
