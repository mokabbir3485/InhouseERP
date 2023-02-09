using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_ChargeType : IEntityBase
    {
        public int ChargeTypeId { get; set; }
        public string ChargeTypeName { get; set; }
        public bool IsActive { get; set; }
        public bool IsDefault { get; set; }
        public string Status { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}