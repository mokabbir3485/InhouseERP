using System;
using DbExecutor;

namespace InventoryEntity
{
    public class inv_PurchaseOrder : IEntityBase
    {
        public long POId { get; set; }
        public string PONo { get; set; }
        public string ManualPONo { get; set; }
        public DateTime PODate { get; set; }
        public int SupplierId { get; set; }
        public int SupplierAddressId { get; set; }
        public bool IsLocal { get; set; }
        public int PreparedById { get; set; }
        public string FreightLabel { get; set; }
        public string QuotationNo { get; set; }
        public string PlaceOfDelivery { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public int BranchId { get; set; }
        public int AddressId { get; set; }
        public int MaterialsDemandId { get; set; }
        public string BranchName { get; set; }
        public string Remarks { get; set; }
        public string ContactNo { get; set; }
        public string PreparedByName { get; set; }
        public string SupplierName { get; set; }
        public string TermsAndCondition { get; set; }
        public string AdditionalInfo { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal Amount { get; set; }
        public decimal AdditionalDiscount { get; set; }
        public decimal AmountAfterDiscount { get; set; }
        public bool IsCancelled { get; set; }
        public bool IsApproved { get; set; }
        public bool IsChecked { get; set; }
        public int CheckedBy { get; set; }
        public string CheckedByName { get; set; }
        public string Status { get; set; }
        public DateTime CheckedDate { get; set; }
        public DateTime ApprovedDate { get; set; }
        public int CreatorId { get; set; }
        public int ApprovedBy { get; set; }
        public string ApprovedByName { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}