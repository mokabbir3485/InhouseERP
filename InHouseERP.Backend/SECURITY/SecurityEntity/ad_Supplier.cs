using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_Supplier : BaseSupplier, IEntityBase
    {
        public string SupplierCode { get; set; }
        public int SupplierTypeId { get; set; }
        public string Web { get; set; }
        public bool IsActive { get; set; }
        public bool IsReceivable { get; set; }
        public string Status { get; set; }
        public string SupplierNameWithCode { get; set; }
        public string SupplierTypeName { get; set; }
        public string TIN { get; set; }
        public string BIN { get; set; }
        public string NID { get; set; }
        public decimal AdvanceAmount { get; set; }

        //Temp Column
        public string SuppilerTypeName { get; set; }
        public decimal OpeningBalance { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}