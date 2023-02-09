using System;

namespace ExportEntity
{
    public class exp_PackingInfo
    {
        public long PackingInfoId { get; set; }
        public long InvoiceId { get; set; }
        public int TotalCarton { get; set; }
        public decimal LabelNetWeight { get; set; }
        public decimal LabelGrossWeight { get; set; }
        public decimal RibonNetWeight { get; set; }
        public decimal RibonGrossWeight { get; set; }
        public string CartonMeasurement { get; set; }
        public string PortOfLoading { get; set; }
        public string PortOfDischarge { get; set; }
        public string FinalDestination { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string CommercialInvoiceNo { get; set; }
    }
}