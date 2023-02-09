using System;

namespace SecurityEntity
{
    public class ad_Section
    {
        public int SectionId { get; set; }
        public string SectionName { get; set; }
        public bool IsActive { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}