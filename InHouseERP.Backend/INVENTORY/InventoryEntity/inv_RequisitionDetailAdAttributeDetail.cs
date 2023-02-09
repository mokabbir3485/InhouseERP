namespace InventoryEntity
{
    public class inv_RequisitionDetailAdAttributeDetail
    {
        public long RequisitionDetailAdAttDetailId { get; set; }
        public long RequisitionDetailAdAttId { get; set; }
        public int ItemAddAttId { get; set; }
        public string AttributeValue { get; set; }
        public int AttributeId { get; set; }
        public string AttributeName { get; set; }
        public bool IsStockMaintain { get; set; }
    }
}