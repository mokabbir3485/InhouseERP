using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_Bank : IEntityBase
    {
        public int BankId { get; set; }
        public string BankName { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}