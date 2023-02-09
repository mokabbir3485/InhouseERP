using System;
using DbExecutor;

namespace InventoryEntity
{
    public class inv_StockReceiveDashboard : IEntityBase
    {
        public long SRId { get; set; }
        public long? PBId { get; set; }
        public string PONo { get; set; }
        public string PBNo { get; set; }
        public DateTime PBDate { get; set; }
        public string ReceiveNo { get; set; }
        public string ChallanNo { get; set; }
        public string LotNo { get; set; }
        public DateTime ReceiveDate { get; set; }
        public int DepartmentId { get; set; }
        public long SupplierId { get; set; }
        public int ReceivedById { get; set; }
        public int PreparedById { get; set; }
        public string PreparedBy { get; set; }
        public string PBType { get; set; }
        public string Remarks { get; set; }
        public string DepartmentName { get; set; }
        public string SupplierName { get; set; }
        public string Description { get; set; }
        public int ItemId { get; set; }
        public string MaterialTypeCode { get; set; }
        public string UnitName { get; set; }
        public decimal SRQuantity { get; set; }
        public decimal SRUnitPrice { get; set; }
        public string ReceivedBy { get; set; }
        public bool IsApproved { get; set; }
        public int ApprovedBy { get; set; }
        public DateTime ApprovedDate { get; set; }
        public decimal TotalReceiveQty { get; set; }
        public bool? IsLocalPurchase { get; set; }
        public bool? IsLocal { get; set; }
        public bool IsCancelled { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
