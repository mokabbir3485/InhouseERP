using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_ShiftDAO //: IDisposible
    {
        private static volatile hr_ShiftDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_ShiftDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_ShiftDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_ShiftDAO();
                    }

                return instance;
            }
        }

        public static hr_ShiftDAO GetInstance()
        {
            if (instance == null) instance = new hr_ShiftDAO();
            return instance;
        }

        public List<hr_Shift> GetAll(long? shiftId = null)
        {
            try
            {
                var hr_ShiftLst = new List<hr_Shift>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ShiftId", shiftId, DbType.Int32, ParameterDirection.Input)
                };
                hr_ShiftLst =
                    dbExecutor.FetchData<hr_Shift>(CommandType.StoredProcedure, "hr_Shift_Get", colparameters);
                return hr_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Shift> GetForEntry(int branchId, int attPolicyId, DateTime from, DateTime to, string empIds)
        {
            try
            {
                var hr_ShiftLst = new List<hr_Shift>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@BranchId", branchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttPolicyId", attPolicyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FDT", from, DbType.Date, ParameterDirection.Input),
                    new Parameters("@TDT", to, DbType.Date, ParameterDirection.Input),
                    new Parameters("@EmpIds", empIds, DbType.String, ParameterDirection.Input)
                };
                hr_ShiftLst = dbExecutor.FetchData<hr_Shift>(CommandType.StoredProcedure, "hr_Shift_GetForEntry",
                    colparameters);
                return hr_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Shift> GetForFinalise(int branchId, int employeeId, DateTime from, DateTime to)
        {
            try
            {
                var hr_ShiftLst = new List<hr_Shift>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@BranchId", branchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@EmployeeId", employeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@From", from, DbType.Date, ParameterDirection.Input),
                    new Parameters("@To", to, DbType.Date, ParameterDirection.Input)
                };
                hr_ShiftLst = dbExecutor.FetchData<hr_Shift>(CommandType.StoredProcedure, "hr_Shift_GetForFinalise",
                    colparameters);
                return hr_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Shift> GetForExcelExport(int branchId, DateTime from, DateTime to)
        {
            try
            {
                var hr_ShiftLst = new List<hr_Shift>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@BranchId", branchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FDT", from, DbType.Date, ParameterDirection.Input),
                    new Parameters("@TDT", to, DbType.Date, ParameterDirection.Input)
                };
                hr_ShiftLst = dbExecutor.FetchData<hr_Shift>(CommandType.StoredProcedure, "hr_Shift_GetForExcelExport",
                    colparameters);
                return hr_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Shift> GetForView(int branchId, int employeeId, DateTime from, DateTime to)
        {
            try
            {
                var hr_ShiftLst = new List<hr_Shift>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@BranchId", branchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@EmployeeId", employeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@From", from, DbType.Date, ParameterDirection.Input),
                    new Parameters("@To", to, DbType.Date, ParameterDirection.Input)
                };
                hr_ShiftLst =
                    dbExecutor.FetchData<hr_Shift>(CommandType.StoredProcedure, "hr_Shift_GetForView", colparameters);
                return hr_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Shift> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var hr_ShiftLst = new List<hr_Shift>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                hr_ShiftLst =
                    dbExecutor.FetchData<hr_Shift>(CommandType.StoredProcedure, "hr_Shift_GetDynamic", colparameters);
                return hr_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Shift> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var hr_ShiftLst = new List<hr_Shift>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_ShiftLst = dbExecutor.FetchDataRef<hr_Shift>(CommandType.StoredProcedure, "hr_Shift_GetPaged",
                    colparameters, ref rows);
                return hr_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(hr_Shift _hr_Shift)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@EmployeeId", _hr_Shift.EmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttendancePolicyId", _hr_Shift.AttendancePolicyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ShiftDate", _hr_Shift.ShiftDate, DbType.Date, ParameterDirection.Input),
                    new Parameters("@IsWH", _hr_Shift.IsWeeklyHoliday, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsPH", _hr_Shift.IsPublicHoliday, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@StartTime", _hr_Shift.StartTime, DbType.String, ParameterDirection.Input),
                    new Parameters("@EndTime", _hr_Shift.EndTime, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Shift.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Shift.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "hr_Shift_Create", colparameters,
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

        public int Update(hr_Shift _hr_Shift)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[20]
                {
                    new Parameters("@ShiftId", _hr_Shift.ShiftId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@EmployeeId", _hr_Shift.EmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttendancePolicyId", _hr_Shift.AttendancePolicyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ShiftDate", _hr_Shift.ShiftDate, DbType.Date, ParameterDirection.Input),
                    new Parameters("@IsWeeklyHoliday", _hr_Shift.IsWeeklyHoliday, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsPublicHoliday", _hr_Shift.IsPublicHoliday, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsHalfDay", _hr_Shift.IsHalfDay, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@StartTime", _hr_Shift.StartTime, DbType.Time, ParameterDirection.Input),
                    new Parameters("@EndTime", _hr_Shift.EndTime, DbType.Time, ParameterDirection.Input),
                    new Parameters("@StartedTime", _hr_Shift.StartedTime, DbType.Time, ParameterDirection.Input),
                    new Parameters("@EndedTime", _hr_Shift.EndedTime, DbType.Time, ParameterDirection.Input),
                    new Parameters("@IsOnLeave", _hr_Shift.IsOnLeave, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@LeaveApplicationId", _hr_Shift.LeaveApplicationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsEndNextDay", _hr_Shift.IsEndNextDay, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsLateInApproved", _hr_Shift.IsLateInApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@LateInApproveRemarks", _hr_Shift.LateInApproveRemarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _hr_Shift.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Shift.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Shift.UpdateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@DeductHours", _hr_Shift.DeductHours, DbType.Decimal, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Shift_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateShift(hr_Shift _hr_Shift)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[15]
                {
                    new Parameters("@ShiftId", _hr_Shift.ShiftId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@StartedTime", _hr_Shift.StartedTime, DbType.String, ParameterDirection.Input),
                    new Parameters("@EndedTime", _hr_Shift.EndedTime, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsLateIn", _hr_Shift.IsLateIn, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsHalfDay", _hr_Shift.IsHalfDay, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsOnLeave", _hr_Shift.IsOnLeave, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsLateInApproved", _hr_Shift.IsLateInApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@LateInApproveRemarks", _hr_Shift.LateInApproveRemarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _hr_Shift.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsAbsentApproved", _hr_Shift.IsAbsentApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@AbsentApprovalRemarks", _hr_Shift.AbsentApprovalRemarks, DbType.String,
                        ParameterDirection.Input),

                    new Parameters("@LateInTypeId", _hr_Shift.LateInTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsAbsent", _hr_Shift.IsAbsent, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@AbsentTypeId", _hr_Shift.AbsentTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DeductHours", _hr_Shift.DeductHours, DbType.Decimal, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Shift_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long shiftId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ShiftId", shiftId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Shift_DeleteById", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AttendanceSummary> GetAttendanceSummary(DateTime from, DateTime to, int branchId, int gradeId,
            int employeeId, string departmentId, int sectionId)
        {
            try
            {
                var hr_AttSummaryLst = new List<hr_AttendanceSummary>();
                var colparameters = new Parameters[7]
                {
                    new Parameters("@fdt", from, DbType.Date, ParameterDirection.Input),
                    new Parameters("@tdt", to, DbType.Date, ParameterDirection.Input),
                    new Parameters("@BranchId", branchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@GradeId", gradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@EmployeeId", employeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", departmentId, DbType.String, ParameterDirection.Input),
                    new Parameters("@SectionId", sectionId, DbType.Int32, ParameterDirection.Input)
                };
                hr_AttSummaryLst = dbExecutor.FetchData<hr_AttendanceSummary>(CommandType.StoredProcedure,
                    "xRpt_hr_AttendanceSummary", colparameters);
                return hr_AttSummaryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AttendanceDetail> GetAttendanceDetail(DateTime from, DateTime to, int empId)
        {
            try
            {
                var hr_AttDetailLst = new List<hr_AttendanceDetail>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@fdt", from, DbType.Date, ParameterDirection.Input),
                    new Parameters("@tdt", to, DbType.Date, ParameterDirection.Input),
                    new Parameters("@EmployeeId", empId, DbType.Int32, ParameterDirection.Input)
                };
                hr_AttDetailLst = dbExecutor.FetchData<hr_AttendanceDetail>(CommandType.StoredProcedure,
                    "xRpt_hr_AttendanceDetail", colparameters);
                return hr_AttDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_RawPunch> GetRawPunch(int empId, DateTime from, DateTime to)
        {
            try
            {
                var hr_AttDetailLst = new List<hr_RawPunch>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@EmployeeId", empId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@From", from, DbType.Date, ParameterDirection.Input),
                    new Parameters("@To", to, DbType.Date, ParameterDirection.Input)
                };
                hr_AttDetailLst = dbExecutor.FetchData<hr_RawPunch>(CommandType.StoredProcedure, "hr_Shift_GetRawPunch",
                    colparameters);
                return hr_AttDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AttendanceTypeCount> GetAttendanceTypeCount(DateTime date)
        {
            try
            {
                var hr_AttSummaryLst = new List<hr_AttendanceTypeCount>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@Date", date, DbType.Date, ParameterDirection.Input)
                };
                hr_AttSummaryLst = dbExecutor.FetchData<hr_AttendanceTypeCount>(CommandType.StoredProcedure,
                    "xRpt_hr_AttendanceTypeCount", colparameters);
                return hr_AttSummaryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}