using System;

namespace InventoryEntity
{
    public class inv_LocalPurchaseBill
    {
            
        public long LPBId { get; set; }
        public long PBId { get; set; }
        public long POId { get; set; }
        public string ManualPONo { get; set; }
        public DateTime ? ManualPODate { get; set; }
        public string PBNo { get; set; }
        public DateTime PBDate { get; set; }
        public string MaterialsDemandIds { get; set; }
        public int SupplierId { get; set; }
        public int PreparedById { get; set; }
        public string ShipmentInfo { get; set; }
        public int PriceTypeId { get; set; }
        public string Remarks { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string PreparedBy { get; set; }
        public string SupplierName { get; set; }
        public string PriceTypeName { get; set; }
        public bool IsApproved { get; set; }
        public int ApprovedBy { get; set; }
        public DateTime ApprovedDate { get; set; }
        public string VoucherNo { get; set; }

        public decimal AdditionDiscount { get; set; }
        public string Address { get; set; }
        public bool isRawMaterials { get; set; }
        public bool isVDS { get; set; }
        public string ChallanNo { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalAmountAfterDiscount { get; set; }
        public int OrganizationId { get; set; }
        public int BranchId { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal TotalSD { get; set; }
        public decimal TotalAIT { get; set; }
        public string SupplierDetails { get; set; }
        public int IsReceived { get; set; }
        public bool IsStockable { get; set; }
        public bool IsCancelled { get; set; }
        public string StockableStatus { get; set; }
        public string ReceivedStatus { get; set; }


    }
}