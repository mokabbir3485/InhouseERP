using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_UserDAO //: IDisposible
    {
        private static volatile hr_UserDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_UserDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_UserDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_UserDAO();
                    }

                return instance;
            }
        }

        public static hr_UserDAO GetInstance()
        {
            if (instance == null) instance = new hr_UserDAO();
            return instance;
        }

        public List<hr_User> GetAll(int? hrUserId = null)
        {
            try
            {
                var hr_UserLst = new List<hr_User>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@HrUserId", hrUserId, DbType.Int32, ParameterDirection.Input)
                };
                hr_UserLst = dbExecutor.FetchData<hr_User>(CommandType.StoredProcedure, "hr_User_Get", colparameters);
                return hr_UserLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_User> GetHrUserByUsernameAndPassword(string username, string password)
        {
            try
            {
                var hr_UserLst = new List<hr_User>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@Username", username, DbType.String, ParameterDirection.Input),
                    new Parameters("@Password", password, DbType.String, ParameterDirection.Input)
                };
                hr_UserLst = dbExecutor.FetchData<hr_User>(CommandType.StoredProcedure,
                    "hr_User_GetByUsernameAndPassword", colparameters);
                return hr_UserLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_User> GetHrUserByEmployeeId(int employeeId)
        {
            try
            {
                var hr_UserLst = new List<hr_User>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@EmployeeId", employeeId, DbType.String, ParameterDirection.Input)
                };
                hr_UserLst = dbExecutor.FetchData<hr_User>(CommandType.StoredProcedure, "hr_User_GetByEmployeeId",
                    colparameters);
                return hr_UserLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_User> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
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

        public int Save(hr_User _hr_User)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@HrUserId", _hr_User.HrUserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@EmployeeId", _hr_User.EmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RoleId", _hr_User.RoleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@Username", _hr_User.Username, DbType.String, ParameterDirection.Input),
                    new Parameters("@Password", _hr_User.Password, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _hr_User.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_User.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_User.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_User_Save", colparameters,
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

        public int Update(hr_User _hr_User)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@HrUserId", _hr_User.HrUserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@EmployeeId", _hr_User.EmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RoleId", _hr_User.RoleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@Username", _hr_User.Username, DbType.String, ParameterDirection.Input),
                    new Parameters("@Password", _hr_User.Password, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _hr_User.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_User.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_User.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_User_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int HrUserChangePassword(int employeeId, string password)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[2]
                {
                    new Parameters("@EmployeeId", employeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@Password", password, DbType.String, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_User_ChangePassword", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int PostPrioritySequence(hr_User _hr_UserPrioritySequencee)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@EmployeeId", _hr_UserPrioritySequencee.EmployeeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@BranchId", _hr_UserPrioritySequencee.BranchId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SerialNumber", _hr_UserPrioritySequencee.SerialNumber, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PrioritySequenceId", _hr_UserPrioritySequencee.PrioritySequenceId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_User_PrioritySequence_Post",
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

        public int UpdatePrioritySequencee(hr_User _hr_UserPrioritySequencee)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@EmployeeId", _hr_UserPrioritySequencee.EmployeeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@BranchId", _hr_UserPrioritySequencee.BranchId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SerialNumber", _hr_UserPrioritySequencee.SerialNumber, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PrioritySequenceId", _hr_UserPrioritySequencee.PrioritySequenceId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_User_PrioritySequence_GetByBranchId",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_User> GetPrioritySequenceeByBranchId(int branchId)
        {
            try
            {
                var hr_UserLst = new List<hr_User>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BranchId", branchId, DbType.Int32, ParameterDirection.Input)
                };
                hr_UserLst = dbExecutor.FetchData<hr_User>(CommandType.StoredProcedure,
                    "hr_User_PrioritySequence_GetByBranchId", colparameters);
                return hr_UserLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}