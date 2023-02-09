using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StoreWiseItemReorderLevelDAO //: IDisposible
    {
        private static volatile inv_StoreWiseItemReorderLevelDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StoreWiseItemReorderLevelDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StoreWiseItemReorderLevelDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StoreWiseItemReorderLevelDAO();
                    }

                return instance;
            }
        }

        public static inv_StoreWiseItemReorderLevelDAO GetInstance()
        {
            if (instance == null) instance = new inv_StoreWiseItemReorderLevelDAO();
            return instance;
        }

        public List<inv_StoreWiseItemReorderLevel> GetAll(long? ReorderLevelId = null, int? DepartmentId = null,
            int? ItemId = null)
        {
            try
            {
                var inv_StoreWiseItemReorderLevelLst = new List<inv_StoreWiseItemReorderLevel>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReorderLevelId", ReorderLevelId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StoreWiseItemReorderLevelLst =
                    dbExecutor.FetchData<inv_StoreWiseItemReorderLevel>(CommandType.StoredProcedure,
                        "inv_StoreWiseItemReorderLevel_Get", colparameters);
                return inv_StoreWiseItemReorderLevelLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StoreWiseItemReorderLevel> Search(int DepartmentId, int? CategoryId = null,
            int? SubcategoryId = null, string ItemIds = null)
        {
            try
            {
                var inv_StoreWiseItemReorderLevelLst = new List<inv_StoreWiseItemReorderLevel>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CategoryId", CategoryId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SubcategoryId", SubcategoryId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemIds", ItemIds, DbType.String, ParameterDirection.Input)
                };
                inv_StoreWiseItemReorderLevelLst =
                    dbExecutor.FetchData<inv_StoreWiseItemReorderLevel>(CommandType.StoredProcedure,
                        "inv_StoreWiseItemReorderLevel_Search", colparameters);
                return inv_StoreWiseItemReorderLevelLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StoreWiseItemReorderLevel> SearchForDashboard(int DepartmentId)
        {
            try
            {
                var inv_StoreWiseItemReorderLevelLst = new List<inv_StoreWiseItemReorderLevel>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StoreWiseItemReorderLevelLst = dbExecutor.FetchData<inv_StoreWiseItemReorderLevel>(
                    CommandType.StoredProcedure, "inv_StoreWiseItemReorderLevel_SearchForDashboard", colparameters);
                return inv_StoreWiseItemReorderLevelLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StoreWiseItemReorderLevel _inv_StoreWiseItemReorderLevel)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@DepartmentId", _inv_StoreWiseItemReorderLevel.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StoreWiseItemReorderLevel.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReorderUnitId", _inv_StoreWiseItemReorderLevel.ReorderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MinReorderLevel", _inv_StoreWiseItemReorderLevel.MinReorderLevel, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MaxReorderLevel", _inv_StoreWiseItemReorderLevel.MaxReorderLevel, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_StoreWiseItemReorderLevel.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UnitName", _inv_StoreWiseItemReorderLevel.UnitName, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_StoreWiseItemReorderLevel_Create", colparameters, true);
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

        public int Update(inv_StoreWiseItemReorderLevel _inv_StoreWiseItemReorderLevel)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@ReorderLevelId", _inv_StoreWiseItemReorderLevel.ReorderLevelId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StoreWiseItemReorderLevel.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StoreWiseItemReorderLevel.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReorderUnitId", _inv_StoreWiseItemReorderLevel.ReorderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MinReorderLevel", _inv_StoreWiseItemReorderLevel.MinReorderLevel, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MaxReorderLevel", _inv_StoreWiseItemReorderLevel.MaxReorderLevel, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_StoreWiseItemReorderLevel.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UnitName", _inv_StoreWiseItemReorderLevel.UnitName, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StoreWiseItemReorderLevel_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long ReorderLevelId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReorderLevelId", ReorderLevelId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_StoreWiseItemReorderLevel_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}