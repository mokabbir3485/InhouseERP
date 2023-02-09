using System;


namespace SecurityEntity
{
    public class AppNotificationLog
    {
        public long NotificationLogId { get; set; }
        public int ReportId { get; set; }
        public int EmployeeId { get; set; }
        public int UserId { get; set; }
        public int DepartmentId { get; set; }
        public int SectionId { get; set; }
        public string ScreenUrl { get; set; }
        public string NotificaitonTitle { get; set; }
        public string NotificationDetail { get; set; }
        public bool IsRead { get; set; }
        public bool IsDelete { get; set; }
        public bool IsUpdate { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
