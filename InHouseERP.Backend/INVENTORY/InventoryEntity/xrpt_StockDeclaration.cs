using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class xrpt_StockDeclaration
    {
        public Int64 DeclarationDetailId { get; set; }
        public Int64 DeclarationId { get; set; }
        public Int32 DepartmentId { get; set; }
        public string DeclarationNo { get; set; }
        public DateTime DeclarationDate { get; set; }
        public string DeclarationTypeName { get; set; }
        public string DepartmentName { get; set; }
        public string EmployeeName { get; set; }
        public Int32 DeclaredById { get; set; }
        public Int32 ItemId { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string ItemName { get; set; }
        public string UnitName { get; set; }
        public Int32 DeclarationUnitId { get; set; }
        public decimal DeclarationQuantity { get; set; }
        public decimal DeclarationUnitPrice { get; set; }
        public decimal Amount { get; set; }
        public string Remarks { get; set; }
    }
}
