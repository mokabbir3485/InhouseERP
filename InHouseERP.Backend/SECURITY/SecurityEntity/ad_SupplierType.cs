using System;

namespace SecurityEntity
{
    public class ad_SupplierType
    {
        public int SupplierTypeId { get; set; }
        public string SupplierTypeName { get; set; }
        public bool IsActive { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int? UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}