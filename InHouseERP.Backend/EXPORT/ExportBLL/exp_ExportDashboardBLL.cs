using System;
using System.Collections;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;


namespace ExportBLL
{
    public class exp_ExportDashboardBLL
    {
        public exp_ExportDashboardBLL()
        {
            //exp_CommercialInvoiceDAO = exp_CommercialInvoice.GetInstanceThreadSafe;
            exp_ExportDashboardDAO = new exp_ExportDashboardDAO();
        }
        public exp_ExportDashboardDAO exp_ExportDashboardDAO { get; set; }

        public List<exp_ExportDashboard> GetAllDashboardCompanyWiseTotalCi(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                return exp_ExportDashboardDAO.GetAllDashboardCompanyWiseTotalCi(FromDate, ToDate);
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
                return exp_ExportDashboardDAO.GetAllDashboardGraphForPiCiMonthwiseCount(FromDate, ToDate);
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
                return exp_ExportDashboardDAO.GetAllDashboardPaymentProcessWiseTotalCi(FromDate, ToDate);
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
                return exp_ExportDashboardDAO.GetAllDashboardTotalPiCiCount(FromDate, ToDate);
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
                return exp_ExportDashboardDAO.GetAllDashboardGraphCiAmountMonthwise(FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
