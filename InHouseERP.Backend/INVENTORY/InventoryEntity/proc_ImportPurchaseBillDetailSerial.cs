namespace InventoryEntity
{
    public class proc_ImportPurchaseBillDetailSerial
    {
        public long PBDetailSerialId { get; set; }
        public long PBDetailId { get; set; }
        public long HardwareStockSerialId { get; set; }
        public string SerialNo { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public int WarrentyInDays { get; set; }
        public string WarrentyInDays_Str { get; set; }
        public int DepartmentId { get; set; }
        public long ItemId { get; set; }
        public long DeliveryDetailId { get; set; }
        public bool IsLocal { get; set; }
        public string Serial_From { get; set; }
        public string PBDetailSerialIds { get; set; }
        public string PBNo { get; set; }
        public decimal Qty { get; set; }
        public bool IsReceived { get; set; }
    }
}