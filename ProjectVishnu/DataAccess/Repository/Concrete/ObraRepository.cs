using ProjectVishnu.Models;

namespace ProjectVishnu.DataAccess.Repository.Concrete
{
    public class ObraRepository : IObraRepository
    {
        private readonly vishnuContext _context;

        public ObraRepository(vishnuContext context)
        {
            _context = context;
        }
    }
}
