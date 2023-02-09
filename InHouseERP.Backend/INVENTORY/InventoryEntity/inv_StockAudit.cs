using System;

namespace InventoryEntity
{
    public class inv_StockAudit
    {
        public long AuditId { get; set; }
        public string AuditNo { get; set; }
        public DateTime AuditDate { get; set; }
        public int DepartmentId { get; set; }
        public int AuditedById { get; set; }
        public bool IsSettled { get; set; }
        public int SettledWithId { get; set; }
        public string Remarks { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string DepartmentName { get; set; }
        public string AuditedBy { get; set; }
        public string SettledWith { get; set; }
    }
}