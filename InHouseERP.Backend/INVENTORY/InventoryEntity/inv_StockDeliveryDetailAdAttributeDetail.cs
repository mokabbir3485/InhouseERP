namespace InventoryEntity
{
    public class inv_StockDeliveryDetailAdAttributeDetail
    {
        public long DeliveryDetailAdAttDetailId { get; set; }
        public long DeliveryDetailAdAttId { get; set; }
        public int ItemAddAttId { get; set; }
        public string AttributeValue { get; set; }
        public int AttributeId { get; set; }
        public string AttributeName { get; set; }
        public bool IsStockMaintain { get; set; }
    }
}