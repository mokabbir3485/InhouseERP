using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_AmendmentReasonDAO //: IDisposible
    {
        private static volatile exp_AmendmentReasonDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_AmendmentReasonDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_AmendmentReasonDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_AmendmentReasonDAO();
                    }

                return instance;
            }
        }

        public static exp_AmendmentReasonDAO GetInstance()
        {
            if (instance == null) instance = new exp_AmendmentReasonDAO();
            return instance;
        }

        public List<exp_AmendmentReason> GetAll(int? amendmentReasonId = null)
        {
            try
            {
                var exp_AmendmentReasonLst = new List<exp_AmendmentReason>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AmendmentReasonId", amendmentReasonId, DbType.Int32, ParameterDirection.Input)
                };
                exp_AmendmentReasonLst = dbExecutor.FetchData<exp_AmendmentReason>(CommandType.StoredProcedure,
                    "exp_AmendmentReason_Get", colparameters);
                return exp_AmendmentReasonLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_AmendmentReason> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_AmendmentReasonLst = new List<exp_AmendmentReason>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_AmendmentReasonLst = dbExecutor.FetchData<exp_AmendmentReason>(CommandType.StoredProcedure,
                    "exp_AmendmentReason_GetDynamic", colparameters);
                return exp_AmendmentReasonLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_AmendmentReason> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_AmendmentReasonLst = new List<exp_AmendmentReason>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_AmendmentReasonLst = dbExecutor.FetchDataRef<exp_AmendmentReason>(CommandType.StoredProcedure,
                    "exp_AmendmentReason_GetPaged", colparameters, ref rows);
                return exp_AmendmentReasonLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(exp_AmendmentReason _exp_AmendmentReason)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@AmendmentReasonName", _exp_AmendmentReason.AmendmentReasonName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _exp_AmendmentReason.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdateBy", _exp_AmendmentReason.UpdateBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _exp_AmendmentReason.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "exp_AmendmentReason_Create",
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

        public int Update(exp_AmendmentReason _exp_AmendmentReason)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@AmendmentReasonId", _exp_AmendmentReason.AmendmentReasonId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AmendmentReasonName", _exp_AmendmentReason.AmendmentReasonName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _exp_AmendmentReason.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdateBy", _exp_AmendmentReason.UpdateBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _exp_AmendmentReason.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_AmendmentReason_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int amendmentReasonId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AmendmentReasonId", amendmentReasonId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_AmendmentReason_DeleteById",
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