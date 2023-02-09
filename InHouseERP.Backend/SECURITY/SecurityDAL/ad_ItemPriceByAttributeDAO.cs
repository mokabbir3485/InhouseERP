using System;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemPriceByAttributeDAO //: IDisposible
    {
        private static volatile ad_ItemPriceByAttributeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemPriceByAttributeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ItemPriceByAttributeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemPriceByAttributeDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemPriceByAttributeDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemPriceByAttributeDAO();
            return instance;
        }

        public DataTable GetSinglePrice(int transactionTypeId, int priceTypeId, int itemId, int unitId)
        {
            try
            {
                var dt = new DataTable();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@TransactionTypeId", transactionTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttributePriceId", priceTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", itemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UnitId", unitId, DbType.Int32, ParameterDirection.Input)
                };
                dt = dbExecutor.GetDataTable(CommandType.StoredProcedure, "ad_ItemPriceByAttribute_GetSinglePrice",
                    colparameters, true);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemPriceByAttribute ad_ItemPriceByAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@ItemAddAttId", ad_ItemPriceByAttribute.ItemAddAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PriceTypeId", ad_ItemPriceByAttribute.PriceTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PurchaseUnitPrice", ad_ItemPriceByAttribute.PurchaseUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PurchasePackagePrice", ad_ItemPriceByAttribute.PurchasePackagePrice,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PurchaseContainerPrice", ad_ItemPriceByAttribute.PurchaseContainerPrice,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@SaleUnitPrice", ad_ItemPriceByAttribute.SaleUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SalePackagePrice", ad_ItemPriceByAttribute.SalePackagePrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SaleContainerPrice", ad_ItemPriceByAttribute.SaleContainerPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_ItemPriceByAttribute.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", ad_ItemPriceByAttribute.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", ad_ItemPriceByAttribute.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_ItemPriceByAttribute.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_ItemPriceByAttribute.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ItemPriceByAttribute_Create",
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

        public int UpdatePrice(ad_ItemPriceByAttribute ad_ItemPriceByAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@ItemAddAttId", ad_ItemPriceByAttribute.ItemAddAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@Barcode", ad_ItemPriceByAttribute.Barcode, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PurchaseUnitPrice", ad_ItemPriceByAttribute.PurchaseUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PurchasePackagePrice", ad_ItemPriceByAttribute.PurchasePackagePrice,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PurchaseContainerPrice", ad_ItemPriceByAttribute.PurchaseContainerPrice,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@SaleUnitPrice", ad_ItemPriceByAttribute.SaleUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SalePackagePrice", ad_ItemPriceByAttribute.SalePackagePrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SaleContainerPrice", ad_ItemPriceByAttribute.SaleContainerPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_ItemPriceByAttribute.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_ItemPriceByAttribute.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemPriceByAttribute_UpdatePrice",
                    colparameters, true);
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
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemPriceByAttribute_DeleteByItemId",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetByItemId(int itemId)
        {
            try
            {
                var dt = new DataTable();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemId", itemId, DbType.Int32, ParameterDirection.Input)
                };
                dt = dbExecutor.GetDataTable(CommandType.StoredProcedure, "ad_ItemPriceByAttribute_GetByItemId",
                    colparameters, true);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}