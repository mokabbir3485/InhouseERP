using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class proc_ImportPurchaseBillOverHeadDAO //: IDisposible
    {
        private static volatile proc_ImportPurchaseBillOverHeadDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public proc_ImportPurchaseBillOverHeadDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static proc_ImportPurchaseBillOverHeadDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new proc_ImportPurchaseBillOverHeadDAO();
                    }

                return instance;
            }
        }

        public static proc_ImportPurchaseBillOverHeadDAO GetInstance()
        {
            if (instance == null) instance = new proc_ImportPurchaseBillOverHeadDAO();
            return instance;
        }

        public List<proc_ImportPurchaseBillOverHead> GetAll(long? PBOverHeadId = null)
        {
            try
            {
                var inv_PurchaseBillOverHeadLst = new List<proc_ImportPurchaseBillOverHead>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBOverHeadId", PBOverHeadId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseBillOverHeadLst =
                    dbExecutor.FetchData<proc_ImportPurchaseBillOverHead>(CommandType.StoredProcedure,
                        "inv_PurchaseBillOverHead_Get", colparameters);
                return inv_PurchaseBillOverHeadLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillOverHead> GetByPBId(long PBId)
        {
            try
            {
                var inv_PurchaseBillOverHeadLst = new List<proc_ImportPurchaseBillOverHead>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBId", PBId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillOverHeadLst =
                    dbExecutor.FetchData<proc_ImportPurchaseBillOverHead>(CommandType.StoredProcedure,
                        "inv_PurchaseBillOverHead_GetByPBId", colparameters);
                return inv_PurchaseBillOverHeadLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(proc_ImportPurchaseBillOverHead _inv_PurchaseBillOverHead)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@PBId", _inv_PurchaseBillOverHead.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@OverHeadId", _inv_PurchaseBillOverHead.OverHeadId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _inv_PurchaseBillOverHead.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OverHeadName", _inv_PurchaseBillOverHead.OverHeadName, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_PurchaseBillOverHead_Create",
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

        public int Update(proc_ImportPurchaseBillOverHead _inv_PurchaseBillOverHead)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@PBOverHeadId", _inv_PurchaseBillOverHead.PBOverHeadId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PBId", _inv_PurchaseBillOverHead.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@OverHeadId", _inv_PurchaseBillOverHead.OverHeadId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _inv_PurchaseBillOverHead.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OverHeadName", _inv_PurchaseBillOverHead.OverHeadName, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_PurchaseBillOverHead_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long PBOverHeadId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBOverHeadId", PBOverHeadId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_PurchaseBillOverHead_DeleteById",
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