using System;

namespace InventoryEntity
{
    public class inv_ManualStockDelivery
    {
        public Int64 ManualDeliveryId { get; set; }
        public string ManualDeliveryNo { get; set; }
        public DateTime DeliveryDate { get; set; }
        public Int32 DeliveryFromDepartmentId { get; set; }
        public Int32 DeliverydById { get; set; }
        public Int64 CompanyId { get; set; }
        public string CompanyNameDelivery { get; set; }
        public string AddressDelivery { get; set; }
        public string OrderType { get; set; }
        public string Remarks { get; set; }
        public Int32 CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public Int32 UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string PODate { get; set; }
        public string PONo { get; set; }
        public string CompanyName { get; set; }
        public Int32 SalesOrderId { get; set; }
        public string SalesOrderNo { get; set; }
        public bool IsExist { get; set; }

    }
}
