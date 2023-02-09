using System;

namespace SecurityEntity
{
    public class s_Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool IsActive { get; set; }
        public bool IsSuperAdmin { get; set; }
        public bool IsCheckoutOperator { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int? UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string Status { get; set; }
    }
}