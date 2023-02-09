using System;

namespace PayableEntity
{
    public class pay_SupplierPaymentDetail
    {
        public long SupplierPaymentDetailId { get; set; }
        public long SupplierPaymentId { get; set; }
        public bool IsLocalPurchase { get; set; }
        public bool IsVDS { get; set; }
        public long PBId { get; set; }
        public decimal? PaidAmount { get; set; }
        public decimal? VAT { get; set; }
        public decimal? AIT { get; set; }
        public decimal? PayableAmount { get; set; }
        public decimal? ActualAmount { get; set; }
        public DateTime PBDate { get; set; }
        public string PBNo { get; set; }
    }
}