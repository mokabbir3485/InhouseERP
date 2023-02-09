using System;

namespace PayableEntity
{
    public class pay_SupplierRefund
    {
        public long RefundId { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public DateTime RefundDate { get; set; }
        public string RefundNo { get; set; }
        public int PaymentTypeId { get; set; }
        public bool IsCheque { set; get; }
        public int ChequeTypeId { set; get; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public int BankAccountId { get; set; }
        public int MobileBankingServiceId { get; set; }
        public string TransactionNo { get; set; }
        public string PaymentTypeName { get; set; }
        public string MobileNo { get; set; }
        public decimal PaidAmount { get; set; }
        public string JVNo { get; set; }
        public string Remarks { get; set; }
        public int CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string PaymentVoucherNo { get; set; }
    }
}