using System;

namespace AccountsEntity
{
    public class ac_ChartOfAccount
    {
        public int AccountId { get; set; }
        public int AccountTypeDetailId { get; set; }
        public string AccountName { get; set; }
        public string AccountDescription { get; set; }
        public int ParentId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDefault { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}