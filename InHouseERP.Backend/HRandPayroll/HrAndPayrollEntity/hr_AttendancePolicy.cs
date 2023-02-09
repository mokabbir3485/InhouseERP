using System;

namespace HrAndPayrollEntity
{
    public class hr_AttendancePolicy
    {
        public int AttendancePolicyId { get; set; }
        public string AttendancePolicyName { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public bool? IsAllowEarlyIn { get; set; }
        public string AllowEarlyInFrom { get; set; }
        public string AllowLateOutTill { get; set; }
        public int NoOfLateInAllowed { get; set; }
        public string LateInAfter { get; set; }
        public string HalfDayLateAfter { get; set; }
        public string AbsentAfter { get; set; }
        public int MinHourForFullDay { get; set; }
        public int NoOfWeeklyHoliday { get; set; }
        public string FirstWeeklyHoliday { get; set; }
        public string SecondWeeklyHoliday { get; set; }
        public bool HasHalfDay { get; set; }
        public string HalfDayName { get; set; }
        public string HalfDayStartTime { get; set; }
        public string HalfDayEndTime { get; set; }
        public string HalfDayLateInAfter { get; set; }
        public int? HD_MinHourForFullDay { get; set; }
        public bool HasOverTime { get; set; }
        public int? OverTimeTypeId { get; set; }
        public bool IsActive { get; set; }
        public bool IsEndNextDay { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string StartTime24 { get; set; }
        public string EndTime24 { get; set; }
    }
}