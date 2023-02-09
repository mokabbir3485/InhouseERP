using System;

namespace InventoryEntity
{
    public class xrpt_inv_PurchaseBillReport
    {
        public long PBDetailId { get; set; }
        public long PBId { get; set; }
        public long ItemId { get; set; }
        public string Description { get; set; }
        public int PBUnitId { get; set; }
        public decimal PBQty { get; set; }
        public decimal PBPrice { get; set; }
        public string ItemName { get; set; }
        public string UnitName { get; set; }
        public string ItemCode { get; set; }
        public int UnitId { get; set; }
        public int PackageId { get; set; }
        public int ContainerId { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal Amount { get; set; }
        public decimal BilledQty { get; set; }
        public decimal POQuantity { get; set; }
        public decimal Charge { get; set; }
        public decimal DiscountAmount { get; set; }
        public int WarrentyInDays { get; set; }


        public int HsCodeId { get; set; }
        public string CdPercentage { get; set; }
        public decimal CdAmount { get; set; }
        public string RdPercentage { get; set; }
        public decimal RdAmount { get; set; }
        public string SdPercentage { get; set; }
        public decimal SdAmount { get; set; }
        public string VatPercentage { get; set; }
        public decimal VatAmount { get; set; }

        public string AitPercentage { get; set; }
        public decimal AitAmount { get; set; }
        public string AtPercentage { get; set; }
        public decimal AtAmount { get; set; }
        public string TtiPercentage { get; set; }
        public decimal TtiAmount { get; set; }

        public decimal CurrentStock { get; set; }
        public string CurrencyType { get; set; }
        public decimal ConversionRate { get; set; }
        public decimal TotalConversion { get; set; }
        public decimal TotalCost { get; set; }
        public string BillTotal { get; set; }
        public decimal AdditionDiscount { get; set; }

        public decimal TotalCostAfterDiscount { get; set; }
        public decimal RollWidthInMeter { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal PackageWeight { get; set; }
        public bool Islocal { get; set; }
        public int MaterialTypeId { get; set; }
        public string MaterialTypeName { get; set; }
        public decimal PerUnitPrice { get; set; }
        public decimal PBIncludePrice { get; set; }
        public decimal IssuedWidth { get; set; }
        public decimal FinalUnitPrice { get; set; }

        public long POId { get; set; }
        public string PONo { get; set; }
        public string PBNo { get; set; }
        public DateTime PBDate { get; set; }
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

        public decimal TotalDue { get; set; }

        public string Port { get; set; }
        public string NID { get; set; }
        public string Address { get; set; }
        public bool isRawMaterials { get; set; }
        public bool isVDS { get; set; }
        public string ChallanNo { get; set; }
        public string Combination { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaperTypeName { get; set; }
        public string BranchAddress { get; set; }
        public decimal TotalAditionalAmountAfterDiscount { get; set; }

        public string BranchName { get; set; }
        public decimal UnitPrice { get; set; }

        public int BranchId { get; set; }
        public decimal TotalPriceInBDT { get; set; }

        public int CurrencyId { get; set; }
        public decimal Qty { get; set; }


       
  
 

    }
}