using System;

namespace ExportEntity
{
    public class exp_Approval
    {
        public long ApprovalId { get; set; }
        public string ApprovalType { get; set; }
        public long DocumentId { get; set; }
        public long SalesOrderId { get; set; }
        public string SalesOrderNo { get; set; }
        public int? AmendmentReasonId { get; set; }
        public string RequestRemarks { get; set; }
        public bool IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string ApprovalPassword { get; set; }
        public string ApprovedRemarks { get; set; }
        public int UpdateBy { get; set; }
        public int SectionId { get; set; }
        public int DepartmentId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string DocType { get; set; }
        public string DocNo { get; set; }
        public string PINoPostfix { get; set; }
        public DateTime DocDate { get; set; }
        public string Party { get; set; }
        public string PreparedByName { get; set; }
        public string Remarks { get; set; }
        public string PlaceOfDelivery { get; set; }
        public decimal Amount { get; set; }
        public long InternalWorkOrderId { get; set; }
        public string ApprovedPerson { get; set; }
        public string FactoryName { get; set; }
    }
}