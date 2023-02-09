using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableEntity
{
   public class rcv_CompanyPaymentDetail
    {
        public Int64 CompanyPaymentDetailId { get; set; }
        public Int64 CompanyPaymentId { get; set; }
        public bool CompanyType { get; set; }
        public int CompanyId { get; set; }
        public Int64 InvoiceId { get; set; }
        public bool IsLocalSale { get; set; }
        public Int64 SalesInvoiceId { get; set; }
        public Int64 CIOrSalesInvoiceId { get; set; }
        public string InvoiceNo { get; set; }
        public string CompanyName { get; set; }

        public decimal ReceivableAmount { get; set; }

        public decimal ActualAmount { get; set; }
        public decimal VAT { get; set; }
        public decimal AIT { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal AdditionalCost { get; set; }
       
        public DateTime InvoiceDate { get; set; }
        public bool IsVDS { get; set; }
    }
}
