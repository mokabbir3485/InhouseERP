namespace InventoryEntity
{
    public class inv_StockDeliveryNonSODetail
    {
        public long DeliveryDetailId { get; set; }
        public long DeliveryId { get; set; }
        public string ItemDescription { get; set; }
        public string ItemRemarks { get; set; }
        public decimal DeliveryQuantity { get; set; }
        public decimal? DeliveryUnitPrice { get; set; }
    }
}