using DbExecutor;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityDAL
{
   public class s_ReportNotificationDetailDAO
    {

        private static volatile s_ReportNotificationDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_ReportNotificationDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_ReportNotificationDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_ReportNotificationDetailDAO();
                    }

                return instance;
            }
        }

        public static s_ReportNotificationDetailDAO GetInstance()
        {
            if (instance == null) instance = new s_ReportNotificationDetailDAO();
            return instance;
        }

     
        public List<s_ReportNotificationDetail> GetByReportCode(string ReportCode)
        {
            try
            {
                var s_ReportNotificationDetailList = new List<s_ReportNotificationDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReportCode", ReportCode, DbType.String, ParameterDirection.Input)
                };
                s_ReportNotificationDetailList = dbExecutor.FetchData<s_ReportNotificationDetail>(CommandType.StoredProcedure,
                    "s_EmailNotificationSetup_Get", colparameters);
                return s_ReportNotificationDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
