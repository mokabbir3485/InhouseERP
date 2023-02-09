namespace InventoryEntity
{
    public class inv_StockIssueDetailAdAttribute
    {
        public long IssueDetailAdAttId { get; set; }
        public long IssueDetailId { get; set; }
        public long ItemAddAttId { get; set; }
        public decimal AttributeQty { get; set; }
        public string Barcode { get; set; }
        public string Combination { get; set; }
        public int ItemId { get; set; }
        public decimal CurrentQuantity { get; set; }
        public decimal ValuationPrice { get; set; }
    }
}