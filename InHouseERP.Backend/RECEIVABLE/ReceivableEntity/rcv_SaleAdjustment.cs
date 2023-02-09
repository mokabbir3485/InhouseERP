using System;

namespace ReceivableEntity
{
    public class rcv_SaleAdjustment
    {
        public long AdjustmentId { get; set; }
        public int FinancialCycleId { get; set; }
        public long SalesOrderId { get; set; }
        public int AdjustmentTypeId { get; set; }
        public DateTime AdjustmentDate { get; set; }
        public decimal Amount { get; set; }
        public string VoucherNo { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}