using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_OverTimeTypeDAO //: IDisposible
    {
        private static volatile hr_OverTimeTypeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_OverTimeTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_OverTimeTypeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_OverTimeTypeDAO();
                    }

                return instance;
            }
        }

        public static hr_OverTimeTypeDAO GetInstance()
        {
            if (instance == null) instance = new hr_OverTimeTypeDAO();
            return instance;
        }

        public List<hr_OverTimeType> GetAll(int? overTimeTypeId = null)
        {
            try
            {
                var hr_OverTimeTypeLst = new List<hr_OverTimeType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@OverTimeTypeId", overTimeTypeId, DbType.Int32, ParameterDirection.Input)
                };
                hr_OverTimeTypeLst = dbExecutor.FetchData<hr_OverTimeType>(CommandType.StoredProcedure,
                    "hr_OverTimeType_Get", colparameters);
                return hr_OverTimeTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_OverTimeType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var hr_OverTimeTypeLst = new List<hr_OverTimeType>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                hr_OverTimeTypeLst = dbExecutor.FetchData<hr_OverTimeType>(CommandType.StoredProcedure,
                    "hr_OverTimeType_GetDynamic", colparameters);
                return hr_OverTimeTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_OverTimeType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var hr_OverTimeTypeLst = new List<hr_OverTimeType>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_OverTimeTypeLst = dbExecutor.FetchDataRef<hr_OverTimeType>(CommandType.StoredProcedure,
                    "hr_OverTimeType_GetPaged", colparameters, ref rows);
                return hr_OverTimeTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_OverTimeType _hr_OverTimeType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@OverTimeTypeId", _hr_OverTimeType.OverTimeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@OverTimeTypeName", _hr_OverTimeType.OverTimeTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@OverTimePeriod", _hr_OverTimeType.OverTimePeriod, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@OverTimeOn", _hr_OverTimeType.OverTimeOn, DbType.String, ParameterDirection.Input),
                    new Parameters("@TimesOfAnHour", _hr_OverTimeType.TimesOfAnHour, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@HoursAfterOTStarts", _hr_OverTimeType.HoursAfterOTStarts, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OTPulsaeInMin", _hr_OverTimeType.OTPulsaeInMin, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_OverTimeType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_OverTimeType.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_OverTimeType_Create",
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

        public int Update(hr_OverTimeType _hr_OverTimeType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@OverTimeTypeId", _hr_OverTimeType.OverTimeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@OverTimeTypeName", _hr_OverTimeType.OverTimeTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@OverTimePeriod", _hr_OverTimeType.OverTimePeriod, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@OverTimeOn", _hr_OverTimeType.OverTimeOn, DbType.String, ParameterDirection.Input),
                    new Parameters("@TimesOfAnHour", _hr_OverTimeType.TimesOfAnHour, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@HoursAfterOTStarts", _hr_OverTimeType.HoursAfterOTStarts, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OTPulsaeInMin", _hr_OverTimeType.OTPulsaeInMin, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_OverTimeType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_OverTimeType.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ValidTill", _hr_OverTimeType.ValidTill, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_OverTimeType_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int overTimeTypeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@OverTimeTypeId", overTimeTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_OverTimeType_DeleteById",
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