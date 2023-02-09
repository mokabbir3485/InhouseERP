using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_GradeDAO //: IDisposible
    {
        private static volatile hr_GradeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_GradeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_GradeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_GradeDAO();
                    }

                return instance;
            }
        }

        public static hr_GradeDAO GetInstance()
        {
            if (instance == null) instance = new hr_GradeDAO();
            return instance;
        }

        public List<hr_Grade> GetAll()
        {
            try
            {
                var hr_GradeLst = new List<hr_Grade>();
                hr_GradeLst = dbExecutor.FetchData<hr_Grade>(CommandType.StoredProcedure, "hr_Grade_GetAll");
                return hr_GradeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Grade> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var hr_GradeLst = new List<hr_Grade>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                hr_GradeLst =
                    dbExecutor.FetchData<hr_Grade>(CommandType.StoredProcedure, "hr_Grade_GetDynamic", colparameters);
                return hr_GradeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Grade> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var hr_GradeLst = new List<hr_Grade>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_GradeLst = dbExecutor.FetchDataRef<hr_Grade>(CommandType.StoredProcedure, "hr_Grade_GetPaged",
                    colparameters, ref rows);
                return hr_GradeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_Grade _hr_Grade)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[15]
                {
                    new Parameters("@GradeId", _hr_Grade.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@GradeName", _hr_Grade.GradeName, DbType.String, ParameterDirection.Input),
                    new Parameters("@BasicF1_GrossMinus", _hr_Grade.BasicF1_GrossMinus, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@BasicF2_DivideBy", _hr_Grade.BasicF2_DivideBy, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@BasicF3_MultiplyBy", _hr_Grade.BasicF3_MultiplyBy, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@HasHalfDayPenaltyFraction", _hr_Grade.HasHalfDayPenaltyFraction, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@PerDaySalaryF1_ApplyOn", _hr_Grade.PerDaySalaryF1_ApplyOn, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PerDaySalaryF2_DaysType", _hr_Grade.PerDaySalaryF2_DaysType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@HasProvFund", _hr_Grade.HasProvFund, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ProvFundOn", _hr_Grade.ProvFundOn, DbType.String, ParameterDirection.Input),
                    new Parameters("@CompanyPFPercent", _hr_Grade.CompanyPFPercent, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@EmployeePFPercent", _hr_Grade.EmployeePFPercent, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _hr_Grade.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Grade.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Grade.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_Grade_Create", colparameters,
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

        public int Update(hr_Grade _hr_Grade)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@GradeId", _hr_Grade.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@GradeName", _hr_Grade.GradeName, DbType.String, ParameterDirection.Input),
                    new Parameters("@HasProvFund", _hr_Grade.HasProvFund, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ProvFundOn", _hr_Grade.ProvFundOn, DbType.String, ParameterDirection.Input),
                    new Parameters("@CompanyPFPercent", _hr_Grade.CompanyPFPercent, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@EmployeePFPercent", _hr_Grade.EmployeePFPercent, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _hr_Grade.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Grade.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Grade.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Grade_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int gradeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@GradeId", gradeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Grade_DeleteById", colparameters,
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