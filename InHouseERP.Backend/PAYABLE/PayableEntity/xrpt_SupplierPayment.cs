using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayableEntity
{
   public class xrpt_SupplierPayment
    {

        public Int64 SupplierPaymentId { get; set; }
        public Int64 PBId { get; set; }
        public Int64 LPBId { get; set; }
        public Int64 SPADetailId { get; set; }

        public Int32 SupplierId { get; set; }
        public Int32 PaymentTypeId { get; set; }


        public DateTime PaymentDate { get; set; }
        public string SupplierPaymentNo { get; set; }
        public string SupplierAddress { get; set; }
        public string Remarks { get; set; }
        public string CurrencyShort { get; set; }
        public string PaymentGroupName { get; set; }
        public bool IsCheque { get; set; }
        public string PaymentVoucherNo { get; set; }
        public string TransactionNo { get; set; }
        public string MobileNo { get; set; }
        public string MoneyReceiptNo { get; set; }
        public string FromBranch { get; set; }
        public string SupplierBankAccountName { get; set; }
        public string PayerBankAccountName { get; set; }
        public string ChequeTypeName { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public Int32 BankAccountId { get; set; }
        public String BankName { get; set; }
        public Int32 JVNo { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal TotalAIT { get; set; }
        public decimal PayableAmount { get; set; }
        public decimal ActualAmount { get; set; }
        public decimal VatAmount { get; set; }
        public decimal AitAmount { get; set; }
        public DateTime PBDate { get; set; }
        public string PBNo { get; set; }
        public decimal TotalCost { get; set; }
        public decimal AdditionalCost { get; set; }
        public decimal ConversionRate { get; set; }

        public Int32 UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string SupplierName { get; set; }
        public string PaymentTypeName { get; set; }
        public bool IsOpeningPayment { get; set; }

    }
}
