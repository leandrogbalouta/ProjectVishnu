using Microsoft.EntityFrameworkCore;
using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete
{
    public class FuncionariosObraRepository : Repository<FuncionariosObra>, IFuncionariosObraRepository
    {
        public FuncionariosObraRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Funcionario> GetAllFuncsFromObra(string obraID)
        {
            return VishnuContext.FuncionariosObras.Where(fo => fo.Obra == obraID).Select(fo => fo.FuncionarioNavigation).ToList();
        }

        public IEnumerable<Funcionario> GetCurrentFuncsFromObra(string obraID)
        {
            return VishnuContext.FuncionariosObras.Where(fo => fo.Obra == obraID).Where(CurrentlyAtObra).Select(fo => fo.FuncionarioNavigation).ToList();
        }

        public IEnumerable<Funcionario> GetFuncsDuringInterval(string obraID, DateOnly start, DateOnly end)
        {
            return VishnuContext.FuncionariosObras.Where(fo => fo.Obra == obraID).Where(fo => WorkedAtObraDuringInterval(fo, start, end)).Select(fo => fo.FuncionarioNavigation).ToList();
        }

        private bool CurrentlyAtObra(FuncionariosObra fo)
        {
            return fo.Datafim == null;
        }

        private bool WorkedAtObraDuringInterval(FuncionariosObra fo, DateOnly start, DateOnly end)
        {
            if (fo.Datacomeco > end) return false;
            if (fo.Datafim == null) return true;
            else if(start > fo.Datafim) return false;
            return true;
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }
    }
}
