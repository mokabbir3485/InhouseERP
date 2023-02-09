namespace InventoryEntity
{
    public class inv_StockAuditDetail
    {
        public long AuditDetailId { get; set; }
        public long AuditId { get; set; }
        public int ItemId { get; set; }
        public int AuditUnitId { get; set; }
        public decimal AuditQuantity { get; set; }
        public decimal SettleQuantity { get; set; }
        public decimal AuditUnitPrice { get; set; }
        public int AuditTypeId { get; set; }
        public string ItemName { get; set; }
        public string AuditUnitName { get; set; }
        public string AuditTypeName { get; set; }
    }
}