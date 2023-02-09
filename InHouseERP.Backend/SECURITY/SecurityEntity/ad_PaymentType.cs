using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_PaymentType : IEntityBase
    {
        public int PaymentTypeId { get; set; }
        public int PaymentGroupId { get; set; }
        public string PaymentTypeName { get; set; }
        public bool IsActive { get; set; }
        public decimal CommissionPercent { get; set; }
        public bool IsFixed { get; set; }
        public string Status { get; set; }
        public string PaymentGroupName { get; set; }
        public bool IsAdjustment { get; set; }
        public string ModuleName { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Code { get; set; }
    }
}