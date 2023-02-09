using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_Department : BaseDepartment, IEntityBase
    {
        public string Fax { get; set; }
        public string ManagerName { get; set; }
        public string BranchName { get; set; }
        public bool IsUnit { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}