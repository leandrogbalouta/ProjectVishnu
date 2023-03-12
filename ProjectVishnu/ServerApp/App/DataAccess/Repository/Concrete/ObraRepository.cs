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

        public IEnumerable<Obra> ListByFuncionario(int funcionarioId)
        {
            return VishnuContext.Obras
                                .Where(obra => obra.FuncionariosObras
                                .Any(funcionario => funcionario.FuncionarioNavigation.Id == funcionarioId))
                                .ToList();
        }

        public IEnumerable<Obra> ListByFilters(string? estado = null, string? mercado = null, string? valor = null)
        {
            return VishnuContext.Obras.ToList().Where(obra => Filter(obra, estado, mercado, valor)).ToList();
        }

        public IEnumerable<Obra> ListAlphabetically()
        {
            return VishnuContext.Obras.OrderBy(obra => obra.Codigointerno);
        }
        public Obra Get(string codigoInterno)
        => VishnuContext.Obras.Find(codigoInterno)!;

        public void Add(Obra entity)
        {
            VishnuContext.Obras.Add(entity);
        }

        public void Update(string codigoInterno, Obra entity)
        {
            entity.Codigointerno = codigoInterno;
            VishnuContext.Obras.Update(entity);
        }

        public void Delete(string codigo)
        {
            VishnuContext.Obras.Where(ObraExists).Where(obra => obra.Codigointerno == codigo).First().Deleted = DateOnly.FromDateTime(DateTime.Now);
        }
        public IEnumerable<FuncionariosObra> GetCurrentFuncs(string codigoInterno)
        {
            return VishnuContext.FuncionariosObras.Where(fo => fo.Obra == codigoInterno && fo.Datafim == null).ToList();
        }

        public IEnumerable<FuncionariosObra> GetPastFuncs(string codigoInterno)
        {
            return VishnuContext.FuncionariosObras.Where(fo => fo.Obra == codigoInterno && fo.Datafim != null).ToList();
        }

        public int CountCodigoOccurrences(string code)
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

        public Mercado GetMercado(string codigoInterno)
        {
            Obra o = Get(codigoInterno);
            return o.MercadoNavigation;
        }

        bool Filter(Obra obra, string? estado, string? mercado, string? valor){
            bool estadoCondition = estado == null ? true : obra.Estado == estado;
            bool mercadoCondition = mercado == null ? true : obra.Mercado.Contains(mercado);
            bool valorCondition = valor == null ? true : obra.Codigointerno.Contains(valor) || obra.Designacao.Contains(valor);

            return estadoCondition && mercadoCondition && valorCondition;
        }


        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }
}
