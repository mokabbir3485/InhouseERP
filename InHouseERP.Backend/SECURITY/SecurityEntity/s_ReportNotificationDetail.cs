using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityEntity
{
   public class s_ReportNotificationDetail
    {
        public Int32 ReportId { get; set; }
        public string EmailId { get; set; }
        public string UserName { get; set; }
        public bool IsActive { get; set; }
        public Int32 NotificationReportDetailId { get; set; }
    }
}
