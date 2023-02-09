using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_Employee : BaseEmployee, IEntityBase
    {
        public bool IsUser { get; set; }
        public int SectionId { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
        public string Username { get; set; }
        public int RoleId { get; set; }
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string EmployeeName { get; set; }
        public int DepartmentId { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public int ManagerId { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string BloodGroup { get; set; }
        public bool IsFlexibleOnDate { get; set; }
        public bool IsFlexibleOnTime { get; set; }
        public decimal BasicSalary { get; set; }
        public DateTime JoiningDate { get; set; }
        public DateTime? FinishDate { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ExistingShift { get; set; }
        public string UnitName { get; set; }
        public bool IsManagerRef { get; set; }
        public int ContractTypeId { get; set; }
        public int RefEmployeeId { get; set; }
        public string Name { get; set; }
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}