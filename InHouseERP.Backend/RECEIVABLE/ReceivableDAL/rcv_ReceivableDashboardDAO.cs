using DbExecutor;
using ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Data;

namespace ReceivableDAL
{
    public class rcv_ReceivableDashboardDAO
    {
        private static volatile rcv_ReceivableDashboardDAO instance;
        private static readonly object lockObj = new object();
        public static rcv_ReceivableDashboardDAO GetInstance()
        {
            if (instance == null)
            {
                instance = new rcv_ReceivableDashboardDAO();
            }
            return instance;
        }
        public static rcv_ReceivableDashboardDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                {
                    lock (lockObj)
                    {
                        if (instance == null)
                        {
                            instance = new rcv_ReceivableDashboardDAO();
                        }
                    }
                }
                return instance;
            }
        }

        DBExecutor dbExecutor;
        public rcv_ReceivableDashboardDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public List<rcv_ReceivableDashboard> GetAllDashboardTotalCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<rcv_ReceivableDashboard> rcv_ReceivableDashboardLst = new List<rcv_ReceivableDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                rcv_ReceivableDashboardLst = dbExecutor.FetchData<rcv_ReceivableDashboard>(CommandType.StoredProcedure, "rcv_DashboardTotalCount", colparameters);
                return rcv_ReceivableDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_ReceivableDashboard> GetAllDashboardGraphForAdvPayRfund(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<rcv_ReceivableDashboard> rcv_ReceivableDashboardLst = new List<rcv_ReceivableDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                rcv_ReceivableDashboardLst = dbExecutor.FetchData<rcv_ReceivableDashboard>(CommandType.StoredProcedure, "rcv_DashboardGraphForAdvPayRfund", colparameters);
                return rcv_ReceivableDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_ReceivableDashboard> GetAllDashboardGraphForPaymentMonthOrYearwiseTotalAmount(DateTime? FromDate, DateTime? ToDate, string ChartType)
        {
            try
            {
                List<rcv_ReceivableDashboard> rcv_ReceivableDashboardLst = new List<rcv_ReceivableDashboard>();
                Parameters[] colparameters = new Parameters[3]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ChartType", ChartType, DbType.String, ParameterDirection.Input)
                };
                rcv_ReceivableDashboardLst = dbExecutor.FetchData<rcv_ReceivableDashboard>(CommandType.StoredProcedure, "rcv_DashboardGraphForPaymentMonthOrYearwiseTotalAmount", colparameters);
                return rcv_ReceivableDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_ReceivableDashboard> GetAllDashboardPaymentCompanyWiseTotalAmount(DateTime? FromDate, DateTime? ToDate, Int32 TopValues)
        {
            try
            {
                List<rcv_ReceivableDashboard> rcv_ReceivableDashboardLst = new List<rcv_ReceivableDashboard>();
                Parameters[] colparameters = new Parameters[3]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@TopValues", TopValues, DbType.Int32, ParameterDirection.Input)
                };
                rcv_ReceivableDashboardLst = dbExecutor.FetchData<rcv_ReceivableDashboard>(CommandType.StoredProcedure, "rcv_DashboardPaymentCompanyWiseTotalAmount", colparameters);
                return rcv_ReceivableDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
