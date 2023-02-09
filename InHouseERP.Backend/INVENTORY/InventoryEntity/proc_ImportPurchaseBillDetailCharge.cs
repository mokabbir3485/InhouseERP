namespace InventoryEntity
{
    public class proc_ImportPurchaseBillDetailCharge
    {
        public long ChargeId { get; set; }
        public long PBDetailId { get; set; }
        public int ChargeTypeId { get; set; }
        public decimal ChargeAmount { get; set; }
        public string ChargeTypeName { get; set; }
        public decimal ChargePercentage { get; set; }
    }
}