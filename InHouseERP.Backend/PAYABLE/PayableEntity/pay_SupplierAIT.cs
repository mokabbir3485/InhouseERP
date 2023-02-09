using System;
using DbExecutor;

namespace PayableEntity
{
    public class pay_SupplierAIT
    {
        public int TDSIssueId { get; set; }
        public string TDSIssueNo { get; set; }
        public DateTime? TDSIssueDate { get; set; }
        public string ChallanNo { get; set; }
        public DateTime? ChallanDate { get; set; }
        public int SubmittedBy { get; set; }
        public string SubmittedTo { get; set; }
        public string Submitted_Bank { get; set; }
        public string Bank_District { get; set; }
        public string Bank_Branch { get; set; }
        public string CodeNo { get; set; }
        public string Remarks { get; set; }
        public decimal TotalAITAmount { get; set; }
        public int PayerBankAccountId { get; set; }
        public int PaymentTypeId { get; set; }
        public int MobileBankingServiceId { get; set; }
        public int ChequeTypeId { get; set; }
        public string ChequeNo { get; set; }
        public DateTime? ChequeDate { get; set; }
        public DateTime PaymentDate { get; set; }
        public string TransactionNo { get; set; }
        public string MobileNo { get; set; }
        public string MoneyReceiptNo { get; set; }
        public int UpdatorId { get; set; }

    }
}
