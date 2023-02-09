using System;

namespace InventoryEntity
{
    public class inv_ReturnToSupplier
    {
        public long ReturnId { get; set; }
        public int DepartmentId { get; set; }
        public string ReturnNo { get; set; }
        public DateTime ReturnDate { get; set; }
        public long SRId { get; set; }
        public int SupplierId { get; set; }
        public string ChallanNo { get; set; }
        public int ReturnById { get; set; }
        public string Remarks { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string DepartmentName { get; set; }
        public string SupplierName { get; set; }
        public string ReturnBy { get; set; }
        public bool IsApproved { get; set; }
        public int ApprovedBy { get; set; }
        public DateTime ApprovedDate { get; set; }
    }
}