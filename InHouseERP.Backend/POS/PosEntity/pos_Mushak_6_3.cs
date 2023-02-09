using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PosEntity
{
    public class pos_Mushak_6_3
    {
        public Int64 SalesInvoiceId { get; set; }
        public int CompanyId { get; set; }
        public string SalesInvoiceNo { get; set; }
        public DateTime SalesInvoiceDate { get; set; }
        public string InvoiceTime { get; set; }
        public string CompanyName { get; set; }
        public string CompanyDeliveryAddress { get; set; }
        public string CompanyBIN { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationBIN { get; set; }
        public string OrganizationAddress { get; set; }
        public string ItemDescription { get; set; }
        public decimal DeliveryQuantity { get; set; }
        public decimal DeliveryUnitPrice { get; set; }
        public decimal Amount { get; set; }
        public string UnitName { get; set; }
        public decimal VatPercentage { get; set; }
        public decimal VatAmount { get; set; }
        public decimal SDAmount { get; set; }
        public decimal AmountWithVATAndSD { get; set; }
    }
}
