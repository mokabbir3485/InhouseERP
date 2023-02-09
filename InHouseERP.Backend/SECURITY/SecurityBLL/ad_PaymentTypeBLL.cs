using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityBLL
{
    public class ad_PaymentTypeBLL //: IDisposible
    {
        public ad_PaymentTypeBLL()
        {
            //ad_PaymentTypeDAO = ad_PaymentType.GetInstanceThreadSafe;
            ad_PaymentTypeDAO = new ad_PaymentTypeDAO();
        }

        public ad_PaymentTypeDAO ad_PaymentTypeDAO { get; set; }

        public List<pay_MobileBankingService> GetAll()
        {
            try
            {
                return ad_PaymentTypeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_PaymentType> GetAllActive()
        {
            try
            {
                return ad_PaymentTypeDAO.GetAllActive();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_PaymentSubType> PaymentSubTypeGet()
        {
            try
            {
                return ad_PaymentTypeDAO.PaymentSubTypeGet();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_PaymentType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_PaymentTypeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_ChequeType> GetChequeType(Int32? ChequeTypeId = null)
        {
            try
            {
                return ad_PaymentTypeDAO.GetChequeType(ChequeTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public List<ad_PaymentType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_PaymentTypeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_PaymentSubType> GetPaymentSubTypePaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_PaymentTypeDAO.GetPaymentSubTypePaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_PaymentType _ad_PaymentType)
        {
            try
            {
                return ad_PaymentTypeDAO.Add(_ad_PaymentType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int PaymentSubTypeAdd(ad_PaymentSubType _ad_PaymentSubType)
        {
            try
            {
                return ad_PaymentTypeDAO.PaymentSubTypeAdd(_ad_PaymentSubType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int Update(ad_PaymentType _ad_PaymentType)
        {
            try
            {
                return ad_PaymentTypeDAO.Update(_ad_PaymentType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int paymentTypeId)
        {
            try
            {
                return ad_PaymentTypeDAO.Delete(paymentTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}