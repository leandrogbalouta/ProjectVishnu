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
