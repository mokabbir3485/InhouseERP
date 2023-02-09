using System;

namespace ExportEntity
{
    public class exp_ConsumptionCertificateRawMaterials
    {
        public long ConsumptionCertificateRawMaterialsId { get; set; }
        public long ConsumptionCertificateId { get; set; }
        public string ImportBondNo { get; set; }
        public decimal PreviousBalance { get; set; }
        public decimal ExportQty { get; set; }
        public decimal ClosingBalance { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}