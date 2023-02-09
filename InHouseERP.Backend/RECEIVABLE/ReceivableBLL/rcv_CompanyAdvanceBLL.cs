using System;
using System.Collections.Generic;
using System.Data;
using ReceivableDAL;
using ReceivableEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace ReceivableBLL
{
    public class rcv_CompanyAdvanceBLL //: IDisposible
    {
        public rcv_CompanyAdvanceBLL()
        {
            //rcv_CompanyAdvanceDAO = rcv_CompanyAdvance.GetInstanceThreadSafe;
            rcv_CompanyAdvanceDAO = new rcv_CompanyAdvanceDAO();
        }

        public rcv_CompanyAdvanceDAO rcv_CompanyAdvanceDAO { get; set; }

        public List<rcv_CompanyAdvance> GetAll()
        {
            try
            {
                return rcv_CompanyAdvanceDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string GetByVoucherGenerate(string VoucherName)
        {
            try
            {
                return rcv_CompanyAdvanceDAO.GetByVoucherGenerate(VoucherName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

     
        public List<rcv_CompanyAdvance> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return rcv_CompanyAdvanceDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Post(rcv_CompanyAdvance rcv_CompanyAdvance)
        {
            try
            {
                return rcv_CompanyAdvanceDAO.Post(rcv_CompanyAdvance);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyAdvance> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return rcv_CompanyAdvanceDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Int64 GetMaxCompanyAdvancedNo()
        {
            try
            {
                return rcv_CompanyAdvanceDAO.GetMaxCompanyAdvancedNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_PaymentSector> GetAllAdvancePaymentSector()
        {
            try
            {
                return rcv_CompanyAdvanceDAO.GetAllAdvancePaymentSector();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}