using System;

namespace AccountsEntity
{
    public class ac_Transaction
    {
        public long TransactionId { get; set; }
        public int AccountId { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionType { get; set; }
        public string VoucherType { get; set; }
        public string Narration { get; set; }
        public decimal DrAmt { get; set; }
        public decimal CrAmt { get; set; }
        public decimal? BalanceAmt { get; set; }
        public long? VoucherNo { get; set; }
        public string VoucherNum { get; set; }
        public int? AgainstAccountId { get; set; }
        public string AgainstNarration { get; set; }
        public int? CompanyId { get; set; }
        public int? SupplierId { get; set; }
        public int? BankId { get; set; }
        public int? BranchId { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeBank { get; set; }
        public DateTime? ChequeDate { get; set; }
        public bool IsChqCleared { get; set; }
        public bool IsAuto { get; set; }
        public bool IsOpening { get; set; }
        public bool IsApproved { get; set; }
        public bool IsVoid { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public int? VoidBy { get; set; }
        public DateTime? VoidDate { get; set; }
        public string VoidReson { get; set; }
        public string PurposeType { get; set; }
        public string CurrencyType { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}