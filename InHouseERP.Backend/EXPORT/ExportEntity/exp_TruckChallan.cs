using System;

namespace ExportEntity
{
    public class exp_TruckChallan
    {
        public long TruckChallanId { get; set; }
        public long CommercialInvoiceId { get; set; }
        public string CommercialInvoiceNo { get; set; }
        public string CompanyNameWithCINo { get; set; }
        public DateTime? CommercialInvoiceDate { get; set; }
        public string CompanyNameBilling { get; set; }
        public string TruckNo { get; set; }
        public string Footers { get; set; }
        public int Sort { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}