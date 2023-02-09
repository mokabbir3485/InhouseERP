using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_Terminal : IEntityBase
    {
        public int TerminalId { get; set; }
        public int DepartmentId { get; set; }
        public string TerminalName { get; set; }
        public string IpAddress { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public string DepartmentName { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}