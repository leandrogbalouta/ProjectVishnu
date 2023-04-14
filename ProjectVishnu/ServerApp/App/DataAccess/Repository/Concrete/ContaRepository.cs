using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository.Concrete
{
    public class ContaRepository : Repository<Conta>, IContaRepository
    {
        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
        public ContaRepository(vishnuContext context)
            : base(context)
        {
        }

        public Conta? Get(string username)
        {
           return VishnuContext.Contas.Where(c => c.Username.Equals(username)).FirstOrDefault();
        }

        public void Update(string username, Conta entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(string username)
        {
            throw new NotImplementedException();
        }
    }
}
