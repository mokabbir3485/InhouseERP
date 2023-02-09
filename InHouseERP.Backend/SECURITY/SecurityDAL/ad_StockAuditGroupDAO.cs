using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_StockAuditGroupDAO //: IDisposible
    {
        private static volatile ad_StockAuditGroupDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_StockAuditGroupDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_StockAuditGroupDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_StockAuditGroupDAO();
                    }

                return instance;
            }
        }

        public static ad_StockAuditGroupDAO GetInstance()
        {
            if (instance == null) instance = new ad_StockAuditGroupDAO();
            return instance;
        }

        public List<ad_StockAuditGroup> GetAll(int? auditGroupId = null)
        {
            try
            {
                var ad_StockAuditGroupLst = new List<ad_StockAuditGroup>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AuditGroupId", auditGroupId, DbType.Int32, ParameterDirection.Input)
                };
                ad_StockAuditGroupLst = dbExecutor.FetchData<ad_StockAuditGroup>(CommandType.StoredProcedure,
                    "ad_StockAuditGroup_Get", colparameters);
                return ad_StockAuditGroupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_StockAuditGroup ad_StockAuditGroup)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@AuditGroupName", ad_StockAuditGroup.AuditGroupName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_StockAuditGroup.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsDefault", ad_StockAuditGroup.IsDefault, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", ad_StockAuditGroup.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", ad_StockAuditGroup.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_StockAuditGroup.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_StockAuditGroup.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_StockAuditGroup_Create",
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

        public int Update(ad_StockAuditGroup ad_StockAuditGroup)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@AuditGroupId", ad_StockAuditGroup.AuditGroupId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AuditGroupName", ad_StockAuditGroup.AuditGroupName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_StockAuditGroup.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsDefault", ad_StockAuditGroup.IsDefault, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_StockAuditGroup.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_StockAuditGroup.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_StockAuditGroup_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int auditGroupId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AuditGroupId", auditGroupId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_StockAuditGroup_DeleteById",
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