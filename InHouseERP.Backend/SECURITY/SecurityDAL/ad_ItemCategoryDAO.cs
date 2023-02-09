using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemCategoryDAO //: IDisposible
    {
        private static volatile ad_ItemCategoryDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemCategoryDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ItemCategoryDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemCategoryDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemCategoryDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemCategoryDAO();
            return instance;
        }

        public List<ad_ItemCategory> GetAll(int? CategoryId = null)
        {
            try
            {
                var ad_ItemCategoryLst = new List<ad_ItemCategory>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CategoryId", CategoryId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemCategoryLst = dbExecutor.FetchData<ad_ItemCategory>(CommandType.StoredProcedure,
                    "ad_ItemCategory_Get", colparameters);
                return ad_ItemCategoryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemCategory> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_ItemCategoryLst = new List<ad_ItemCategory>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_ItemCategoryLst = dbExecutor.FetchData<ad_ItemCategory>(CommandType.StoredProcedure,
                    "ad_ItemCategory_GetDynamic", colparameters);
                return ad_ItemCategoryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemCategory> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_ItemCategoryLst = new List<ad_ItemCategory>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_ItemCategoryLst = dbExecutor.FetchDataRef<ad_ItemCategory>(CommandType.StoredProcedure,
                    "ad_ItemCategory_GetPaged", colparameters, ref rows);
                return ad_ItemCategoryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemCategory _ad_ItemCategory)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@CategoryName", _ad_ItemCategory.CategoryName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ShortName", _ad_ItemCategory.ShortName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_ItemCategory.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_ItemCategory.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_ItemCategory.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_ItemCategory.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_ItemCategory.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ItemCategory_Create",
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

        public int Update(ad_ItemCategory _ad_ItemCategory)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@CategoryId", _ad_ItemCategory.CategoryId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CategoryName", _ad_ItemCategory.CategoryName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ShortName", _ad_ItemCategory.ShortName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_ItemCategory.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_ItemCategory.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_ItemCategory.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemCategory_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int CategoryId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CategoryId", CategoryId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemCategory_DeleteById",
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