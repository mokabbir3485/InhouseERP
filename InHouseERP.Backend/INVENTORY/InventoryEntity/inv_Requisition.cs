using System;

namespace InventoryEntity
{
    public class inv_Requisition
    {
        public long RequisitionId { get; set; }
        public long InternalWorkOrderId { get; set; }
        public string RequisitionNo { get; set; }
        public DateTime RequisitionDate { get; set; }
        public int FromDepartmentId { get; set; }
        public int ToDepartmentId { get; set; }
        public int PreparedById { get; set; }
        public string Remarks { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string FromDepartmentName { get; set; }
        public string ToDepartmentName { get; set; }
        public string PreparedBy { get; set; }
        public bool IsSentBack { get; set; }
        public bool IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public bool IsIssued { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public string BranchName { get; set; }
        public bool IsCancelled { get; set; }
    }
}