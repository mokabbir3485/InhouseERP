using System;

namespace SecurityEntity
{
    public abstract class BaseDepartment
    {
        public int DepartmentId { get; set; }
        public int BranchId { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentShortName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public DateTime OpeningDate { get; set; }
        public int SerialNo { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
    }
}