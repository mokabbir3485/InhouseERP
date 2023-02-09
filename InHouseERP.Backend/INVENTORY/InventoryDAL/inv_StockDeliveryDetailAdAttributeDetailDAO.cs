using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockDeliveryDetailAdAttributeDetailDAO //: IDisposible
    {
        private static volatile inv_StockDeliveryDetailAdAttributeDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockDeliveryDetailAdAttributeDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockDeliveryDetailAdAttributeDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockDeliveryDetailAdAttributeDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_StockDeliveryDetailAdAttributeDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockDeliveryDetailAdAttributeDetailDAO();
            return instance;
        }

        public List<inv_StockDeliveryDetailAdAttributeDetail> GetByDeliveryDetailAdAttId(long deliveryDetailAdAttId)
        {
            try
            {
                var inv_StockDeliveryDetailAdAttributeDetailLst = new List<inv_StockDeliveryDetailAdAttributeDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeliveryDetailAdAttId", deliveryDetailAdAttId, DbType.Int64,
                        ParameterDirection.Input)
                };
                inv_StockDeliveryDetailAdAttributeDetailLst =
                    dbExecutor.FetchData<inv_StockDeliveryDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_StockDeliveryDetailAdAttributeDetail_GetByDeliveryDetailAdAttId", colparameters);
                return inv_StockDeliveryDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockDeliveryDetailAdAttributeDetail _inv_StockDeliveryDetailAdAttributeDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@DeliveryDetailAdAttId",
                        _inv_StockDeliveryDetailAdAttributeDetail.DeliveryDetailAdAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _inv_StockDeliveryDetailAdAttributeDetail.ItemAddAttId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttributeValue", _inv_StockDeliveryDetailAdAttributeDetail.AttributeValue,
                        DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_StockDeliveryDetailAdAttributeDetail_Create", colparameters, true);
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