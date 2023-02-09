using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_ItemAssembly : IEntityBase
    {
        public int AssemblyId { get; set; }
        public int ItemId { get; set; }
        public int RawItemId { get; set; }
        public decimal Quantity { get; set; }
        public int UnitId { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}