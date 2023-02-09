using System;

namespace InventoryEntity
{
    public class inv_StockDeliveryNonSO
    {
        public long DeliveryId { get; set; }
        public string DeliveryNo { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int DeliveryFromDepartmentId { get; set; }
        public int? DeliveryToDepartmentId { get; set; }
        public string DeliverydBy { get; set; }
        public string ReceivedBy { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string DeliveryFromDepartmentName { get; set; }
        public string DeliveryToDepartmentName { get; set; }
        public bool IsApproved { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
    }
}