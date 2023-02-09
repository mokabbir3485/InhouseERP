using System;
using DbExecutor;

namespace InventoryEntity
{
    public class xrpt_inv_PurchaseOrder
    {
        public long POId { get; set; }
        public string PONo { get; set; }
        public string ManualPONo { get; set; }
        public bool IsLocal { get; set; }
        public string FreightLabel { get; set; }
        public DateTime PODate { get; set; }
        public string QuotationNo { get; set; }
        public string MaterialsDemandNo { get; set; }
        public DateTime DemandDate { get; set; }
        public string PlaceOfDelivery { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string Remarks { get; set; }
        public string ContactNo { get; set; }
        public string PreparedByName { get; set; }
        public string SupplierName { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public string SupplierTIN { get; set; }
        public string SupplierBIN { get; set; }
        public string Email { get; set; }
        public string OrganizationBIN { get; set; }
        public string OrganizationName { get; set; }
        public string TermsAndCondition { get; set; }
        public string AdditionalInfo { get; set; }
        public decimal Amount { get; set; }
        public decimal AdditionalDiscount { get; set; }
        public decimal AmountAfterDiscount { get; set; }

        public long PODetailId { get; set; }
        public int ItemId { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public string AmountInWords { get; set; }
        public string MaterialTypeCode { get; set; }
        public string MaterialTypeName { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public string UnitName { get; set; }
        public string ItemCode { get; set; }
        public decimal VATPercentage { get; set; }
        public decimal VATAmount { get; set; }
        public decimal TotalVAT { get; set; }
        public int UnitId { get; set; }
        public int IsVat { get; set; }

        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string ItemName { get; set; }
        public string PartCodeNo { get; set; }
        public string RollDirection { get; set; }
        public string CuttingSize { get; set; }
        public decimal CuttingQuantity { get; set; }
        public decimal TotalReels { get; set; }
        public decimal SquareMeter { get; set; }
        public decimal SquareMeterPrice { get; set; }
        public string ApprovedByName { get; set; }
        public string CheckedByName { get; set; }
    }
}
