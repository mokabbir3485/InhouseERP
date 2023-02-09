using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_ScreenDetailDAO //: IDisposible
    {
        private static volatile s_ScreenDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_ScreenDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_ScreenDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_ScreenDetailDAO();
                    }

                return instance;
            }
        }

        public static s_ScreenDetailDAO GetInstance()
        {
            if (instance == null) instance = new s_ScreenDetailDAO();
            return instance;
        }

        public List<s_ScreenDetail> GetAll(int? screenDetailId = null)
        {
            try
            {
                var s_ScreenDetailLst = new List<s_ScreenDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ScreenDetailId", screenDetailId, DbType.Int32, ParameterDirection.Input)
                };
                s_ScreenDetailLst = dbExecutor.FetchData<s_ScreenDetail>(CommandType.StoredProcedure,
                    "s_ScreenDetail_Get", colparameters);
                return s_ScreenDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_ScreenDetail> GetByScreenId(int screenId)
        {
            try
            {
                var s_ScreenDetailLst = new List<s_ScreenDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ScreenId", screenId, DbType.Int32, ParameterDirection.Input)
                };
                s_ScreenDetailLst = dbExecutor.FetchData<s_ScreenDetail>(CommandType.StoredProcedure,
                    "s_ScreenDetail_GetByScreenId", colparameters);
                return s_ScreenDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_ScreenDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var s_ScreenDetailLst = new List<s_ScreenDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                s_ScreenDetailLst = dbExecutor.FetchData<s_ScreenDetail>(CommandType.StoredProcedure,
                    "s_ScreenDetail_GetDynamic", colparameters);
                return s_ScreenDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_ScreenDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var s_ScreenDetailLst = new List<s_ScreenDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                s_ScreenDetailLst = dbExecutor.FetchDataRef<s_ScreenDetail>(CommandType.StoredProcedure,
                    "s_ScreenDetail_GetPaged", colparameters, ref rows);
                return s_ScreenDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_ScreenDetail _s_ScreenDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ScreenId", _s_ScreenDetail.ScreenId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FunctionId", _s_ScreenDetail.FunctionId, DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_ScreenDetail_Create",
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

        public int Update(s_ScreenDetail _s_ScreenDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ScreenDetailId", _s_ScreenDetail.ScreenDetailId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ScreenId", _s_ScreenDetail.ScreenId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FunctionName", _s_ScreenDetail.FunctionName, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_ScreenDetail_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int screenDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ScreenDetailId", screenDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_ScreenDetail_DeleteById",
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