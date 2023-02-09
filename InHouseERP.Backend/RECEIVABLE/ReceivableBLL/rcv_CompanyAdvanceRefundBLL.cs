using System;
using System.Collections.Generic;
using System.Data;
using ReceivableDAL;
using ReceivableEntity;

namespace ReceivableBLL
{
   public class rcv_CompanyAdvanceRefundBLL
    {
        public rcv_CompanyAdvanceRefundBLL()
        {
            //rcv_SaleRealizationDAO = rcv_SaleRealization.GetInstanceThreadSafe;
            rcv_CompanyAdvanceRefundDAO = new rcv_CompanyAdvanceRefundDAO();
        }

        public rcv_CompanyAdvanceRefundDAO rcv_CompanyAdvanceRefundDAO { get; set; }

        public List<rcv_CompanyAdvanceRefund> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return rcv_CompanyAdvanceRefundDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(rcv_CompanyAdvanceRefund rcv_CompanyAdvanceRefund)
        {
            try
            {
                return rcv_CompanyAdvanceRefundDAO.Post(rcv_CompanyAdvanceRefund);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<xrpt_rcv_CompanyAdvanceRefund> GetCompanyRefundReportById(Int64 RefundId)
        {
            try
            {
                return rcv_CompanyAdvanceRefundDAO.GetCompanyRefundReportById(RefundId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyAdvanceRefund> GetCompanyAdvance_GetAmountByCompanyId(Int64 CompanyId)
        {
            try
            {
                return rcv_CompanyAdvanceRefundDAO.GetCompanyAdvance_GetAmountByCompanyId(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
