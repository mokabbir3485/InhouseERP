using System;

namespace InventoryEntity
{
    public class xRpt_pro_ProductionReport
    {
        public string ProductionNo { get; set; }
        public DateTime ProductionDate { get; set; }
        public string FromDepartmentName { get; set; }
        public string ToDepartmentName { get; set; }

        public string RawMaterialItemName { get; set; }
        public string ProductionItemUnitName { get; set; }
        public string WastageRemarks { get; set; }
        public decimal UsedMaterialUnitCost { get; set; }
        public decimal UsedMaterialAreaInSqm { get; set; }
        public decimal UsedMaterialWeigntInKg { get; set; }
        public decimal UsedMaterialLengthinMeter { get; set; }
        public decimal UsedMaterialQtyInRoll { get; set; }
        public decimal WastageQty { get; set; }
        public string WastageItemUnitName { get; set; }
        public int MachineId { get; set; }
        public decimal QtyPerRoll { get; set; }
        public string MachineName { get; set; }
        public long ProductionItemUnitId { get; set; }
        public long RawMatrialItemId { get; set; }
        public decimal UnitCost { get; set; }
        public decimal ProductionQtyInRoll { get; set; }
        public decimal AttainableQantity { get; set; }
        public string ProductionItemUnitname { get; set; }
        public decimal ProductionQuantity { get; set; }
        public decimal UsedRoll { get; set; }
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public long ProductionId { get; set; }
        public long ProductionDetailId { get; set; }
        public long WastageItemUnitId { get; set; }
        public string ItemName { get; set; }
        public string PreparedName { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public string CompanyNameBilling { get; set; }
        public string BranchAddress { get; set; }
        public decimal AttainableQty { get; set; }
        public string LabelBrandName { get; set; }
    }
}