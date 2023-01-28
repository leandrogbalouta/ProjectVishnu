using ProjectVishnu.DataAccess.Repository.Concrete;
using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete
{
    public class DiaTrabalhoRepository : Repository<DiaTrabalho>, IDiaTrabalhoRepository
    {
        public DiaTrabalhoRepository(DbContext context) : base(context)
        {
        }

        public vishnuContext VishnuContext
        {
            get { return Context as vishnuContext; }
        }

        public List<DiaTrabalho> GetFuncDaysFromObraBetweenDates(string funcNif, string codigoObra, DateOnly start, DateOnly end){
            return VishnuContext.DiaTrabalhos.Where(dt => dt.Codigoobra == codigoObra && dt.Funcionario == funcNif).ToList().Where(dt => isBetweenInterval(dt, start, end)).ToList();
        }

        public List<DiaTrabalho> GetFuncDaysBetweenDates(string funcNif, DateOnly start, DateOnly end){
            return VishnuContext.DiaTrabalhos.Where(dt => dt.Funcionario == funcNif).ToList().Where(dt => isBetweenInterval(dt, start, end)).ToList();
        }

        private bool isBetweenInterval(DiaTrabalho dt, DateOnly start, DateOnly end){
            int ano = int.Parse(dt.Ano);
            int mes = int.Parse(dt.Mes);

            if(ano == start.Year && mes == start.Month && dt.Dia >= start.Day) return true;
            if(ano == end.Year && mes == end.Month && dt.Dia <= end.Day) return true;

            return false;
        }
    }
}
