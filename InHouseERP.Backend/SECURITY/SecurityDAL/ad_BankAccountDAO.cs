using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_BankAccountDAO //: IDisposible
    {
        private static volatile ad_BankAccountDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_BankAccountDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_BankAccountDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_BankAccountDAO();
                    }

                return instance;
            }
        }

        public static ad_BankAccountDAO GetInstance()
        {
            if (instance == null) instance = new ad_BankAccountDAO();
            return instance;
        }

        public List<ad_BankAccount> GetAll(int? bankAccountId = null)
        {
            try
            {
                var ad_BankAccountLst = new List<ad_BankAccount>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BankAccountId", bankAccountId, DbType.Int32, ParameterDirection.Input)
                };
                ad_BankAccountLst = dbExecutor.FetchData<ad_BankAccount>(CommandType.StoredProcedure,
                    "ad_BankAccount_Get", colparameters);
                return ad_BankAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BankAccount> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_BankAccountLst = new List<ad_BankAccount>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_BankAccountLst = dbExecutor.FetchData<ad_BankAccount>(CommandType.StoredProcedure,
                    "ad_BankAccount_GetDynamic", colparameters);
                return ad_BankAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BankAccount> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_BankAccountLst = new List<ad_BankAccount>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_BankAccountLst = dbExecutor.FetchDataRef<ad_BankAccount>(CommandType.StoredProcedure,
                    "ad_BankAccount_GetPaged", colparameters, ref rows);
                return ad_BankAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_BankAccount _ad_BankAccount)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@BankName", _ad_BankAccount.BankName, DbType.String, ParameterDirection.Input),
                    new Parameters("@AccountNo", _ad_BankAccount.AccountNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@AccountName", _ad_BankAccount.AccountName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SwiftCode", _ad_BankAccount.SwiftCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@BIN", _ad_BankAccount.BIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchName", _ad_BankAccount.BranchName, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchAddress", _ad_BankAccount.BranchAddress, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AccountFor", _ad_BankAccount.AccountFor, DbType.String, ParameterDirection.Input),
                    new Parameters("@AccountRefId", _ad_BankAccount.AccountRefId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_BankAccount.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _ad_BankAccount.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _ad_BankAccount.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input),
                     new Parameters("@BranchRouteNo", _ad_BankAccount.BranchRouteNo, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_BankAccount_Create",
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

        public int Update(ad_BankAccount _ad_BankAccount)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[14]
                {
                    new Parameters("@BankAccountId", _ad_BankAccount.BankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@BankName", _ad_BankAccount.BankName, DbType.String, ParameterDirection.Input),
                    new Parameters("@AccountNo", _ad_BankAccount.AccountNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@AccountName", _ad_BankAccount.AccountName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SwiftCode", _ad_BankAccount.SwiftCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@BIN", _ad_BankAccount.BIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchName", _ad_BankAccount.BranchName, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchAddress", _ad_BankAccount.BranchAddress, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AccountFor", _ad_BankAccount.AccountFor, DbType.String, ParameterDirection.Input),
                    new Parameters("@AccountRefId", _ad_BankAccount.AccountRefId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_BankAccount.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _ad_BankAccount.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _ad_BankAccount.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@BranchRouteNo", _ad_BankAccount.BranchRouteNo, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_BankAccount_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int bankAccountId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BankAccountId", bankAccountId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_BankAccount_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}