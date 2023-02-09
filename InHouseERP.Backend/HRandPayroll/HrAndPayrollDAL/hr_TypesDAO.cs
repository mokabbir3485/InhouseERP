using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_TypesDAO //: IDisposible
    {
        private static volatile hr_TypesDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_TypesDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_TypesDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_TypesDAO();
                    }

                return instance;
            }
        }

        public static hr_TypesDAO GetInstance()
        {
            if (instance == null) instance = new hr_TypesDAO();
            return instance;
        }

        public List<hr_Types> GetAll(int? typesId = null)
        {
            try
            {
                var hr_TypesLst = new List<hr_Types>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TypesId", typesId, DbType.Int32, ParameterDirection.Input)
                };
                hr_TypesLst =
                    dbExecutor.FetchData<hr_Types>(CommandType.StoredProcedure, "hr_Types_Get", colparameters);
                return hr_TypesLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Types> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var hr_TypesLst = new List<hr_Types>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                hr_TypesLst =
                    dbExecutor.FetchData<hr_Types>(CommandType.StoredProcedure, "hr_Types_GetDynamic", colparameters);
                return hr_TypesLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<hr_Types> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var hr_TypesLst = new List<hr_Types>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                hr_TypesLst = dbExecutor.FetchDataRef<hr_Types>(CommandType.StoredProcedure, "hr_Types_GetPaged",
                    colparameters, ref rows);
                return hr_TypesLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(hr_Types _hr_Types)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@TypesId", _hr_Types.TypesId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@Entity", _hr_Types.Entity, DbType.String, ParameterDirection.Input),
                    new Parameters("@TypesName", _hr_Types.TypesName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _hr_Types.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Types.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Types.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "hr_Types_Create", colparameters,
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

        public int Update(hr_Types _hr_Types)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@TypesId", _hr_Types.TypesId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@Entity", _hr_Types.Entity, DbType.String, ParameterDirection.Input),
                    new Parameters("@TypesName", _hr_Types.TypesName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _hr_Types.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _hr_Types.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _hr_Types.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Types_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int typesId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TypesId", typesId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Types_DeleteById", colparameters,
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