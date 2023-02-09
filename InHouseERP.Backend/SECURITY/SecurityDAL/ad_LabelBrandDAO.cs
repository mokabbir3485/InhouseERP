using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_LabelBrandDAO
    {
        private static volatile ad_LabelBrandDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_LabelBrandDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_LabelBrandDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_LabelBrandDAO();
                    }

                return instance;
            }
        }

        public static ad_LabelBrandDAO GetInstance()
        {
            if (instance == null) instance = new ad_LabelBrandDAO();
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

        public List<ad_LabelBrand> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_LabelBrandLst = new List<ad_LabelBrand>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_LabelBrandLst = dbExecutor.FetchData<ad_LabelBrand>(CommandType.StoredProcedure,
                    "ad_LabelBrand_GetDynamic", colparameters);
                return ad_LabelBrandLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_LabelBrand> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_LabelBrandLst = new List<ad_LabelBrand>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_LabelBrandLst = dbExecutor.FetchDataRef<ad_LabelBrand>(CommandType.StoredProcedure,
                    "ad_LabelBrand_GetPaged", colparameters, ref rows);
                return ad_LabelBrandLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Post(ad_LabelBrand ad_LabelBrand)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@LabelBrandId", ad_LabelBrand.LabelBrandId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", ad_LabelBrand.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", ad_LabelBrand.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LabelBrandName", ad_LabelBrand.LabelBrandName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@LabelBrandShortName", ad_LabelBrand.LabelBrandShortName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_LabelBrand.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", ad_LabelBrand.CreatorId, DbType.Int32, ParameterDirection.Input),

                    new Parameters("@UpdatorId", ad_LabelBrand.UpdatorId, DbType.Int32, ParameterDirection.Input)

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_LabelBrand_Post",
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
    }
}
