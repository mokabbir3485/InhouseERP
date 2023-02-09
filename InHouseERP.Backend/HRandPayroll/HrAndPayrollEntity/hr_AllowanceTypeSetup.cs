namespace HrAndPayrollEntity
{
    public class hr_AllowanceTypeSetup
    {
        public int AllowanceTypeSetupId { get; set; }
        public int GradeId { get; set; }
        public string AllowanceTypeName { get; set; }
        public string ValueType { get; set; }
        public string ApplyOn { get; set; }
        public decimal Value { get; set; }
        public bool IsAfterGross { get; set; }
    }
}