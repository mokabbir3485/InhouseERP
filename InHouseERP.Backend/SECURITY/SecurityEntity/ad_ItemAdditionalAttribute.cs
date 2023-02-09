namespace SecurityEntity
{
    public class ad_ItemAdditionalAttribute
    {
        public int ItemAddAttId { get; set; }
        public int ItemId { get; set; }
        public string Barcode { get; set; }
        public string ItemName { get; set; }
        public bool IsActive { get; set; }
        public string AttributeName { get; set; }
        public int AttributeId { get; set; }
        public string Combination { get; set; }
        public string ItemNameDescription1And2 { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal RollWidthInMeter { get; set; }
        public decimal RollWeightInKg { get; set; }

        public decimal PackageWeight { get; set; }
        public decimal ContainerWeight { get; set; }
        public decimal ContainerSize { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal RollPerCarton { get; set; }
        public decimal RollWeight { get; set; }
        public decimal UnitPerCarton { get; set; }
        public decimal CartonWeight { get; set; }
        public string CartonSize { get; set; }
        public int HsCodeId { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public string ItemCode { get; set; }
        public string HeadCode { get; set; }

        public int SubCategoryId { get; set; }
        public int CategoryId { get; set; }
    




    }
}