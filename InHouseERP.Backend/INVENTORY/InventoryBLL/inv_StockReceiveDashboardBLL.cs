using System;
using System.Collections.Generic;
using System.Linq;
using InventoryDAL;
using InventoryEntity;


namespace InventoryBLL
{
    public class inv_StockReceiveDashboardBLL
    {
        public inv_StockReceiveDashboardBLL()
        {
            //inv_StockReceiveDashboardDAO = inv_StockReceive.GetInstanceThreadSafe;
            inv_StockReceiveDashboardDAO = new inv_StockReceiveDashboardDAO();
        }

        public inv_StockReceiveDashboardDAO inv_StockReceiveDashboardDAO { get; set; }

        public List<inv_StockReceiveDashboard> GetAllReceiveAndPurchaseNo()
        {
            try
            {
                return inv_StockReceiveDashboardDAO.GetAllReceiveAndPurchaseNo();
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
                return inv_StockReceiveDashboardDAO.GetStockReceiveDashboard(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
