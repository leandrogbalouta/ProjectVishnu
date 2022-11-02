using ProjectVishnu.Models;
using System.Linq.Expressions;

namespace ProjectVishnu.DataAccess.Repository.Concrete
{
    public class ObraRepository : Repository<Obra>, IObraRepository
    {
        public ObraRepository(vishnuContext context)
            : base(context)
        {
        }

        public IEnumerable<Obra> ListByMarket(string mercado)
        {
            return VishnuContext.Set<Obra>().Where(obra => obra.Mercado.Contains(mercado));
        }

        public IEnumerable<Obra> ListAlphabetically()
        {
            return VishnuContext.Set<Obra>().OrderBy(obra => obra.Designacao);
        }

        public Obra Get(string codigoInterno) => VishnuContext.Set<Obra>().Find(codigoInterno);

        public void Add(Obra entity)
        {
            throw new NotImplementedException();
        }

        public void AddRange(IEnumerable<Obra> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Obra> Find(Expression<Func<Obra, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Obra> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(Obra entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Obra> entities)
        {
            throw new NotImplementedException();
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }
}
