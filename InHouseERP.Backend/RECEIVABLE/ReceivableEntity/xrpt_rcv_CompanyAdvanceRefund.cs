using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReceivableEntity
{
  public class xrpt_rcv_CompanyAdvanceRefund
    {
        public long RefundId { get; set; }
        public int SupplierId { get; set; }
        public int CompanyId { get; set; }
        public string SupplierName { get; set; }
        public DateTime RefundDate { get; set; }
        public int PaymentTypeId { get; set; }
        public bool IsCheque { set; get; }
        public int ChequeTypeId { set; get; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public int BankAccountId { get; set; }
        public int MobileBankingServiceId { get; set; }
        public string TransactionNo { get; set; }
        public string PaymentTypeName { get; set; }
        public string CompanyName { get; set; }
        public string MobileNo { get; set; }
        public decimal RefundAmount { get; set; }
        public string Remarks { get; set; }
        public int CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string AccountName { get; set; }
        public string BankName { get; set; }
        public string MobileBankServiceName { get; set; }
        public decimal AdvanceAmount { get; set; }

        
    }
}
