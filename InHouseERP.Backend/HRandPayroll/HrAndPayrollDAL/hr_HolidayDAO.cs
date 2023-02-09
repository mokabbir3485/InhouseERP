using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_HolidayDAO //: IDisposible
    {
        private static volatile hr_HolidayDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_HolidayDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_HolidayDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_HolidayDAO();
                    }

                return instance;
            }
        }

        public static hr_HolidayDAO GetInstance()
        {
            if (instance == null) instance = new hr_HolidayDAO();
            return instance;
        }

        public List<hr_Holiday> GetAll(int? holidayId = null)
        {
            try
            {
                var hr_HolidayLst = new List<hr_Holiday>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@HolidayId", holidayId, DbType.Int32, ParameterDirection.Input)
                };
                hr_HolidayLst =
                    dbExecutor.FetchData<hr_Holiday>(CommandType.StoredProcedure, "hr_Holiday_Get", colparameters);
                return hr_HolidayLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Holiday> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var hr_HolidayLst = new List<hr_Holiday>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                hr_HolidayLst = dbExecutor.FetchData<hr_Holiday>(CommandType.StoredProcedure, "hr_Holiday_GetDynamic",
                    colparameters);
                return hr_HolidayLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Holiday> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var hr_HolidayLst = new List<hr_Holiday>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_HolidayLst = dbExecutor.FetchDataRef<hr_Holiday>(CommandType.StoredProcedure, "hr_Holiday_GetPaged",
                    colparameters, ref rows);
                return hr_HolidayLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_Holiday _hr_Holiday)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@HolidayId", _hr_Holiday.HolidayId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@HolidayName", _hr_Holiday.HolidayName, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchId", _hr_Holiday.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _hr_Holiday.DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FromDate", _hr_Holiday.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", _hr_Holiday.ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@Remarks", _hr_Holiday.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Holiday.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Holiday.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_Holiday_Create", colparameters,
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

        public int Update(hr_Holiday _hr_Holiday)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@HolidayId", _hr_Holiday.HolidayId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@HolidayName", _hr_Holiday.HolidayName, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchId", _hr_Holiday.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _hr_Holiday.DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FromDate", _hr_Holiday.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", _hr_Holiday.ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@Remarks", _hr_Holiday.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Holiday.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Holiday.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Holiday_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int holidayId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@HolidayId", holidayId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Holiday_DeleteById", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}