using System;
using System.Collections.Generic;
using DbExecutor;


namespace InventoryEntity
{
    public class inv_StockAdjustment
    {
        public long StockAdjustmentId { get; set; }
        public DateTime AdjustmentDate { get; set; }
        public string DepartmentName { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public string ItemDescription { get; set; }
        public string ItemCode { get; set; }
        public string Remarks { get; set; }
        public decimal AdjPcQty { get; set; }
        public string UnitName { get; set; }
        public string PaperCode { get; set; }
        public string MaterialTypeName { get; set; }
        public string MaterialTypeCode { get; set; }
        public decimal AdjRollQty { get; set; }
        public decimal CurrentQuantity { get; set; }
        public decimal CartonQty { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal ValuationPrice { get; set; }
        public int DepartmentId { get; set; }
        public int ItemId { get; set; }
        public int ItemUnitId { get; set; }
        public int UpdatorId { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string LabelBrandName { get; set; }
        public bool NoSerial { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public int ReasonId { get; set; }
        public List<AdjustmentWarrentyAndSerialNoList> WarrentyAndSerialNoList { get; set; }
    }

    public class AdjustmentWarrentyAndSerialNoList
    {
        public int WarrentyInDays { get; set; }
        public string SerialNo { get; set; }
        public int DepartmentId { get; set; }
        public long ItemId { get; set; }
        public long StockAdjustmentId { get; set; }
        public long DeliveryDetailId { get; set; }
        public long HardwareOpeningDetailId { get; set; }
        public bool IsInQuantity { get; set; }
    }
}
