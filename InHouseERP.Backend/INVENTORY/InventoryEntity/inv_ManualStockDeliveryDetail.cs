using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryEntity
{
    public class inv_ManualStockDeliveryDetail
    {
        public long ManualDeliveryDetailId { get; set; }
        public long ManualDeliveryId { get; set; }
        public long ItemId { get; set; }
        public int MaterialTypeId { get; set; }
        public string ItemDescription { get; set; }
        public int ItemUnitId { get; set; }
        public decimal DeliveryQuantity { get; set; }
        public string ItemUnitName { get; set; }
        public int WarrantyDays { get; set; }
        public string WarrantySerialNo { get; set; }
        public decimal PcPerRoll { get; set; }
        public string MaterialTypeName { get; set; }
        public string UnitName { get; set; }
    }
}
