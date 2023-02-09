using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.POS.PosEntity
{
    public class pos_SalesInvoiceDetail
    {
        public long SalesInvoiceDetailId { get; set; }
        public long SalesInvoiceId { get; set; }
        public long DeliveryDetailId { get; set; }
        public Int32 SalesOrderDetailId { get; set; }
        public long ItemId { get; set; }
        public int ItemUnitId { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemCode { get; set; }
        public string QtySummary { get; set; }
        public string AmountInWords { get; set; }
        public string Remarks { get; set; }
        public int DeliveryUnitId { get; set; }
        public decimal DeliveryQuantity { get; set; }
        public decimal OrderQty { get; set; }
        public decimal OrderPrice { get; set; }
        public decimal Amount { get; set; }
        public decimal VatAmount { get; set; }
        public decimal VatPercentage { get; set; }
        public decimal AmountExVat { get; set; }
        public int IsVat { get; set; }
        public decimal DeliveryUnitPrice { get; set; }
        public decimal OrderPriceBDT { get; set; }
        public string DeliveryUnitName { get; set; }


        public string SalesInvoiceNo { get; set; }
        public string VatChallanNo { get; set; }
        public DateTime SalesInvoiceDate { get; set; }
        public string SalesOrderNo { get; set; }
        public DateTime SalesOrderDate { get; set; }
        public string DeliveryNo { get; set; }
        public string PORefNo { get; set; }
        public string PORefDate { get; set; }
        public string DeliveryDates { get; set; }

        public int MaterialTypeId { get; set; }
        public int SubCategoryId { get; set; }
        public int CategoryId { get; set; }
        public string MaterialTypeName { get; set; }
        public string MaterialTypeCode { get; set; }
        public decimal PcPerRoll { get; set; }
        public string UnitName { get; set; }
        public string PaymentType { get; set; }
        public string CurrencyShort { get; set; }
        public int CurrencyId { get; set; }
        public decimal ConversionRate { get; set; }


        public long ManualInvoiceDetailId { get; set; }
        public long ManualInvoiceId { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyName { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal UnitPriceBDT { get; set; }
        public decimal Total { get; set; }
        public bool IsExist { get; set; }
        public decimal CPTCost { get; set; }
        public bool IsCPT { get; set; }

        public string SerialNo { get; set; }
        public int WarrentyInDays { get; set; }
        public int LabelBrandId { get; set; }
        public string LabelBrandName { get; set; }


    }
}
