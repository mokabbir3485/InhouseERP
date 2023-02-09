using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExportEntity
{
    public class exp_ExportDashboard
    {
        public Int64 TotalCi { get; set; }
        public string CompanyNameBilling { get; set; }
        public string PaymentProcessType { get; set; }

        public Int64 MonthNo { get; set; }
        public string Months { get; set; }
        public Int32 Years { get; set; }
        public decimal TotalCiAmount { get; set; }
        public Int64 TotalPi { get; set; }
        public Int64 PiApprovePending { get; set; }
        public Int64 PiAmendmentReqPending { get; set; }
        public Int64 CiApprovePending { get; set; }
        public Int64 CiAmendmentReqPending { get; set; }
    }
}
