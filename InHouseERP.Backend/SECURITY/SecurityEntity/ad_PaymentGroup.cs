using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_PaymentGroup : IEntityBase
    {
        public int PaymentGroupId { get; set; }
        public int ModuleId { get; set; }
        public string PaymentGroupName { get; set; }
        public bool IsActive { get; set; }
        public bool IsDefault { get; set; }
        public string Status { get; set; }
        public bool IsAdjustment { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}