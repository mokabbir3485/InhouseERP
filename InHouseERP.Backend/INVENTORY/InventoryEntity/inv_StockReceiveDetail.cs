namespace InventoryEntity
{
    public class inv_StockReceiveDetail
    {
        public long SRDetailId { get; set; }
        public long SRId { get; set; }
        public int ItemId { get; set; }
        public int SRUnitId { get; set; }
        public decimal SRQuantity { get; set; }
        public int FreeUnitId { get; set; }
        public decimal FreeQty { get; set; }
        public decimal SRUnitPrice { get; set; }
        public string ItemName { get; set; }
        public string SRUnitName { get; set; }
        public string FreeUnitName { get; set; }
        public decimal RollWidthInMeter { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal PackageWeight { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal RollPerCarton { get; set; }
        public decimal UnitPerCarton { get; set; }
        public decimal CartonWeight { get; set; }
        public int CategoryId { get; set; }
        public int PaperTypeId { get; set; }
        public int SubCategoryId { get; set; }
        public int MaterialTypeId { get; set; }
        public int HsCodeId { get; set; }
        public string ItemDescription { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public string CartonSize { get; set; }
        public long PBDetailId { get; set; }


    }
}