using ProjectVishnu.DataAccess.Repository;
using ProjectVishnu.Models;

namespace ProjectVishnu.ServerApp.App.DataAccess.Repository
{
    public interface IDiaTrabalhoRepository : IRepository<DiaTrabalho>
    {
        List<DiaTrabalho> GetFuncDaysFromObraBetweenDates(string funcNif, string codigoObra, DateOnly startDate, DateOnly endDate);
        List<DiaTrabalho> GetFuncDaysBetweenDates(string funcNif, DateOnly startDate, DateOnly endDate);
    }
}
