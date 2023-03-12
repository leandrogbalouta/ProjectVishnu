using ProjectVishnu.ServerApp.App.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.UtilsTests
{
    public class CalendarUtilsTests
    {
        [Test]
        public void GetMidLimit()
        {
            Assert.That(CalendarUtils.GetMidLimit("2022", "11"), Is.EqualTo(31));
            Assert.That(CalendarUtils.GetMidLimit("2022", "10"), Is.EqualTo(30));
            Assert.That(CalendarUtils.GetMidLimit("2022", "03"), Is.EqualTo(28));
            Assert.That(CalendarUtils.GetMidLimit("2016", "03"), Is.EqualTo(29));
            Assert.That(CalendarUtils.GetMidLimit("2022", "01"), Is.EqualTo(31));
        }

        [Test]
        public void GetWeekends()
        {
            List<int> saturdays;
            List<int> sundays;

            CalendarUtils.GetWeekends("2022", "11", "21", "20", out saturdays, out sundays);
            Assert.That(saturdays.Count, Is.EqualTo(5));
            Assert.That(sundays.Count, Is.EqualTo(5));
        }
    }
}
