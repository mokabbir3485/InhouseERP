using System;

namespace PosEntity
{
    public class pos_CashDeposit
    {
        public long DepositId { get; set; }
        public int BranchId { get; set; }
        public int BankId { get; set; }
        public string BankBranchName { get; set; }
        public DateTime DepositDate { get; set; }
        public string ReferenceNo { get; set; }
        public int DepositById { get; set; }
        public string Remarks { get; set; }
        public decimal Amount { get; set; }
        public string BankName { get; set; }
        public string DepositByName { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}