using System;

namespace PayableEntity
{
    public class pay_SupplierPayment
    {
        public long SupplierPaymentId { get; set; }
        public long PBId { get; set; }
        public long LPBId { get; set; }
        public long SPADetailId { get; set; }


        public long SupplierId { get; set; }
        public int SupplierTypeId { get; set; }
        public decimal OpeningAmount { get; set; }

        public int PaymentTypeId { get; set; }
        public int EmployeeId { get; set; }

        public int CurrencyId { get; set; }
        public string SupplierPaymentNo { get; set; }
        public string CurrencyType { get; set; }


        public DateTime? PaymentDate { get; set; }
        public string Remarks { get; set; }
        public bool IsCheque { get; set; }
        public string ChequeType { get; set; }
        public Int32 ChequeTypeId { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public int SupplierBankAccountId { get; set; }
        public int PayerBankAccountId { get; set; }
        public string BankName { get; set; }
        public string JVNo { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal TotalSD { get; set; }
        public decimal TotalAIT { get; set; }
        public decimal PayableAmount { get; set; }
        public decimal SupplierPayAmount { get; set; }
        public decimal ActualAmount { get; set; }
        public decimal VatAmount { get; set; }
        public decimal SdAmount { get; set; }
        public decimal AitAmount { get; set; }
        public DateTime? PBDate { get; set; }
        public string PBNo { get; set; }
        public decimal TotalCost { get; set; }
        public decimal AdjustedAmount { get; set; }
        public decimal TotalPaidAmount { get; set; }

        public int UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string SupplierName { get; set; }
        public string PaymentTypeName { get; set; }
        public string MobileNo { get; set; }
        public string TransactionNo { get; set; }
        public string PaymentVoucherNo { get; set; }
        public string MoneyReceiptNo { get; set; }
        public string ChequeTypeName { get; set; }
      
       
        public Int32 MobileBankingServiceId { get; set; }
        public bool IsOpeningPayment { get; set; }
        public bool IsVDS { get; set; }
        public bool IsCancelled { get; set; }
        public string FromBranch { get; set; }
       

        public decimal ConversionRate { get; set; }
        public string Status { get; set; }

    }
}