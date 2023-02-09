using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_AssetNatureDAO //: IDisposible
    {
        private static volatile ad_AssetNatureDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_AssetNatureDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_AssetNatureDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_AssetNatureDAO();
                    }

                return instance;
            }
        }

        public static ad_AssetNatureDAO GetInstance()
        {
            if (instance == null) instance = new ad_AssetNatureDAO();
            return instance;
        }

        public List<ad_AssetNature> GetAll(int? assetNatureId = null)
        {
            try
            {
                var ad_AssetNatureLst = new List<ad_AssetNature>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AssetNatureId", assetNatureId, DbType.Int32, ParameterDirection.Input)
                };
                ad_AssetNatureLst = dbExecutor.FetchData<ad_AssetNature>(CommandType.StoredProcedure,
                    "ad_AssetNature_Get", colparameters);
                return ad_AssetNatureLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_AssetNature ad_AssetNature)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@AssetNatureName", ad_AssetNature.AssetNatureName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsFixed", ad_AssetNature.IsFixed, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_AssetNature_Create",
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

        public int Update(ad_AssetNature ad_AssetNature)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@AssetNatureId", ad_AssetNature.AssetNatureId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AssetNatureName", ad_AssetNature.AssetNatureName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsFixed", ad_AssetNature.IsFixed, DbType.Boolean, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_AssetNature_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int assetNatureId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AssetNatureId", assetNatureId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_AssetNature_DeleteById",
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