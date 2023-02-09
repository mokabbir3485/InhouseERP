using System;

namespace InventoryEntity
{
    public class inv_ReturnFromDepartment
    {
        public long ReturnId { get; set; }
        public int FromDepartmentId { get; set; }
        public int ToDepartmentId { get; set; }
        public string ReturnNo { get; set; }
        public DateTime ReturnDate { get; set; }
        public long IssueId { get; set; }
        public string IssueNo { get; set; }
        public int ReturnFromId { get; set; }
        public int ReturnToId { get; set; }
        public string Remarks { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string FromDepartmentName { get; set; }
        public string ToDepartmentName { get; set; }
        public string ReturnFrom { get; set; }
        public string ReturnTo { get; set; }
        public bool IsApproved { get; set; }
        public int ApprovedBy { get; set; }
        public DateTime ApprovedDate { get; set; }
        public decimal ReturnedQuantity { get; set; }
        public string ItemCode { get; set; }
        public decimal IssueQuantity { get; set; }
        public decimal IssueUnitPrice { get; set; }
    }
}