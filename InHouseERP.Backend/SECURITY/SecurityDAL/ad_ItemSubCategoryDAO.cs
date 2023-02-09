using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemSubCategoryDAO //: IDisposible
    {
        private static volatile ad_ItemSubCategoryDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemSubCategoryDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ItemSubCategoryDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemSubCategoryDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemSubCategoryDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemSubCategoryDAO();
            return instance;
        }

        public List<ad_ItemSubCategory> GetAll(int? SubCategoryId = null, int? CategoryId = null)
        {
            try
            {
                var ad_ItemSubCategoryLst = new List<ad_ItemSubCategory>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SubCategoryId", SubCategoryId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemSubCategoryLst = dbExecutor.FetchData<ad_ItemSubCategory>(CommandType.StoredProcedure,
                    "ad_ItemSubCategory_Get", colparameters);
                return ad_ItemSubCategoryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemSubCategory> GetByItemIds(string itemIds)
        {
            try
            {
                var ad_ItemSubCategoryLst = new List<ad_ItemSubCategory>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemIds", itemIds, DbType.String, ParameterDirection.Input)
                };
                ad_ItemSubCategoryLst = dbExecutor.FetchData<ad_ItemSubCategory>(CommandType.StoredProcedure,
                    "ad_ItemSubCategory_GetByItemIds", colparameters);
                return ad_ItemSubCategoryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemSubCategory> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_ItemSubCategoryLst = new List<ad_ItemSubCategory>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_ItemSubCategoryLst = dbExecutor.FetchData<ad_ItemSubCategory>(CommandType.StoredProcedure,
                    "ad_ItemSubCategory_GetDynamic", colparameters);
                return ad_ItemSubCategoryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemSubCategory> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_ItemSubCategoryLst = new List<ad_ItemSubCategory>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_ItemSubCategoryLst = dbExecutor.FetchDataRef<ad_ItemSubCategory>(CommandType.StoredProcedure,
                    "ad_ItemSubCategory_GetPaged", colparameters, ref rows);
                return ad_ItemSubCategoryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemSubCategory _ad_ItemSubCategory)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@CategoryId", _ad_ItemSubCategory.CategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AssetNatureId", _ad_ItemSubCategory.AssetNatureId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryTypeId", _ad_ItemSubCategory.SubCategoryTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryName", _ad_ItemSubCategory.SubCategoryName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SubShortName", _ad_ItemSubCategory.SubShortName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_ItemSubCategory.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_ItemSubCategory.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_ItemSubCategory.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_ItemSubCategory.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_ItemSubCategory.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ItemSubCategory_Create",
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

        public int Update(ad_ItemSubCategory _ad_ItemSubCategory)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@SubCategoryId", _ad_ItemSubCategory.SubCategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CategoryId", _ad_ItemSubCategory.CategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AssetNatureId", _ad_ItemSubCategory.AssetNatureId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryTypeId", _ad_ItemSubCategory.SubCategoryTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryName", _ad_ItemSubCategory.SubCategoryName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SubShortName", _ad_ItemSubCategory.SubShortName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_ItemSubCategory.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_ItemSubCategory.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_ItemSubCategory.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemSubCategory_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int SubCategoryId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SubCategoryId", SubCategoryId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemSubCategory_DeleteById",
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