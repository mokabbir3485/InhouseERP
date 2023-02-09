using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryEntity
{
    public class pro_ProductionDashboard
    {
        public Int64 MonthNo { get; set; }
        public string Months { get; set; }
        public Int32 Years { get; set; }
        //[pro_DashboardGraphForProductionMonthwiseCount]
        public Decimal TotalUsedMatLengthinMeter { get; set; }
        public Decimal TotalUsedMatAreaInSqm { get; set; }
        public Decimal TotalUsedMatWeigntInKg { get; set; }
        public Decimal TotalWastageQty { get; set; }
        //[pro_DashboardGraphForUsedMatProdMonthwiseCount]
        public Int64 PendingIwoForProduction { get; set; }
        public Int64 TotalProduction { get; set; }
        public Decimal TotalStoreProductionStock{ get; set; } 
        //pro_DashboardTotalProductionCount
}
}
