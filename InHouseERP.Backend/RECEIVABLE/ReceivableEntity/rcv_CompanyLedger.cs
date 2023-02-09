using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReceivableEntity
{
    public class rcv_CompanyLedger
    {
        public long CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string ExporterAddress { get; set; }
        public decimal TotalDues { get; set; }
        public decimal OpeningBalance { get; set; }
        public decimal Dues { get; set; }

        public decimal Adjustment { get; set; }
        public decimal NetReceivable { get; set; }
        public decimal cash { get; set; }
        public decimal bank { get; set; }
        public decimal others { get; set; }
        public decimal vat { get; set; }
        public decimal ait { get; set; }
        public decimal RealizedAmount { get; set; }
        public decimal AdvanceAmount { get; set; }
        public decimal AdvanceAdjusted { get; set; }
        public decimal AdvanceBalance { get; set; }
        public decimal RefundAmount { get; set; }
        public decimal Closing { get; set; }
    }
}
