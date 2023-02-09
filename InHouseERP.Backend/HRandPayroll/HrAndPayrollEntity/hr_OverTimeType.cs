using System;

namespace HrAndPayrollEntity
{
    public class hr_OverTimeType
    {
        public int OverTimeTypeId { get; set; }
        public string OverTimeTypeName { get; set; }
        public string OverTimePeriod { get; set; }
        public string OverTimeOn { get; set; }
        public decimal TimesOfAnHour { get; set; }
        public decimal HoursAfterOTStarts { get; set; }
        public int OTPulsaeInMin { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime? ValidTill { get; set; }
    }
}