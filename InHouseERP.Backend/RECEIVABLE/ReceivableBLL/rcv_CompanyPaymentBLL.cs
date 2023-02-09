using ReceivableEntity;
using SecurityEntity.RECEIVABLE.ReceivableDAL;
using SecurityEntity.RECEIVABLE.ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableBLL
{
   public class rcv_CompanyPaymentBLL
    {
        public rcv_CompanyPaymentBLL()
        {
            //rcv_CompanyAdvanceDAO = rcv_CompanyAdvance.GetInstanceThreadSafe;
            rcv_CompanyPaymentDAO = new rcv_CompanyPaymentDAO();
        }

        public rcv_CompanyPaymentDAO rcv_CompanyPaymentDAO { get; set; }

        public List<xRpt_rcv_ReceivableReport> GetCompanyBankStatementReport(DateTime FormDate, DateTime ToDate, int BankAccountId)
        {
            try
            {
                return rcv_CompanyPaymentDAO.GetCompanyBankStatementReport(FormDate, ToDate, BankAccountId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetCompanyPaymentMaxNo()
        {
            try
            {
                return rcv_CompanyPaymentDAO.GetCompanyPaymentMaxNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetCompanyOpeningPaymentMaxNo()
        {
            try
            {
                return rcv_CompanyPaymentDAO.GetCompanyOpeningPaymentMaxNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyPayment> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return rcv_CompanyPaymentDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyPayment> GetPaymentDashboard(string CompanyIds, string PaymentTypeIds, DateTime FromDate, DateTime ToDate)
        {
            try
            {
                return rcv_CompanyPaymentDAO.GetPaymentDashboard(CompanyIds, PaymentTypeIds, FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        

        public List<rcv_CompanyAdvance> CompanyAdvancePayment_GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return rcv_CompanyPaymentDAO.CompanyAdvancePayment_GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_PaymentOnAccount> CompanyOnAccountPayment_GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return rcv_CompanyPaymentDAO.CompanyOnAccountPayment_GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        public List<rcv_CompanyPayment> CompanyPaymentGetByCompanyType(Int32 CompanyId)
        {
            try
            {
                return rcv_CompanyPaymentDAO.CompanyPaymentGetByCompanyType(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_PaymentOnAccount> CompanyPaymentOnAccountByCompanyId(Int32 CompanyId)
        {
            try
            {
                return rcv_CompanyPaymentDAO.CompanyPaymentOnAccountByCompanyId(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_CompanyAdvance> CompanyCurrentAdvancedGetByCompanyId(Int32 CompanyId)
        {
            try
            {
                return rcv_CompanyPaymentDAO.CompanyCurrentAdvancedGetByCompanyId(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long OpeningBalancePaymentPost(rcv_CompanyOpeningBalancePayment rcv_CompanyOpeningBalancePayment)
        {
            try
            {
                return rcv_CompanyPaymentDAO.OpeningBalancePaymentPost(rcv_CompanyOpeningBalancePayment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long Add(rcv_CompanyPayment _rcv_CompanyPayment)
        {
            try
            {
                return rcv_CompanyPaymentDAO.Add(_rcv_CompanyPayment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_CompanyPayment> CompanyPaymentGetPaged(int startRecordNo, int rowPerPage,
          string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return rcv_CompanyPaymentDAO.CompanyPaymentGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyPayment> CompanyOpeningPaymentGetPaged(int startRecordNo, int rowPerPage,
          string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return rcv_CompanyPaymentDAO.CompanyOpeningPaymentGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyLedger> CompanyLedger_Get(long companyId, string fromDate, string toDate)
        {
            try
            {
                return rcv_CompanyPaymentDAO.CompanyLedger_Get(companyId, fromDate, toDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
