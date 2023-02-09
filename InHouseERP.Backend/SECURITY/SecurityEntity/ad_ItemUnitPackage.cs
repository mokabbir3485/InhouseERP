using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_ItemUnitPackage : IEntityBase
    {
        public int PackageId { get; set; }
        public string PackageName { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}