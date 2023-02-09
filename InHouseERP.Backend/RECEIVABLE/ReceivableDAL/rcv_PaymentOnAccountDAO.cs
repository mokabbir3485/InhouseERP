using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ReceivableEntity;


namespace ReceivableDAL
{
    public class rcv_PaymentOnAccountDAO //: IDisposible
    {
        private static volatile rcv_PaymentOnAccountDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_PaymentOnAccountDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_PaymentOnAccountDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_PaymentOnAccountDAO();
                    }

                return instance;
            }
        }

        public static rcv_PaymentOnAccountDAO GetInstance()
        {
            if (instance == null) instance = new rcv_PaymentOnAccountDAO();
            return instance;
        }

        public List<rcv_PaymentOnAccount> GetAll(long? OnAccountId = null)
        {
            try
            {
                var rcv_PaymentOnAccountLst = new List<rcv_PaymentOnAccount>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@OnAccountId", OnAccountId, DbType.Int32, ParameterDirection.Input)
                };
                rcv_PaymentOnAccountLst = dbExecutor.FetchData<rcv_PaymentOnAccount>(CommandType.StoredProcedure,
                    "rcv_PaymentOnAccount_Get", colparameters);
                return rcv_PaymentOnAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_PaymentOnAccount> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var rcv_PaymentOnAccountLst = new List<rcv_PaymentOnAccount>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                rcv_PaymentOnAccountLst = dbExecutor.FetchData<rcv_PaymentOnAccount>(CommandType.StoredProcedure,
                    "rcv_PaymentOnAccount_GetDynamic", colparameters);
                return rcv_PaymentOnAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string  Post(rcv_PaymentOnAccount rcv_PaymentOnAccount)
        {
            string ret = "";
            try
            {
                var colparameters = new Parameters[17]
                {
                    new Parameters("@OnAccountId", rcv_PaymentOnAccount.OnAccountId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", rcv_PaymentOnAccount.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@OnAccountAmount", rcv_PaymentOnAccount.OnAccountAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OnAccountDate", rcv_PaymentOnAccount.OnAccountDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@BankAccountId", rcv_PaymentOnAccount.BankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MobileBankingServiceId", rcv_PaymentOnAccount.MobileBankingServiceId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TransactionNo", rcv_PaymentOnAccount.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", rcv_PaymentOnAccount.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", rcv_PaymentOnAccount.ChequeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeTypeId", rcv_PaymentOnAccount.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeDate", rcv_PaymentOnAccount.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    //new Parameters("@CreatorId", rcv_PaymentOnAccount.CreatorId, DbType.Int32,
                    //    ParameterDirection.Input),
                    new Parameters("@UpdatorId", rcv_PaymentOnAccount.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MoneyReceiptNo", rcv_PaymentOnAccount.MoneyReceiptNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MobileNo", rcv_PaymentOnAccount.MobileNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@OnAccountNo", rcv_PaymentOnAccount.OnAccountNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ReceiptVoucherNo", rcv_PaymentOnAccount.ReceiptVoucherNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsCancelled", rcv_PaymentOnAccount.IsCancelled, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "rcv_CompanyOnAccountPayment_post",
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
        public List<rcv_PaymentOnAccount> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var rcv_PaymentOnAccountLst = new List<rcv_PaymentOnAccount>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_PaymentOnAccountLst = dbExecutor.FetchDataRef<rcv_PaymentOnAccount>(CommandType.StoredProcedure,
                    "rcv_CompanyOnAccountPayment_GetPaged", colparameters, ref rows);
                return rcv_PaymentOnAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetMaxCompanyPaymentOnAccount(DateTime onAccountDate)
        {
            try
            {
                var aCommon = new Common();
                var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(onAccountDate);

                var colparameters = new Parameters[2]
                {
                    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                };

                long maxJissueNo = 0;
                string JIssueNo;
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxJissueNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "rcv_GetMaxOnAccountNo", colparameters, true);
                var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(onAccountDate);
                JIssueNo = "CPA/" + aFiscalYearPart + "/" + maxJissueNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return JIssueNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
