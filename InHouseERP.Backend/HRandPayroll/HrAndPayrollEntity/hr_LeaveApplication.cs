using System;

namespace HrAndPayrollEntity
{
    public class hr_LeaveApplication
    {
        public long LeaveApplicationId { get; set; }
        public int LeaveTypeId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime ApplicationDate { get; set; }
        public string ApplicationNo { get; set; }
        public DateTime ApplicationFrom { get; set; }
        public DateTime ApplicationTo { get; set; }
        public string ReasonForLeave { get; set; }
        public int? CoverEmployeeId { get; set; }
        public bool IsHrForwarded { get; set; }
        public bool IsRejected { get; set; }
        public bool IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public DateTime? ApprovedFrom { get; set; }
        public DateTime? ApprovedTo { get; set; }
        public bool? IsHalfDay { get; set; }
        public bool? IsAdjustWithDays { get; set; }
        public bool? IsAdjustWithOverTime { get; set; }
        public decimal OverTimeAdjustHours { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string ApplicationDateString { get; set; }
        public string ApplicationFromString { get; set; }
        public string ApplicationToString { get; set; }
        public decimal NoOfDays { get; set; }
        public string EmployeeName { get; set; }
        public string CoverBy { get; set; }
        public string DepartmentName { get; set; }
        public string BranchName { get; set; }
        public int BranchId { get; set; }
        public string LeaveType { get; set; }
        public string LastLeaveInfo { get; set; }
        public string Remarks { get; set; }
    }
}