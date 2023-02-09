using System;

namespace SecurityEntity
{
    public class s_UserDepartment
    {
        public int UserDepartmentId { get; set; }
        public int UserId { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public DateTime OpeningDate { get; set; }
    }
}