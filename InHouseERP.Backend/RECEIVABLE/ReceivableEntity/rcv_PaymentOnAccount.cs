using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReceivableEntity
{
    public class rcv_PaymentOnAccount
    {
        public long OnAccountId { get; set; }
        public Int32 CompanyId { get; set; }
        public string CompanyName { get; set; }
        public decimal OnAccountAmount { get; set; }
        public decimal PaymentOnAmount { get; set; }
        public DateTime? OnAccountDate { get; set; }
        public int BankAccountId { get; set; }
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
        public string OnAccountNo { get; set; }
        public string ReceiptVoucherNo { get; set; }
        public bool IsCancelled { get; set; }
    }
}
