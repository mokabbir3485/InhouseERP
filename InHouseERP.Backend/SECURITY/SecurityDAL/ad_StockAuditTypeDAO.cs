using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_StockAuditTypeDAO //: IDisposible
    {
        private static volatile ad_StockAuditTypeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_StockAuditTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_StockAuditTypeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_StockAuditTypeDAO();
                    }

                return instance;
            }
        }

        public static ad_StockAuditTypeDAO GetInstance()
        {
            if (instance == null) instance = new ad_StockAuditTypeDAO();
            return instance;
        }

        public List<ad_StockAuditType> GetAll(int? AuditTypeId = null)
        {
            try
            {
                var ad_StockAuditTypeLst = new List<ad_StockAuditType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AuditTypeId", AuditTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_StockAuditTypeLst = dbExecutor.FetchData<ad_StockAuditType>(CommandType.StoredProcedure,
                    "ad_StockAuditType_Get", colparameters);
                return ad_StockAuditTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockAuditType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_StockAuditTypeLst = new List<ad_StockAuditType>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_StockAuditTypeLst = dbExecutor.FetchData<ad_StockAuditType>(CommandType.StoredProcedure,
                    "ad_StockAuditType_GetDynamic", colparameters);
                return ad_StockAuditTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockAuditType> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_StockAuditTypeLst = new List<ad_StockAuditType>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_StockAuditTypeLst = dbExecutor.FetchDataRef<ad_StockAuditType>(CommandType.StoredProcedure,
                    "ad_StockAuditType_GetPaged", colparameters, ref rows);
                return ad_StockAuditTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_StockAuditType _ad_StockAuditType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@AuditGroupId", _ad_StockAuditType.AuditGroupId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AuditTypeName", _ad_StockAuditType.AuditTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_StockAuditType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_StockAuditType.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_StockAuditType.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_StockAuditType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_StockAuditType.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_StockAuditType_Create",
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

        public int Update(ad_StockAuditType _ad_StockAuditType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@AuditTypeId", _ad_StockAuditType.AuditTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AuditGroupId", _ad_StockAuditType.AuditGroupId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AuditTypeName", _ad_StockAuditType.AuditTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_StockAuditType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_StockAuditType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_StockAuditType.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_StockAuditType_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int AuditTypeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AuditTypeId", AuditTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_StockAuditType_DeleteById",
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