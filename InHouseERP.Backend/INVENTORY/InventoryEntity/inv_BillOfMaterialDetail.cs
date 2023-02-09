namespace InventoryEntity
{
    public class inv_BillOfMaterialDetail
    {
        public long BOMDetailId { get; set; }
        public long? BOMId { get; set; }
        public long? ItemId { get; set; }
        public string ItemName { get; set; }
        public string UnitName { get; set; }
        public decimal? Qty { get; set; }
        public int UnitId { get; set; }
        public decimal? WastagePercentage { get; set; }
        public decimal? WastageAmount { get; set; }
        public decimal? TotalProduction { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? TotalValue { get; set; }
    }
}