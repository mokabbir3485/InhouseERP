using System;

namespace SecurityEntity
{
    public class ad_ItemCategory
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string ShortName { get; set; }
        public bool IsActive { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int? UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string Status { get; set; }
    }
}