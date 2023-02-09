using System;

namespace SecurityEntity
{
    public class ad_ReturnReason
    {
        public int ReturnReasonId { get; set; }
        public string ReturnReasonName { get; set; }
        public bool IsActive { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Status { get; set; }
    }
}