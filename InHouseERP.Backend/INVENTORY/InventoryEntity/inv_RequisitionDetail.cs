namespace InventoryEntity
{
    public class inv_RequisitionDetail
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionId { get; set; }
        public long ItemId { get; set; }
        public int ItemUnitId { get; set; }
        public int RequisitionUnitId { get; set; }
        public decimal RequisitionQuantity { get; set; }
        public int RequisitionPurposeId { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string RequisitionUnitName { get; set; }
        public string RequisitionPurposeName { get; set; }
        public decimal IssuedQuantity { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal PackageWeight { get; set; }
        public long InternalWorkOrderDetailId { get; set; }
        public int PaperTypeId { get; set; }
        public int MaterialTypeId { get; set; }
    }
}