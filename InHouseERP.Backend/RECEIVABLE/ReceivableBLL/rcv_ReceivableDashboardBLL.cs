using ReceivableDAL;
using ReceivableEntity;
using System;
using System.Collections.Generic;

namespace ReceivableBLL
{
    public class rcv_ReceivableDashboardBLL
    {
        public rcv_ReceivableDashboardDAO rcv_ReceivableDashboardDAO { get; set; }

        public rcv_ReceivableDashboardBLL()
        {
            //pos_SalesOrderDAO = pos_SalesOrder.GetInstanceThreadSafe;
            rcv_ReceivableDashboardDAO = new rcv_ReceivableDashboardDAO();
        }

        public List<rcv_ReceivableDashboard> GetAllDashboardTotalCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                return rcv_ReceivableDashboardDAO.GetAllDashboardTotalCount(FromDate, ToDate);
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
                return rcv_ReceivableDashboardDAO.GetAllDashboardGraphForAdvPayRfund(FromDate, ToDate);
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
                return rcv_ReceivableDashboardDAO.GetAllDashboardGraphForPaymentMonthOrYearwiseTotalAmount(FromDate, ToDate, ChartType);
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
                return rcv_ReceivableDashboardDAO.GetAllDashboardPaymentCompanyWiseTotalAmount(FromDate, ToDate, TopValues);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
