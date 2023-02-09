namespace HrAndPayrollEntity
{
    public class hr_BonusTypeSetup
    {
        public int BonusTypeSetupId { get; set; }
        public int GradeId { get; set; }
        public string BonusTypeName { get; set; }
        public string BonusOn { get; set; }
        public decimal BonusRatio { get; set; }
    }
}