using System;

namespace InventoryEntity
{
    public class inv_StockValuationAttribute
    {
        public long ValuationId { get; set; }
        public int DepartmentId { get; set; }
        public long ItemAddAttId { get; set; }
        public decimal CurrentQuantity { get; set; }
        public decimal ValuationPrice { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}