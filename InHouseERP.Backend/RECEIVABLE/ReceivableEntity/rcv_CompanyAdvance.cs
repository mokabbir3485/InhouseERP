using System;

namespace ReceivableEntity
{
    public class rcv_CompanyAdvance
    {
        public long AdvanceId { get; set; }
        public Int32 CompanyId { get; set; }
        public Int32 PaymentSectorId { get; set; }
        public string CompanyName { get; set; }
        public string SectorName { get; set; }
        public decimal AdvanceAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public DateTime ? AdvanceDate { get; set; }
        public int BankAccountId { get; set; }
        public int ReceiverBankAccountId { get; set; }
        public int CustomerBankAccountId { get; set; }
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
        public string AdvancePaymentNo { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal TotalAIT { get; set; }
        public string JVNo { get; set; }
        public string FromBranch { get; set; }
        public string Remarks { get; set; }
       
     
    }
}