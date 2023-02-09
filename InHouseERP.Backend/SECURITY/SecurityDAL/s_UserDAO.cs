using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DbExecutor;
using HrAndPayrollEntity;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_UserDAO //: IDisposible
    {
        private static volatile s_UserDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_UserDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_UserDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_UserDAO();
                    }

                return instance;
            }
        }

        public static s_UserDAO GetInstance()
        {
            if (instance == null) instance = new s_UserDAO();
            return instance;
        }

        public List<s_User> GetAll(int? userId = null)
        {
            try
            {
                var s_UserLst = new List<s_User>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@UserId", userId, DbType.Int32, ParameterDirection.Input)
                };
                s_UserLst = dbExecutor.FetchData<s_User>(CommandType.StoredProcedure, "s_User_Get", colparameters);
                return s_UserLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_User> GetByEmployeeId(int EmployeeId)
        {
            try
            {
                var s_UserLst = new List<s_User>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@EmployeeId", EmployeeId, DbType.Int32, ParameterDirection.Input)
                };
                s_UserLst = dbExecutor.FetchData<s_User>(CommandType.StoredProcedure, "s_User_GetByEmployeeId",
                    colparameters);
                return s_UserLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public s_User GetByUsernameAndPassword(string Username, string Password)
        {
            try
            {
                var s_UserLst = new List<s_User>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@Username", Username, DbType.String, ParameterDirection.Input),
                    new Parameters("@Password", Password, DbType.String, ParameterDirection.Input)
                };
                s_UserLst = dbExecutor.FetchData<s_User>(CommandType.StoredProcedure, "s_User_GetByUsernameAndPassword",
                    colparameters);
                return s_UserLst.FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_User> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var s_UserLst = new List<s_User>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                s_UserLst = dbExecutor.FetchData<s_User>(CommandType.StoredProcedure, "s_User_GetDynamic",
                    colparameters);
                return s_UserLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_User> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var s_UserLst = new List<s_User>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                s_UserLst = dbExecutor.FetchDataRef<s_User>(CommandType.StoredProcedure, "s_User_GetPaged",
                    colparameters, ref rows);
                return s_UserLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<hr_User> HrUserGetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                var hr_UserLst = new List<hr_User>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_UserLst = dbExecutor.FetchDataRef<hr_User>(CommandType.StoredProcedure, "hr_User_GetPaged",
                    colparameters, ref rows);
                return hr_UserLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        public int Add(s_User s_User)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[12]
                {
                    new Parameters("@EmployeeId", s_User.EmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RoleId", s_User.RoleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@Username", s_User.Username, DbType.String, ParameterDirection.Input),
                    new Parameters("@Password", s_User.Password, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsReqSmsCode", s_User.IsReqSmsCode, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@SmsMobileNo", s_User.SmsMobileNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@AuthorizationPassword", s_User.AuthorizationPassword, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", s_User.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", s_User.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", s_User.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", s_User.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", s_User.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_User_Create", colparameters,
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

        public int Update(s_User s_User)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@EmployeeId", s_User.EmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RoleId", s_User.RoleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@Username", s_User.Username, DbType.String, ParameterDirection.Input),
                    new Parameters("@Password", s_User.Password, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsReqSmsCode", s_User.IsReqSmsCode, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@SmsMobileNo", s_User.SmsMobileNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@AuthorizationPassword", s_User.AuthorizationPassword, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", s_User.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", s_User.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", s_User.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_User_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdatePassword(s_User s_User)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@UserId", s_User.UserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@Password", s_User.Password, DbType.String, ParameterDirection.Input),
                    new Parameters("@AuthorizationPassword", s_User.AuthorizationPassword, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_User_UpdatePassword", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int employeeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@EmployeeId", employeeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_User_DeleteByEmployeeId",
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