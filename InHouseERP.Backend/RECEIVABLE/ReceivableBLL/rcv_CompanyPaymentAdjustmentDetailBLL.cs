using SecurityEntity.RECEIVABLE.ReceivableDAL;
using SecurityEntity.RECEIVABLE.ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableBLL
{
   public class rcv_CompanyPaymentAdjustmentDetailBLL
    {
        public rcv_CompanyPaymentAdjustmentDetailBLL()
        {
            //rcv_CompanyAdvanceDAO = rcv_CompanyAdvance.GetInstanceThreadSafe;
            rcv_CompanyPaymentAdjustmentDetailDAO = new rcv_CompanyPaymentAdjustmentDetailDAO();
        }

        public rcv_CompanyPaymentAdjustmentDetailDAO rcv_CompanyPaymentAdjustmentDetailDAO { get; set; }


        public List<rcv_CompanyPaymentAdjustmentDetail> rcv_CompanyPaymentAdjustmentByCompanyId(Int32 CompanyId)
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDetailDAO.rcv_CompanyPaymentAdjustmentByCompanyId(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Int64 GetCompanyPaymentRefundMaxNo()
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDetailDAO.GetCompanyPaymentRefundMaxNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Int64 GetCompanyPaymentAdjustmentMaxNo()
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDetailDAO.GetCompanyPaymentAdjustmentMaxNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddDetail(rcv_CompanyPaymentAdjustmentDetail _rcv_CompanyPaymentAdjustmentDetail)
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDetailDAO.AddDetail(_rcv_CompanyPaymentAdjustmentDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long CompanyPaymentAdjustmentDetailUpdate(rcv_CompanyPaymentAdjustmentDetail _rcv_CompanyPaymentAdjustmentDetail)
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDetailDAO.CompanyPaymentAdjustmentDetailUpdate(_rcv_CompanyPaymentAdjustmentDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xrpt_CompanyPaymentAdjustment> rcv_CompanyPaymentAdjustmentByReport(Int64 CPAId)
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDetailDAO.rcv_CompanyPaymentAdjustmentByReport(CPAId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_CompanyPaymentAdjustmentDetail> CompanyPaymentAdjustmentGetByCPAId(Int64 CPAId)
        {
            try
            {
                return rcv_CompanyPaymentAdjustmentDetailDAO.CompanyPaymentAdjustmentGetByCPAId(CPAId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
