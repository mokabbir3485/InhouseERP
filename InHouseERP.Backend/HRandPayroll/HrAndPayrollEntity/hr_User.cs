using System;

namespace HrAndPayrollEntity
{
    public class hr_User
    {
        public int HrUserId { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public int RoleId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public int BranchId { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
        public string FullName { get; set; }
        public string RoleName { get; set; }
        public string BranchName { get; set; }
        public int PrioritySequenceId { get; set; }
        public int SerialNumber { get; set; }
    }
}