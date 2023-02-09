using System;

namespace InventoryEntity
{
    public class inv_StockDeliveryDetail
    {
        public long DeliveryDetailId { get; set; }
        public long SalesOrderDetailId { get; set; }
        public long DeliveryId { get; set; }
        public long ItemId { get; set; }
        public int DeliveryUnitId { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal DeliveryQuantity { get; set; }
        public decimal DeliveryQuantityInPcs { get; set; }
        public decimal DeliveryUnitPrice { get; set; }
        public decimal OrderPriceBDT { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string Combination { get; set; }
        public string DeliveryUnitName { get; set; }
        public string ItemCode { get; set; }
        public int UnitId { get; set; }
        public int PackageId { get; set; }
        public int ContainerId { get; set; }
        public int CategoryId { get; set; }
        public bool IsLastDelivery { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string SubCategoryName { get; set; }
        public int SubCategoryId { get; set; }
        public string MaterialTypeName { get; set; }
        public string MaterialTypeCode { get; set; }
        public string LabelBrandName { get; set; }


        public bool IsConversionRate { get; set; }
        public decimal ConversionRate { get; set; }
        public string RollDirection { get; set; }
        public string Ups { get; set; }
        public decimal VatPercentage { get; set; }
        public decimal VatAmount { get; set; }
        public decimal ItemAmount { get; set; }
        public decimal ItemAmountBDT { get; set; }
        public Int64 SalesOrderId { get; set; }
        //public bool IsCPT { get; set; }
        //public decimal CPTCost { get; set; }
        //public decimal CPTCostBDT { get; set; }
    }
}