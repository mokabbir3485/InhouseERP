using System;
using DbExecutor;

namespace InventoryEntity
{
    public class inv_PurchaseRequisition : IEntityBase
    {
        public long PurchaseRequisitionId { get; set; }
        public string PurchaseRequisitionNo { get; set; }
        public DateTime PurchaseRequisitionDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int FromDepartmentId { get; set; }
        public int ToDepartmentId { get; set; }
        public int PreparedById { get; set; }
        public string Remarks { get; set; }
        public string FromDepartmentName { get; set; }
        public string ToDepartmentName { get; set; }
        public string PreparedBy { get; set; }
        public bool IsSentBack { get; set; }
        public bool IsActive { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}