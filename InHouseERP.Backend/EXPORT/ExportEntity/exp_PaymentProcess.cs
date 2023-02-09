using System;

namespace ExportEntity
{
    public class exp_PaymentProcess
    {
        public long PaymentProcessId { get; set; }
        public string PaymentProcessType { get; set; }
        public string LcNo { get; set; }
        public decimal Amount { get; set; }
        public string ExpNo { get; set; }
        public string ExpTo { get; set; }
        public string AppliedBy { get; set; }
        public string IrcNo { get; set; }
        public string LcaNo { get; set; }
        public string BbDcNo { get; set; }
        public string InvoiceIds { get; set; }
        public DateTime ApplicationDate { get; set; }
        public string ExportContactNo { get; set; }
        public DateTime ExportContactDate { get; set; }
        public DateTime LcDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string InvoiceNos { get; set; }
        public string CompanyName { get; set; }
        public int CompanyId { get; set; }
        public string DocStatus { get; set; }
    }
}