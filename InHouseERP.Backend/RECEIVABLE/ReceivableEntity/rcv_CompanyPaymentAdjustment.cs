using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReceivableEntity
{
   public class rcv_CompanyPaymentAdjustment
    {
        public Int64 CPAId { get; set; }
        public DateTime CPADate { get; set; }
        public Int64 CompanyId { get; set; }
        public string Remarks { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string CompanyName { get; set; }
        public string SalesInvoiceNo { get; set; }
        public string CPANo { get; set; }
        public decimal AdjustedAmount { get; set; }
        public bool IsCancelled { get; set; }
        public decimal AdditionalCost { get; set; }

    }
}
