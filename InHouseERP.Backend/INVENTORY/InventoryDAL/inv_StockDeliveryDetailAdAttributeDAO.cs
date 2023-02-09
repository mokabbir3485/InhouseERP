using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockDeliveryDetailAdAttributeDAO //: IDisposible
    {
        private static volatile inv_StockDeliveryDetailAdAttributeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockDeliveryDetailAdAttributeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockDeliveryDetailAdAttributeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockDeliveryDetailAdAttributeDAO();
                    }

                return instance;
            }
        }

        public static inv_StockDeliveryDetailAdAttributeDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockDeliveryDetailAdAttributeDAO();
            return instance;
        }

        public List<inv_StockDeliveryDetailAdAttribute> GetByDeliveryDetailId(long deliveryDetailId)
        {
            try
            {
                var inv_StockDeliveryDetailAdAttributeLst = new List<inv_StockDeliveryDetailAdAttribute>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeliveryDetailId", deliveryDetailId, DbType.Int64, ParameterDirection.Input)
                };
                inv_StockDeliveryDetailAdAttributeLst = dbExecutor.FetchData<inv_StockDeliveryDetailAdAttribute>(
                    CommandType.StoredProcedure, "inv_StockDeliveryDetailAdAttribute_GetByDeliveryDetailId",
                    colparameters);
                return inv_StockDeliveryDetailAdAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockDeliveryDetailAdAttribute _inv_StockDeliveryDetailAdAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@DeliveryDetailId", _inv_StockDeliveryDetailAdAttribute.DeliveryDetailId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@AttributeQty", _inv_StockDeliveryDetailAdAttribute.AttributeQty, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_StockDeliveryDetailAdAttribute_Create", colparameters, true);
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