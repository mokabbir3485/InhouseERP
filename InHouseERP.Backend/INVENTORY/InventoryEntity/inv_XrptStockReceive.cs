using System;

namespace InventoryEntity
{
    public class inv_XrptStockReceive
    {
        public long SRDetailId { get; set; }
        public long SRId { get; set; }
        public int ItemId { get; set; }
        public int SRUnitId { get; set; }
        public decimal SRQuantity { get; set; }
        public int FreeUnitId { get; set; }
        public decimal FreeQty { get; set; }
        public decimal SRUnitPrice { get; set; }
        public string ItemName { get; set; }
        public string SRUnitName { get; set; }
        public string FreeUnitName { get; set; }
        public decimal RollWidthInMeter { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal PackageWeight { get; set; }
        public int MaterialTypeId { get; set; }

        public long PBId { get; set; }
        public string PONo { get; set; }
        public string PBNo { get; set; }
        public string ReceiveNo { get; set; }
        public string ChallanNo { get; set; }
        public string LotNo { get; set; }
        public DateTime ReceiveDate { get; set; }
        public DateTime PBDate { get; set; }
        public int DepartmentId { get; set; }
        public int SupplierId { get; set; }
        public int ReceivedById { get; set; }
        public string Remarks { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string DepartmentName { get; set; }
        public string SupplierName { get; set; }
        public string ReceivedBy { get; set; }
        public bool IsApproved { get; set; }
        public int ApprovedBy { get; set; }
        public DateTime ApprovedDate { get; set; }
        public decimal TotalReceiveQty { get; set; }
        public bool IsLocalPurchase { get; set; }

        public decimal CurrentQuantity { get; set; }
    }
}