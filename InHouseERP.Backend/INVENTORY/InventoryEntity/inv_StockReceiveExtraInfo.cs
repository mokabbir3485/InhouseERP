using System;

namespace InventoryEntity
{
    public class inv_StockReceiveExtraInfo
    {
        public long SRExtraInfoId { get; set; }
        public long SRDetailId { get; set; }
        public decimal ExtraInfoQuantity { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int WarrantyInMon { get; set; }
    }
}