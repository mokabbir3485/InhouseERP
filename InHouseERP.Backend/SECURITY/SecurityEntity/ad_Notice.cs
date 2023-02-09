using System;

namespace SecurityEntity
{
    public class ad_Notice
    {
        public long NoticeId { get; set; }
        public string NoticeContent { get; set; }
        public int SenderId { get; set; }
        public string SenderName { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}