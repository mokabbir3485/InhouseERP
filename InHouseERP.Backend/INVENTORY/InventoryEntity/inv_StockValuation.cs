using System;

namespace InventoryEntity
{
    public class inv_StockValuation
    {
        //public long ValuationId { get; set; }
        public int ItemId { get; set; }
        public int MaterialTypeId { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public decimal CurrentQuantity { get; set; }

        public decimal ValuationPrice { get; set; }
        public DateTime UpdateDate { get; set; }

        public decimal HoldQuantity { get; set; }
        public int ItemUnitId { get; set; }
        public string UnitName { get; set; }
    }
}