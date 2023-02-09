using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity
{
    public class ad_AdvanceToEmployee
    {
        public long AdvancePaymentId { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string AdvancePaymentNo { get; set; }
        public DateTime AdvancePaymentDate { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal PaidAmount { get; set; }
        public string PaymentTypeName { get; set; }
        public int PaymentTypeId { get; set; }
        public int PaymentSubTypeId { get; set; }
        public string ChequeType { get; set; }
        public Int32 ChequeTypeId { get; set; }
        public string ChequeNo { get; set; }
        public DateTime? ChequeDate { get; set; }
        public int ReceiverBankAccountId { get; set; }
        public int PayerBankAccountId { get; set; }
        public string PayerBankAccountName { get; set; }
        public string ReceiverBankAccountName { get; set; }
        public string MobileNo { get; set; }
        public string TransactionNo { get; set; }
        public string PaymentVoucherNo { get; set; }
        public string MoneyReceiptNo { get; set; }
        public string Remarks { get; set; }
        public string MobileBankingServiceName { get; set; }
        public Int32 MobileBankingServiceId { get; set; }
        public Int32 UpdatorId { get; set; }
    }
}
