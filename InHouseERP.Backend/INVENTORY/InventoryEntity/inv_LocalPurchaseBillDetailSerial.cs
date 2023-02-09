namespace InventoryEntity
{
    public class inv_LocalPurchaseBillDetailSerial
    {
        public long LPBDetailSerialId { get; set; }
        public long LPBDetailId { get; set; }
        public string SerialNo { get; set; }
        public int WarrentyInDays { get; set; }
        public int DepartmentId { get; set; }
        public long ItemId { get; set; }
        public long DeliveryDetailId { get; set; }
    }
}