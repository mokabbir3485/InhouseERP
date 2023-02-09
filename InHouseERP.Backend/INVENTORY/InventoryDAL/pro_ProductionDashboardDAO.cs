using DbExecutor;
using InventoryEntity;
using System;
using System.Collections.Generic;
using System.Data;

namespace InventoryDAL
{
    public class pro_ProductionDashboardDAO
    {
        private static volatile pro_ProductionDashboardDAO instance;
        private static readonly object lockObj = new object();
        public static pro_ProductionDashboardDAO GetInstance()
        {
            if (instance == null)
            {
                instance = new pro_ProductionDashboardDAO();
            }
            return instance;
        }
        public static pro_ProductionDashboardDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                {
                    lock (lockObj)
                    {
                        if (instance == null)
                        {
                            instance = new pro_ProductionDashboardDAO();
                        }
                    }
                }
                return instance;
            }
        }

        DBExecutor dbExecutor;
        public pro_ProductionDashboardDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public List<pro_ProductionDashboard> GetAllDashboardTotalProductionCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pro_ProductionDashboard> pro_ProductionDashboardLst = new List<pro_ProductionDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pro_ProductionDashboardLst = dbExecutor.FetchData<pro_ProductionDashboard>(CommandType.StoredProcedure, "pro_DashboardTotalProductionCount", colparameters);
                return pro_ProductionDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pro_ProductionDashboard> GetAllDashboardGraphForProductionMonthwiseCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pro_ProductionDashboard> pro_ProductionDashboardLst = new List<pro_ProductionDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pro_ProductionDashboardLst = dbExecutor.FetchData<pro_ProductionDashboard>(CommandType.StoredProcedure, "pro_DashboardGraphForProductionMonthwiseCount", colparameters);
                return pro_ProductionDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pro_ProductionDashboard> GetAllDashboardGraphForUsedMatProdMonthwiseCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pro_ProductionDashboard> pro_ProductionDashboardLst = new List<pro_ProductionDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pro_ProductionDashboardLst = dbExecutor.FetchData<pro_ProductionDashboard>(CommandType.StoredProcedure, "pro_DashboardGraphForUsedMatProdMonthwiseCount", colparameters);
                return pro_ProductionDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
