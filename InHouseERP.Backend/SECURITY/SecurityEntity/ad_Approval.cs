using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_Approval : IEntityBase
    {
        public int ApprovalId { get; set; }
        public int ScreenId { get; set; }
        public bool IsRequired { get; set; }
        public string ScreenName { get; set; }
        public string ModuleName { get; set; }
        public int ModuleId { get; set; }
        public int Sorting { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}