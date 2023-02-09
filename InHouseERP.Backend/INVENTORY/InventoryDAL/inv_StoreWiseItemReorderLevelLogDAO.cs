using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StoreWiseItemReorderLevelLogDAO //: IDisposible
    {
        private static volatile inv_StoreWiseItemReorderLevelLogDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StoreWiseItemReorderLevelLogDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StoreWiseItemReorderLevelLogDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StoreWiseItemReorderLevelLogDAO();
                    }

                return instance;
            }
        }

        public static inv_StoreWiseItemReorderLevelLogDAO GetInstance()
        {
            if (instance == null) instance = new inv_StoreWiseItemReorderLevelLogDAO();
            return instance;
        }

        public List<inv_StoreWiseItemReorderLevelLog> GetAll(long? ReorderLevelLogId = null)
        {
            try
            {
                var inv_StoreWiseItemReorderLevelLogLst = new List<inv_StoreWiseItemReorderLevelLog>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReorderLevelLogId", ReorderLevelLogId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StoreWiseItemReorderLevelLogLst =
                    dbExecutor.FetchData<inv_StoreWiseItemReorderLevelLog>(CommandType.StoredProcedure,
                        "inv_StoreWiseItemReorderLevelLog_Get", colparameters);
                return inv_StoreWiseItemReorderLevelLogLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StoreWiseItemReorderLevelLog _inv_StoreWiseItemReorderLevelLog)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@DepartmentId", _inv_StoreWiseItemReorderLevelLog.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StoreWiseItemReorderLevelLog.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReorderUnitId", _inv_StoreWiseItemReorderLevelLog.ReorderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MinReorderLevel", _inv_StoreWiseItemReorderLevelLog.MinReorderLevel, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MaxReorderLevel", _inv_StoreWiseItemReorderLevelLog.MaxReorderLevel, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LogDate", _inv_StoreWiseItemReorderLevelLog.LogDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_StoreWiseItemReorderLevelLog.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UnitName", _inv_StoreWiseItemReorderLevelLog.UnitName, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_StoreWiseItemReorderLevelLog_Create", colparameters, true);
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

        public int Update(inv_StoreWiseItemReorderLevelLog _inv_StoreWiseItemReorderLevelLog)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@ReorderLevelLogId", _inv_StoreWiseItemReorderLevelLog.ReorderLevelLogId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StoreWiseItemReorderLevelLog.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StoreWiseItemReorderLevelLog.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReorderUnitId", _inv_StoreWiseItemReorderLevelLog.ReorderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MinReorderLevel", _inv_StoreWiseItemReorderLevelLog.MinReorderLevel, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MaxReorderLevel", _inv_StoreWiseItemReorderLevelLog.MaxReorderLevel, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LogDate", _inv_StoreWiseItemReorderLevelLog.LogDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_StoreWiseItemReorderLevelLog.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UnitName", _inv_StoreWiseItemReorderLevelLog.UnitName, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StoreWiseItemReorderLevelLog_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long ReorderLevelLogId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReorderLevelLogId", ReorderLevelLogId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_StoreWiseItemReorderLevelLog_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}