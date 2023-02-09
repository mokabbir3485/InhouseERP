using System;

namespace InventoryEntity
{
    public class inv_LocalPurchaseBillDetail
    {
        public long LPBDetailId { get; set; }
        public long LPBId { get; set; }
        public long ItemId { get; set; }
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
        public decimal DiscountAmount { get; set; }

        public decimal POQuantity { get; set; }
        public decimal Charge { get; set; }
        public int WarrentyInDays { get; set; }
        public bool NoSerial { get; set; }
        public int HsCodeId { get; set; }

        public string SdPercentage { get; set; }
        public decimal SdAmount { get; set; }
        public string VatPercentage { get; set; }
        public decimal VatAmount { get; set; }


        public decimal TotalCost { get; set; }
        public decimal TotalAmount { get; set; }

        public string PBQtyString { get; set; }
        public string Combination { get; set; }
        public string PBNo { get; set; }
        public string BillTotal { get; set; }
        public decimal BillQty { get; set; }
        public string GroupName { get; set; }
        public DateTime PBDate { get; set; }
        public string RefNo { get; set; }
        public decimal TotalCostAfterDiscount { get; set; }
        public decimal AdditionDiscount { get; set; }
        public decimal AditionalDiscountAfterAmount { get; set; }
        public decimal RollWidthInMeter { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal PackageWeight { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal PerUnitPrice { get; set; }
        public decimal PBIncludePrice { get; set; }
        public decimal IssuedWidth { get; set; }
        public decimal FinalUnitPrice { get; set; }
        public Int32 PaperTypeId { get; set; }
        public string PaperTypeName { get; set; }
        public int MaterialTypeId { get; set; }
        public string MaterialTypeName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public string CartonSize { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal RollPerCarton { get; set; }
        public decimal UnitPerCarton { get; set; }
        public decimal RollWeight { get; set; }
        public decimal CartonWeight { get; set; }
        public decimal UnitPrice { get; set; }
        public int SubCategoryId { get; set; }
        public string BranchName { get; set; }
        public string SupplierName { get; set; }
        public string BranchAddress { get; set; }
        public decimal Qty { get; set; }
        public string Itemcode { get; set; }

        public decimal AIT_Percentage { get; set; }
        public decimal AIT_Amount { get; set; }




      


     





    }
}