using System;
using System.Collections.Generic;
using DbExecutor;

namespace InventoryEntity
{
    public class inv_StockOpeningQuantity
    {
        public long StockOpeningQtyId { get; set; }
        public string DepartmentName { get; set; }
       // public string CategoryName { get; set; }
       // public string SubCategoryName { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public string ItemDescription { get; set; }
        public string ItemCode { get; set; }
       // public string OpeningUnitName { get; set; }
        public decimal PcQty { get; set; }
        public string UnitName { get; set; }
        public string MaterialTypeCode { get; set; }
        public string MaterialTypeName { get; set; }
        public decimal RollQty { get; set; }
        public decimal CartonQty { get; set; }
        public decimal UnitPrice { get; set; }
        public int DepartmentId { get; set; }
        public int ItemId { get; set; }
        public int UnitId { get; set; }
        public int UpdatorId { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string LabelBrandName { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public bool IsWarrantyAndSerial { get; set; }
        public bool NoSerial { get; set; }
        public DateTime OpeningDate { get; set; }
        public string SerialNo { get; set; }

        public List <OpeningWarrentyAndSerialNoList> WarrentyAndSerialNoList { get; set; }
    }

    public class OpeningWarrentyAndSerialNoList
    {
        public int WarrentyInDays { get; set; }
        public string SerialNo { get; set; }
        public int DepartmentId { get; set; }
        public long ItemId { get; set; }
        public long StockOpeningQtyId { get; set; }
        public long DeliveryDetailId { get; set; }
        public long HardwareOpeningDetailId { get; set; }
    }
}