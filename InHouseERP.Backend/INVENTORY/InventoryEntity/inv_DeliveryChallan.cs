using System;

namespace InventoryEntity
{
    public class inv_DeliveryChallan
    {
        public long DeliveryDetailId { get; set; }
        public long DeliveryId { get; set; }
        public decimal DeliveryUnitPrice { get; set; }
        public decimal DeliveryQuantity { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalAmt { get; set; }
        public decimal TotalQty { get; set; }
        public decimal PcPerRoll { get; set; }
        public int SubCategoryId { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string DeliveryNo { get; set; }
        public string ReferenceNo { get; set; }
        public string ReferenceDate { get; set; }
        public string SalesOrderNo { get; set; }
        public DateTime SalesOrderDate { get; set; }
        public string ItemName { get; set; }
        public string Combination { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string DeliveryFromAddress { get; set; }

        public string QtySummary { get; set; }
        public string DeliveryQuantityString { get; set; }
        public string Remarks { get; set; }

        public Int32 MaterialTypeId { get; set; }
        public string MaterialTypeName { get; set; }
        public string MaterialTypeCode { get; set; }
        public string LabelBrandName { get; set; }
        public int LabelBrandId { get; set; }
    }
}