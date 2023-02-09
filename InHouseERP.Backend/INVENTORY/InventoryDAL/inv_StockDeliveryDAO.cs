using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockDeliveryDAO //: IDisposible
    {
        private static volatile inv_StockDeliveryDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockDeliveryDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockDeliveryDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockDeliveryDAO();
                    }

                return instance;
            }
        }

        public static inv_StockDeliveryDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockDeliveryDAO();
            return instance;
        }

        public List<inv_StockDelivery> GetAll(long? deliveryId = null)
        {
            try
            {
                var inv_StockDeliveryLst = new List<inv_StockDelivery>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeliveryId", deliveryId, DbType.Int64, ParameterDirection.Input)
                };
                inv_StockDeliveryLst = dbExecutor.FetchData<inv_StockDelivery>(CommandType.StoredProcedure,
                    "inv_StockDelivery_Get", colparameters);
                return inv_StockDeliveryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_ManualStockDelivery> GetAllMnaualDelivery(Int64? ManualDeliveryId = null)
        {
            try
            {
                var inv_ManualStockDeliveryList = new List<inv_ManualStockDelivery>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ManualDeliveryId", ManualDeliveryId, DbType.Int64, ParameterDirection.Input)
                };
                inv_ManualStockDeliveryList = dbExecutor.FetchData<inv_ManualStockDelivery>(CommandType.StoredProcedure,
                    "inv_ManualStockDelivery_Get", colparameters);
                return inv_ManualStockDeliveryList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_StockDelivery> GetStockDeliveryByCompanyId(long CompanyId)
        {
            try
            {
                var inv_StockDeliveryLst = new List<inv_StockDelivery>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId", CompanyId, DbType.Int64, ParameterDirection.Input)
                };
                inv_StockDeliveryLst = dbExecutor.FetchData<inv_StockDelivery>(CommandType.StoredProcedure,
                    "inv_StockDelivery_GetByCompanyId", colparameters);
                return inv_StockDeliveryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_StockDelivery> GetStockDeliveryBySalesInvoiceId(long SalesInvoiceId)
        {
            try
            {
                var inv_StockDeliveryLst = new List<inv_StockDelivery>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SalesInvoiceId", SalesInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                inv_StockDeliveryLst = dbExecutor.FetchData<inv_StockDelivery>(CommandType.StoredProcedure,
                    "inv_StockDelivery_ByInvoiceId", colparameters);
                return inv_StockDeliveryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        

        public List<xrpt_DeliveryHistory> GetByDeliveryHistory(DateTime FormDate,DateTime ToDate)
        {
            try
            {
                var inv_StockDeliveryLst = new List<xrpt_DeliveryHistory>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@fromDate", FormDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                };
                inv_StockDeliveryLst = dbExecutor.FetchData<xrpt_DeliveryHistory>(CommandType.StoredProcedure,
                    "xRpt_inv_DeliveryHistoryReport", colparameters);
                return inv_StockDeliveryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_ManualStockDeliveryDetail> GetByManualDeliveryId(long manualDeliveryId)
        {
            try
            {
                var inv_StockDeliveryLst = new List<inv_ManualStockDeliveryDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ManualDeliveryId", manualDeliveryId, DbType.Int64, ParameterDirection.Input)
                };
                inv_StockDeliveryLst = dbExecutor.FetchData<inv_ManualStockDeliveryDetail>(CommandType.StoredProcedure,
                    "GetByManualDeliveryDetailId", colparameters);
                return inv_StockDeliveryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_ManualStockDelivery> CheckDuplicateManualDeliveryNo(string manualDeliveryNo)
        {
            try
            {
                var inv_StockDeliveryLst = new List<inv_ManualStockDelivery>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ManualDeliveryNo",manualDeliveryNo, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeliveryLst = dbExecutor.FetchData<inv_ManualStockDelivery>(CommandType.StoredProcedure,
                    "inv_ManualStockDelivery_DeliveryNoExist", colparameters);
                return inv_StockDeliveryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_StockDelivery> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_StockDeliveryLst = new List<inv_StockDelivery>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeliveryLst = dbExecutor.FetchData<inv_StockDelivery>(CommandType.StoredProcedure,
                    "inv_StockDelivery_GetDynamic", colparameters);
                return inv_StockDeliveryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDelivery> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockDeliveryLst = new List<inv_StockDelivery>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeliveryLst = dbExecutor.FetchDataRef<inv_StockDelivery>(CommandType.StoredProcedure,
                    "inv_StockDelivery_GetPaged", colparameters, ref rows);
                return inv_StockDeliveryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_ManualStockDelivery> GetManualStockPaged(int startRecordNo, int rowPerPage, string whereClause,
           string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_ManualStockDeliveryLst = new List<inv_ManualStockDelivery>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_ManualStockDeliveryLst = dbExecutor.FetchDataRef<inv_ManualStockDelivery>(CommandType.StoredProcedure,
                    "inv_ManualStockDelivery_GetPaged", colparameters, ref rows);
                return inv_ManualStockDeliveryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public string Add(inv_StockDelivery _inv_StockDelivery)
        {
            var ret = "";
            try
            {
                //Common aCommon = new Common();

                ////DN/17-18/1, DN/17-18/2, DN/17-18/3, DN/17-18/100, DN/17-18/1001

                //string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(_inv_StockDelivery.DeliveryDate);
                //_inv_StockDelivery.DeliveryNo = "DN/" + aFiscalYearPart + "/" + _inv_StockDelivery.DeliveryNo;

                var colparameters = new Parameters[12]
                {
                    new Parameters("@SalesOrderId", _inv_StockDelivery.SalesOrderId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@CiDcChallanId", _inv_StockDelivery.CiDcChallanId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DeliveryNo", _inv_StockDelivery.DeliveryNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ManualDeliveryNo", _inv_StockDelivery.ManualDeliveryNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _inv_StockDelivery.DeliveryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryFromDepartmentId", _inv_StockDelivery.DeliveryFromDepartmentId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DeliverydById", _inv_StockDelivery.DeliverydById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_StockDelivery.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_StockDelivery.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockDelivery.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_StockDelivery.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_StockDelivery.Remarks, DbType.String,
                        ParameterDirection.Input)
                    //new Parameters("@TotalDeliveryQty", _inv_StockDelivery.TotalDeliveryQty, DbType.Decimal,
                    //    ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "inv_StockDelivery_Create",
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


        public int ManualStockDeliveryAdd(inv_ManualStockDelivery _ManualStockDelivery)
        {
            int ret =0;
            try
            {

                var colparameters = new Parameters[14]
                {
                    new Parameters("@ManualDeliveryId", _ManualStockDelivery.ManualDeliveryId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ManualDeliveryNo", _ManualStockDelivery.ManualDeliveryNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _ManualStockDelivery.DeliveryDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@DeliveryFromDepartmentId", _ManualStockDelivery.DeliveryFromDepartmentId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@DeliverydById", _ManualStockDelivery.DeliverydById, DbType.Int32,  ParameterDirection.Input),
                    new Parameters("@CompanyId", _ManualStockDelivery.CompanyId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@CompanyNameDelivery", _ManualStockDelivery.CompanyNameDelivery, DbType.String, ParameterDirection.Input),
                    new Parameters("@AddressDelivery", _ManualStockDelivery.AddressDelivery, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderType", _ManualStockDelivery.OrderType, DbType.String, ParameterDirection.Input),
                    new Parameters("@Remarks", _ManualStockDelivery.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@PONo", _ManualStockDelivery.PONo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PODate", _ManualStockDelivery.PODate, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ManualStockDelivery.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _ManualStockDelivery.SalesOrderId, DbType.Int32, ParameterDirection.Input),
                };
             

                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_ManualStockDelivery_Post",
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

        public int ManualStockDeliveryDetailAdd(inv_ManualStockDeliveryDetail _ManualStockDeliveryDetail)
        {
            int ret = 0;
            try
            {


                var colparameters = new Parameters[11]
                {
                    new Parameters("@ManualDeliveryDetailId", _ManualStockDeliveryDetail.ManualDeliveryDetailId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ManualDeliveryId", _ManualStockDeliveryDetail.ManualDeliveryId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _ManualStockDeliveryDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                 
                    new Parameters("@MaterialTypeId", _ManualStockDeliveryDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", _ManualStockDeliveryDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemUnitId", _ManualStockDeliveryDetail.ItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryQuantity", _ManualStockDeliveryDetail.DeliveryQuantity,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ItemUnitName", _ManualStockDeliveryDetail.ItemUnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@WarrantyDays", _ManualStockDeliveryDetail.WarrantyDays, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@WarrantySerialNo", _ManualStockDeliveryDetail.WarrantySerialNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PcPerRoll", _ManualStockDeliveryDetail.PcPerRoll, DbType.Decimal,
                        ParameterDirection.Input),

                };

                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_ManualStockDeliveryDetail_Post",
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


        public string Update(inv_StockDelivery _inv_StockDelivery)
        {
            var ret = "";
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@DeliveryId", _inv_StockDelivery.DeliveryId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _inv_StockDelivery.DeliveryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DeliverydById", _inv_StockDelivery.DeliverydById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockDelivery.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ManualDeliveryNo", _inv_StockDelivery.ManualDeliveryNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_StockDelivery.Remarks, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "inv_StockDelivery_Update",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_StockDelivery _inv_StockDelivery)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@DeliveryId", _inv_StockDelivery.DeliveryId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_StockDelivery.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_StockDelivery.ApprovedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_StockDelivery.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDelivery_UpdateApprove",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int ManualDeliveryUpDelete(long manualDeliveryDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ManualDeliveryDetailId", manualDeliveryDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_ManualStockDelivery_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Delete(long deliveryId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeliveryId", deliveryId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDelivery_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxDeliveryNo(DateTime deliveryDate)
        {
            try
            {
                var aCommon = new Common();
                var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(deliveryDate);

                var colparameters = new Parameters[2]
                {
                    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                };

                long maxDeliveryNo = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                maxDeliveryNo = dbExecutor.ExecuteScalar64(true, CommandType.Text,
                    "SELECT DeliveryNo=CAST((ISNULL(MAX(CAST(DeliveryNo AS BIGINT)),0)+1) AS VARCHAR(20)) FROM [inv_StockDeliveryNonSO] WHERE [DeliveryDate] BETWEEN @fromDate AND @toDate",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxDeliveryNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxDeliveryId()
        {
            try
            {
                long maxDeliveryId = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                maxDeliveryId = dbExecutor.ExecuteScalar64(true, CommandType.Text,
                    "SELECT MAX( [DeliveryId] ) AS DeliveryId   FROM [dbo].[inv_StockDelivery]", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxDeliveryId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxDeliveryNumber()
        {
            try
            {
                var PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxDeliveryNo");
                return PONo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public DbDataReader GetMaxOrderNumber()
        {
            try
            {
                var PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxOrderNo");
                return PONo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxStockDeliverySLNumber()
        {
            try
            {
                //DbDataReader PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxPurchaseBillNo");
                //return PONo;


                //var aCommon = new Common();
                //var aFiscalYear = aCommon.GetFiscalFormDateAndToDate();
                //var colparameters = new Parameters[2]
                //{
                //    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                //};

                long MaxDeliveryNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxDeliveryNo = dbExecutor.ExecuteScalar64(true, CommandType.Text, "inv_GetMaxDeliveryNo", null, true);
                //var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(deliveryDate);
                //DNo = "DN/" + aFiscalYearPart + "/" + MaxDeliveryNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxDeliveryNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public long GetMaxManualStockDeliverySLNumber()
        {
            try
            {
                //DbDataReader PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxPurchaseBillNo");
                //return PONo;


                //var aCommon = new Common();
                //var aFiscalYear = aCommon.GetFiscalFormDateAndToDate();
                //var colparameters = new Parameters[2]
                //{
                //    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                //};

                long MaxDeliveryNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxDeliveryNo = dbExecutor.ExecuteScalar64(true, CommandType.Text, "inv_GetMaxManualDeliveryNo", null, true);
                //var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(deliveryDate);
                //DNo = "DN/" + aFiscalYearPart + "/" + MaxDeliveryNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxDeliveryNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string GetMaxStockDeliveryOrderNumber(DateTime deliveryDate)
        {
            try
            {
                //DbDataReader PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxPurchaseBillNo");
                //return PONo;


                var aCommon = new Common();
                var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(deliveryDate);
                var colparameters = new Parameters[2]
                {
                    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                };

                long MaxDeliveryOrderNo = 0;
                string OrderNo;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxDeliveryOrderNo = dbExecutor.ExecuteScalar64(true, CommandType.Text,
                    "SELECT inv_GetMaxOrderNo=CAST((ISNULL( MAX(CAST(SUBSTRING([OrderNo],10,((LEN([OrderNo])+1)-10)) AS BIGINT)),0)+1) AS BIGINT) FROM [inv_StockDelivery] WHERE[OrderNo] IS NOT NULL AND LEN([OrderNo])>=9 AND([DeliveryDate] BETWEEN @fromDate AND @toDate)",
                    colparameters, true);
                var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(deliveryDate);
                OrderNo = "SO/" + aFiscalYearPart + "/" + MaxDeliveryOrderNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return OrderNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}