using System;
using DbExecutor;

namespace SecurityEntity
{
    public class s_User : IEntityBase
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int EmployeeId { get; set; }
        public string Username { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public bool IsReqSmsCode { get; set; }
        public string SmsMobileNo { get; set; }
        public string AuthorizationPassword { get; set; }
        public bool IsActive { get; set; }
        public string RoleName { get; set; }
        public string Status { get; set; }
        public string FullName { get; set; }
        public bool IsCheckoutOperator { get; set; }
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
        public int BranchId { get; set; }
        public int DepartmentId { get; set; }
        public int SectionId { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}