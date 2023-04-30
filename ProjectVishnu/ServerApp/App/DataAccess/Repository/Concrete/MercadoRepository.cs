using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete
{
    public class MercadoRepository : Repository<Mercado>, IMercadoRepository
    {
        public MercadoRepository(DbContext context) : base(context)
        {
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }

        public void Add(Mercado entity)
        {
            VishnuContext.Mercados.Add(entity);
        }

        public void AddRange(IEnumerable<Mercado> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Mercado> Find(System.Linq.Expressions.Expression<Func<Mercado, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Mercado GetMercado(string mercado)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Mercado> ListAlphabetically()
        {
            return VishnuContext.Mercados.OrderBy(mercado => mercado.Mercadoname);
        }

        public void Remove(Mercado entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Mercado> entities)
        {
            throw new NotImplementedException();
        }

        IEnumerable<Mercado> IRepository<Mercado>.GetAll()
        {
            throw new NotImplementedException();
        }

        Mercado IMercadoRepository.GetMercado(string mercado)
        {
            return VishnuContext.Mercados.Where(m => m.Mercadoname == mercado).First();
        }
    }
}
