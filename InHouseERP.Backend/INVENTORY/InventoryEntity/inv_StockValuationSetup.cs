using System;
using DbExecutor;

namespace InventoryEntity
{
    public class inv_StockValuationSetup : IEntityBase
    {
        public Int64 FinancialCycleId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string ValuationType { get; set; }
        public string FinancialCycleYear { get; set; }
        public bool IsCurrent { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}