using System;

namespace HrAndPayrollEntity
{
    public class hr_Holiday
    {
        public int HolidayId { get; set; }
        public string HolidayName { get; set; }
        public int BranchId { get; set; }
        public int DepartmentId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Remarks { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}