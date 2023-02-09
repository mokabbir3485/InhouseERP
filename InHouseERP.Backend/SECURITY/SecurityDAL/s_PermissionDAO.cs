using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_PermissionDAO //: IDisposible
    {
        private static volatile s_PermissionDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_PermissionDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_PermissionDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_PermissionDAO();
                    }

                return instance;
            }
        }

        public static s_PermissionDAO GetInstance()
        {
            if (instance == null) instance = new s_PermissionDAO();
            return instance;
        }

        public List<s_Permission> GetByRoleId(long RoleId)
        {
            try
            {
                var s_PermissionLst = new List<s_Permission>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RoleId", RoleId, DbType.Int32, ParameterDirection.Input)
                };
                s_PermissionLst = dbExecutor.FetchData<s_Permission>(CommandType.StoredProcedure,
                    "s_Permission_GetByRoleId", colparameters);
                return s_PermissionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<s_Permission> GetByRoleIdNew(long RoleId)
        {
            try
            {
                var s_PermissionLst = new List<s_Permission>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RoleId", RoleId, DbType.Int32, ParameterDirection.Input)
                };
                s_PermissionLst = dbExecutor.FetchData<s_Permission>(CommandType.StoredProcedure,
                    "s_Permission_GetByRoleId_NEW", colparameters);
                return s_PermissionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_Permission s_Permission)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@RoleId", s_Permission.RoleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ScreenId", s_Permission.ScreenId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CanView", s_Permission.CanView, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", s_Permission.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", s_Permission.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", s_Permission.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", s_Permission.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_Permission_Create",
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


        public List<s_Screen> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                var s_ScreenList = new List<s_Screen>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                s_ScreenList = dbExecutor.FetchDataRef<s_Screen>(CommandType.StoredProcedure, "ad_Screen_GetPaged",
                    colparameters, ref rows);
                return s_ScreenList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(s_Permission s_Permission)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@PermissionId", s_Permission.PermissionId, DbType.String, ParameterDirection.Input),
                    new Parameters("@RoleId", s_Permission.RoleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ScreenId", s_Permission.ScreenId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CanView", s_Permission.CanView, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", s_Permission.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", s_Permission.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_Permission_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteByRoleId(long RoleId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RoleId", RoleId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_Permission_DeleteByRoleId",
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