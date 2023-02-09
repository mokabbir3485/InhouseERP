using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemPriceDAO //: IDisposible
    {
        private static volatile ad_ItemPriceDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemPriceDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ItemPriceDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemPriceDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemPriceDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemPriceDAO();
            return instance;
        }

        public List<ad_ItemPrice> GetByItemId(int ItemId)
        {
            try
            {
                var ad_ItemPriceLst = new List<ad_ItemPrice>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemPriceLst = dbExecutor.FetchData<ad_ItemPrice>(CommandType.StoredProcedure,
                    "ad_ItemPrice_GetByItemId", colparameters);
                return ad_ItemPriceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetSinglePrice(int transactionTypeId, int priceTypeId, long itemAddAttId, int unitId)
        {
            try
            {
                var dt = new DataTable();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@TransactionTypeId", transactionTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PriceTypeId", priceTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", itemAddAttId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@UnitId", unitId, DbType.Int32, ParameterDirection.Input)
                };
                dt = dbExecutor.GetDataTable(CommandType.StoredProcedure, "ad_ItemPrice_GetSinglePrice", colparameters,
                    true);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemPrice ad_ItemPrice)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[11]
                {
                    new Parameters("@TransactionTypeId", ad_ItemPrice.TransactionTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", ad_ItemPrice.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PriceTypeId", ad_ItemPrice.PriceTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UnitPrice", ad_ItemPrice.UnitPrice, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PackagePrice", ad_ItemPrice.PackagePrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ContainerPrice", ad_ItemPrice.ContainerPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_ItemPrice.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", ad_ItemPrice.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", ad_ItemPrice.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_ItemPrice.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_ItemPrice.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ItemPrice_Create",
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

        public int Update(ad_ItemPrice ad_ItemPrice)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@ItemPriceId", ad_ItemPrice.ItemPriceId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TransactionTypeId", ad_ItemPrice.TransactionTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", ad_ItemPrice.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PriceTypeId", ad_ItemPrice.PriceTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UnitPrice", ad_ItemPrice.UnitPrice, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PackagePrice", ad_ItemPrice.PackagePrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ContainerPrice", ad_ItemPrice.ContainerPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_ItemPrice.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_ItemPrice.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_ItemPrice.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemPrice_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteByItemId(int ItemId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemPrice_DeleteByItemId",
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