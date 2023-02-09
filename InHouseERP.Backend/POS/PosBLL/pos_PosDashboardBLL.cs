using PosDAL;
using PosEntity;
using SecurityEntity.POS.PosEntity;
using System;
using System.Collections.Generic;
namespace PosBLL
{
    public class pos_PosDashboardBLL
    {
        public pos_PosDashboardDAO pos_PosDashboardDAO { get; set; }

        public pos_PosDashboardBLL()
        {
            //pos_SalesOrderDAO = pos_SalesOrder.GetInstanceThreadSafe;
            pos_PosDashboardDAO = new pos_PosDashboardDAO();
        }

        public List<pos_PosDashboard> GetAllDashboardGraphForSoIwoSi(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                return pos_PosDashboardDAO.GetAllDashboardGraphForSoIwoSi(FromDate, ToDate);
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
                return pos_PosDashboardDAO.GetAllDashboardGraphSiAmountMonthwise(FromDate, ToDate);
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
                return pos_PosDashboardDAO.GetAllDashboardCompanyWiseTotalSo(FromDate, ToDate);
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
                return pos_PosDashboardDAO.GetAllDashboardTotalSoIwoSiCount(FromDate, ToDate);
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
                return pos_PosDashboardDAO.GetAllDashboardTotalExportImportCount(FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
