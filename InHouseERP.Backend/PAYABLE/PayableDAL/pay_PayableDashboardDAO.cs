using DbExecutor;
using PayableEntity;
using System;
using System.Collections.Generic;
using System.Data;

namespace PayableDAL
{
    public class pay_PayableDashboardDAO
    {
        private static volatile pay_PayableDashboardDAO instance;
        private static readonly object lockObj = new object();
        public static pay_PayableDashboardDAO GetInstance()
        {
            if (instance == null)
            {
                instance = new pay_PayableDashboardDAO();
            }
            return instance;
        }
        public static pay_PayableDashboardDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                {
                    lock (lockObj)
                    {
                        if (instance == null)
                        {
                            instance = new pay_PayableDashboardDAO();
                        }
                    }
                }
                return instance;
            }
        }

        DBExecutor dbExecutor;
        public pay_PayableDashboardDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public List<pay_PayableDashboard> GetAllDashboardTotalPaidVATAITAndAmount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pay_PayableDashboard> pay_PayableDashboardLst = new List<pay_PayableDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pay_PayableDashboardLst = dbExecutor.FetchData<pay_PayableDashboard>(CommandType.StoredProcedure, "pay_DashboardTotalPaidVATAITAndAmount", colparameters);
                return pay_PayableDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_PayableDashboard> GetAllDashboardGraphForLocalAndOverseasePaidAmount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<pay_PayableDashboard> pay_PayableDashboardLst = new List<pay_PayableDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pay_PayableDashboardLst = dbExecutor.FetchData<pay_PayableDashboard>(CommandType.StoredProcedure, "pay_DashboardGraphForLocalAndOverseasePaidAmount", colparameters);
                return pay_PayableDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_PayableDashboard> GetAllDashboardGraph_MonthOrYearwisePaidAmount(DateTime? FromDate, DateTime? ToDate, string ChartType)
        {
            try
            {
                List<pay_PayableDashboard> pay_PayableDashboardLst = new List<pay_PayableDashboard>();
                Parameters[] colparameters = new Parameters[3]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ChartType", ChartType, DbType.String, ParameterDirection.Input)
                };
                pay_PayableDashboardLst = dbExecutor.FetchData<pay_PayableDashboard>(CommandType.StoredProcedure, "pay_DashboardGraph_MonthOrYearwisePaidAmount", colparameters);
                return pay_PayableDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_PayableDashboard> GetAllDashboardGraphSupplierWiseTotalPaidAmount(DateTime? FromDate, DateTime? ToDate, Int32 TopValues)
        {
            try
            {
                List<pay_PayableDashboard> pay_PayableDashboardLst = new List<pay_PayableDashboard>();
                Parameters[] colparameters = new Parameters[3]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@TopValues", TopValues, DbType.Int32, ParameterDirection.Input)
                };
                pay_PayableDashboardLst = dbExecutor.FetchData<pay_PayableDashboard>(CommandType.StoredProcedure, "pay_DashboardGraphSupplierWiseTotalPaidAmount", colparameters);
                return pay_PayableDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
