using System;


namespace SecurityEntity
{
    public class AppNotificationSetup
    {
        public int AppNotificationId { get; set; }
        public int EmployeeId { get; set; }
        public int UserId { get; set; }
        public int DepartmentId { get; set; }
        public int SectionId { get; set; }
        public int ReportId { get; set; }
        public string ReportName { get; set; }
        public string RoleName { get; set; }
        public string EmployeeName { get; set; }
        public string ScreenUrl { get; set; }
        public string Status { get; set; }
        public int RoleId { get; set; }
        public bool IsActive { get; set; }
    }
}
