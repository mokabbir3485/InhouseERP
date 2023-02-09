using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_StockMovementMethod : IEntityBase
    {
        public int MovementMethodId { get; set; }
        public string MovementMethodName { get; set; }
        public bool IsActive { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}