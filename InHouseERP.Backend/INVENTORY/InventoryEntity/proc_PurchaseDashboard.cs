using System;

namespace InventoryEntity
{
    public class proc_PurchaseDashboard
    {
        public Int64 PBId { get; set; }
        public Int64 PBDetailId { get; set; }
        public string PBNo { get; set; }
        public bool IsLocal { get; set; }
        public string PBType { get; set; }
        public DateTime PBDate { get; set; }
        public int UnitId { get; set; }
        public int CategoryId { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string Size { get; set; }
        public string MaterialTypeCode { get; set; }
        public string UnitName { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Qty { get; set; }
        public decimal Amount { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string DepartmentName { get; set; }




    }
}
