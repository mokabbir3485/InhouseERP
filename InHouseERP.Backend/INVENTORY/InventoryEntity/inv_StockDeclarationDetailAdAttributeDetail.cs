namespace InventoryEntity
{
    public class inv_StockDeclarationDetailAdAttributeDetail
    {
        public long DeclarationDetailAdAttDetailId { get; set; }
        public long DeclarationDetailAdAttId { get; set; }
        public int ItemAddAttId { get; set; }
        public string AttributeValue { get; set; }
        public int AttributeId { get; set; }
        public string AttributeName { get; set; }
        public bool IsStockMaintain { get; set; }
    }
}