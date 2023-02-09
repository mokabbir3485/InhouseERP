namespace InventoryEntity
{
    public class inv_PurchaseOrderDetailAdAttributeDetail
    {
        public long PODetailAdAttDetailId { get; set; }
        public long PODetailAdAttId { get; set; }
        public int ItemAddAttId { get; set; }
        public string AttributeValue { get; set; }
        public int AttributeId { get; set; }
        public string AttributeName { get; set; }
        public bool IsStockMaintain { get; set; }
    }
}