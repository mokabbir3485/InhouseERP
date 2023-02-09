using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PosEntity
{
    public class pos_PosDashboard
    {
        public Int64 MonthNo { get; set; }
        public string Months { get; set; }
        public Int32 Years { get; set; }
        public Int64 TotalSO { get; set; }
        public Int64 TotalIWO { get; set; }
        public Int64 TotalSi { get; set; }
        public Int64 SoApprovePending { get; set; }
        public Int64 SoAmendmentReqPending { get; set; }
        public Int64 TotalLocalSo { get; set; }
        public Int64 TotalExportSo { get; set; }
        public Int64 TotalSo { get; set; }
        public Int64 IwoApprovePending { get; set; }
        public Int64 IwoAmendmentReqPending { get; set; }
        public Int64 TotalSalesInvoice { get; set; }
        public Int64 TotalCancelledSO { get; set; }
        public decimal TotalSiAmount { get; set; }
        public string CompanyName { get; set; }
    }
}
