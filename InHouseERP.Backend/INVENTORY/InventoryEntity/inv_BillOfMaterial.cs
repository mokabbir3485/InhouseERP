using System;

namespace InventoryEntity
{
    public class inv_BillOfMaterial
    {
        public long BillOfMaterialId { get; set; }
        public string BillOfMaterialNo { get; set; }
        public long? ItemId { get; set; }
        public string ItemName { get; set; }
        public decimal? Qty { get; set; }
        public Int32 UnitId { get; set; }
        public string UnitName { get; set; }
        public string HsCode { get; set; }
        public DateTime? SubmitDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}