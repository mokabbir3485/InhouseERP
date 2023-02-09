using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.POS.PosEntity
{
   public class pos_InvoicePayment
    {
      
        public Int64 InvoicePaymentId { get; set; }
        public int CompanyId { get; set; }
        public int PaymentTypeId { get; set; }
        public int ChequeTypeId { get; set; }
        public DateTime ? PaymentDate { get; set; }
        public string  ChequeNo { get; set; }
        public DateTime ? ChequeDate { get; set; }
        public DateTime  UpdatedDate { get; set; }
        public int BankAccountId { get; set; }
        public int CustomerBankAccountId { get; set; }
        public int ReceiverBankAccountId { get; set; }
        public int UpdatorId { get; set; }
        public int MobileBankingServiceId { get; set; }
        public string MobileNo { get; set; }
        public string TransactionNo { get; set; }
        public string ReceiptVoucherNo { get; set; }
        public string MoneyReceiptNo { get; set; }
        public string Remarks { get; set; }
        public int CurrencyId { get; set; }
        public decimal ConversionRate { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal ConversionAmount { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal TotalAIT { get; set; }
        public Int64 SalesInvoiceId { get; set; }
    }
}
