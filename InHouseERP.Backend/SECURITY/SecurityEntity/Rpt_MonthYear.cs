using System;

namespace SecurityEntity
{
    public class Rpt_MonthYear
    {
        public int MonthYearId { get; set; }
        public int MonthId { get; set; }
        public int YearId { get; set; }
        public string MonthAndYear { get; set; }
        public string MonthName { get; set; }
        public DateTime FirstDayOfMonth { get; set; }
        public DateTime LastDayOfMonth { get; set; }
    }
}