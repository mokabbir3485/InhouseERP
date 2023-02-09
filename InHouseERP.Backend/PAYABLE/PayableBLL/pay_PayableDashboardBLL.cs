using PayableDAL;
using PayableEntity;
using System;
using System.Collections.Generic;

namespace PayableBLL
{
    public class pay_PayableDashboardBLL
    {
        public pay_PayableDashboardDAO pay_PayableDashboardDAO { get; set; }

        public pay_PayableDashboardBLL()
        {
            //pos_SalesOrderDAO = pos_SalesOrder.GetInstanceThreadSafe;
            pay_PayableDashboardDAO = new pay_PayableDashboardDAO();
        }

        public List<pay_PayableDashboard> GetAllDashboardTotalPaidVATAITAndAmount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                return pay_PayableDashboardDAO.GetAllDashboardTotalPaidVATAITAndAmount(FromDate, ToDate);
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
                return pay_PayableDashboardDAO.GetAllDashboardGraphForLocalAndOverseasePaidAmount(FromDate, ToDate);
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
                return pay_PayableDashboardDAO.GetAllDashboardGraph_MonthOrYearwisePaidAmount(FromDate, ToDate, ChartType);
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
                return pay_PayableDashboardDAO.GetAllDashboardGraphSupplierWiseTotalPaidAmount(FromDate, ToDate, TopValues);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
