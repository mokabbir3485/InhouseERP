using System;
using System.Collections.Generic;
using PayableDAO;
using PayableEntity;
using ReceivableEntity;

namespace PayableBLL
{
    public class pay_SupplierPaymentAndAdjustmentBLL
    {
        public pay_SupplierPaymentAndAdjustmentBLL()
        {
            pay_SupplierPaymentAndAdjustmentDAO = new pay_SupplierPaymentAndAdjustmentDAO();
        }

        public pay_SupplierPaymentAndAdjustmentDAO pay_SupplierPaymentAndAdjustmentDAO { get; set; }

        public List<pay_SupplierPaymentDetail> GetAll(long? SupplierPaymentId = null)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.GetAll(SupplierPaymentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetSupplierPaymentMaxNo()
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.GetSupplierPaymentMaxNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

         public Int64 GetMaxSupplierPaymentRefund()
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.GetMaxSupplierPaymentRefund();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetMaxSupplierPaymentAdjustment()
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.GetMaxSupplierPaymentAdjustment();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public Int64 GetSupplierOpeningPaymentMaxNo()
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.GetSupplierOpeningPaymentMaxNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

       
        public List<pay_SupplierPayment> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_SupplierPayment> SupplierPaymentDetailReport(string SupplierIds, DateTime? FromDate = null, DateTime? ToDate = null,int ? PaymentTypeId = null)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.SupplierPaymentDetailReport(SupplierIds, FromDate, ToDate, PaymentTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierPaymentAdjustmentDetail> SupplierAdjustmentDetailGetById(long SPAId)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.SupplierAdjustmentDetailGetById(SPAId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierPaymentAdjustment> SupplierPaymentAdjustmemtGetBySupplierId(long SupplierId)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.SupplierPaymentAdjustmentGetBySupplierId(SupplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierPaymentAdjustment> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(pay_SupplierPaymentAdjustment _proc_SupplierPaymentAdjustment)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.Post(_proc_SupplierPaymentAdjustment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long PostDetail(pay_SupplierPaymentAdjustmentDetail proc_SupplierPaymentAdjustmentDetail)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.PostDetail(proc_SupplierPaymentAdjustmentDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int SupplierPaymentAdjustmentDetailDeleteBySPAId(long SPAId)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.SupplierPaymentAdjustmentDetailDeleteBySPAId(SPAId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //SupplierPayment Part Start


        public List<xrpt_SupplierPayment> SupplierPaymentReport(long SupplierPaymentId, bool IsOpeningPayment)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.SupplierPaymentReport(SupplierPaymentId, IsOpeningPayment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<pay_SupplierPayment> SupplierIdsAndPaymentIds(string spIds, DateTime? FromDate = null, DateTime? ToDate = null)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.SupplierIdsAndPaymentIds(spIds, FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
         public List<pay_SupplierPayment> GetSupplierWiseOpeningBalance()
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.GetSupplierWiseOpeningBalance();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierPayment> SupplierPaymentGetBySupplierId(int SupplierId)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.SupplierPaymentGetBySupplierId(SupplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddDetail(pay_SupplierPaymentDetail pay_SupplierPaymentDetail)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.AddDetail(pay_SupplierPaymentDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long OpeningBalancePaymentPost(pay_SupplierOpeningBalancePayment proc_SupplierOpeningBalancePayment)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.OpeningBalancePaymentPost(
                    proc_SupplierOpeningBalancePayment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(pay_SupplierPayment proc_SupplierPayment)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.Add(proc_SupplierPayment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierLedger> SupplierLedger_Get(long supplierId, string fromDate, string toDate)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.SupplierLedger_Get(supplierId, fromDate, toDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierPayment> pay_SupplierPayment_GetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return pay_SupplierPaymentAndAdjustmentDAO.pay_SupplierPayment_GetPaged(startRecordNo, rowPerPage,
                    whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}