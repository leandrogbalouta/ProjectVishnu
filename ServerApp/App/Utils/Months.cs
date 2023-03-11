namespace ProjectVishnu.ServerApp.App.Utils
{
    public interface Month
    {
        public int GetNumberOfDays(int year);
    }
    class January : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 31;
        }
    }

    class February : Month
    {
        public int GetNumberOfDays(int year)
        {
            return DateTime.IsLeapYear(year) ? 29 : 28;
        }
    }

    class March : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 31;
        }
    }

    class April : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 30;
        }
    }

    class May : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 31;
        }
    }

    class June : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 30;
        }
    }

    class July : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 31;
        }
    }

    class August : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 31;
        }
    }

    class September : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 30;
        }
    }

    class October : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 31;
        }
    }

    class November : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 30;
        }
    }

    class December : Month
    {
        public int GetNumberOfDays(int year)
        {
            return 31;
        }
    }

}
