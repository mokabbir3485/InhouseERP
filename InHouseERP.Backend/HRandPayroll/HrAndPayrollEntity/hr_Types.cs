using System;

namespace HrAndPayrollEntity
{
    public class hr_Types
    {
        public int TypesId { get; set; }
        public string Entity { get; set; }
        public string TypesName { get; set; }
        public bool IsActive { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}