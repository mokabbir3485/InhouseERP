using DbExecutor;
using System;


namespace ReceivableEntity
{
    public class rcv_CompanyVatAit
    {
        public long CompanyVatAitId { get; set; }
        public int CompanyId { get; set; }
        public long InvoiceId { get; set; }
        public string CompanyName { get; set; }
        public string SalesInvoiceNo { get; set; }
        public string PaidFor { get; set; }
        public DateTime? ReceiveDate { get; set; }
        public DateTime? SalesInvoiceDate { get; set; }
        public decimal VAT { get; set; }
        public decimal AIT { get; set; }
        public decimal BillAmount { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal AITAmount { get; set; }
        public bool isVDS { get; set; }




        public int CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int UpdatorId { get; set; }
    }
}
