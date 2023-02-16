using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository
{
    public interface IDiaTrabalhoRepository : IRepository<DiaTrabalho>
    {
        void AddOrUpdate(DiaTrabalho diaTrabalho);
        List<DiaTrabalho> GetFuncDaysFromObraBetweenDates(string funcNif, string codigoObra, DateOnly startDate, DateOnly endDate);
        List<DiaTrabalho> GetFuncDaysFromMercadoBetweenDates(string funcNif, string mercado, DateOnly start, DateOnly end);
    }
}
