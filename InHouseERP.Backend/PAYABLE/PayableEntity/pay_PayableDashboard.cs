using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayableEntity
{
    public class pay_PayableDashboard
    {
        public Int64 MonthNo { get; set; }
        public string Months { get; set; }
        public Int32 Years { get; set; }
        public string SupplierName { get; set; }
        //For Card
        public decimal TotalPaidVAT { get; set; }
        public decimal TotalPaidAIT { get; set; }
        public decimal TotalPaidAmount { get; set; }
        //For Pie Chart
        public decimal TotalLocalPaidAmount { get; set; }
        public decimal TotalOverseasePaidAmount { get; set; }
    }
}
