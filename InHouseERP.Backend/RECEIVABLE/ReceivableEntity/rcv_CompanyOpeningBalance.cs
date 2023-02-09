using DbExecutor;
using System;

namespace ReceivableEntity
{
    public class rcv_CompanyOpeningBalance
    {
        public long OpeningBalanceId { get; set; }
        //public string OpeningBalanceNo { get; set; }
        public int FiscalYearId { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public DateTime? OpeningDate { get; set; }
        public string FiscalYearName { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal TotalPayableAmount { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int UpdatorId { get; set; }
    }
}