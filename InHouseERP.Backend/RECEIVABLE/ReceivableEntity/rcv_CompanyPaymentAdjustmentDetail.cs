using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableEntity
{
    public class rcv_CompanyPaymentAdjustmentDetail
    {

        public Int32 CompanyId { get; set; }

     
        public bool CompanyType { get; set; }
     
        public Int64 InvoiceId { get; set; }
        public bool IsLocalSale { get; set; }
   
        public string InvoiceNo { get; set; }
        public string SalesInvoiceNo { get; set; }
        public string CompanyName { get; set; }

        public decimal ReceivableAmount { get; set; }

        public decimal ActualAmount { get; set; }
        public decimal VAT { get; set; }
        public decimal AIT { get; set; }
        public decimal PaidAmount { get; set; }
        public Int64 CPAId { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime SalesInvoiceDate { get; set; }
        public DateTime CPADate { get; set; }
        public decimal AdjustedAmount { get; set; }
        public decimal TotalAdjustedAmount { get; set; }
     
        public Int64 CPADetailId { get; set; }

    }
}
