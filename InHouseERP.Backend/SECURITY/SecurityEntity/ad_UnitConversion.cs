namespace SecurityEntity
{
    public class ad_UnitConversion
    {
        public int UnitId { get; set; }
        public string UnitSymbol { get; set; }
        public string UnitName { get; set; }
        public decimal ConversionRate { get; set; }
        public int MinUnitId { get; set; }
    }
}