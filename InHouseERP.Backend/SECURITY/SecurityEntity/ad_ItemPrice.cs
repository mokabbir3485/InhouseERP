using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_ItemPrice : IEntityBase
    {
        public int ItemPriceId { get; set; }
        public int TransactionTypeId { get; set; }
        public int ItemId { get; set; }
        public int PriceTypeId { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal PackagePrice { get; set; }
        public decimal ContainerPrice { get; set; }
        public bool IsActive { get; set; }
        public string PriceTypeName { get; set; }
        public string Status { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}