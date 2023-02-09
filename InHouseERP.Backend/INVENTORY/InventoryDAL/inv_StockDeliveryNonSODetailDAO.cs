using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockDeliveryNonSODetailDAO //: IDisposible
    {
        private static volatile inv_StockDeliveryNonSODetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockDeliveryNonSODetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockDeliveryNonSODetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockDeliveryNonSODetailDAO();
                    }

                return instance;
            }
        }

        public static inv_StockDeliveryNonSODetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockDeliveryNonSODetailDAO();
            return instance;
        }

        public List<inv_StockDeliveryNonSODetail> GetAll(long? deliveryDetailId = null, long? deliveryId = null)
        {
            try
            {
                var inv_StockDeliveryNonSODetailLst = new List<inv_StockDeliveryNonSODetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeliveryDetailId", deliveryDetailId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockDeliveryNonSODetailLst =
                    dbExecutor.FetchData<inv_StockDeliveryNonSODetail>(CommandType.StoredProcedure,
                        "inv_StockDeliveryNonSODetail_Get", colparameters);
                return inv_StockDeliveryNonSODetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeliveryNonSODetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_StockDeliveryNonSODetailLst = new List<inv_StockDeliveryNonSODetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeliveryNonSODetailLst = dbExecutor.FetchData<inv_StockDeliveryNonSODetail>(
                    CommandType.StoredProcedure, "inv_StockDeliveryNonSODetail_GetDynamic", colparameters);
                return inv_StockDeliveryNonSODetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeliveryNonSODetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockDeliveryNonSODetailLst = new List<inv_StockDeliveryNonSODetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeliveryNonSODetailLst = dbExecutor.FetchDataRef<inv_StockDeliveryNonSODetail>(
                    CommandType.StoredProcedure, "inv_StockDeliveryNonSODetail_GetPaged", colparameters, ref rows);
                return inv_StockDeliveryNonSODetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockDeliveryNonSODetail _inv_StockDeliveryNonSODetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@DeliveryId", _inv_StockDeliveryNonSODetail.DeliveryId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", _inv_StockDeliveryNonSODetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemRemarks", _inv_StockDeliveryNonSODetail.ItemRemarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryQuantity", _inv_StockDeliveryNonSODetail.DeliveryQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryUnitPrice", _inv_StockDeliveryNonSODetail.DeliveryUnitPrice,
                        DbType.Decimal, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_StockDeliveryNonSODetail_Create", colparameters, true);
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

        public int Update(inv_StockDeliveryNonSODetail _inv_StockDeliveryNonSODetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@DeliveryDetailId", _inv_StockDeliveryNonSODetail.DeliveryDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryId", _inv_StockDeliveryNonSODetail.DeliveryId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", _inv_StockDeliveryNonSODetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemRemarks", _inv_StockDeliveryNonSODetail.ItemRemarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryQuantity", _inv_StockDeliveryNonSODetail.DeliveryQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryUnitPrice", _inv_StockDeliveryNonSODetail.DeliveryUnitPrice,
                        DbType.Decimal, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDeliveryNonSODetail_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long deliveryDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeliveryDetailId", deliveryDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDeliveryNonSODetail_DeleteById",
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