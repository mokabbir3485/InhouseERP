using System;

namespace HrAndPayrollEntity
{
    public class hr_Grade
    {
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int BasicF1_GrossMinus { get; set; }
        public decimal BasicF2_DivideBy { get; set; }
        public decimal BasicF3_MultiplyBy { get; set; }
        public bool HasHalfDayPenaltyFraction { get; set; }
        public string PerDaySalaryF1_ApplyOn { get; set; }
        public string PerDaySalaryF2_DaysType { get; set; }
        public bool HasProvFund { get; set; }
        public string ProvFundOn { get; set; }
        public decimal? CompanyPFPercent { get; set; }
        public decimal? EmployeePFPercent { get; set; }
        public bool IsActive { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string PfInfo { get; set; }
        public string LeaveInfo { get; set; }
        public string BonusInfo { get; set; }
    }
}