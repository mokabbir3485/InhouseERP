using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_PurchaseOrderDetailDAO //: IDisposible
    {
        private static volatile inv_PurchaseOrderDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_PurchaseOrderDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_PurchaseOrderDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_PurchaseOrderDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_PurchaseOrderDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_PurchaseOrderDetailDAO();
            return instance;
        }

        public List<inv_PurchaseOrderDetail> GetAll(long? PODetailId = null)
        {
            try
            {
                var inv_PurchaseOrderDetailLst = new List<inv_PurchaseOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PODetailId", PODetailId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseOrderDetailLst = dbExecutor.FetchData<inv_PurchaseOrderDetail>(CommandType.StoredProcedure,
                    "inv_PurchaseOrderDetail_Get", colparameters);
                return inv_PurchaseOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrderDetail> GetByPOId(long POId)
        {
            try
            {
                var inv_PurchaseOrderDetailLst = new List<inv_PurchaseOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@POId", POId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseOrderDetailLst = dbExecutor.FetchData<inv_PurchaseOrderDetail>(CommandType.StoredProcedure,
                    "proc_PurchaseOrderDetail_GetByPOId", colparameters);
                return inv_PurchaseOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostPODetail(inv_PurchaseOrderDetail PurchaseOrderDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[19]
                {
                    new Parameters("@PODetailId", PurchaseOrderDetail.PODetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@POId", PurchaseOrderDetail.POId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", PurchaseOrderDetail.ItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@UnitId", PurchaseOrderDetail.UnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", PurchaseOrderDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Quantity", PurchaseOrderDetail.Quantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitPrice", PurchaseOrderDetail.UnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@VATAmount", PurchaseOrderDetail.VATAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@VATPercentage", PurchaseOrderDetail.VATPercentage, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescriptionTwo", PurchaseOrderDetail.ItemDescriptionTwo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", PurchaseOrderDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PartCodeNo", PurchaseOrderDetail.PartCodeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@RollDirection", PurchaseOrderDetail.RollDirection, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CuttingSize", PurchaseOrderDetail.CuttingSize, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CuttingQuantity", PurchaseOrderDetail.CuttingQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalReels", PurchaseOrderDetail.TotalReels, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SquareMeter", PurchaseOrderDetail.SquareMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SquareMeterPrice", PurchaseOrderDetail.SquareMeterPrice, DbType.Decimal,
                        ParameterDirection.Input),

                    new Parameters("@IsVoid", PurchaseOrderDetail.IsVoid, DbType.Boolean,
                        ParameterDirection.Input)


                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "proc_PurchaseOrderDetail_Post",
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
        public List<inv_PurchaseOrderDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var PurchaseOrderDetailLst = new List<inv_PurchaseOrderDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                PurchaseOrderDetailLst = dbExecutor.FetchData<inv_PurchaseOrderDetail>(CommandType.StoredProcedure,
                    "proc_PurchaseOrderDetail_GetDynamic", colparameters);
                return PurchaseOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}