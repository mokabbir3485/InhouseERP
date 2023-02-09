using System;

namespace ReceivableEntity
{
    public class rcv_SaleRealization
    {
        public long RealizationId { get; set; }
        public int FinancialCycleId { get; set; }
        public int CompanyId { get; set; }
        public long SalesOrderId { get; set; }
        public int PaymentTypeId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public decimal FromAdvance { get; set; }
        public decimal TDS { get; set; }
        public decimal VDS { get; set; }
        public string VoucherNo { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string ChequeNo { get; set; }
        public DateTime? ChequeDate { get; set; }
        public string ChequeBank { get; set; }
    }
}