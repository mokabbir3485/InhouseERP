using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ReturnReasonDAO //: IDisposible
    {
        private static volatile ad_ReturnReasonDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ReturnReasonDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ReturnReasonDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ReturnReasonDAO();
                    }

                return instance;
            }
        }

        public static ad_ReturnReasonDAO GetInstance()
        {
            if (instance == null) instance = new ad_ReturnReasonDAO();
            return instance;
        }

        public List<ad_ReturnReason> GetAll(int? ReturnReasonId = null)
        {
            try
            {
                var ad_ReturnReasonLst = new List<ad_ReturnReason>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReturnReasonId", ReturnReasonId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ReturnReasonLst = dbExecutor.FetchData<ad_ReturnReason>(CommandType.StoredProcedure,
                    "ad_ReturnReason_Get", colparameters);
                return ad_ReturnReasonLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ReturnReason> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_ReturnReasonLst = new List<ad_ReturnReason>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_ReturnReasonLst = dbExecutor.FetchData<ad_ReturnReason>(CommandType.StoredProcedure,
                    "ad_ReturnReason_GetDynamic", colparameters);
                return ad_ReturnReasonLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ReturnReason> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_ReturnReasonLst = new List<ad_ReturnReason>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_ReturnReasonLst = dbExecutor.FetchDataRef<ad_ReturnReason>(CommandType.StoredProcedure,
                    "ad_ReturnReason_GetPaged", colparameters, ref rows);
                return ad_ReturnReasonLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ReturnReason _ad_ReturnReason)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@ReturnReasonName", _ad_ReturnReason.ReturnReasonName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_ReturnReason.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_ReturnReason.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_ReturnReason.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_ReturnReason.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_ReturnReason.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ReturnReason_Create",
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

        public int Update(ad_ReturnReason _ad_ReturnReason)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@ReturnReasonId", _ad_ReturnReason.ReturnReasonId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReturnReasonName", _ad_ReturnReason.ReturnReasonName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_ReturnReason.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_ReturnReason.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_ReturnReason.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ReturnReason_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int ReturnReasonId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReturnReasonId", ReturnReasonId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ReturnReason_DeleteById",
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