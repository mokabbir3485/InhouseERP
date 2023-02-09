using System;

namespace InventoryEntity
{
    public class pro_Production
    {
        public long ProductionId { get; set; }
        public long InternalWorkOrderId { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string ProductionNo { get; set; }
        public DateTime ProductionDate { get; set; }

        public string Remarks { get; set; }
        public int PreparedById { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }

        //machine
        public string MachineName { get; set; }
        public int MachineId { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public string CompanyNameBilling { get; set; }
        public bool IsCancelled { get; set; }
    }
}