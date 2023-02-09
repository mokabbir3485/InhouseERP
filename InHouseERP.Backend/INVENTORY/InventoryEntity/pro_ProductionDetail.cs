using System;

namespace InventoryEntity
{
    public class pro_ProductionDetail
    {
        public long ProductionDetailId { get; set; }
        public long InternalWorkOrderDetailId { get; set; }
        public long ProductionId { get; set; }
        public long ItemId { get; set; }
        public decimal UsedRoll { get; set; }
        public decimal ProductionQuantity { get; set; }
        public decimal ProductionQtyInRoll { get; set; }
        public decimal UnitCost { get; set; }
        public long RawMatrialItemId { get; set; }
        public long ProductionItemUnitId { get; set; }
        public long WastageItemUnitId { get; set; }
        public int MachineId { get; set; }
        public decimal WastageQty { get; set; }
        public decimal UsedMaterialQtyInRoll { get; set; }
        public decimal UsedMaterialLengthinMeter { get; set; }
        public decimal UsedMaterialWeigntInKg { get; set; }
        public decimal UsedMaterialAreaInSqm { get; set; }
        public decimal UsedMaterialUnitCost { get; set; }
        public string WastageRemarks { get; set; }
        public string ProductionItemUnitName { get; set; }
        public string RawMaterialItemName { get; set; }
        public string WastageItemUnitName { get; set; }
        public int DepartmentId { get; set; }
        public string ItemName { get; set; }

        public decimal RollWidthInMeter { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public string ItemCode { get; set; }
        public string UnitName { get; set; }
        public decimal CurrentQuantity { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public long InternalWorkOrderId { get; set; }
        public int PaperTypeId { get; set; }
        public string PaperTypeName { get; set; }
       
        public string SubCategoryName { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string MaterialTypeName { get; set; }
        public string LabelBrandName { get; set; }
        public Int32 Raw_MaterialTypeId { get; set; }
        public decimal AttainableQty { get; set; }


        public string ProductionNo { get; set; }
        public DateTime ProductionDate { get; set; }
        public DateTime InternalWorkOrderDate { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public string PreparedBy { get; set; }
        public string MaterialTypeCode { get; set; }
        public string FinishDescription { get; set; }
        public string RawDescription { get; set; }
        public int RawUnitId { get; set; }
       
        
       
       
    }
}