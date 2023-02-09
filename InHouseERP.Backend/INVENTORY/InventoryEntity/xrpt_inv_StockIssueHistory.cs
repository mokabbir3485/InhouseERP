using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class xrpt_inv_StockIssueHistory
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

        public bool IsCancelled { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public string FinishedItemName { get; set; }


      
    }
}
