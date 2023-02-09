namespace InventoryEntity
{
    public class inv_StockDeclarationDetail
    {
        public long DeclarationDetailId { get; set; }
        public long DeclarationId { get; set; }
        public int ItemId { get; set; }
        public int DeclarationUnitId { get; set; }
        public decimal DeclarationQuantity { get; set; }
        public decimal DeclarationUnitPrice { get; set; }
        public int DeclarationTypeId { get; set; }
        public string ItemName { get; set; }
        public string DeclarationUnitName { get; set; }
        public string TempItemName { get; set; }
        public string ItemCode { get; set; }
        public int UnitId { get; set; }
        public int PackageId { get; set; }
        public int ContainerId { get; set; }
        public decimal StockQty { get; set; }
        public decimal PrvDeclarationQuantity { get; set; }
        public decimal UnitPerPackage { get; set; }
    }
}