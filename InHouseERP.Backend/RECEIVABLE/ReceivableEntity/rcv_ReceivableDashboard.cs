using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReceivableEntity
{
    public class rcv_ReceivableDashboard
    {
        public Int64 MonthNo { get; set; }
        public string Months { get; set; }
        public Int32 Years { get; set; }
        public string CompanyName { get; set; }
        public decimal TotalPaidVAT { get; set; }
        public decimal TotalPaidAIT { get; set; }
        public decimal TotalPaidAmount { get; set; }
        public decimal TotalRefundAmount { get; set; }
        public decimal TotalAdvanceAmount { get; set; }
    }
}
