using InventoryDAL;
using InventoryEntity;
using System;
using System.Collections.Generic;

namespace InventoryBLL
{
    public class pro_ProductionDashboardBLL
    {
        public pro_ProductionDashboardDAO pro_ProductionDashboardDAO { get; set; }

        public pro_ProductionDashboardBLL()
        {
            //pos_SalesOrderDAO = pos_SalesOrder.GetInstanceThreadSafe;
            pro_ProductionDashboardDAO = new pro_ProductionDashboardDAO();
        }

        public List<pro_ProductionDashboard> GetAllDashboardTotalProductionCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                return pro_ProductionDashboardDAO.GetAllDashboardTotalProductionCount(FromDate, ToDate);
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
                return pro_ProductionDashboardDAO.GetAllDashboardGraphForProductionMonthwiseCount(FromDate, ToDate);
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
                return pro_ProductionDashboardDAO.GetAllDashboardGraphForUsedMatProdMonthwiseCount(FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
