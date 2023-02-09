using System;

namespace InventoryEntity
{
    public class inv_StockIssueDetail
    {
        public long IssueDetailId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long IssueId { get; set; }
        public long ItemId { get; set; }
        public int ItemUnitId { get; set; }
        public int IssueUnitId { get; set; }
        public decimal IssueQuantity { get; set; }
        public decimal IssueUnitPrice { get; set; }
        public string ItemName { get; set; }
        public string IssueUnitName { get; set; }
        public string ItemCode { get; set; }
        public decimal ReturnedQuantity { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal PackageWeight { get; set; }
        public Int32 CategoryId { get; set; }
        public Int32 PaperTypeId { get; set; }
        public Int32 MaterialTypeId { get; set; }
    }
}