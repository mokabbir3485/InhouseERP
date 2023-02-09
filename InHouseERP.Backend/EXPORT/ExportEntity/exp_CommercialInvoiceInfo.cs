namespace ExportEntity
{
    public class exp_CommercialInvoiceInfo
    {
        public long InfoId { get; set; }
        public long? CommercialInvoiceId { get; set; }
        public string InfoType { get; set; }
        public string InfoLabel { get; set; }
        public string InfoSubType { get; set; }
        public string InfoValue { get; set; }
        public int? Sorting { get; set; }
    }
}