using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_SupplierTypeDAO //: IDisposible
    {
        private static volatile ad_SupplierTypeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_SupplierTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_SupplierTypeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_SupplierTypeDAO();
                    }

                return instance;
            }
        }

        public static ad_SupplierTypeDAO GetInstance()
        {
            if (instance == null) instance = new ad_SupplierTypeDAO();
            return instance;
        }

        public List<ad_SupplierType> GetAll(int? SupplierTypeId = null)
        {
            try
            {
                var ad_SupplierTypeLst = new List<ad_SupplierType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierTypeId", SupplierTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_SupplierTypeLst = dbExecutor.FetchData<ad_SupplierType>(CommandType.StoredProcedure,
                    "ad_SupplierType_Get", colparameters);
                return ad_SupplierTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_SupplierType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_SupplierTypeLst = new List<ad_SupplierType>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_SupplierTypeLst = dbExecutor.FetchData<ad_SupplierType>(CommandType.StoredProcedure,
                    "ad_SupplierType_GetDynamic", colparameters);
                return ad_SupplierTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_SupplierType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_SupplierTypeLst = new List<ad_SupplierType>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_SupplierTypeLst = dbExecutor.FetchDataRef<ad_SupplierType>(CommandType.StoredProcedure,
                    "ad_SupplierType_GetPaged", colparameters, ref rows);
                return ad_SupplierTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_SupplierType _ad_SupplierType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@SupplierTypeName", _ad_SupplierType.SupplierTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_SupplierType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_SupplierType.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_SupplierType.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_SupplierType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_SupplierType.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_SupplierType_Create",
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

        public int Update(ad_SupplierType _ad_SupplierType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@SupplierTypeId", _ad_SupplierType.SupplierTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SupplierTypeName", _ad_SupplierType.SupplierTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_SupplierType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_SupplierType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_SupplierType.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_SupplierType_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int SupplierTypeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierTypeId", SupplierTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_SupplierType_DeleteById",
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