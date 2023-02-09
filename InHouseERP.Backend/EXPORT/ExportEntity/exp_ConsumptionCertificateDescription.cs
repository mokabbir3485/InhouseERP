using System;

namespace ExportEntity
{
    public class exp_ConsumptionCertificateDescription
    {
        public long ConsumptionCertificateDescriptionId { get; set; }
        public long ConsumptionCertificateId { get; set; }
        public string ItemName { get; set; }
        public string QtyDescription { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Amount { get; set; }
        public int UpdatedBy { get; set; }
        public int ItemId { get; set; }
        public int SubCategoryId { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}