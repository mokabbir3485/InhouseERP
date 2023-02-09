using System;

namespace InventoryEntity
{
    public class inv_InternalWorkOrderReport
    {
        public long InternalWorkOrderId { get; set; }
        public long SalesOrderId { get; set; }
        public long SalesOrderDetailId { get; set; }
        public int DepartmentId { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public DateTime InternalWorkOrderDate { get; set; }
        public string PlaceOfDelivery { get; set; }
        public string Remarks { get; set; }
        public string BIN { get; set; }
        public string PONo { get; set; }
        public string PODate { get; set; }
        public int PreparedById { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string FinishedItemName { get; set; }
        public string RawMaterials { get; set; }
        public string SalesOrderNo { get; set; }
        public DateTime? SalesOrderDate { get; set; }
        public string Barcode { get; set; }
        public long InternalWorkOrderDetailId { get; set; }


        public long FinishedItemId { get; set; }
        public long ItemId { get; set; }
        public decimal Core { get; set; }
        public int QtyPerRoll { get; set; }
        public string RollDirection { get; set; }
        public DateTime DeliveryDate { get; set; }
        public bool IsFullDelivery { get; set; }
        public decimal OrderQty { get; set; }
        public string DetailRemarks { get; set; }
        public decimal UnitCost { get; set; }
        public string Color { get; set; }
        public string Ups { get; set; }
        public string Radius { get; set; }
        public string ArtWork { get; set; }
        public string FullName { get; set; }
        public string IsHardware { get; set; }
        public string FinishedItemCode { get; set; }
        public string UnitName { get; set; }
        public string BranchAddress { get; set; }
        public string AttachmentName { get; set; }

        public string ApprovedByName { get; set; }
        public string BranchName { get; set; }
        public string MaterialPaperTypeName { get; set; }
        public string LabelBrandName { get; set; }
      
    }
}