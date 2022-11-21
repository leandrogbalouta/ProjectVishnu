using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete;

namespace ProjectVishnu.ServerApp.App.Utils
{
    public static class CalendarUtils
    {
        private static Month[] MonthsArray = { new January(), new February(), new March(), new April(), new May(), new June(), new July(), new August(), new September(), new October(), new November(), new December() };

        public static int GetMidLimit(string ano, string mes)
        {
            int previousMonth = (int.Parse(mes)-1);
            if (previousMonth-1 < 0) previousMonth += 12;
            return MonthsArray[(previousMonth-1) % 13].GetNumberOfDays(int.Parse(ano));
        }

        public static void GetWeekends(string ano, string mes, string startDay, string endDay, out List<int> saturdays, out List<int> sundays)
        {
            saturdays = new List<int>();
            sundays = new List<int>();
            int previousMonth = int.Parse(mes) - 1;
            string prevMonthStr = previousMonth >= 10 ? previousMonth.ToString() : "0" + previousMonth.ToString();

            DateTime firstDay = DateTime.Parse(ano + "-" + previousMonth + "-" + startDay);
            DateTime lastDay = DateTime.Parse(ano + "-" + mes + "-" + endDay);
            DateTime currentDay = firstDay;
            while(currentDay <= lastDay)
            {
                if (currentDay.DayOfWeek == DayOfWeek.Saturday) saturdays.Add(currentDay.Day);
                else if (currentDay.DayOfWeek == DayOfWeek.Sunday) sundays.Add(currentDay.Day);

                currentDay = currentDay.AddDays(1);
            }
        }

        public static List<int> GetHolidays(string ano, string mes, string mercado)
        {

            // GET https://www.googleapis.com/calendar/v3/calendars/en.portuguese%23holiday@group.v.calendar.google.com/events?key=AIzaSyDklm-qOEzg1MzWbnRdHcuTxK5ChccxE-4
            return new List<int>();
        }

        public static void GetNonWorkDays(string ano, string mes, Mercado interval, out List<int> saturdays, out List<int> sundays, out List<int> holidays)
        {
            holidays = GetHolidays(ano, mes, interval.Mercadoname);
            GetWeekends(ano, mes, interval.DiaInicio.ToString(), interval.DiaFim.ToString(), out saturdays, out sundays);
        }
    }
}
