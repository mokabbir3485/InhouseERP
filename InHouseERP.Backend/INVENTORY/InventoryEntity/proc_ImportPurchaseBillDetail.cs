using System;

namespace InventoryEntity
{
    public class proc_ImportPurchaseBillDetail
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
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal Amount { get; set; }
        public decimal BilledQty { get; set; }
        public decimal POQuantity { get; set; }
        public decimal Charge { get; set; }
        public decimal DiscountAmount { get; set; }
        public int WarrentyInDays { get; set; }
        public bool NoSerial { get; set; }


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
        public decimal BillTotal { get; set; }
        public decimal AdditionDiscount { get; set; }

        public decimal TotalCostAfterDiscount { get; set; }
        public decimal RollWidthInMeter { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal PackageWeight { get; set; }
        public bool Islocal { get; set; }
      
        public string CategoryName { get; set; }
        public decimal PerUnitPrice { get; set; }
        public decimal PBIncludePrice { get; set; }
        public decimal IssuedWidth { get; set; }
        public decimal FinalUnitPrice { get; set; }
        public Int32 MaterialTypeId { get; set; }
        public string MaterialTypeName { get; set; }

        // New Entity Added

        public string ItemDescription { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal RollPerCarton { get; set; }
        public decimal UnitPerCarton { get; set; }
        public decimal RollWeight { get; set; }
        public decimal CartonWeight { get; set; }
        public string CartonSize { get; set; }
        public decimal UnitPrice { get; set; }

        public decimal Qty { get; set; }

        public int BranchId { get; set; }
        public decimal TotalPriceInBDT { get; set; }

        public int CurrencyId { get; set; }

       // public decimal ConversionRate { get; set; }


    }
}