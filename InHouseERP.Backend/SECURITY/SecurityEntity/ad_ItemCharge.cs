using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_ItemCharge : IEntityBase
    {
        public long ChargeId { get; set; }
        public int TransactionTypeId { get; set; }
        public int ItemId { get; set; }
        public int ChargeTypeId { get; set; }
        public decimal ChargePercentage { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}