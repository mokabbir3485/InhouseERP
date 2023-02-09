using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReceivableEntity
{
    public class rcv_CompanyOpeningBalancePayment
    {
        public long CompanyOpeningBalancePaymentId { get; set; }
        public int CompanyId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string CompanyOpeningPaymentNo { get; set; }
        public string Remarks { get; set; }
        public int PaymentTypeId { get; set; }
        public int ChequeTypeId { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public int BankAccountId { get; set; }
        public int CustomerBankAccountId { get; set; }
        public int ReceiverBankAccountId { get; set; }
        public string ReceiptVoucherNo { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal TotalAIT { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
