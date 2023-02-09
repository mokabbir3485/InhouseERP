using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
   public class xrpt_DeliveryHistory
    {
        public long DeliveryId { get; set; }
        public Int64? CiDcChallanId { get; set; }

        public long SalesOrderId { get; set; }
        public string DeliveryNo { get; set; }
        public string ManualDeliveryNo { get; set; }
        public string SalesOrderNo { get; set; }
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
        public bool IsCPT { get; set; }
        public int CompanyId { get; set; }
        public string ManualDeliveryNumber { get; set; }
   
        public Decimal DeliveryUnitPrice { get; set; }
        public Decimal DeliveryQuantity { get; set; }
        public string ItemName { get; set; }
        public string UnitName { get; set; }
    }
}
