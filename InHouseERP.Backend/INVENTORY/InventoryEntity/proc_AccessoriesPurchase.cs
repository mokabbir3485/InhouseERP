using System;
using DbExecutor;

namespace InventoryEntity
{
    public class proc_AccessoriesPurchase :IEntityBase
    {
        public int PurchaseId { get; set; }
        public string PurchaseNo { get; set; }
        public string ChallanNo { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string SupplierName { get; set; }
        public string SupplierAddress { get; set; }
        public string Remarks { get; set; }
        public decimal AdditionalDiscount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal NetTotal { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsExist { get; set; }
    }
}
