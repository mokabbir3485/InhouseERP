using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class inv_InternalStockIssue
    {
        public Int64 StockIssueId { get; set; }
        public string IssueNo { get; set; }
        public DateTime IssueDate { get; set; }
        public int FromDepartmentId { get; set; }
        public int IssuedById { get; set; }
        public bool IsCancelled { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string DepartmentName { get; set; }
        public string EmployeeName { get; set; }
        public string IssuedBy { get; set; }
        public string UnitName { get; set; }
        public string Combination { get; set; }
        public decimal Quantity { get; set; }
    }
}
