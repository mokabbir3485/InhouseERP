namespace HrAndPayrollEntity
{
    public class hr_LeaveTypeSetup
    {
        public int LeaveSetupId { get; set; }
        public int GradeId { get; set; }
        public string LeaveTypeName { get; set; }
        public bool? IsCompensatory { get; set; }
        public string CompensateWith { get; set; }
        public decimal? CompensateDaysPerHoliday { get; set; }
        public decimal? OTHoursPerCompenasateDay { get; set; }
        public bool IsByYearly { get; set; }
        public decimal NoOfDaysYearly { get; set; }
        public decimal BalanceDays { get; set; }
    }
}