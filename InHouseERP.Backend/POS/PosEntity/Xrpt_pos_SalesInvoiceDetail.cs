using System;

namespace PosEntity
{
    public class Xrpt_pos_SalesInvoiceDetail
    {
        public long SalesInvoiceDetailId { get; set; }
        public string SalesInvoiceNo { get; set; }
        public long SalesInvoiceId { get; set; }
        public long DeliveryDetailId { get; set; }
        public string ItemName { get; set; }
        public long ItemId { get; set; }
        public int DeliveryUnitId { get; set; }
        public decimal DeliveryQuantity { get; set; }
        public decimal DeliveryUnitPrice { get; set; }
        public string DeliveryUnitName { get; set; }
        public int SalesOrderDetailId { get; set; }
        public DateTime? SalesInvoiceDate { get; set; }
        public string SalesOrderNo { get; set; }
        public DateTime? SalesOrderDate { get; set; }
        public string DeliveryNo { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string DeliveryIds { get; set; }

        public string DeliveryDates { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyName { get; set; }
        public string PaymentType { get; set; }
        public decimal Amount { get; set; }
        public string CurrencyShortName { get; set; }
    }
}