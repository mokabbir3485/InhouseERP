using System;

namespace ExportEntity
{
    public class exp_CommercialInvoice_PackingInfo
    {
        public long CIPackingInfold { get; set; }
        public long CommercialInvoiceId { get; set; }
        public int TotalCarton { get; set; }
        public decimal LabelNetWeight { get; set; }
        public decimal LabelGrossWeight { get; set; }
        public decimal RibonNetWeight { get; set; }
        public decimal RibonGrossWeight { get; set; }
        public string CartonMeasurement { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}