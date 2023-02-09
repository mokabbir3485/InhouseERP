namespace InventoryEntity
{
    public class inv_PurchaseOrderDetail
    {
        public long PODetailId { get; set; }
        public long POId { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        //public int HsCodeId { get; set; }
        public int ItemId { get; set; }
        public int MaterialTypeId { get; set; }
        //public decimal Qty { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public string MaterialTypeCode { get; set; }
        public string UnitName { get; set; }
        public string ItemCode { get; set; }
        //public decimal VatPercentage { get; set; }
        public decimal VATPercentage { get; set; }
        //public decimal VatAmount { get; set; }
        public decimal VATAmount { get; set; }
        public decimal Amount { get; set; }
        public int UnitId { get; set; }
        public bool IsVoid { get; set; }


        public string PartCodeNo { get; set; }
        public string RollDirection { get; set; }
        public string CuttingSize { get; set; }
        public decimal CuttingQuantity { get; set; }
        public decimal TotalReels { get; set; }
        public decimal SquareMeter { get; set; }
        public decimal SquareMeterPrice { get; set; }

    }
}