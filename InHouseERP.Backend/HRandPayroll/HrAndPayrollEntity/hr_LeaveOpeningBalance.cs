using System;

namespace HrAndPayrollEntity
{
    public class hr_LeaveOpeningBalance
    {
        public int LeaveSetupId { get; set; }

        public int EmployeeId { get; set; }
        public DateTime OpeningDate { get; set; }
        public decimal OpeningBalance { get; set; }
    }
}