using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryEntity
{
    public class inv_InternalWorkOrderDynamic
    {
        public long? InternalWorkOrderId { get; set; }
        public long? SalesOrderId { get; set; }
        public int? DepartmentId { get; set; }
        public string InternalWorkOrderNo { get; set; } = String.Empty;
        public string ProductionNo { get; set; } = String.Empty;
        public string OrganizationAddress { get; set; } = String.Empty;
        public string OrganizationName { get; set; } = String.Empty;
        public bool? ProductionStatus { get; set; }
        public long? ProductionId { get; set; }
        public DateTime? InternalWorkOrderDate { get; set; }
        public DateTime? ProductionDate { get; set; }
        public bool? IsAmendment { get; set; }
        public string PlaceOfDelivery { get; set; } = String.Empty;
        public string Remarks { get; set; } = String.Empty;
        public string PreparedByName { get; set; } = String.Empty;
        public int? PreparedById { get; set; }
        public int? CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public bool? IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string CompanyName { get; set; } = String.Empty;
        public string CompanyNameOnBill { get; set; } = String.Empty;
        public string DepartmentName { get; set; } = String.Empty;
        public string EmployeeName { get; set; } = String.Empty;
        public string DocStatus { get; set; } = String.Empty;


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
        public long? CompanyId { get; set; }
        public string SalesOrderNo { get; set; } = String.Empty;
        public long? SalesOrderDetailId { get; set; }
        public string ItemDescription { get; set; } = String.Empty;
        public string ERPCode { get; set; } = String.Empty;
        public string Material { get; set; } = String.Empty;
        public decimal? Core { get; set; }
        public string RollDirection { get; set; } = String.Empty;
        public int? QtyPerRoll { get; set; }
        public decimal? PricePerPCS { get; set; }
        public string FormNo { get; set; } = String.Empty;
        public string DateOfOrigin { get; set; } = String.Empty;
        public string RevisionNo { get; set; } = String.Empty;
        public string RevisionDate { get; set; } = String.Empty;
        public string PaymentTerms { get; set; } = String.Empty;
        public string BillingAddress { get; set; } = String.Empty;
        public string DeliveryAddress { get; set; } = String.Empty;
        public string ContactPerson { get; set; } = String.Empty;
        public string Designation { get; set; } = String.Empty;
        public string ContactNo { get; set; } = String.Empty;
        public string SalesPerson1 { get; set; } = String.Empty;
        public string SalesPerson2 { get; set; } = String.Empty;
        public string ItemCode { get; set; } = String.Empty;
        public string MaterialCode { get; set; } = String.Empty;
        public string MaterialTypeCode { get; set; } = String.Empty;
        public string CompanyNameBilling { get; set; } = String.Empty;
        public string ArtWorkName { get; set; } = String.Empty;
        public int? DocStatusId { get; set; }
        public int? FactoryId { get; set; }
        public string FactoryName { get; set; } = String.Empty;
        public string AttachmentName { get; set; } = String.Empty;
        public bool? IsCancelled { get; set; }

        public decimal? OrderPriceBDT { get; set; }
        public decimal? OrderQty { get; set; }
        public string UnitName { get; set; } = String.Empty;

    }
}
