using System;
using DbExecutor;

namespace SecurityEntity
{
    public class s_Permission : IEntityBase
    {
        public long PermissionId { get; set; }
        public int RoleId { get; set; }
        public int ScreenId { get; set; }
        public bool CanView { get; set; }
        public string ModuleName { get; set; }
        public string ScreenName { get; set; }
        public string ScreenUrl { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}