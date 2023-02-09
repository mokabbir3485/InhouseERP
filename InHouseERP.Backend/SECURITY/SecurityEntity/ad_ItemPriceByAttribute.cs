using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_ItemPriceByAttribute : IEntityBase
    {
        public int AttributePriceId { get; set; }
        public long ItemAddAttId { get; set; }
        public int PriceTypeId { get; set; }
        public decimal PurchaseUnitPrice { get; set; }
        public decimal PurchasePackagePrice { get; set; }
        public decimal PurchaseContainerPrice { get; set; }
        public decimal SaleUnitPrice { get; set; }
        public decimal SalePackagePrice { get; set; }
        public decimal SaleContainerPrice { get; set; }
        public bool IsActive { get; set; }
        public string Barcode { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}