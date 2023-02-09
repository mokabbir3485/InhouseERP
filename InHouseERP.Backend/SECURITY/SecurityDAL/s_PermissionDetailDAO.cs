using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_PermissionDetailDAO //: IDisposible
    {
        private static volatile s_PermissionDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_PermissionDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_PermissionDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_PermissionDetailDAO();
                    }

                return instance;
            }
        }

        public static s_PermissionDetailDAO GetInstance()
        {
            if (instance == null) instance = new s_PermissionDetailDAO();
            return instance;
        }

        public List<s_PermissionDetail> GetAll(long? permissionDetailId = null, int? screenDetailId = null)
        {
            try
            {
                var s_PermissionDetailLst = new List<s_PermissionDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PermissionDetailId", permissionDetailId, DbType.Int32, ParameterDirection.Input)
                };
                s_PermissionDetailLst = dbExecutor.FetchData<s_PermissionDetail>(CommandType.StoredProcedure,
                    "s_PermissionDetail_Get", colparameters);
                return s_PermissionDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_PermissionDetail> GetByPermissionId(long? permissionId = null)
        {
            try
            {
                var s_PermissionDetailLst = new List<s_PermissionDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PermissionId", permissionId, DbType.Int32, ParameterDirection.Input)
                };
                s_PermissionDetailLst = dbExecutor.FetchData<s_PermissionDetail>(CommandType.StoredProcedure,
                    "s_PermissionDetail_GetByPermissionId", colparameters);
                return s_PermissionDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_PermissionDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var s_PermissionDetailLst = new List<s_PermissionDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                s_PermissionDetailLst = dbExecutor.FetchData<s_PermissionDetail>(CommandType.StoredProcedure,
                    "s_PermissionDetail_GetDynamic", colparameters);
                return s_PermissionDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_PermissionDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var s_PermissionDetailLst = new List<s_PermissionDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                s_PermissionDetailLst = dbExecutor.FetchDataRef<s_PermissionDetail>(CommandType.StoredProcedure,
                    "s_PermissionDetail_GetPaged", colparameters, ref rows);
                return s_PermissionDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_PermissionDetail _s_PermissionDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@PermissionId", _s_PermissionDetail.PermissionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ScreenDetailId", _s_PermissionDetail.ScreenDetailId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CanExecute", _s_PermissionDetail.CanExecute, DbType.Boolean,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_PermissionDetail_Create",
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

        public int Update(s_PermissionDetail _s_PermissionDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@PermissionDetailId", _s_PermissionDetail.PermissionDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PermissionId", _s_PermissionDetail.PermissionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ScreenDetailId", _s_PermissionDetail.ScreenDetailId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CanExecute", _s_PermissionDetail.CanExecute, DbType.Boolean,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_PermissionDetail_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long permissionDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PermissionDetailId", permissionDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_PermissionDetail_DeleteById",
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