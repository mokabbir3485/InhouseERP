namespace InventoryEntity
{
    public class inv_BillOfMaterialOverhead
    {
        public long BOMOverheadId { get; set; }
        public long? BOMId { get; set; }
        public string SectorName { get; set; }
        public decimal? Amount { get; set; }
        public string SectorType { get; set; }
    }
}