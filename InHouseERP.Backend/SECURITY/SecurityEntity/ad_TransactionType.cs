using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_TransactionType : IEntityBase
    {
        public int TransactionTypeId { get; set; }
        public string TransactionTypeName { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}