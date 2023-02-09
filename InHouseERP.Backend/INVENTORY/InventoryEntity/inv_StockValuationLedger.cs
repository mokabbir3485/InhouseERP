using System;

namespace InventoryEntity
{
    public class inv_StockValuationLedger
    {
        public long ValuationLedgerId { get; set; }
        public int DepartmentId { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public long ItemId { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string MaterialTypeName { get; set; }
        public string MaterialTypeCode { get; set; }
        public string LabelBrandName { get; set; }
        public string ItemCode { get; set; }
        public int ItemUnitId { get; set; }
        public string ItemUnitName { get; set; }
        public DateTime LedgerDate { get; set; }
        public decimal InQuantity { get; set; }
        public decimal InPrice { get; set; }
        public decimal OutQuantity { get; set; }
        public decimal OutPrice { get; set; }
        public decimal BalanceQuantity { get; set; }
        public decimal AveragePrice { get; set; }
        public DateTime StatusDate { get; set; }
        public string ItemName { get; set; }
        public string DepartmentName { get; set; }
        public Int32 SubCategoryId { get; set; }
      
    }
}