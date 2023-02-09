using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_Domain : IEntityBase
    {
        public int DomainId { get; set; }
        public int GroupId { get; set; }
        public string DomainName { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}