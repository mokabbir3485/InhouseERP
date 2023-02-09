using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_ExportDashboardDAO
    {
        private static volatile exp_ExportDashboardDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_ExportDashboardDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_ExportDashboardDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_ExportDashboardDAO();
                    }

                return instance;
            }
        }

        public static exp_ExportDashboardDAO GetInstance()
        {
            if (instance == null) instance = new exp_ExportDashboardDAO();
            return instance;
        }

        public List<exp_ExportDashboard> GetAllDashboardCompanyWiseTotalCi(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<exp_ExportDashboard> pos_DashboardCompanyWiseTotalCiLst = new List<exp_ExportDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pos_DashboardCompanyWiseTotalCiLst = dbExecutor.FetchData<exp_ExportDashboard>(CommandType.StoredProcedure, "exp_DashboardCompanyWiseTotalCi", colparameters);
                return pos_DashboardCompanyWiseTotalCiLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<exp_ExportDashboard> GetAllDashboardGraphForPiCiMonthwiseCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<exp_ExportDashboard> exp_ExportDashboardLst = new List<exp_ExportDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                exp_ExportDashboardLst = dbExecutor.FetchData<exp_ExportDashboard>(CommandType.StoredProcedure, "exp_DashboardGraphForPiCiMonthwiseCount", colparameters);
                return exp_ExportDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<exp_ExportDashboard> GetAllDashboardPaymentProcessWiseTotalCi(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<exp_ExportDashboard> exp_ExportDashboardLst = new List<exp_ExportDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                exp_ExportDashboardLst = dbExecutor.FetchData<exp_ExportDashboard>(CommandType.StoredProcedure, "exp_DashboardPaymentProcessWiseTotalCi", colparameters);
                return exp_ExportDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<exp_ExportDashboard> GetAllDashboardTotalPiCiCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<exp_ExportDashboard> exp_ExportDashboardLst = new List<exp_ExportDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                exp_ExportDashboardLst = dbExecutor.FetchData<exp_ExportDashboard>(CommandType.StoredProcedure, "exp_DashboardTotalPiCiCount", colparameters);
                return exp_ExportDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<exp_ExportDashboard> GetAllDashboardGraphCiAmountMonthwise(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<exp_ExportDashboard> exp_ExportDashboardLst = new List<exp_ExportDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                exp_ExportDashboardLst = dbExecutor.FetchData<exp_ExportDashboard>(CommandType.StoredProcedure, "pos_DashboardGraphCiAmountMonthwise", colparameters);
                return exp_ExportDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
