using System;


namespace InventoryEntity
{
    public class proc_SupplierItem
    {
        public int ItemId { get; set; }
        public int MaterialTypeId { get; set; }
        public int SupplierId { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string SupplierName { get; set; }
    }
}
