using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_UserDepartmentDAO //: IDisposible
    {
        private static volatile s_UserDepartmentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_UserDepartmentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_UserDepartmentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_UserDepartmentDAO();
                    }

                return instance;
            }
        }

        public static s_UserDepartmentDAO GetInstance()
        {
            if (instance == null) instance = new s_UserDepartmentDAO();
            return instance;
        }

        public List<s_UserDepartment> GetByUserId(int userId)
        {
            try
            {
                var s_UserDepartmentLst = new List<s_UserDepartment>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@UserId", userId, DbType.Int32, ParameterDirection.Input)
                };
                s_UserDepartmentLst = dbExecutor.FetchData<s_UserDepartment>(CommandType.StoredProcedure,
                    "s_UserDepartment_GetByUserId", colparameters);
                return s_UserDepartmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_UserDepartment> GetAllUserStore(int userId)
        {
            try
            {
                var s_UserDepartmentLst = new List<s_UserDepartment>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@UserId", userId, DbType.Int32, ParameterDirection.Input)
                };
                s_UserDepartmentLst = dbExecutor.FetchData<s_UserDepartment>(CommandType.StoredProcedure,
                    "s_UserDepartment_GetAllUserStore", colparameters);
                return s_UserDepartmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_UserDepartment> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var s_UserDepartmentLst = new List<s_UserDepartment>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                s_UserDepartmentLst = dbExecutor.FetchData<s_UserDepartment>(CommandType.StoredProcedure,
                    "s_UserDepartment_GetDynamic", colparameters);
                return s_UserDepartmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_UserDepartment> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var s_UserDepartmentLst = new List<s_UserDepartment>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                s_UserDepartmentLst = dbExecutor.FetchDataRef<s_UserDepartment>(CommandType.StoredProcedure,
                    "s_UserDepartment_GetPaged", colparameters, ref rows);
                return s_UserDepartmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_UserDepartment _s_UserDepartment)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@UserId", _s_UserDepartment.UserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _s_UserDepartment.DepartmentId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_UserDepartment_Create",
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

        public int Update(s_UserDepartment _s_UserDepartment)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@UserDepartmentId", _s_UserDepartment.UserDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UserId", _s_UserDepartment.UserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _s_UserDepartment.DepartmentId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_UserDepartment_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int userDepartmentId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@UserDepartmentId", userDepartmentId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_UserDepartment_DeleteById",
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