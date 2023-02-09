using System;

namespace InventoryEntity
{
    public class inv_JumboStockValuationLedger
    {
        public long JumboValuationLedgerId { get; set; }
        public int DepartmentId { get; set; }
        public long ItemId { get; set; }
        public DateTime LedgerDate { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal InWidth { get; set; }
        public decimal InQuantity { get; set; }
        public decimal InPrice { get; set; }
        public decimal OutWidth { get; set; }
        public decimal OutQuantity { get; set; }
        public decimal OutPrice { get; set; }
        public int ItemUnitId { get; set; }
        public decimal BalanceQuantity { get; set; }
        public decimal AveragePrice { get; set; }
        public DateTime StatusDate { get; set; }
        public string ItemName { get; set; }
        public string DepartmentName { get; set; }
    }
}