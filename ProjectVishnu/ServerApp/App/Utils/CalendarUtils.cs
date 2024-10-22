﻿using ProjectVishnu.Models;
using ProjectVishnu.ServerApp.App.DataAccess.Repository.Concrete;

namespace ProjectVishnu.ServerApp.App.Utils
{
    public static class CalendarUtils
    {
        private static Month[] MonthsArray = { new January(), new February(), new March(), new April(), new May(), new June(), new July(), new August(), new September(), new October(), new November(), new December() };

        public static int GetMidLimit(string ano, string mes)
        {
            int previousMonth = GetPreviousMonth(mes);
            return MonthsArray[(previousMonth-1) % 13].GetNumberOfDays(int.Parse(ano));
        }

        public static void GetStartAndEndDates(Mercado mercado, string ano, string mes, out DateOnly startDate, out DateOnly endDate)
        {
            int previousMonth = CalendarUtils.GetPreviousMonth(mes);
            string prevMonthStr = previousMonth >= 10 ? previousMonth.ToString() : "0" + previousMonth.ToString();
            
            string startAno = ano;
            if(previousMonth == 12) startAno = (int.Parse(ano)-1).ToString();
            startDate = DateOnly.Parse(String.Format("{0}-{1}-{2}", startAno, prevMonthStr, mercado.DiaInicio));
            endDate = DateOnly.Parse(String.Format("{0}-{1}-{2}", ano, mes, mercado.DiaFim));
        }

        public static int GetWeekends(string ano, string mes, string startDay, string endDay, out List<int> saturdays, out List<int> sundays)
        {
            int count = 0;

            saturdays = new List<int>();
            sundays = new List<int>();
            int previousMonth = CalendarUtils.GetPreviousMonth(mes);
            string prevMonthStr = previousMonth >= 10 ? previousMonth.ToString() : "0" + previousMonth.ToString();

            //define lastday first in case the year changes in the following code
            DateTime lastDay = DateTime.Parse(ano + "-" + mes + "-" + endDay);

            //if previous month was december, subtract one from the year
            if(previousMonth == 12) ano = (int.Parse(ano)-1).ToString();

            //first day is always defined with the correct year for the previous month
            DateTime firstDay = DateTime.Parse(ano + "-" + previousMonth + "-" + startDay);

            DateTime currentDay = firstDay;
            while(currentDay <= lastDay)
            {
                if (currentDay.DayOfWeek == DayOfWeek.Saturday)
                {
                    saturdays.Add(currentDay.Day);
                    count++;
                } 
                else if (currentDay.DayOfWeek == DayOfWeek.Sunday)
                {
                    sundays.Add(currentDay.Day);
                    count++;
                } 

                currentDay = currentDay.AddDays(1);
            }
            return count;
        }

        public static List<int> GetHolidays(string ano, string mes, string mercado)
        {

            // GET https://www.googleapis.com/calendar/v3/calendars/en.portuguese%23holiday@group.v.calendar.google.com/events?key=AIzaSyDklm-qOEzg1MzWbnRdHcuTxK5ChccxE-4
            return new List<int>();
        }

        public static int GetNonWorkDays(string ano, string mes, Mercado interval, out List<int>? saturdays, out List<int>? sundays, out List<int>? holidays)
        {
            holidays = GetHolidays(ano, mes, interval.Mercadoname);

            int weekends = GetWeekends(ano, mes, interval.DiaInicio.ToString(), interval.DiaFim.ToString(), out saturdays, out sundays);

            return holidays.Count() + weekends;
        }

        public static int GetPreviousMonth(string mes){
            int previousMonth = (int.Parse(mes)-1);
            if (previousMonth-1 < 0) previousMonth += 12;
            return previousMonth;
        }
    }
}
