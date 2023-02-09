using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_AttendancePolicyDAO //: IDisposible
    {
        private static volatile hr_AttendancePolicyDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_AttendancePolicyDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_AttendancePolicyDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_AttendancePolicyDAO();
                    }

                return instance;
            }
        }

        public static hr_AttendancePolicyDAO GetInstance()
        {
            if (instance == null) instance = new hr_AttendancePolicyDAO();
            return instance;
        }

        public List<hr_AttendancePolicy> GetAll(int? attendancePolicyId = null)
        {
            try
            {
                var hr_AttendancePolicyLst = new List<hr_AttendancePolicy>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AttendancePolicyId", attendancePolicyId, DbType.Int32, ParameterDirection.Input)
                };
                hr_AttendancePolicyLst = dbExecutor.FetchData<hr_AttendancePolicy>(CommandType.StoredProcedure,
                    "hr_AttendancePolicy_Get", colparameters);
                return hr_AttendancePolicyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AttendancePolicy> GetByStartAndEndTime(string startTime, string endTime)
        {
            try
            {
                var hr_AttendancePolicyLst = new List<hr_AttendancePolicy>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@StartTime", startTime, DbType.String, ParameterDirection.Input),
                    new Parameters("@EndTime", endTime, DbType.String, ParameterDirection.Input)
                };
                hr_AttendancePolicyLst = dbExecutor.FetchData<hr_AttendancePolicy>(CommandType.StoredProcedure,
                    "hr_AttendancePolicy_GetByStartAndEndTime", colparameters);
                return hr_AttendancePolicyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AttendancePolicy> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var hr_AttendancePolicyLst = new List<hr_AttendancePolicy>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_AttendancePolicyLst = dbExecutor.FetchDataRef<hr_AttendancePolicy>(CommandType.StoredProcedure,
                    "hr_AttendancePolicy_GetPaged", colparameters, ref rows);
                return hr_AttendancePolicyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_AttendancePolicy _hr_AttendancePolicy)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[16]
                {
                    new Parameters("@AttendancePolicyId", _hr_AttendancePolicy.AttendancePolicyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AttendancePolicyName", _hr_AttendancePolicy.AttendancePolicyName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@StartTime", _hr_AttendancePolicy.StartTime, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@EndTime", _hr_AttendancePolicy.EndTime, DbType.String, ParameterDirection.Input),
                    new Parameters("@AllowEarlyInFrom", _hr_AttendancePolicy.AllowEarlyInFrom, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AllowLateOutTill", _hr_AttendancePolicy.AllowLateOutTill, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@LateInAfter", _hr_AttendancePolicy.LateInAfter, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@HalfDayLateAfter", _hr_AttendancePolicy.HalfDayLateAfter, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AbsentAfter", _hr_AttendancePolicy.AbsentAfter, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FirstWeeklyHoliday", _hr_AttendancePolicy.FirstWeeklyHoliday, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@HasOverTime", _hr_AttendancePolicy.HasOverTime, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@OverTimeTypeId", _hr_AttendancePolicy.OverTimeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsEndNextDay", _hr_AttendancePolicy.IsEndNextDay, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _hr_AttendancePolicy.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_AttendancePolicy.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_AttendancePolicy.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_AttendancePolicy_Create",
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

        public int Update(hr_AttendancePolicy _hr_AttendancePolicy)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[22]
                {
                    new Parameters("@AttendancePolicyId", _hr_AttendancePolicy.AttendancePolicyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AttendancePolicyName", _hr_AttendancePolicy.AttendancePolicyName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@StartTime", _hr_AttendancePolicy.StartTime, DbType.Time, ParameterDirection.Input),
                    new Parameters("@EndTime", _hr_AttendancePolicy.EndTime, DbType.Time, ParameterDirection.Input),
                    new Parameters("@LateInAfter", _hr_AttendancePolicy.LateInAfter, DbType.Time,
                        ParameterDirection.Input),
                    new Parameters("@MinHourForFullDay", _hr_AttendancePolicy.MinHourForFullDay, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsAllowEarlyIn", _hr_AttendancePolicy.IsAllowEarlyIn, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@AllowEarlyInFrom", _hr_AttendancePolicy.AllowEarlyInFrom, DbType.Time,
                        ParameterDirection.Input),
                    new Parameters("@NoOfWeeklyHoliday", _hr_AttendancePolicy.NoOfWeeklyHoliday, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@FirstWeeklyHoliday", _hr_AttendancePolicy.FirstWeeklyHoliday, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SecondWeeklyHoliday", _hr_AttendancePolicy.SecondWeeklyHoliday, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@HasHalfDay", _hr_AttendancePolicy.HasHalfDay, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@HalfDayName", _hr_AttendancePolicy.HalfDayName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@HalfDayStartTime", _hr_AttendancePolicy.HalfDayStartTime, DbType.Time,
                        ParameterDirection.Input),
                    new Parameters("@HalfDayEndTime", _hr_AttendancePolicy.HalfDayEndTime, DbType.Time,
                        ParameterDirection.Input),
                    new Parameters("@HalfDayLateInAfter", _hr_AttendancePolicy.HalfDayLateInAfter, DbType.Time,
                        ParameterDirection.Input),
                    new Parameters("@HD_MinHourForFullDay", _hr_AttendancePolicy.HD_MinHourForFullDay, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@HasOverTime", _hr_AttendancePolicy.HasOverTime, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@OverTimeTypeId", _hr_AttendancePolicy.OverTimeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _hr_AttendancePolicy.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_AttendancePolicy.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_AttendancePolicy.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_AttendancePolicy_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int attendancePolicyId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AttendancePolicyId", attendancePolicyId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_AttendancePolicy_DeleteById",
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