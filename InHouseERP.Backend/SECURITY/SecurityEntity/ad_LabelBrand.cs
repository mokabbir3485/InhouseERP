using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_LabelBrand : IEntityBase
    {
        public int LabelBrandId { get; set; }
        public int ItemId { get; set; }
        public int CompanyId { get; set; }
        public string LabelBrandName { get; set; }
        public string LabelBrandShortName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemCode { get; set; }
        public string CompanyName { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }

        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
