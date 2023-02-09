namespace ExportEntity
{
    public class exp_Item
    {
        public int ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string BuyerName { get; set; }
        public string ReferenceNo { get; set; }
        public decimal OrderQty { get; set; }
        public decimal OrderPrice { get; set; }
        public string ItemDescription { get; set; }
        public string ContainerSize { get; set; }
        public bool IsActive { get; set; }
        public decimal PackageWeight { get; set; }
        public decimal PackagePerContainer { get; set; }
        public decimal ContainerWeight { get; set; }
        public decimal UnitPerPackage { get; set; }
        public int OrderUnitId { get; set; }
        public int SubCategoryId { get; set; }
        public decimal Amount { get; set; }
        public string HsCode { get; set; }
    }
}