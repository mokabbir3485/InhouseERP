using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_LeaveApplicationDAO //: IDisposible
    {
        private static volatile hr_LeaveApplicationDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_LeaveApplicationDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_LeaveApplicationDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_LeaveApplicationDAO();
                    }

                return instance;
            }
        }

        public static hr_LeaveApplicationDAO GetInstance()
        {
            if (instance == null) instance = new hr_LeaveApplicationDAO();
            return instance;
        }

        public List<hr_LeaveApplication> GetAll(long? leaveApplicationId = null)
        {
            try
            {
                var hr_LeaveApplicationLst = new List<hr_LeaveApplication>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@LeaveApplicationId", leaveApplicationId, DbType.Int32, ParameterDirection.Input)
                };
                hr_LeaveApplicationLst = dbExecutor.FetchData<hr_LeaveApplication>(CommandType.StoredProcedure,
                    "hr_LeaveApplication_Get", colparameters);
                return hr_LeaveApplicationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveApplication> GetForApproval()
        {
            try
            {
                var hr_LeaveApplicationLst = new List<hr_LeaveApplication>();
                hr_LeaveApplicationLst = dbExecutor.FetchData<hr_LeaveApplication>(CommandType.StoredProcedure,
                    "hr_LeaveApplication_GetForApproval");
                return hr_LeaveApplicationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveApplication> GetByBranchId(int branchId)
        {
            try
            {
                var hr_LeaveApplicationLst = new List<hr_LeaveApplication>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BranchId", branchId, DbType.Int32, ParameterDirection.Input)
                };
                hr_LeaveApplicationLst = dbExecutor.FetchData<hr_LeaveApplication>(CommandType.StoredProcedure,
                    "hr_LeaveApplication_GetByBranchId", colparameters);
                return hr_LeaveApplicationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveApplication> GetByEmployeeId(int employeeId)
        {
            try
            {
                var hr_LeaveApplicationLst = new List<hr_LeaveApplication>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@EmployeeId", employeeId, DbType.Int32, ParameterDirection.Input)
                };
                hr_LeaveApplicationLst = dbExecutor.FetchData<hr_LeaveApplication>(CommandType.StoredProcedure,
                    "hr_LeaveApplication_GetByEmployeeId", colparameters);
                return hr_LeaveApplicationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveApplication> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var hr_LeaveApplicationLst = new List<hr_LeaveApplication>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                hr_LeaveApplicationLst = dbExecutor.FetchData<hr_LeaveApplication>(CommandType.StoredProcedure,
                    "hr_LeaveApplication_GetDynamic", colparameters);
                return hr_LeaveApplicationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_LeaveApplication> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var hr_LeaveApplicationLst = new List<hr_LeaveApplication>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_LeaveApplicationLst = dbExecutor.FetchDataRef<hr_LeaveApplication>(CommandType.StoredProcedure,
                    "hr_LeaveApplication_GetPaged", colparameters, ref rows);
                return hr_LeaveApplicationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Save(hr_LeaveApplication _hr_LeaveApplication)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[12]
                {
                    new Parameters("@LeaveApplicationId", _hr_LeaveApplication.LeaveApplicationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@LeaveTypeId", _hr_LeaveApplication.LeaveTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@EmployeeId", _hr_LeaveApplication.EmployeeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ApplicationDate", _hr_LeaveApplication.ApplicationDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ApplicationNo", _hr_LeaveApplication.ApplicationNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ApplicationFrom", _hr_LeaveApplication.ApplicationFrom, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ApplicationTo", _hr_LeaveApplication.ApplicationTo, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ReasonForLeave", _hr_LeaveApplication.ReasonForLeave, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CoverEmployeeId", _hr_LeaveApplication.CoverEmployeeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _hr_LeaveApplication.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_LeaveApplication.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_LeaveApplication.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "hr_LeaveApplication_Create",
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

        public int SaveApproval(hr_LeaveApplication _hr_LeaveApplication)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@LeaveApplicationId", _hr_LeaveApplication.LeaveApplicationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsRejected", _hr_LeaveApplication.IsRejected, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _hr_LeaveApplication.IsApproved, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _hr_LeaveApplication.ApprovedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _hr_LeaveApplication.ApprovedDate, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedFrom", _hr_LeaveApplication.ApprovedFrom, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedTo", _hr_LeaveApplication.ApprovedTo, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IsHalfDay", _hr_LeaveApplication.IsHalfDay, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsAdjustWithDays", _hr_LeaveApplication.IsAdjustWithDays, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsAdjustWithOverTime", _hr_LeaveApplication.IsAdjustWithOverTime, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@OverTimeAdjustHours", _hr_LeaveApplication.OverTimeAdjustHours, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_LeaveApplication.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_LeaveApplication.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_LeaveApplication_SaveApproval",
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

        public int SaveForward(hr_LeaveApplication _hr_LeaveApplication)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@LeaveApplicationId", _hr_LeaveApplication.LeaveApplicationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsHrForwarded", _hr_LeaveApplication.IsHrForwarded, DbType.Int32,
                        ParameterDirection.Input)
                };

                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_LeaveApplication_SaveForward",
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

        public int Delete(long leaveApplicationId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@LeaveApplicationId", leaveApplicationId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_LeaveApplication_DeleteById",
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