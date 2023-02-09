using System;

namespace ExportEntity
{
    public class exp_AmendmentReason
    {
        public int AmendmentReasonId { get; set; }
        public string AmendmentReasonName { get; set; }
        public bool IsActive { get; set; }
        public int UpdateBy { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}