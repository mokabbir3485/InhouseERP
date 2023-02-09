namespace InventoryEntity
{
    public class inv_StoreWiseItemReorderLevel
    {
        public string DepartmentName { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string UnitName { get; set; }
        public int MinReorderLevel { get; set; }
        public int MaxReorderLevel { get; set; }
        public long ReorderLevelId { get; set; }
        public int DepartmentId { get; set; }
        public int ItemId { get; set; }
        public int ReorderUnitId { get; set; }
        public int UnitId { get; set; }
        public int PackageId { get; set; }
        public int ContainerId { get; set; }
        public decimal StockQty { get; set; }
        public decimal Difference { get; set; }
        public string ItemIds { get; set; }
    }
}