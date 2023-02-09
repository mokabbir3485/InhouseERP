using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_CompanyType : IEntityBase
    {
        public int CompanyTypeId { get; set; }
        public string CompanyTypeName { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}