using DbExecutor;
using SecurityEntity.RECEIVABLE.ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableDAL
{
   public class rcv_AgingDAO
    {
        private static volatile rcv_AgingDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_AgingDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_AgingDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_AgingDAO();
                    }

                return instance;
            }
        }

        public static rcv_AgingDAO GetInstance()
        {
            if (instance == null) instance = new rcv_AgingDAO();
            return instance;
        }

        public List<xrpt_rcv_Aging> AgingReport(Int32 DayRange)
        {
            try
            {
                var rcv_AgingReportList = new List<xrpt_rcv_Aging>();
                var colparameters = new Parameters[1]
                {

                    new Parameters("@DayRange",DayRange, DbType.Int32, ParameterDirection.Input),
                };
                rcv_AgingReportList = dbExecutor.FetchData<xrpt_rcv_Aging>(CommandType.StoredProcedure,
                    "xRpt_rcv_AgingReport", colparameters);
                return rcv_AgingReportList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_rcv_Aging> PayableAgingReport(Int32 DayRange)
        {
            try
            {
                var rcv_AgingReportList = new List<xrpt_rcv_Aging>();
                var colparameters = new Parameters[1]
                {

                    new Parameters("@DayRange",DayRange, DbType.Int32, ParameterDirection.Input),
                };
                rcv_AgingReportList = dbExecutor.FetchData<xrpt_rcv_Aging>(CommandType.StoredProcedure,
                    "xRpt_pay_AgingReport", colparameters);
                return rcv_AgingReportList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        

    }
}
