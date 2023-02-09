using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockReceiveExtraInfoDAO //: IDisposible
    {
        private static volatile inv_StockReceiveExtraInfoDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockReceiveExtraInfoDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockReceiveExtraInfoDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockReceiveExtraInfoDAO();
                    }

                return instance;
            }
        }

        public static inv_StockReceiveExtraInfoDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockReceiveExtraInfoDAO();
            return instance;
        }

        public List<inv_StockReceiveExtraInfo> GetAll(long? SRExtraInfoId = null, long? SRDetailId = null)
        {
            try
            {
                var inv_StockReceiveExtraInfoLst = new List<inv_StockReceiveExtraInfo>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SRExtraInfoId", SRExtraInfoId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockReceiveExtraInfoLst =
                    dbExecutor.FetchData<inv_StockReceiveExtraInfo>(CommandType.StoredProcedure,
                        "inv_StockReceiveExtraInfo_Get", colparameters);
                return inv_StockReceiveExtraInfoLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockReceiveExtraInfo _inv_StockReceiveExtraInfo)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@SRDetailId", _inv_StockReceiveExtraInfo.SRDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ExtraInfoQuantity", _inv_StockReceiveExtraInfo.ExtraInfoQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ExpiryDate", _inv_StockReceiveExtraInfo.ExpiryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@WarrantyInMon", _inv_StockReceiveExtraInfo.WarrantyInMon, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockReceiveExtraInfo_Create",
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

        public int Update(inv_StockReceiveExtraInfo _inv_StockReceiveExtraInfo)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@SRExtraInfoId", _inv_StockReceiveExtraInfo.SRExtraInfoId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SRDetailId", _inv_StockReceiveExtraInfo.SRDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ExtraInfoQuantity", _inv_StockReceiveExtraInfo.ExtraInfoQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ExpiryDate", _inv_StockReceiveExtraInfo.ExpiryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@WarrantyInMon", _inv_StockReceiveExtraInfo.WarrantyInMon, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockReceiveExtraInfo_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long SRExtraInfoId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SRExtraInfoId", SRExtraInfoId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockReceiveExtraInfo_DeleteById",
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