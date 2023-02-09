using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class proc_ImportPurchaseBillDetailChargeDAO //: IDisposible
    {
        private static volatile proc_ImportPurchaseBillDetailChargeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public proc_ImportPurchaseBillDetailChargeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static proc_ImportPurchaseBillDetailChargeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new proc_ImportPurchaseBillDetailChargeDAO();
                    }

                return instance;
            }
        }

        public static proc_ImportPurchaseBillDetailChargeDAO GetInstance()
        {
            if (instance == null) instance = new proc_ImportPurchaseBillDetailChargeDAO();
            return instance;
        }

        public List<proc_ImportPurchaseBillDetailCharge> GetByPBDetailId(long PBDetailId)
        {
            try
            {
                var inv_PurchaseBillDetailChargeLst = new List<proc_ImportPurchaseBillDetailCharge>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailId", PBDetailId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailChargeLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetailCharge>(
                    CommandType.StoredProcedure, "inv_PurchaseBillDetailCharge_GetByPBDetailId", colparameters);
                return inv_PurchaseBillDetailChargeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(proc_ImportPurchaseBillDetailCharge _inv_PurchaseBillDetailCharge)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@PBDetailId", _inv_PurchaseBillDetailCharge.PBDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ChargeTypeId", _inv_PurchaseBillDetailCharge.ChargeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChargeAmount", _inv_PurchaseBillDetailCharge.ChargeAmount, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_PurchaseBillDetailCharge_Create", colparameters, true);
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

        public int Update(proc_ImportPurchaseBillDetailCharge _inv_PurchaseBillDetailCharge)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ChargeId", _inv_PurchaseBillDetailCharge.ChargeId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PBDetailId", _inv_PurchaseBillDetailCharge.PBDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ChargeTypeId", _inv_PurchaseBillDetailCharge.ChargeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChargeAmount", _inv_PurchaseBillDetailCharge.ChargeAmount, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_PurchaseBillDetailCharge_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long ChargeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ChargeId", ChargeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_PurchaseBillDetailCharge_DeleteById",
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