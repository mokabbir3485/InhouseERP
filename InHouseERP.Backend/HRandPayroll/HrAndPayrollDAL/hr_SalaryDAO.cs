using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_SalaryDAO //: IDisposible
    {
        private static volatile hr_SalaryDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_SalaryDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_SalaryDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_SalaryDAO();
                    }

                return instance;
            }
        }

        public static hr_SalaryDAO GetInstance()
        {
            if (instance == null) instance = new hr_SalaryDAO();
            return instance;
        }

        public List<hr_Salary> GetForPrepare(int monthId, int yearId, int gradeId)
        {
            try
            {
                var hr_SalaryLst = new List<hr_Salary>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@MonthId", monthId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@YearId", yearId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@GradeId", gradeId, DbType.Int32, ParameterDirection.Input)
                };
                hr_SalaryLst = dbExecutor.FetchData<hr_Salary>(CommandType.StoredProcedure, "hr_Salary_GetForPrepare",
                    colparameters);
                return hr_SalaryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Salary> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var hr_SalaryLst = new List<hr_Salary>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                hr_SalaryLst = dbExecutor.FetchData<hr_Salary>(CommandType.StoredProcedure, "hr_Salary_GetDynamic",
                    colparameters);
                return hr_SalaryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Salary> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var hr_SalaryLst = new List<hr_Salary>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_SalaryLst = dbExecutor.FetchDataRef<hr_Salary>(CommandType.StoredProcedure, "hr_Salary_GetPaged",
                    colparameters, ref rows);
                return hr_SalaryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(hr_Salary _hr_Salary)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[21]
                {
                    new Parameters("@SalaryId", _hr_Salary.SalaryId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@GradeId", _hr_Salary.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MonthId", _hr_Salary.MonthId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@YearId", _hr_Salary.YearId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FromDate", _hr_Salary.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", _hr_Salary.ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@USDRate", _hr_Salary.USDRate, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@BasicFormula", _hr_Salary.BasicFormula, DbType.String, ParameterDirection.Input),
                    new Parameters("@HouseRentFormula", _hr_Salary.HouseRentFormula, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MedicalFormula", _hr_Salary.MedicalFormula, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ConveyanceFormula", _hr_Salary.ConveyanceFormula, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@LunchFormula", _hr_Salary.LunchFormula, DbType.String, ParameterDirection.Input),
                    new Parameters("@FirstSignLabel", _hr_Salary.FirstSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SecondSignLabel", _hr_Salary.SecondSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ThirdSignLabel", _hr_Salary.ThirdSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FourthSignLabel", _hr_Salary.FourthSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FifthSignLabel", _hr_Salary.FifthSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _hr_Salary.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _hr_Salary.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Salary.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Salary.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "hr_Salary_Post", colparameters,
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

        public int Update(hr_Salary _hr_Salary)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[19]
                {
                    new Parameters("@SalaryId", _hr_Salary.SalaryId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@GradeId", _hr_Salary.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MonthId", _hr_Salary.MonthId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@YearId", _hr_Salary.YearId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FromDate", _hr_Salary.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", _hr_Salary.ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@USDRate", _hr_Salary.USDRate, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@BasicFormula", _hr_Salary.BasicFormula, DbType.String, ParameterDirection.Input),
                    new Parameters("@HouseRentFormula", _hr_Salary.HouseRentFormula, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MedicalFormula", _hr_Salary.MedicalFormula, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ConveyanceFormula", _hr_Salary.ConveyanceFormula, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@LunchFormula", _hr_Salary.LunchFormula, DbType.String, ParameterDirection.Input),
                    new Parameters("@FirstSignLabel", _hr_Salary.FirstSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SecondSignLabel", _hr_Salary.SecondSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ThirdSignLabel", _hr_Salary.ThirdSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FourthSignLabel", _hr_Salary.FourthSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FifthSignLabel", _hr_Salary.FifthSignLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Salary.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Salary.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Salary_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long salaryId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalaryId", salaryId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Salary_DeleteById", colparameters,
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