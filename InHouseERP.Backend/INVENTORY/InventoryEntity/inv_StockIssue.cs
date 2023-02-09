using System;

namespace InventoryEntity
{
    public class inv_StockIssue
    {
        public long IssueId { get; set; }
        public long RequisitionId { get; set; }
        public string IssueNo { get; set; }
        public DateTime IssueDate { get; set; }
        public int IssueFromDepartmentId { get; set; }
        public int IssueToDepartmentId { get; set; }
        public int IssuedById { get; set; }
        public int ReceivedById { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string IssueFromDepartmentName { get; set; }
        public string IssueToDepartmentName { get; set; }
        public string IssuedBy { get; set; }
        public string ReceivedBy { get; set; }
        public bool IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public decimal Amount { get; set; }
        public string RequisitionNo { get; set; }
        public DateTime RequisitionDate { get; set; }
        public int MaterialTypeId { get; set; }
        public bool IsCancelled { get; set; }

    }
}