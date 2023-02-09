using System;

namespace PayableEntity
{
    public class pay_SupplierAdvance
    {
      
        public long AdvanceId { get; set; }
        public long SupplierId { get; set; }
        public string SupplierName { get; set; }
        public decimal AdvanceAmount { get; set; }
        public DateTime AdvanceDate { get; set; }
        public int PaymentSectorId { get; set; }
        public int BankAccountId { get; set; }
        public int SupplierBankAccountId { get; set; }
        public int PayerBankAccountId { get; set; }
        public int MobileBankingServiceId { get; set; }
        public string TransactionNo { get; set; }
        public int PaymentTypeId { get; set; }
        public string PaymentTypeName { get; set; }
        public string ChequeNo { get; set; }
        public int ChequeTypeId { get; set; }
        public DateTime? ChequeDate { get; set; }
        public int CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string MobileNo { get; set; }
        public string MoneyReceiptNo { get; set; }
        public string PaymentVoucherNo { get; set; }
        public string AdvancePaymentNo { get; set; }
        public string Remarks { get; set; }
        public string SectorName { get; set; }
    }
}