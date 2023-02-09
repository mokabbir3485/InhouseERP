using System;

namespace SecurityEntity
{
    public class ad_LoginLogoutLog
    {
        public long LoginLogoutLogId { get; set; }
        public int UserId { get; set; }
        public DateTime LogInTime { get; set; }
        public DateTime? LogOutTime { get; set; }
        public string IpAddress { get; set; }
        public bool IsLoggedIn { get; set; }
    }
}