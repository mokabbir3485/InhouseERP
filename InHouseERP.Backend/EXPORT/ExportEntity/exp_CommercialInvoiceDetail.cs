namespace ExportEntity
{
    public class exp_CommercialInvoiceDetail
    {
        public long CommercialInvoiceDetailId { get; set; }
        public long CommercialInvoiceId { get; set; }
        public long InvoiceId { get; set; }
        public long InvoiceDetailId { get; set; }
        public int ItemId { get; set; }
        public int MaterialTypeId { get; set; }
        public int OrderUnitId { get; set; }
        public string DescriptionOne { get; set; }
        public bool IsDescriptionOverride { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Amount { get; set; }
        public int HsCodeId { get; set; }
        public string HsCode { get; set; }
        public string ItemDescription { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public string ItemName { get; set; }
        public decimal PackageWeight { get; set; }
        public decimal PackagePerContainer { get; set; }
        public decimal ContainerWeight { get; set; }
        public string ContainerSize { get; set; }
        public int UnitId { get; set; }
        public decimal UnitPerPackage { get; set; }

        public decimal PcPerRoll { get; set; }
        public decimal RollPerCarton { get; set; }
        public decimal UnitPerCarton { get; set; }
        public decimal RollWeight { get; set; }
        public decimal CartonWeight { get; set; }
        public string CartonSize { get; set; }

        public long SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public int IdenticalFlag { get; set; }
    }
}