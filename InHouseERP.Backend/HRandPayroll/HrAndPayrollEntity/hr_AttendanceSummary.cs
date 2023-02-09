using System;

namespace HrAndPayrollEntity
{
    public class hr_AttendanceSummary
    {
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string SectionName { get; set; }
        public string DesignationName { get; set; }
        public string EmployeeName { get; set; }
        public int Working { get; set; }
        public int Prsnt { get; set; }
        public int Leave { get; set; }
        public int Absnt { get; set; }
        public int LateIn { get; set; }
        public int ApLateIn { get; set; }
        public int HalfDayLateIn { get; set; }
        public int ApHalfDayLateIn { get; set; }
        public string Late2 { get; set; }
        public decimal Worked { get; set; }
        public string TotalOtHour { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        public string FirstSignLabel { get; set; }
        public string SecondSignLabel { get; set; }
        public string ThirdSignLabel { get; set; }
        public string FourthSignLabel { get; set; }
        public string FifthSignLabel { get; set; }
    }
}