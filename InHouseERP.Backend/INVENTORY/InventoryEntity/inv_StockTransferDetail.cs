using System;

namespace InventoryEntity
{
    public class inv_StockTransferDetail
    {
        public long StockTransferDetailId { get; set; }
        public long StockTransferId { get; set; }
        public long ItemId { get; set; }
        public int ItemUnitId { get; set; }
        public decimal CurrentQuantity { get; set; }
        public int IssuedQuantity { get; set; }
        public decimal TransferQuantity { get; set; }
        public decimal IssuedPrice { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal PackageWeight { get; set; }
        public int FromStore { get; set; }
        public int ToStore { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string LabelBrandName { get; set; }
        public decimal IssuedJumboWidth { get; set; }
        public decimal TransferJumboWidth { get; set; }
        public Int32 SubCategoryId { get; set; }
        public Int32 CategoryId { get; set; }
        public Int64 ProductionDetailId { get; set; }
        public Int32 ExceedOrShortage { get; set; }
        public int PaperTypeId { get; set; }
        public int To_ItemId { get; set; }
        public int To_MaterialTypeId { get; set; }
        public int To_LabelBrandId { get; set; }
     




    }
}