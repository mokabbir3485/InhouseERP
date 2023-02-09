using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_StockMovementMethodDAO //: IDisposible
    {
        private static volatile ad_StockMovementMethodDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_StockMovementMethodDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_StockMovementMethodDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_StockMovementMethodDAO();
                    }

                return instance;
            }
        }

        public static ad_StockMovementMethodDAO GetInstance()
        {
            if (instance == null) instance = new ad_StockMovementMethodDAO();
            return instance;
        }

        public List<ad_StockMovementMethod> GetAll(int? movementmethodId = null)
        {
            try
            {
                var ad_StockMovementMethodLst = new List<ad_StockMovementMethod>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@MovementMethodId", movementmethodId, DbType.Int32, ParameterDirection.Input)
                };
                ad_StockMovementMethodLst = dbExecutor.FetchData<ad_StockMovementMethod>(CommandType.StoredProcedure,
                    "ad_StockMovementMethod_Get", colparameters);
                return ad_StockMovementMethodLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockMovementMethod> GetAllActive()
        {
            try
            {
                var ad_StockMovementMethodLst = new List<ad_StockMovementMethod>();
                ad_StockMovementMethodLst = dbExecutor.FetchData<ad_StockMovementMethod>(CommandType.StoredProcedure,
                    "ad_StockMovementMethod_GetAllActive");
                return ad_StockMovementMethodLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockMovementMethod> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_StockMovementMethodLst = new List<ad_StockMovementMethod>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_StockMovementMethodLst = dbExecutor.FetchData<ad_StockMovementMethod>(CommandType.StoredProcedure,
                    "ad_StockMovementMethod_GetDynamic", colparameters);
                return ad_StockMovementMethodLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockMovementMethod> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_StockMovementMethodLst = new List<ad_StockMovementMethod>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_StockMovementMethodLst = dbExecutor.FetchDataRef<ad_StockMovementMethod>(CommandType.StoredProcedure,
                    "ad_StockMovementMethod_GetPaged", colparameters, ref rows);
                return ad_StockMovementMethodLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_StockMovementMethod _ad_StockMovementMethod)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@MovementMethodName", _ad_StockMovementMethod.MovementMethodName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_StockMovementMethod.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_StockMovementMethod.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_StockMovementMethod.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_StockMovementMethod.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_StockMovementMethod.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_StockMovementMethod_Create",
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

        public int Update(ad_StockMovementMethod _ad_StockMovementMethod)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@MovementMethodId", _ad_StockMovementMethod.MovementMethodId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MovementMethodName", _ad_StockMovementMethod.MovementMethodName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_StockMovementMethod.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_StockMovementMethod.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_StockMovementMethod.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_StockMovementMethod_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int movementmethodId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@MovementMethodId", movementmethodId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_StockMovementMethod_DeleteById",
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