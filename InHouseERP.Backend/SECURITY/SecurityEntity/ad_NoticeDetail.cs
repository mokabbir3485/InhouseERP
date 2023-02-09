namespace SecurityEntity
{
    public class ad_NoticeDetail
    {
        public long NoticeDetailId { get; set; }
        public long NoticeId { get; set; }
        public int UserId { get; set; }
        public bool IsRead { get; set; }
    }
}