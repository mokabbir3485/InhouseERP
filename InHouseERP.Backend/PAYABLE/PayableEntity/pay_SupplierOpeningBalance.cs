using System;

namespace PayableEntity
{
    public class pay_SupplierOpeningBalance
    {
        public long OpeningBalanceId { get; set; }
        //public string OpeningBalanceNo { get; set; }
        public int FiscalYearId { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public DateTime? OpeningDate { get; set; }
        public string FiscalYearName { get; set; }
        public decimal Amount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalPayableAmount { get; set; }
        public int UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
       
    }
}