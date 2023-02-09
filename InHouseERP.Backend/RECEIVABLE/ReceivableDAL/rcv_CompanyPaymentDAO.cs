using DbExecutor;
using ReceivableEntity;
using SecurityEntity.RECEIVABLE.ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableDAL
{
   public class rcv_CompanyPaymentDAO
    {

        private static volatile rcv_CompanyPaymentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_CompanyPaymentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_CompanyPaymentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_CompanyPaymentDAO();
                    }

                return instance;
            }
        }

        public static rcv_CompanyPaymentDAO GetInstance()
        {
            if (instance == null) instance = new rcv_CompanyPaymentDAO();
            return instance;
        }
        public List<xRpt_rcv_ReceivableReport> GetCompanyBankStatementReport(DateTime FormDate, DateTime ToDate, int BankAccountId)
        {
            try
            {
                List<xRpt_rcv_ReceivableReport> rcv_ReceivableReportLst = new List<xRpt_rcv_ReceivableReport>();
                Parameters[] colparameters = new Parameters[3]{
                    new Parameters("@FromDate", FormDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@BankAccountId", BankAccountId, DbType.Int32, ParameterDirection.Input)
                };
                rcv_ReceivableReportLst = dbExecutor.FetchData<xRpt_rcv_ReceivableReport>(CommandType.StoredProcedure, "rcv_ReceiverBank_Statement", colparameters);
                return rcv_ReceivableReportLst;
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
                Int64 MaxCompanyPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxCompanyPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_GetMaxCompanyPaymentNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxCompanyPaymentNo;
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
                Int64 MaxCompanyOpeningPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxCompanyOpeningPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_GetMaxCompanyOpeningPaymentNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxCompanyOpeningPaymentNo;
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
                var rcv_CompanyPaymentLst = new List<rcv_CompanyPayment>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyPaymentLst = dbExecutor.FetchData<rcv_CompanyPayment>(CommandType.StoredProcedure,
                    "rcv_CompanyPayment_GetDynamic", colparameters);
                return rcv_CompanyPaymentLst;
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
                var rcv_CompanyPaymentLst = new List<rcv_CompanyPayment>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@CompanyIds", CompanyIds, DbType.String, ParameterDirection.Input),
                    new Parameters("@PaymentTypeIds", PaymentTypeIds, DbType.String, ParameterDirection.Input),
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                };
                rcv_CompanyPaymentLst = dbExecutor.FetchData<rcv_CompanyPayment>(CommandType.StoredProcedure,
                    "rcv_CompanyPayment_GetForCompanyDashboard", colparameters);
                return rcv_CompanyPaymentLst;
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
                var rcv_CompanyAdvanceLst = new List<rcv_CompanyAdvance>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyAdvanceLst = dbExecutor.FetchData<rcv_CompanyAdvance>(CommandType.StoredProcedure,
                    "rcv_CompanyAdvancePayment_GetDynamic", colparameters);
                return rcv_CompanyAdvanceLst;
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
                var rcv_PaymentOnAccountList = new List<rcv_PaymentOnAccount>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                rcv_PaymentOnAccountList = dbExecutor.FetchData<rcv_PaymentOnAccount>(CommandType.StoredProcedure,
                    "rcv_CompanyOnAccountPayment_GetDynamic", colparameters);
                return rcv_PaymentOnAccountList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<rcv_CompanyPayment> CompanyPaymentGetByCompanyType( Int32 CompanyId)
        {
            try
            {
                var rcv_CompanyPaymentList = new List<rcv_CompanyPayment>();
                var colparameters = new Parameters[1]
                {
                 
                    new Parameters("@CompanyId", CompanyId, DbType.Int32, ParameterDirection.Input),
                };
                rcv_CompanyPaymentList = dbExecutor.FetchData<rcv_CompanyPayment>(CommandType.StoredProcedure,
                    "pos_SalesInvoice_GetByCompanyId", colparameters);
                return rcv_CompanyPaymentList;
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
                var rcv_PaymentOnAccountList = new List<rcv_PaymentOnAccount>();
                var colparameters = new Parameters[1]
                {

                    new Parameters("@CompanyId", CompanyId, DbType.Int32, ParameterDirection.Input),
                };
                rcv_PaymentOnAccountList = dbExecutor.FetchData<rcv_PaymentOnAccount>(CommandType.StoredProcedure,
                    "rcv_CompanyOnAccount_GetAmountByCompanyId", colparameters);
                return rcv_PaymentOnAccountList;
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
                var rcv_CompanyAdvanceList = new List<rcv_CompanyAdvance>();
                var colparameters = new Parameters[1]
                {

                    new Parameters("@CompanyId", CompanyId, DbType.Int32, ParameterDirection.Input),
                };
                rcv_CompanyAdvanceList = dbExecutor.FetchData<rcv_CompanyAdvance>(CommandType.StoredProcedure,
                    "rcv_CompanyCurrentAdvancedGetByCompanyId", colparameters);
                return rcv_CompanyAdvanceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long OpeningBalancePaymentPost(rcv_CompanyOpeningBalancePayment rcv_CompanyOpeningBalancePayment)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[17]
                {
                    new Parameters("@CompanyOpeningBalancePaymentId",
                        rcv_CompanyOpeningBalancePayment.CompanyOpeningBalancePaymentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", rcv_CompanyOpeningBalancePayment.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", rcv_CompanyOpeningBalancePayment.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentDate ", rcv_CompanyOpeningBalancePayment.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ReceiptVoucherNo ", rcv_CompanyOpeningBalancePayment.ReceiptVoucherNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CompanyOpeningPaymentNo", rcv_CompanyOpeningBalancePayment.CompanyOpeningPaymentNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", rcv_CompanyOpeningBalancePayment.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeTypeId", rcv_CompanyOpeningBalancePayment.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", rcv_CompanyOpeningBalancePayment.ChequeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeDate", rcv_CompanyOpeningBalancePayment.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@CustomerBankAccountId", rcv_CompanyOpeningBalancePayment.CustomerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReceiverBankAccountId", rcv_CompanyOpeningBalancePayment.ReceiverBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaidAmount", rcv_CompanyOpeningBalancePayment.PaidAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalVAT", rcv_CompanyOpeningBalancePayment.TotalVAT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalAIT", rcv_CompanyOpeningBalancePayment.TotalAIT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", rcv_CompanyOpeningBalancePayment.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", rcv_CompanyOpeningBalancePayment.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "rcv_CompanyOpeningBalancePayment_Post", colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }

        public long Add(rcv_CompanyPayment _rcv_CompanyPayment)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[25]
                {
                    new Parameters("@CompanyId ", _rcv_CompanyPayment.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                      new Parameters("@ChequeTypeId ", _rcv_CompanyPayment.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    
                    new Parameters("@PaymentDate", _rcv_CompanyPayment.PaymentDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _rcv_CompanyPayment.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _rcv_CompanyPayment.Remarks, DbType.String,
                        ParameterDirection.Input), 
                    new Parameters("@CompanyPaymentNo", _rcv_CompanyPayment.CompanyPaymentNo, DbType.String,
                        ParameterDirection.Input),
                       new Parameters("@ConversionAmount", _rcv_CompanyPayment.ConversionAmount, DbType.Decimal,
                        ParameterDirection.Input),
                          new Parameters("@CurrencyId", _rcv_CompanyPayment.CurrencyId, DbType.Int32,
                        ParameterDirection.Input),
                             new Parameters("@ConversionRate", _rcv_CompanyPayment.ConversionRate, DbType.Decimal,
                        ParameterDirection.Input),
                  
                  
                    new Parameters("@ChequeDate", _rcv_CompanyPayment.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),

                    new Parameters("@CustomerBankAccountId", _rcv_CompanyPayment.CustomerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReceiverBankAccountId", _rcv_CompanyPayment.ReceiverBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaidAmount", _rcv_CompanyPayment.PaidAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalVAT", _rcv_CompanyPayment.TotalVAT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalAIT", _rcv_CompanyPayment.TotalAIT, DbType.Decimal,
                        ParameterDirection.Input),
                     new Parameters("@UpdatorId", _rcv_CompanyPayment.UpdatorId, DbType.String,
                        ParameterDirection.Input),
                      new Parameters("@UpdatedDate", _rcv_CompanyPayment.UpdatedDate, DbType.String,
                        ParameterDirection.Input),
                       new Parameters("@MoneyReceiptNo", _rcv_CompanyPayment.MoneyReceiptNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", _rcv_CompanyPayment.ChequeNo, DbType.String,
                        ParameterDirection.Input),

                        new Parameters("@MobileBankingServiceId", _rcv_CompanyPayment.MobileBankingServiceId, DbType.Int32,
                        ParameterDirection.Input),
                         new Parameters("@MobileNo", _rcv_CompanyPayment.MobileNo, DbType.String,
                        ParameterDirection.Input),
                          new Parameters("@TransactionNo", _rcv_CompanyPayment.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                         new Parameters("@ReceiptVoucherNo", _rcv_CompanyPayment.ReceiptVoucherNo, DbType.String,
                        ParameterDirection.Input),
                       new Parameters("@FromBranch", _rcv_CompanyPayment.FromBranch, DbType.String,
                        ParameterDirection.Input),
                        new Parameters("@TotalAdditionalCost", _rcv_CompanyPayment.TotalAdditionalCost, DbType.Decimal,
                        ParameterDirection.Input),


                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_CompanyPayment_Create",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }


        public List<rcv_CompanyPayment> CompanyPaymentGetPaged(int startRecordNo, int rowPerPage,
          string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var rcv_CompanyPaymentList = new List<rcv_CompanyPayment>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyPaymentList = dbExecutor.FetchDataRef<rcv_CompanyPayment>(CommandType.StoredProcedure,
                    "rcv_CompanyPayment_GetPaged", colparameters, ref rows);
                return rcv_CompanyPaymentList;
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
                var rcv_CompanyPaymentList = new List<rcv_CompanyPayment>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyPaymentList = dbExecutor.FetchDataRef<rcv_CompanyPayment>(CommandType.StoredProcedure,
                    "rcv_CompanyOpeningBalancePayment_GetPaged", colparameters, ref rows);
                return rcv_CompanyPaymentList;
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
                var rcv_CompanyLedgerList = new List<rcv_CompanyLedger>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@companyId", companyId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@fromDate", fromDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@toDate", toDate, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyLedgerList = dbExecutor.FetchData<rcv_CompanyLedger>(CommandType.StoredProcedure,
                    "rcv_CompanyLedger", colparameters);
                return rcv_CompanyLedgerList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
