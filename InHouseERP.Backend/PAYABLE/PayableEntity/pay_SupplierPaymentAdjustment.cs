using System;

namespace PayableEntity
{
    public class pay_SupplierPaymentAdjustment
    {
        public long SPAId { get; set; }
        public long SPADetailId { get; set; }
        public DateTime SPADate { get; set; }
        public long? SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Remarks { get; set; }
        public string SPANo { get; set; }
        public int? JVNo { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsLocalPurchase { get; set; }
        public long PBId { get; set; }
        public decimal? AdjustedAmount { get; set; }
        public decimal PayableAmount { get; set; }
        public decimal ActualAmount { get; set; }
        public DateTime PBDate { get; set; }
        public string PBNo { get; set; }
        public decimal TotalCost { get; set; }
    }
}