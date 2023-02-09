using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockReceiveDashboardDAO
    {
        private static volatile inv_StockReceiveDashboardDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockReceiveDashboardDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockReceiveDashboardDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockReceiveDashboardDAO();
                    }

                return instance;
            }
        }

        public static inv_StockReceiveDashboardDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockReceiveDashboardDAO();
            return instance;
        }

        public List<inv_StockReceiveDashboard> GetAllReceiveAndPurchaseNo(int? SupplierId = null)
        {
            try
            {
                var inv_StockReceiveDashboardLst = new List<inv_StockReceiveDashboard>();
                inv_StockReceiveDashboardLst =
                    dbExecutor.FetchData<inv_StockReceiveDashboard>(CommandType.StoredProcedure, "inv_StockReceiveAndPurchase_Get", null);
                return inv_StockReceiveDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockReceiveDashboard> GetStockReceiveDashboard(string whereCondition, string orderByExpression)
        {
            try
            {
                List<inv_StockReceiveDashboard> inv_StockReceiveDashboardLst = new List<inv_StockReceiveDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input),
                };
                inv_StockReceiveDashboardLst = dbExecutor.FetchData<inv_StockReceiveDashboard>(CommandType.StoredProcedure, "Inv_StockReceiveDashboard_GetDynamic", colparameters);
                return inv_StockReceiveDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
