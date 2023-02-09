using System;

namespace PayableEntity
{
    public class pay_PurchaseRealization
    {
        public long RealizationId { get; set; }
        public int FinancialCycleId { get; set; }
        public int SupplierId { get; set; }
        public long PBId { get; set; }
        public int PaymentTypeId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public decimal FromAdvance { get; set; }
        public decimal TDS { get; set; }
        public decimal VDS { get; set; }
        public string VoucherNo { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}