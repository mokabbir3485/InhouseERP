using System;

namespace SecurityEntity
{
    public class ad_StockAuditGroup
    {
        public int AuditGroupId { get; set; }
        public string AuditGroupName { get; set; }
        public bool IsActive { get; set; }
        public bool IsDefault { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Status { get; set; }
    }
}