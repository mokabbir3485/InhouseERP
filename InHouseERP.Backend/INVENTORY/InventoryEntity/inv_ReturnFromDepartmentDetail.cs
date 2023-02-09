namespace InventoryEntity
{
    public class inv_ReturnFromDepartmentDetail
    {
        public long ReturnDetailId { get; set; }
        public long ReturnId { get; set; }
        public int ItemId { get; set; }
        public int ReturnUnitId { get; set; }
        public decimal ReturnQuantity { get; set; }
        public decimal ReturnUnitPrice { get; set; }
        public int ReturnReasonId { get; set; }
        public string ItemName { get; set; }
        public string ReturnUnitName { get; set; }
        public string ReturnReasonName { get; set; }
    }
}