using System;

namespace InventoryEntity
{
    public class inv_InternalWorkOrder
    {
        public long InternalWorkOrderId { get; set; }
        public long SalesOrderId { get; set; }
        public DateTime SalesOrderDate { get; set; }
        public int DepartmentId { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public string ProductionNo { get; set; }
        public string OrganizationAddress { get; set; }
        public string OrganizationName { get; set; }
        public bool ProductionStatus { get; set; }
        public long ProductionId { get; set; }
        public DateTime? InternalWorkOrderDate { get; set; }
        public DateTime? ProductionDate { get; set; }
        public bool IsAmendment { get; set; }
        public string PlaceOfDelivery { get; set; }
        public string Remarks { get; set; }
        public string PreparedByName { get; set; }
        public int? PreparedById { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string CompanyName { get; set; }
        public string CompanyNameOnBill { get; set; }
        public string DepartmentName { get; set; }
        public string EmployeeName { get; set; }
        public string DocStatus { get; set; }


        //public string RollDirection { get; set; }
        //public Int64 SalesOrderDetailId { get; set; }
        //public DateTime? DeliveryDate { get; set; }
        //public string DetailRemarks { get; set; }
        //public Int64 ItemId { get; set; }
        //public string Radius { get; set; }
        //public string Ups { get; set; }
        //public string Color { get; set; }
        //public string ArtWorkUps { get; set; }
        //public Int32 QtyPerRoll { get; set; }
        //public bool IsFullDelivery { get; set; }
        //public Int64 InternalWorkOrderDetailId { get; set; }
        public long CompanyId { get; set; }
        public string SalesOrderNo { get; set; }
        public long SalesOrderDetailId { get; set; }
        public string ItemDescription { get; set; }
        public string ERPCode { get; set; }
        public string Material { get; set; }
        public decimal Core { get; set; }
        public string RollDirection { get; set; }
        public int QtyPerRoll { get; set; }
        public decimal PricePerPCS { get; set; }
        public string FormNo { get; set; }
        public string DateOfOrigin { get; set; }
        public string RevisionNo { get; set; }
        public string RevisionDate { get; set; }
        public string PaymentTerms { get; set; }
        public string BillingAddress { get; set; }
        public string DeliveryAddress { get; set; }
        public string ContactPerson { get; set; }
        public string Designation { get; set; }
        public string ContactNo { get; set; }
        public string SalesPerson1 { get; set; }
        public string SalesPerson2 { get; set; }
        public string ItemCode { get; set; }
        public string MaterialCode { get; set; }
        public string MaterialTypeCode { get; set; }
        public string CompanyNameBilling { get; set; }
        public string ArtWorkName { get; set; }
        public int DocStatusId { get; set; }
        public int FactoryId { get; set; }
        public string FactoryName { get; set; }
        public string AttachmentName { get; set; }
        public bool IsCancelled { get; set; }

        public decimal OrderPriceBDT { get; set; }
        public decimal OrderQty { get; set; }
        public string UnitName { get; set; }
   
    

      


    }
}