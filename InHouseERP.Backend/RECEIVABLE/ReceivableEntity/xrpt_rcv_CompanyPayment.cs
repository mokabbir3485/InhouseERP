using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableEntity
{
   public class xrpt_rcv_CompanyPayment
    {
        public bool CompanyType { get; set; }
        public int CompanyId { get; set; }
        public Int64 SalesInvoiceId { get; set; }
        public Int64 CIOrSalesInvoiceId { get; set; }
        public string InvoiceNo { get; set; }
        public Int64 InvoiceId { get; set; }
        public string CompanyName { get; set; }
        public string Remarks { get; set; }
    
        public decimal ReceivableAmount { get; set; }

        public decimal ActualAmount { get; set; }

        public Int64 CompanyPaymentId { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime? ChequeDate { get; set; }
        public Int32 BankAccountId { get; set; }
        public string BankName { get; set; }
        public Int32 UpdatorId { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsCheque { get; set; }
        public string ChequeType { get; set; }
        public string PaymentTypeName { get; set; }
        public string ChequeNo { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal TotalAIT { get; set; }
        public Int32 PaymentTypeId { get; set; }

        public Int64 CompanyPaymentDetailId { get; set; }
    
        public bool IsLocalSale { get; set; }
        public bool IsOpeningPayment { get; set; }
       
        public decimal VAT { get; set; }
        public decimal AIT { get; set; }
    
        public string PaymentGroupName { get; set; }
        public decimal ConversionAmount { get; set; }
        public decimal ConversionRate { get; set; }
        public string CurrencyShort { get; set; }
        public int CurrencyId { get; set; }
        public string SalesInvoiceNo { get; set; }

        public Int32 ReceiverBankAccountId { get; set; }
        public Int32 CustomerBankAccountId { get; set; }
        public Int32 ChequeTypeId { get; set; }
        public string MoneyReceiptNo { get; set; }
        public string ChequeTypeName { get; set; }
        public string TransactionNo { get; set; }
        public string MobileNo { get; set; }
        public Int32 MobileBankingServiceId { get; set; }
        public string MobileBankingServiceName { get; set; }
        public decimal OnAccountAmount { get; set; }
        public decimal AdvanceAmount { get; set; }
        public string ReceiptVoucherNo { get; set; }
        public decimal OpeningAmount { get; set; }
        public string FromBranch { get; set; }
        public string ManualInvoiceNo { get; set; }

        public string BankAccountName { get; set; }
        public string ReceiverBankAccount { get; set; }
        public string CustomerBankAccount { get; set; }

        public decimal AdditionalCost { get; set; }
        public string CompanyPaymentNo { get; set; }

    }
}
