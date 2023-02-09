using SecurityEntity.SECURITY.SecurityDAL;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityBLL
{
   public class s_ReportNotificationDetailBLL
    {

        public s_ReportNotificationDetailBLL()
        {
            //ad_ApprovalDAO = ad_Approval.GetInstanceThreadSafe;
            s_ReportNotificationDetailDAO = new s_ReportNotificationDetailDAO();
        }

        public s_ReportNotificationDetailDAO s_ReportNotificationDetailDAO { get; set; }

        public List<s_ReportNotificationDetail> GetByReportCode(string ReportCode)
        {
            try
            {
                return s_ReportNotificationDetailDAO.GetByReportCode(ReportCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
