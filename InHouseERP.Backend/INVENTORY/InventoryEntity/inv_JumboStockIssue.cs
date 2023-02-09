using System;

namespace InventoryEntity
{
    public class inv_JumboStockIssue
    {
        public long JIssueId { get; set; }
        public string JIssueNo { get; set; }
        public DateTime? JIssueDate { get; set; }
        public long? JumboItemId { get; set; }
        public decimal IssuedJumboRollQty { get; set; }
        public decimal JumboWastageInMM { get; set; }
        public string JumboItemName { get; set; }
        public int? FromDepartmentId { get; set; }
        public int? DepartmentId { get; set; }
        public int JumboItemUnitId { get; set; }
        public string FromDeparmentName { get; set; }
        public int? ToDepartmentId { get; set; }
        public string ToDeparmentName { get; set; }
        public int? IssuedById { get; set; }
        public string IssuedByName { get; set; }
        public int? ReceivedById { get; set; }
        public string ReceivedByName { get; set; }
        public int? CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int MaterialTypeId { get; set; }
        public Int64 InternalWorkOrderId { get; set; }
        public string InternalWorkOrderNo { get; set; }
    }
}