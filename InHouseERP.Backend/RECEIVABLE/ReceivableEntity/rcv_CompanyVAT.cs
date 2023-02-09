using DbExecutor;
using System;


namespace ReceivableEntity
{
    public class rcv_CompanyVAT
    {
        public int CompanyId { get; set; }
        public long SalesInvoiceId { get; set; }
        public string CompanyName { get; set; }
        public string SalesInvoiceNo { get; set; }
        public string PaidFor { get; set; }
        public DateTime? SalesInvoiceDate { get; set; }
        public decimal VAT { get; set; }
        public decimal AIT { get; set; }
        public decimal BillAmount { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal AITAmount { get; set; }
        public decimal VATAmount { get; set; }
        public bool isVDS { get; set; }

        public int TrChallanId { get; set; }
        public string TrChallanNo { get; set; }
        public DateTime TrChallanDate { get; set; }
        public string ChallanNo { get; set; }
        public DateTime ChallanDate { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime ? ChequeDate  { get; set; }
        public string Submitted_Bank { get; set; }
        public string Bank_District { get; set; }
        public string Bank_Branch { get; set; }
        public string CodeNo { get; set; }
        public string ChequeNo { get; set; }
        public string TransactionNo { get; set; }
        public string MobileNo { get; set; }
        public string MoneyReceiptNo { get; set; }
        public int SubmittedBy { get; set; }
        public string SubmittedTo { get; set; }
        public string Remarks { get; set; }
        public string TotalVATAmountInWords { get; set; }
        public string PaymentTypeName { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyPhone { get; set; }
        public string CompanyETIN { get; set; }
        public string CompanyBIN { get; set; }
        public string EmployeeName { get; set; }
        public string DesignationName { get; set; }
        public string ContactNo { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationAddress { get; set; }
        public string OrganizationTIN { get; set; }
        public decimal TotalVATAmount { get; set; }
        public int PayerBankAccountId { get; set; }
        public int PaymentTypeId { get; set; }
        public int ChequeTypeId { get; set; }
        public int MobileBankingServiceId { get; set; }




        public int TrChallanDetailId { get; set; }


        public int CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int UpdatorId { get; set; }
    }
}
