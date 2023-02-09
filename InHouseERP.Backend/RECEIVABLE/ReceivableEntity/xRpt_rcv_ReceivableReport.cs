using System;


namespace ReceivableEntity
{
    public class xRpt_rcv_ReceivableReport
    {
        public int ReceiverBankAccountId { get; set; }
        public string CompanyPaymentNo { get; set; }
        public string CompanyName { get; set; }
        public string ReceiverBankAccountName { get; set; }
        public string ReceiverBankName { get; set; }
        public string ReceiverBankAccountNo { get; set; }
        public string ReceiverBankBranchName { get; set; }
        public string ReceiverBankBranchAddress { get; set; }
        public string ReceiverBankAccountAddress { get; set; }


        public int CustomerBankAccountId { get; set; }
        public string CustomerBankName { get; set; }
        public string CustomerBankAccountName { get; set; }
        public string CustomerBankAccountNo { get; set; }


        public DateTime PaymentDate { get; set; }
        public decimal ConversionRate { get; set; }
        public decimal ConversionAmount { get; set; }
        public decimal PaidAmount { get; set; }

        public string CurrencyName { get; set; }
        public string PaymentTypeName { get; set; }
        public string ReceiptVoucherNo { get; set; }
        public string TransactionNo { get; set; }
        public string Remarks { get; set; }
    }
}
