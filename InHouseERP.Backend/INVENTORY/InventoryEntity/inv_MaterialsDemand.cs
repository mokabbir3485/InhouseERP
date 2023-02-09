using System;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class inv_MaterialsDemand
    {
        public Int64 MaterialsDemandId { get; set; }
        public string MaterialsDemandNo { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public int DemandFromDeptId { get; set; }
        public string FromDepartmentName { get; set; }
        public int DemandToDeptId { get; set; }
        public string ToDepartmentName { get; set; }
        public int PreparedById { get; set; }
        public string PreparedByName { get; set; }
        public DateTime DemandDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string Remarks { get; set; }
        public string Status { get; set; }
        public bool IsApproved { get; set; }
        public int ApprovedBy { get; set; }
        public int CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public DateTime? ApprovedDate { get; set; }
    }
}
