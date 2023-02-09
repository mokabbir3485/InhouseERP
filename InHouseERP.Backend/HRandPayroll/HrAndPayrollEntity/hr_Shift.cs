using System;

namespace HrAndPayrollEntity
{
    public class hr_Shift
    {
        public long ShiftId { get; set; }
        public int EmployeeId { get; set; }
        public int AttendancePolicyId { get; set; }
        public DateTime ShiftDate { get; set; }
        public bool IsWeeklyHoliday { get; set; }
        public bool IsPublicHoliday { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string StartedTime { get; set; }
        public string EndedTime { get; set; }
        public bool? IsLateIn { get; set; }
        public bool? IsHalfDay { get; set; }
        public bool? IsOnLeave { get; set; }
        public long? LeaveApplicationId { get; set; }
        public bool? IsEndNextDay { get; set; }
        public bool? IsLateInApproved { get; set; }
        public string LateInApproveRemarks { get; set; }
        public string Remarks { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string EmployeeName { get; set; }
        public string NameOfDay { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
        public string BranchName { get; set; }
        public int? LateInTypeId { get; set; }
        public string LateInTypeName { get; set; }
        public bool? IsAbsent { get; set; }
        public int? AbsentTypeId { get; set; }
        public string AbsentTypeName { get; set; }
        public bool? IsAbsentApproved { get; set; }
        public string AbsentApprovalRemarks { get; set; }
        public decimal DeductHours { get; set; }
    }
}