using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableEntity
{
   public class xrpt_CompanyPaymentAdjustment
    {
        public Int64 CPAId { get; set; }
        public DateTime CPADate { get; set; }
        public Int64 CompanyId { get; set; }
        public string Remarks { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string CompanyName { get; set; }

        public bool CompanyType { get; set; }

        public Int64 InvoiceId { get; set; }
        public bool IsLocalSale { get; set; }

        public string InvoiceNo { get; set; }
        public string SalesInvoiceNo { get; set; }
      

        public decimal ReceivableAmount { get; set; }

        public decimal ActualAmount { get; set; }
        public decimal VAT { get; set; }
        public decimal AIT { get; set; }
        public decimal PaidAmount { get; set; }

        public DateTime InvoiceDate { get; set; }
  
        public decimal AdjustedAmount { get; set; }

        public Int64 CPADetailId { get; set; }

    }
}
