using System;

namespace HrAndPayrollEntity
{
    public class hr_AttendanceDetail
    {
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string EmployeeName { get; set; }
        public string ShiftDate { get; set; }
        public string NameOfDay { get; set; }
        public string DayType { get; set; }
        public string StartTime { get; set; }
        public string StartedTime { get; set; }
        public string EndTime { get; set; }
        public string EndedTime { get; set; }
        public string IsOnLeave { get; set; }
        public string IsHalfDay { get; set; }
        public string IsLateIn { get; set; }
        public string IsLateInApproved { get; set; }
        public string LateInApproveRemarks { get; set; }
        public int Working { get; set; }
        public int Leave { get; set; }
        public int Absnt { get; set; }
        public int Half { get; set; }
        public int Late { get; set; }
        public bool IsLate { get; set; }
        public int ApLate { get; set; }
        public decimal Worked { get; set; }
        public string OtHour { get; set; }
        public string TotalOtHour { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string AttSummary { get; set; }

        public string FirstSignLabel { get; set; }
        public string SecondSignLabel { get; set; }
        public string ThirdSignLabel { get; set; }
        public string FourthSignLabel { get; set; }
        public string FifthSignLabel { get; set; }
    }
}