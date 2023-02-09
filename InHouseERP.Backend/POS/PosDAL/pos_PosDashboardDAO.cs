using DbExecutor;
using PosEntity;
using System;
using System.Collections.Generic;
using System.Data;

namespace PosDAL
{
    public class pos_PosDashboardDAO
    {
        private static volatile pos_PosDashboardDAO instance;
        private static readonly object lockObj = new object();
        public static pos_PosDashboardDAO GetInstance()
        {
            if (instance == null)
            {
                instance = new pos_PosDashboardDAO();
            }
            return instance;
        }
        public static pos_PosDashboardDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                {
                    lock (lockObj)
                    {
                        if (instance == null)
                        {
                            instance = new pos_PosDashboardDAO();
                        }
                    }
                }
                return instance;
            }
        }

        DBExecutor dbExecutor;
        public pos_PosDashboardDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public List<pos_PosDashboard> GetAllDashboardGraphForSoIwoSi(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pos_PosDashboard> pos_PosDashboardLst = new List<pos_PosDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pos_PosDashboardLst = dbExecutor.FetchData<pos_PosDashboard>(CommandType.StoredProcedure, "pos_DashboardGraphForSoIwoSi", colparameters);
                return pos_PosDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_PosDashboard> GetAllDashboardGraphSiAmountMonthwise(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pos_PosDashboard> pos_PosDashboardSiAmountLst = new List<pos_PosDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pos_PosDashboardSiAmountLst = dbExecutor.FetchData<pos_PosDashboard>(CommandType.StoredProcedure, "pos_DashboardGraphSiAmountMonthwise", colparameters);
                return pos_PosDashboardSiAmountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_PosDashboard> GetAllDashboardCompanyWiseTotalSo(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pos_PosDashboard> pos_DashboardCompanyWiseTotalSoLst = new List<pos_PosDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pos_DashboardCompanyWiseTotalSoLst = dbExecutor.FetchData<pos_PosDashboard>(CommandType.StoredProcedure, "pos_DashboardCompanyWiseTotalSo", colparameters);
                return pos_DashboardCompanyWiseTotalSoLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_PosDashboard> GetAllDashboardTotalSoIwoSiCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pos_PosDashboard> pos_DashboardTotalSoIwoSiCountLst = new List<pos_PosDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pos_DashboardTotalSoIwoSiCountLst = dbExecutor.FetchData<pos_PosDashboard>(CommandType.StoredProcedure, "pos_DashboardTotalSoIwoSiCount", colparameters);
                return pos_DashboardTotalSoIwoSiCountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pos_PosDashboard> GetAllDashboardTotalExportImportCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pos_PosDashboard> pos_DashboardTotalExportImportCountLst = new List<pos_PosDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pos_DashboardTotalExportImportCountLst = dbExecutor.FetchData<pos_PosDashboard>(CommandType.StoredProcedure, "pos_DashboardTotalExportImportCount", colparameters);
                return pos_DashboardTotalExportImportCountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
