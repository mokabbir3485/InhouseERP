using System;
using System.Collections.Generic;
using System.Data;
using AccountsEntity;
using DbExecutor;

namespace AccountsDAL
{
    public class ac_ChartOfAccountDAO //: IDisposible
    {
        private static volatile ac_ChartOfAccountDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ac_ChartOfAccountDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ac_ChartOfAccountDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ac_ChartOfAccountDAO();
                    }

                return instance;
            }
        }

        public static ac_ChartOfAccountDAO GetInstance()
        {
            if (instance == null) instance = new ac_ChartOfAccountDAO();
            return instance;
        }

        public List<ac_ChartOfAccount> GetAll(int? accountId = null)
        {
            try
            {
                var ac_ChartOfAccountLst = new List<ac_ChartOfAccount>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AccountId", accountId, DbType.Int32, ParameterDirection.Input)
                };
                ac_ChartOfAccountLst = dbExecutor.FetchData<ac_ChartOfAccount>(CommandType.StoredProcedure,
                    "ac_ChartOfAccount_Get", colparameters);
                return ac_ChartOfAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_ChartOfAccount> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ac_ChartOfAccountLst = new List<ac_ChartOfAccount>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ac_ChartOfAccountLst = dbExecutor.FetchData<ac_ChartOfAccount>(CommandType.StoredProcedure,
                    "ac_ChartOfAccount_GetDynamic", colparameters);
                return ac_ChartOfAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_ChartOfAccount> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ac_ChartOfAccountLst = new List<ac_ChartOfAccount>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ac_ChartOfAccountLst = dbExecutor.FetchDataRef<ac_ChartOfAccount>(CommandType.StoredProcedure,
                    "ac_ChartOfAccount_GetPaged", colparameters, ref rows);
                return ac_ChartOfAccountLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ac_ChartOfAccount _ac_ChartOfAccount)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@AccountTypeDetailId", _ac_ChartOfAccount.AccountTypeDetailId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AccountName", _ac_ChartOfAccount.AccountName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AccountDescription", _ac_ChartOfAccount.AccountDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ParentId", _ac_ChartOfAccount.ParentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsActive", _ac_ChartOfAccount.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsDefault", _ac_ChartOfAccount.IsDefault, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ac_ChartOfAccount.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ac_ChartOfAccount.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ac_ChartOfAccount_Create",
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

        public int Update(ac_ChartOfAccount _ac_ChartOfAccount)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@AccountId", _ac_ChartOfAccount.AccountId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AccountTypeDetailId", _ac_ChartOfAccount.AccountTypeDetailId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AccountName", _ac_ChartOfAccount.AccountName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AccountDescription", _ac_ChartOfAccount.AccountDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ParentId", _ac_ChartOfAccount.ParentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsActive", _ac_ChartOfAccount.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsDefault", _ac_ChartOfAccount.IsDefault, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ac_ChartOfAccount.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ac_ChartOfAccount.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ac_ChartOfAccount_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int accountId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AccountId", accountId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ac_ChartOfAccount_DeleteById",
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