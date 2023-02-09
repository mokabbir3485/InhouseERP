namespace InventoryEntity
{
    public class inv_RequisitionDetailAdAttribute
    {
        public long RequisitionDetailAdAttId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long ItemAddAttId { get; set; }
        public string RequisitionPurposeName { get; set; }
        public int RequisitionPurposeId { get; set; }
        public decimal AttributeQty { get; set; }
        public int ItemUnitId { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal PackageWeight { get; set; }
        public long InternalWorkOrderDetailId { get; set; }
    }
}