using SecurityEntity.RECEIVABLE.ReceivableDAL;
using SecurityEntity.RECEIVABLE.ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableBLL
{
   public class rcv_CompanyPaymentDetailBLL
    {
        public rcv_CompanyPaymentDetailBLL()
        {
            //rcv_CompanyAdvanceDAO = rcv_CompanyAdvance.GetInstanceThreadSafe;
            rcv_CompanyPaymentDetailDAO = new rcv_CompanyPaymentDetailDAO();
        }

        public rcv_CompanyPaymentDetailDAO rcv_CompanyPaymentDetailDAO { get; set; }

        public long Add(rcv_CompanyPaymentDetail rcv_CompanyPaymentDetail)
        {
            try
            {
                return rcv_CompanyPaymentDetailDAO.Add(rcv_CompanyPaymentDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyPaymentDetail> GetCompanyPaymentDetailByCompanyPaymentId(long CompanyPaymentId)
        {
            try
            {
                return rcv_CompanyPaymentDetailDAO.GetCompanyPaymentDetailByCompanyPaymentId(CompanyPaymentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_rcv_CompanyPayment> xrpt_rcv_CompanyPayment_GetByCompanyPaymentId(Int64 CompanyPaymentId, bool IsOpeningPayment)
        {
            try
            {
                return rcv_CompanyPaymentDetailDAO.xrpt_rcv_CompanyPayment_GetByCompanyPaymentId(CompanyPaymentId, IsOpeningPayment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

      
    }
}
