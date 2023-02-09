using System;
using System.Collections.Generic;
using DbExecutor;

namespace SecurityEntity
{
    public class s_SystemNotification
    {
        public Int64 NotificationId { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public DateTime? Maintenance_StartTime { get; set; }
        public string Maintenance_StartTimeStr { get; set; }

        public DateTime? Maintenance_EndTime { get; set; }
        public string Maintenance_EndTimeStr { get; set; }
        public DateTime? CurrentDateTime { get; set; }
        public Int64 SystemBlockCountDown { get; set; }
        public Boolean IsActive { get; set; }
        public Boolean IsMaintenance { get; set; }
        public Boolean IsLoginPermission { get; set; }
        public Boolean IsNotify { get; set; }
        public Boolean IsUpdate { get; set; }

    }
}
