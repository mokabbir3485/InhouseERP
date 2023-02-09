using System;

namespace InventoryEntity
{
    public class inv_InternalWorkOrderDetail
    {
        public long InternalWorkOrderDetailId { get; set; }
        public long InternalWorkOrderId { get; set; }
        public long SalesOrderId { get; set; }
        public long SalesOrderDetailId { get; set; }

        public long FinishedItemId { get; set; }
        public long ItemId { get; set; }
        public decimal Core { get; set; }
        public int QtyPerRoll { get; set; }
        public string RollDirection { get; set; }
        public DateTime DeliveryDate { get; set; }
        public bool IsFullDelivery { get; set; }
        public decimal OrderQty { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal MaterialRollAreaInSqMeter { get; set; }
        public decimal MaterialRollLengthInMeter { get; set; }
        public decimal RollWeightInKg { get; set; }
        public decimal ItemLength { get; set; }
        public decimal ItemWidth { get; set; }
        public string DetailRemarks { get; set; }
        public decimal UnitCost { get; set; }
        public string Color { get; set; }
        public string Ups { get; set; }
        public string Radius { get; set; }
        public string ArtWork { get; set; }
        public string SubCategoryName { get; set; }
        public string ItemName { get; set; }
        public string CategoryName { get; set; }
        public string Barcode { get; set; }
        public string UnitName { get; set; }
        public int OrderUnitId { get; set; }
        public string CompanyName { get; set; }
        public string EmployeeName { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public DateTime InternalWorkOrderDate { get; set; }
        public decimal ProductionQuantity { get; set; }
        public decimal RequisitionQuantity { get; set; }
        
        public string RawItemName { get; set; }
        public int PaperTypeId { get; set; }
        public string PaperTypeName { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string LabelBrandName { get; set; }
   
        public string MaterialTypeName { get; set; }
        public int FGMaterialTypeId { get; set; }
        public string FGMaterialType { get; set; }
        public bool CanRemoveItem { get; set; }
        public bool IsVoid { get; set; }

        public string FinishedItemName { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public string ItemDescription { get; set; }
        public string RequisitionNo { get; set; }

        public int RawUnitId { get; set; }
        public string RawUnitName { get; set; }
        public int RawMaterialTypeId { get; set; }
        public string RawMaterialTypeName { get; set; }
        public string RawMaterialItem { get; set; }
        public string AddressDelivery { get; set; }



    }
}