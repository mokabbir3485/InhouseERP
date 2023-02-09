using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryEntity
{
    public class proc_ProcurementDashboard
    {
        public Int64 MonthNo { get; set; }
        public string Months { get; set; }
        public Int32 Years { get; set; }
        public string CompanyName { get; set; }
        public Int32 TotalImportPurchase { get; set; }
        public Int32 TotalLocalPurchase { get; set; }
        public decimal TotalAmountImportPurchase { get; set; }
        public decimal TotalAmountLocalPurchase { get; set; }
        public decimal TotalPaidAmount { get; set; }
        public Int32 RawItemImportPurchase { get; set; }
        public Int32 HardwareItemImportPurchase { get; set; }
        public Int32 RawItemLocalPurchase { get; set; }
        public Int32 HardwareItemLocalPurchase { get; set; }
    }
}
