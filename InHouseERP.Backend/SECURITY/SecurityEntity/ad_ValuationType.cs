using System;

namespace SecurityEntity
{
    public class ad_ValuationType
    {
        public int ValuationTypeId { get; set; }
        public string ValuationTypeName { get; set; }
        public bool IsActive { get; set; }
        public bool IsDefault { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Status { get; set; }
    }
}