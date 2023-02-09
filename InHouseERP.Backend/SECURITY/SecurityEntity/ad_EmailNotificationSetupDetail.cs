using System;


namespace SecurityEntity
{
    public class ad_EmailNotificationSetupDetail
    {
        public long NotificationReportDetailId { get; set; }
        public long EmployeeId { get; set; }
        public string EmailId { get; set; }
        public string UserName { get; set; }
        public Int32 ReportId { get; set; }
        public bool IsActive { get; set; }
    }
}
