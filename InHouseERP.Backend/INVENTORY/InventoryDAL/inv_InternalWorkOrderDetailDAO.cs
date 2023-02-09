using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class inv_InternalWorkOrderDetailDAO //: IDisposible
    {
        private static volatile inv_InternalWorkOrderDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_InternalWorkOrderDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_InternalWorkOrderDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_InternalWorkOrderDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_InternalWorkOrderDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_InternalWorkOrderDetailDAO();
            return instance;
        }

        public List<inv_InternalWorkOrderDetail> GetByInternalWorkOrderId(long internalWorkOrderId)
        {
            try
            {
                var inv_InternalWorkOrderDetailLst = new List<inv_InternalWorkOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InternalWorkOrderId", internalWorkOrderId, DbType.Int64, ParameterDirection.Input)
                };
                inv_InternalWorkOrderDetailLst = dbExecutor.FetchData<inv_InternalWorkOrderDetail>(
                    CommandType.StoredProcedure, "inv_InternalWorkOrderDetail_GetByInternalWorkOrderId", colparameters);
                return inv_InternalWorkOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_InternalWorkOrderForSalesOrder> IWOItemResetWithGetBySOItemForLoad(Int64 SalesOrderId)
        {
            try
            {
                var inv_InternalWorkOrderForSalesOrderList = new List<inv_InternalWorkOrderForSalesOrder>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesOrderId", SalesOrderId, DbType.Int64, ParameterDirection.Input)
                };
                inv_InternalWorkOrderForSalesOrderList = dbExecutor.FetchData<inv_InternalWorkOrderForSalesOrder>(
                    CommandType.StoredProcedure, "pos_SalesOrderDetail_GetByIdForItemReset", colparameters);
                return inv_InternalWorkOrderForSalesOrderList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_InternalWorkOrderForSalesOrder> InternalWorkOrderGetMaxNoBySalesOrderId(Int32 SalesOrderId)
        {
            try
            {
                var inv_InternalWorkOrderForSalesOrderList = new List<inv_InternalWorkOrderForSalesOrder>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesOrderId", SalesOrderId, DbType.Int32, ParameterDirection.Input)
                };
                inv_InternalWorkOrderForSalesOrderList = dbExecutor.FetchData<inv_InternalWorkOrderForSalesOrder>(
                    CommandType.StoredProcedure, "inv_InternalWorkOrder_GetMaxNoBySalesOrderId", colparameters);
                return inv_InternalWorkOrderForSalesOrderList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        

        public List<inv_InternalWorkOrderDetail> GetByInternalWorkOrderIdForProduction(long internalWorkOrderId)
        {
            try
            {
                var inv_InternalWorkOrderDetailLst = new List<inv_InternalWorkOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InternalWorkOrderId", internalWorkOrderId, DbType.Int64, ParameterDirection.Input)
                };
                inv_InternalWorkOrderDetailLst = dbExecutor.FetchData<inv_InternalWorkOrderDetail>(
                    CommandType.StoredProcedure, "inv_InternalWorkOrderDetail_GetByInternalWorkOrderId_ForProduction",
                    colparameters);
                return inv_InternalWorkOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int InternalWorkOrderDetail_For_UpdateArtWork(long internalWorkOrderDetailId)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InternalWorkOrderDetailId", internalWorkOrderDetailId, DbType.Int64,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_InternalWorkOrderDetail_For_UpdateArtWork", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrderDetail> GetByInternalWorkOrderIdForRequisition(long internalWorkOrderId)
        {
            try
            {
                var inv_InternalWorkOrderDetailLst = new List<inv_InternalWorkOrderDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InternalWorkOrderId", internalWorkOrderId, DbType.Int64, ParameterDirection.Input)
                };
                inv_InternalWorkOrderDetailLst = dbExecutor.FetchData<inv_InternalWorkOrderDetail>(
                    CommandType.StoredProcedure, "inv_InternalWorkOrderDetail_GetByInternalWorkOrderId_ForRequisition",
                    colparameters);
                return inv_InternalWorkOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public List<inv_InternalWorkOrderDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_InternalWorkOrderDetailLst = new List<inv_InternalWorkOrderDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_InternalWorkOrderDetailLst =
                    dbExecutor.FetchData<inv_InternalWorkOrderDetail>(CommandType.StoredProcedure,
                        "inv_InternalWorkOrderDetail_GetDynamic", colparameters);
                return inv_InternalWorkOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrderDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_InternalWorkOrderDetailLst = new List<inv_InternalWorkOrderDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_InternalWorkOrderDetailLst = dbExecutor.FetchDataRef<inv_InternalWorkOrderDetail>(
                    CommandType.StoredProcedure, "inv_InternalWorkOrderDetail_GetPaged", colparameters, ref rows);
                return inv_InternalWorkOrderDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_InternalWorkOrderDetail _inv_InternalWorkOrderDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[21]
                {
                    new Parameters("@InternalWorkOrderId", _inv_InternalWorkOrderDetail.InternalWorkOrderId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@FinishedItemId", _inv_InternalWorkOrderDetail.FinishedItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_InternalWorkOrderDetail.ItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@Core", _inv_InternalWorkOrderDetail.Core, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@QtyPerRoll", _inv_InternalWorkOrderDetail.QtyPerRoll, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RollDirection", _inv_InternalWorkOrderDetail.RollDirection, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _inv_InternalWorkOrderDetail.DeliveryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IsFullDelivery", _inv_InternalWorkOrderDetail.IsFullDelivery, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@DetailRemarks", _inv_InternalWorkOrderDetail.DetailRemarks, DbType.String,
                        ParameterDirection.Input),

                    new Parameters("@SalesOrderDetailId", _inv_InternalWorkOrderDetail.SalesOrderDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@Ups", _inv_InternalWorkOrderDetail.Ups, DbType.String, ParameterDirection.Input),
                    new Parameters("@Radius", _inv_InternalWorkOrderDetail.Radius, DbType.String,
                        ParameterDirection.Input),


                    new Parameters("@Color", _inv_InternalWorkOrderDetail.Color, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ArtWork", _inv_InternalWorkOrderDetail.ArtWork, DbType.String,
                        ParameterDirection.Input),
                   new Parameters("@PaperTypeId", _inv_InternalWorkOrderDetail.PaperTypeId, DbType.Int32,
                        ParameterDirection.Input),

                     new Parameters("@ItemName", _inv_InternalWorkOrderDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                     new Parameters("@ItemDescription", _inv_InternalWorkOrderDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                     new Parameters("@ItemDescriptionTwo", _inv_InternalWorkOrderDetail.ItemDescriptionTwo, DbType.String,
                        ParameterDirection.Input),
                     new Parameters("@OrderUnitId", _inv_InternalWorkOrderDetail.OrderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                     new Parameters("@OrderQty", _inv_InternalWorkOrderDetail.OrderQty, DbType.Decimal,
                        ParameterDirection.Input),
                     new Parameters("@LabelBrandId", _inv_InternalWorkOrderDetail.LabelBrandId, DbType.Int32,
                        ParameterDirection.Input),


                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "inv_InternalWorkOrderDetail_Create", colparameters, true);
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

        public int Update(inv_InternalWorkOrderDetail _inv_InternalWorkOrderDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[23]
                {
                    new Parameters("@InternalWorkOrderId", _inv_InternalWorkOrderDetail.InternalWorkOrderId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@InternalWorkOrderDetailId", _inv_InternalWorkOrderDetail.InternalWorkOrderDetailId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_InternalWorkOrderDetail.ItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@FinishedItemId", _inv_InternalWorkOrderDetail.FinishedItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@Core", _inv_InternalWorkOrderDetail.Core, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@QtyPerRoll", _inv_InternalWorkOrderDetail.QtyPerRoll, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RollDirection", _inv_InternalWorkOrderDetail.RollDirection, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _inv_InternalWorkOrderDetail.DeliveryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IsFullDelivery", _inv_InternalWorkOrderDetail.IsFullDelivery, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@DetailRemarks", _inv_InternalWorkOrderDetail.DetailRemarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Color", _inv_InternalWorkOrderDetail.Color, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Ups", _inv_InternalWorkOrderDetail.Ups, DbType.String, ParameterDirection.Input),
                    new Parameters("@Radius ", _inv_InternalWorkOrderDetail.Radius, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ArtWork ", _inv_InternalWorkOrderDetail.ArtWork, DbType.String,
                        ParameterDirection.Input),

                    new Parameters("@SalesOrderDetailId", _inv_InternalWorkOrderDetail.SalesOrderDetailId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PaperTypeId", _inv_InternalWorkOrderDetail.PaperTypeId, DbType.Int32,
                        ParameterDirection.Input),

                    new Parameters("@IsVoid", _inv_InternalWorkOrderDetail.IsVoid, DbType.Boolean,
                        ParameterDirection.Input),

                    new Parameters("@ItemName", _inv_InternalWorkOrderDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", _inv_InternalWorkOrderDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescriptionTwo", _inv_InternalWorkOrderDetail.ItemDescriptionTwo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@OrderUnitId", _inv_InternalWorkOrderDetail.OrderUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@OrderQty", _inv_InternalWorkOrderDetail.OrderQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@LabelBrandId", _inv_InternalWorkOrderDetail.LabelBrandId, DbType.Int32,
                        ParameterDirection.Input),

                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_InternalWorkOrderDetail_Post",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public long IWODetailDelete(long InternalWorkOrderDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InternalWorkOrderDetailId", InternalWorkOrderDetailId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_InternalWorkOrderDetail_ItemVoidByDetailId",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int IWOUpdatedItemForDelete(long internalWorkOrderdetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InternalWorkOrderDetailId", internalWorkOrderdetailId, DbType.Int64,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_InternalWorkOrderDetailUpdated_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}