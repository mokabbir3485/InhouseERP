using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemSubCategoryTypeDAO //: IDisposible
    {
        private static volatile ad_ItemSubCategoryTypeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemSubCategoryTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ItemSubCategoryTypeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemSubCategoryTypeDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemSubCategoryTypeDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemSubCategoryTypeDAO();
            return instance;
        }

        public List<ad_ItemSubCategoryType> GetAll(int? subCategoryTypeId = null)
        {
            try
            {
                var ad_ItemSubCategoryTypeLst = new List<ad_ItemSubCategoryType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SubCategoryTypeId", subCategoryTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemSubCategoryTypeLst = dbExecutor.FetchData<ad_ItemSubCategoryType>(CommandType.StoredProcedure,
                    "ad_ItemSubCategoryType_Get", colparameters);
                return ad_ItemSubCategoryTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemSubCategoryType ad_ItemSubCategoryType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@SubCategoryTypeName", ad_ItemSubCategoryType.SubCategoryTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsFixed", ad_ItemSubCategoryType.IsFixed, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ItemSubCategoryType_Create",
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

        public int Update(ad_ItemSubCategoryType ad_ItemSubCategoryType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@SubCategoryTypeId", ad_ItemSubCategoryType.SubCategoryTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryTypeName", ad_ItemSubCategoryType.SubCategoryTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsFixed", ad_ItemSubCategoryType.IsFixed, DbType.Boolean, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemSubCategoryType_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int subCategoryTypeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SubCategoryTypeId", subCategoryTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemSubCategoryType_DeleteById",
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