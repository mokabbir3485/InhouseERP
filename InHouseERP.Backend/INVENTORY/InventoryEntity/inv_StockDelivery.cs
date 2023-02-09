using System;
using DbExecutor;

namespace InventoryEntity
{
    public class inv_StockDelivery : IEntityBase
    {
        public long DeliveryId { get; set; }
        public Int64? CiDcChallanId { get; set; }

        public long SalesOrderId { get; set; }
        public string DeliveryNo { get; set; }
        public string ManualDeliveryNo { get; set; }
        public string SalesOrderNo { get; set; }
        public string SalesOrderType { get; set; }
        public DateTime DeliveryDate { get; set; }
        public DateTime BillDate { get; set; }
        public int DeliveryFromDepartmentId { get; set; }
        public int DeliveryToDepartmentId { get; set; }
        public int DeliverydById { get; set; }
        public int ReceivedById { get; set; }
        public string DeliveryFromDepartmentName { get; set; }
        public string DeliveryToDepartmentName { get; set; }
        public string DeliverydBy { get; set; }
        public string ReceivedBy { get; set; }
        public bool IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string CompanyName { get; set; }
        public string ReferenceNo { get; set; }
        public string Remarks { get; set; }
        public decimal TotalDeliveryQty { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public Int32 CurrencyId { get; set; }
        public string CurrencyShort { get; set; }
        public decimal DeliveryPrice { get; set; }
        public string AttachmentName { get; set; }
        public bool IsCancelled { get; set; }
        public decimal CPTCost { get; set; }
        public decimal CPTCostBDT { get; set; }
        public bool IsCPT { get; set; }
        public int CompanyId { get; set; }
        public string ManualDeliveryNumber { get; set; }

        public long DeliveryDetailId { get; set; }
        public long SalesOrderDetailId { get; set; }

        public long ItemId { get; set; }
        public int DeliveryUnitId { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal DeliveryQuantity { get; set; }
        public decimal DeliveryQuantityInPcs { get; set; }
        public decimal DeliveryUnitPrice { get; set; }
        public decimal ConversionRate { get; set; }
        public decimal OrderPriceBDT { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string DeliveryUnitName { get; set; }
        public string ItemCode { get; set; }
        public int UnitId { get; set; }
        public int PackageId { get; set; }
        public int ContainerId { get; set; }
        public int CategoryId { get; set; }
        public bool IsLastDelivery { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string SubCategoryName { get; set; }
        public int SubCategoryId { get; set; }
        public string MaterialTypeName { get; set; }
        public string MaterialTypeCode { get; set; }
        public string LabelBrandName { get; set; }
    }
}