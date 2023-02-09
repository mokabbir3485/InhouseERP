using System;

namespace SecurityEntity
{
    public class ad_BankAccount
    {
        public int BankAccountId { get; set; }
        public string BankName { get; set; }
        public string CompanyName { get; set; }
        public string AccountNo { get; set; }
        public string AccountName { get; set; }
        public string SwiftCode { get; set; }
        public string BIN { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string AccountFor { get; set; }
        public int AccountRefId { get; set; }
        public bool IsActive { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string Status { get; set; }
        public string BranchRouteNo { get; set; }
    }
}