using System;

namespace ReceivableEntity
{
    public class pay_SupplierPaymentAdjustmentDetail
    {
        public long SPADetailId { get; set; }
        public long? SPAId { get; set; }
        public bool IsLocalPurchase { get; set; }
        public long PBId { get; set; }
        public string PBNo { get; set; }
        public DateTime PBDate { get; set; }
        public decimal? AdjustedAmount { get; set; }
        public decimal? ActualAmount { get; set; }
        public long? SupplierId { get; set; }
    }
}