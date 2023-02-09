namespace ReceivableEntity
{
    public class pay_SupplierLedger
    {
        public long SupplierId { get; set; }
        public string SupplierName { get; set; }
        public decimal TotalDues { get; set; }
        public decimal OpeningBalance { get; set; }
        public decimal Dues { get; set; }

        public decimal Adjustment { get; set; }
        public decimal NetPayable { get; set; }
        public decimal cash { get; set; }
        public decimal bank { get; set; }
        public decimal others { get; set; }
        public decimal vat { get; set; }
        public decimal ait { get; set; }
        public decimal RealizedAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal AdvanceAmount { get; set; }
        public decimal AdvanceAdjusted { get; set; }
        public decimal AdvanceBalance { get; set; }
        public decimal RefundAmount { get; set; }
        public decimal Closing { get; set; }
    }
}