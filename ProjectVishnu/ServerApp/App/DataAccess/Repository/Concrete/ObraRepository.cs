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
            VishnuContext.Obras.Add(entity);
        }

        public void Update(string codigoInterno,Obra entity)
        {
            entity.Codigointerno = codigoInterno;
            VishnuContext.Obras.Update(entity);
        }

        public void Delete(string codigo)
        {
            VishnuContext.Obras.Where(ObraExists).Where(obra => obra.Codigointerno == codigo).First().Deleted = DateOnly.FromDateTime(DateTime.Now);
        }

        public int SearchByCodeNumber(string code)
        {
            return VishnuContext.Obras.Where(obra => obra.Codigointerno.Contains(code)).Count();
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

        private bool ObraExists(Obra obra)
        {
            return obra.Deleted == null;
        }


        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }
}
