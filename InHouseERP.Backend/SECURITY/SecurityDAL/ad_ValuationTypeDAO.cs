using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ValuationTypeDAO //: IDisposible
    {
        private static volatile ad_ValuationTypeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ValuationTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ValuationTypeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ValuationTypeDAO();
                    }

                return instance;
            }
        }

        public static ad_ValuationTypeDAO GetInstance()
        {
            if (instance == null) instance = new ad_ValuationTypeDAO();
            return instance;
        }

        public List<ad_ValuationType> GetAll(int? valuationTypeId = null)
        {
            try
            {
                var ad_ValuationTypeLst = new List<ad_ValuationType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ValuationTypeId", valuationTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ValuationTypeLst = dbExecutor.FetchData<ad_ValuationType>(CommandType.StoredProcedure,
                    "ad_ValuationType_Get", colparameters);
                return ad_ValuationTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ValuationType ad_ValuationType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@ValuationTypeName", ad_ValuationType.ValuationTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_ValuationType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsDefault", ad_ValuationType.IsDefault, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", ad_ValuationType.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", ad_ValuationType.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_ValuationType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_ValuationType.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ValuationType_Create",
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

        public int Update(ad_ValuationType ad_ValuationType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@ValuationTypeId", ad_ValuationType.ValuationTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ValuationTypeName", ad_ValuationType.ValuationTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_ValuationType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsDefault", ad_ValuationType.IsDefault, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_ValuationType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_ValuationType.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ValuationType_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int valuationTypeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ValuationTypeId", valuationTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ValuationType_DeleteById",
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