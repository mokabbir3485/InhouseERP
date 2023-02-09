using System;

namespace InventoryEntity
{
    public class inv_StockDeclaration
    {
        public long DeclarationId { get; set; }
        public string DeclarationNo { get; set; }
        public DateTime DeclarationDate { get; set; }
        public int DepartmentId { get; set; }
        public int DeclaredById { get; set; }
        public string Remarks { get; set; }
        public int? CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string DepartmentName { get; set; }
        public string DeclaredBy { get; set; }
        public bool? IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public Int32 DeclarationTypeId { get; set; }
    }
}