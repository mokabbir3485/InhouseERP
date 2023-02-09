using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_AllowanceTypeSetupDAO //: IDisposible
    {
        private static volatile hr_AllowanceTypeSetupDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_AllowanceTypeSetupDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_AllowanceTypeSetupDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_AllowanceTypeSetupDAO();
                    }

                return instance;
            }
        }

        public static hr_AllowanceTypeSetupDAO GetInstance()
        {
            if (instance == null) instance = new hr_AllowanceTypeSetupDAO();
            return instance;
        }

        public List<hr_AllowanceTypeSetup> GetByGradeId(int gradeId)
        {
            try
            {
                var hr_AllowanceTypeSetupLst = new List<hr_AllowanceTypeSetup>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@GradeId", gradeId, DbType.Int32, ParameterDirection.Input)
                };
                hr_AllowanceTypeSetupLst = dbExecutor.FetchData<hr_AllowanceTypeSetup>(CommandType.StoredProcedure,
                    "hr_AllowanceTypeSetup_GetByGradeId", colparameters);
                return hr_AllowanceTypeSetupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AllowanceTypeSetup> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var hr_AllowanceTypeSetupLst = new List<hr_AllowanceTypeSetup>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                hr_AllowanceTypeSetupLst = dbExecutor.FetchData<hr_AllowanceTypeSetup>(CommandType.StoredProcedure,
                    "hr_AllowanceTypeSetup_GetDynamic", colparameters);
                return hr_AllowanceTypeSetupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_AllowanceTypeSetup> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var hr_AllowanceTypeSetupLst = new List<hr_AllowanceTypeSetup>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_AllowanceTypeSetupLst = dbExecutor.FetchDataRef<hr_AllowanceTypeSetup>(CommandType.StoredProcedure,
                    "hr_AllowanceTypeSetup_GetPaged", colparameters, ref rows);
                return hr_AllowanceTypeSetupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_AllowanceTypeSetup _hr_AllowanceTypeSetup)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@GradeId", _hr_AllowanceTypeSetup.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AllowanceTypeName", _hr_AllowanceTypeSetup.AllowanceTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ValueType", _hr_AllowanceTypeSetup.ValueType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ApplyOn", _hr_AllowanceTypeSetup.ApplyOn, DbType.String, ParameterDirection.Input),
                    new Parameters("@Value", _hr_AllowanceTypeSetup.Value, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@IsAfterGross", _hr_AllowanceTypeSetup.IsAfterGross, DbType.Boolean,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_AllowanceTypeSetup_Create",
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

        public int Update(hr_AllowanceTypeSetup _hr_AllowanceTypeSetup)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@AllowanceTypeSetupId", _hr_AllowanceTypeSetup.AllowanceTypeSetupId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@GradeId", _hr_AllowanceTypeSetup.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AllowanceTypeName", _hr_AllowanceTypeSetup.AllowanceTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ValueType", _hr_AllowanceTypeSetup.ValueType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ApplyOn", _hr_AllowanceTypeSetup.ApplyOn, DbType.String, ParameterDirection.Input),
                    new Parameters("@Value", _hr_AllowanceTypeSetup.Value, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@IsAfterGross", _hr_AllowanceTypeSetup.IsAfterGross, DbType.Boolean,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_AllowanceTypeSetup_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long allowanceTypeSetupId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AllowanceTypeSetupId", allowanceTypeSetupId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_AllowanceTypeSetup_DeleteById",
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