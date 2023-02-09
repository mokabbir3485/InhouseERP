using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_PriceType : IEntityBase
    {
        public int PriceTypeId { get; set; }
        public string PriceTypeName { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public bool IsDefault { get; set; }
        public string IsDefaultString { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}