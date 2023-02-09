using System;

namespace InventoryEntity
{
    public class inv_JumboStockIssueDetail
    {
        public long JIssueDetailId { get; set; }
        public long JIssueId { get; set; }
        public long? JumboItemId { get; set; }
        public string JumboItemName { get; set; }
        public string JIssueNo { get; set; }
        public string RawItemUnitName { get; set; }
        public string RawItemName { get; set; }
        public long? RawItemId { get; set; }
        public int? RawItemUnitId { get; set; }
        public int? MaterialTypeId { get; set; }
        public int? DepartmentId { get; set; }
        public decimal? IssuedJumboWidth { get; set; }
        public decimal? IssuedJumboRollQty { get; set; }
        public decimal? IssuedRawMatQty { get; set; }
        public decimal? IssuedRawMatUnitPrice { get; set; }
        public decimal? JumboWastageInMM { get; set; }
        public DateTime? JIssueDate { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public string DepartmentName { get; set; }
        public string MaterialTypeCode { get; set; }
        public bool IsCancelled { get; set; }
    }
}