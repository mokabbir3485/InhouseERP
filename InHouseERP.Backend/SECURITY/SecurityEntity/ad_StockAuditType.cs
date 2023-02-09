using System;

namespace SecurityEntity
{
    public class ad_StockAuditType
    {
        public int AuditTypeId { get; set; }
        public int AuditGroupId { get; set; }
        public string AuditTypeName { get; set; }
        public bool IsActive { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string AuditGroupName { get; set; }
        public string Status { get; set; }
    }
}