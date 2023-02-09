using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_ItemUnit : IEntityBase
    {
        public int ItemUnitId { get; set; }
        public string UnitName { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public string UnitFor { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}