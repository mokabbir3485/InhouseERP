using System;
using DbExecutor;

namespace InventoryEntity
{
    public class xrpt_proc_AccessoriesPurchase
    {
        public int PurchaseId { get; set; }
        public string PurchaseNo { get; set; }
        public string ChallanNo { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string SupplierName { get; set; }
        public string SupplierAddress { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string Remarks { get; set; }
        public decimal AdditionalDiscount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal NetTotal { get; set; }
        

        public int PurchaseDetailId { get; set; }
        public string ProductName { get; set; }
        public string UnitName { get; set; }
        public string NetTotalInWords { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Total { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal VatAmount { get; set; }
        public decimal AmountEx { get; set; }
    }
}
