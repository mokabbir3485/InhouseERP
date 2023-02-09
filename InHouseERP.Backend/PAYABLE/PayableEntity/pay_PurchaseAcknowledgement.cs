using System;
using DbExecutor;

namespace PayableEntity
{
    public class pay_PurchaseAcknowledgement
    {
        public long PBId { get; set; }
        public long SupplierId { get; set; }
        public bool IsLocal { get; set; }
        public int UpdatorId { get; set; }
        public int TDSIssueId { get; set; }
        public string PBNo { get; set; }
        public string SupplierName { get; set; }
        public string AcknowledgementNo { get; set; }
        public string Remarks { get; set; }
        public DateTime? AcknowledgementDate { get; set; }
        public DateTime? PBDate { get; set; }
        public Int32 AcknowledgedBy { get; set; }
        public string AcknowledgedByName { get; set; }
        public string PaidFor { get; set; }
        public decimal AITAmount { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal BillAmount { get; set; }
        public string RefEmployeeName { get; set; } 
        public decimal TotalAmountAfterDiscount { get; set; }


        
    }
}
