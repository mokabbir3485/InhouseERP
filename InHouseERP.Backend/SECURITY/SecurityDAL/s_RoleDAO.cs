using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_RoleDAO //: IDisposible
    {
        private static volatile s_RoleDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_RoleDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_RoleDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_RoleDAO();
                    }

                return instance;
            }
        }

        public static s_RoleDAO GetInstance()
        {
            if (instance == null) instance = new s_RoleDAO();
            return instance;
        }

        public List<s_Role> GetAll(int? RoleId = null)
        {
            try
            {
                var s_RoleLst = new List<s_Role>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RoleId", RoleId, DbType.Int32, ParameterDirection.Input)
                };
                s_RoleLst = dbExecutor.FetchData<s_Role>(CommandType.StoredProcedure, "s_Role_Get", colparameters);
                return s_RoleLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_Role> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var s_RoleLst = new List<s_Role>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                s_RoleLst = dbExecutor.FetchData<s_Role>(CommandType.StoredProcedure, "s_Role_GetDynamic",
                    colparameters);
                return s_RoleLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_Role> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var s_RoleLst = new List<s_Role>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                s_RoleLst = dbExecutor.FetchDataRef<s_Role>(CommandType.StoredProcedure, "s_Role_GetPaged",
                    colparameters, ref rows);
                return s_RoleLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<s_Screen> GetScreenPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var s_ScreenLst = new List<s_Screen>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                s_ScreenLst = dbExecutor.FetchDataRef<s_Screen>(CommandType.StoredProcedure, "s_Screen_GetPaged",
                    colparameters, ref rows);
                return s_ScreenLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<s_ScreenDetail> GetFunctionPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var s_FunctionLst = new List<s_ScreenDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                s_FunctionLst = dbExecutor.FetchDataRef<s_ScreenDetail>(CommandType.StoredProcedure, "s_Function_GetPaged",
                    colparameters, ref rows);
                return s_FunctionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_Role _s_Role)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@RoleName", _s_Role.RoleName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _s_Role.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsSuperAdmin", _s_Role.IsSuperAdmin, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsCheckoutOperator", _s_Role.IsCheckoutOperator, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _s_Role.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _s_Role.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _s_Role.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _s_Role.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_Role_Create", colparameters,
                    true);
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
        public int PostScreen(s_Screen Screen)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@ScreenId", Screen.ScreenId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ModuleId", Screen.ModuleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ScreenName", Screen.ScreenName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Description", Screen.Description, DbType.String, ParameterDirection.Input),
                    new Parameters("@ScreenUrl", Screen.ScreenUrl, DbType.String, ParameterDirection.Input),
                    new Parameters("@ImageUrl", Screen.ImageUrl, DbType.String, ParameterDirection.Input),
                    new Parameters("@MainTableName", Screen.MainTableName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsPage", Screen.IsPage, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@Sorting", Screen.Sorting, DbType.Int32, ParameterDirection.Input),
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_Screen_Post", colparameters,
                    true);
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
        public int PostFunction(s_ScreenDetail Function)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@FunctionId", Function.FunctionId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FunctionName", Function.FunctionName, DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_Function_Post", colparameters,
                    true);
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
        public int AddScreenDetail(s_ScreenDetail ScreenDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ScreenId", ScreenDetail.ScreenId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FunctionId", ScreenDetail.FunctionId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsActive", ScreenDetail.IsActive, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_ScreenDetail_Create", colparameters,
                    true);
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

        public int Update(s_Role _s_Role)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@RoleId", _s_Role.RoleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RoleName", _s_Role.RoleName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _s_Role.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsSuperAdmin", _s_Role.IsSuperAdmin, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsCheckoutOperator", _s_Role.IsCheckoutOperator, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _s_Role.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _s_Role.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_Role_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int RoleId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RoleId", RoleId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_Role_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}