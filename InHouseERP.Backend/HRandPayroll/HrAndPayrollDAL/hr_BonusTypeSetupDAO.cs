using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_BonusTypeSetupDAO //: IDisposible
    {
        private static volatile hr_BonusTypeSetupDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_BonusTypeSetupDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_BonusTypeSetupDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_BonusTypeSetupDAO();
                    }

                return instance;
            }
        }

        public static hr_BonusTypeSetupDAO GetInstance()
        {
            if (instance == null) instance = new hr_BonusTypeSetupDAO();
            return instance;
        }

        public List<hr_BonusTypeSetup> GetByGradeId(int gradeId)
        {
            try
            {
                var hr_BonusTypeSetupLst = new List<hr_BonusTypeSetup>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@GradeId", gradeId, DbType.Int32, ParameterDirection.Input)
                };
                hr_BonusTypeSetupLst = dbExecutor.FetchData<hr_BonusTypeSetup>(CommandType.StoredProcedure,
                    "hr_BonusTypeSetup_GetByGradeId", colparameters);
                return hr_BonusTypeSetupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_BonusTypeSetup> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var hr_BonusTypeSetupLst = new List<hr_BonusTypeSetup>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                hr_BonusTypeSetupLst = dbExecutor.FetchData<hr_BonusTypeSetup>(CommandType.StoredProcedure,
                    "hr_BonusTypeSetup_GetDynamic", colparameters);
                return hr_BonusTypeSetupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_BonusTypeSetup> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var hr_BonusTypeSetupLst = new List<hr_BonusTypeSetup>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_BonusTypeSetupLst = dbExecutor.FetchDataRef<hr_BonusTypeSetup>(CommandType.StoredProcedure,
                    "hr_BonusTypeSetup_GetPaged", colparameters, ref rows);
                return hr_BonusTypeSetupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_BonusTypeSetup _hr_BonusTypeSetup)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@BonusTypeName", _hr_BonusTypeSetup.BonusTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@GradeId", _hr_BonusTypeSetup.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BonusOn", _hr_BonusTypeSetup.BonusOn, DbType.String, ParameterDirection.Input),
                    new Parameters("@BonusRatio", _hr_BonusTypeSetup.BonusRatio, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_BonusTypeSetup_Create",
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

        public int Update(hr_BonusTypeSetup _hr_BonusTypeSetup)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@BonusTypeSetupId", _hr_BonusTypeSetup.BonusTypeSetupId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@BonusTypeName", _hr_BonusTypeSetup.BonusTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@GradeId", _hr_BonusTypeSetup.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BonusOn", _hr_BonusTypeSetup.BonusOn, DbType.String, ParameterDirection.Input),
                    new Parameters("@BonusRatio", _hr_BonusTypeSetup.BonusRatio, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_BonusTypeSetup_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long bonusTypeSetupId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BonusTypeSetupId", bonusTypeSetupId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_BonusTypeSetup_DeleteById",
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