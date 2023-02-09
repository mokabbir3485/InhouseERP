using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_CustomBond : IEntityBase
    {
        public long BondId { get; set; }
        public string BondNo { get; set; }
        public DateTime BondDate { get; set; }
        public bool IsActive { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}