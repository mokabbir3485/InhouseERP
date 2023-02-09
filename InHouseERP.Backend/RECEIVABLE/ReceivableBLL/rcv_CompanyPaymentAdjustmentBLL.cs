using ReceivableDAL;
using ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReceivableBLL
{
   public class rcv_CompanyPaymentAdjustmentBLL
    {
        public rcv_CompanyPaymentAdjustmentBLL()
        {
            //rcv_CompanyAdvanceDAO = rcv_CompanyAdvance.GetInstanceThreadSafe;
            rcv_CompanyPaymentAdjustmentDAO = new rcv_CompanyPaymentAdjustmentDAO();
        }

        public rcv_CompanyPaymentAdjustmentDAO rcv_CompanyPaymentAdjustmentDAO { get; set; }

        public long Post(rcv_CompanyPaymentAdjustment _rcv_CompanyPaymentAdjustment)
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDAO.Post(_rcv_CompanyPaymentAdjustment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_CompanyPaymentAdjustment> CompanyPaymentAdjustmentGetPaged(int startRecordNo, int rowPerPage,
         string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDAO.CompanyPaymentAdjustmentGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        //public List<rcv_CompanyPaymentAdjustment> GetAllCompanyWithSales()
        //{
        //    try
        //    {
        //        return rcv_CompanyPaymentAdjustmentDAO.GetAllCompanyWithSales();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        public List<rcv_CompanyLedger> CompanyLedger_Get(int CompanyId, string fromDate, string toDate)
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDAO.CompanyLedger_Get(CompanyId, fromDate, toDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
