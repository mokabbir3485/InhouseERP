using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_OverHead : IEntityBase
    {
        public int OverHeadId { get; set; }
        public string OverHeadName { get; set; }
        public string AccountCode { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}