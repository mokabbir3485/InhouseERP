using System;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class inv_MaterialsDemandDetail
    {
        public Int64 MaterialsDemandDetailId { get; set; }
        public Int64 MaterialsDemandId { get; set; }
        public Int64 InternalWorkOrderId { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public int ItemId { get; set; }
        public string MaterialType { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string LabelBrandName { get; set; }
        public string ItemName { get; set; }
        public string NameOfMaterials { get; set; }
        public string ItemSpecification { get; set; }
        public string CustomerName { get; set; }
        public string MCName { get; set; }
        public string StockDetails { get; set; }
        public decimal DemandQuantity { get; set; }
        public decimal CurrentQuantity { get; set; }
        public int DemandUnitId { get; set; }
        public string UnitName { get; set; }
        public string DetailsRemark { get; set; }

    }
}
