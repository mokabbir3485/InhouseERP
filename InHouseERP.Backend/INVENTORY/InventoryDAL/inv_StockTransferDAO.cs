using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockTransferDAO
    {
        private static volatile inv_StockTransferDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockTransferDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockTransferDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockTransferDAO();
                    }

                return instance;
            }
        }

        public static inv_StockTransferDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockTransferDAO();
            return instance;
        }

        public List<inv_StockTransfer> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockTransfer = new List<inv_StockTransfer>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockTransfer = dbExecutor.FetchDataRef<inv_StockTransfer>(CommandType.StoredProcedure,
                    "inv_StockTransfer_GetPaged", colparameters, ref rows);
                return inv_StockTransfer;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_StockTransfer> GetAllStockTransferType(long? StockTransferTypeId = null)
        {
            try
            {
                var inv_StockTransferLst = new List<inv_StockTransfer>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@StockTransferTypeId", StockTransferTypeId, DbType.Int64, ParameterDirection.Input)
                };
                inv_StockTransferLst = dbExecutor.FetchData<inv_StockTransfer>(CommandType.StoredProcedure,
                    "inv_StockTransferType_GetAll", colparameters);
                return inv_StockTransferLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockTransfer> Get(long? StockTransferId = null)
        {
            try
            {
                var inv_StockTransferLst = new List<inv_StockTransfer>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@StockTransferId", StockTransferId, DbType.Int64, ParameterDirection.Input)
                };
                inv_StockTransferLst = dbExecutor.FetchData<inv_StockTransfer>(CommandType.StoredProcedure,
                    "inv_StockTransfer_Get", colparameters);
                return inv_StockTransferLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long StockTransferDetailPost(inv_StockTransferDetail _inv_StockTransferDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[20]
                {
                    //new Parameters("@StockTransferDetailId", _inv_StockTransferDetail.StockTransferDetailId,
                    //    DbType.Int64, ParameterDirection.Input),
                    new Parameters("@StockTransferId", _inv_StockTransferDetail.StockTransferId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockTransferDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemUnitId", _inv_StockTransferDetail.ItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_StockTransferDetail.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TransferQuantity", _inv_StockTransferDetail.TransferQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    
                    new Parameters("@RollLenghtInMeter", _inv_StockTransferDetail.RollLenghtInMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollAreaInSqMeter", _inv_StockTransferDetail.RollAreaInSqMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PackageWeight", _inv_StockTransferDetail.PackageWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@FromStore", _inv_StockTransferDetail.FromStore, DbType.Int32,
                        ParameterDirection.Input),
                    //new Parameters("@MaterialTypeId", _inv_StockTransferDetail.MaterialTypeId, DbType.Int32,
                    //    ParameterDirection.Input),
                    new Parameters("@TransferJumboWidth", _inv_StockTransferDetail.TransferJumboWidth, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@ToStore", _inv_StockTransferDetail.ToStore, DbType.Int32,ParameterDirection.Input),
                    //new Parameters("@CategoryId", _inv_StockTransferDetail.CategoryId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@SubCategoryId", _inv_StockTransferDetail.SubCategoryId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@ExceedOrShortage", _inv_StockTransferDetail.ExceedOrShortage, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@ProductionDetailId", _inv_StockTransferDetail.ProductionDetailId, DbType.Int64,ParameterDirection.Input),
                    new Parameters("@CategoryId", _inv_StockTransferDetail.CategoryId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _inv_StockTransferDetail.MaterialTypeId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@LabelBrandId", _inv_StockTransferDetail.LabelBrandId, DbType.Int32,ParameterDirection.Input),

                    new Parameters("@To_ItemId", _inv_StockTransferDetail.To_ItemId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@To_MaterialTypeId", _inv_StockTransferDetail.To_MaterialTypeId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@To_LabelBrandId", _inv_StockTransferDetail.To_LabelBrandId, DbType.Int32,ParameterDirection.Input),
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_StockTransferDetail_Create",
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
        public long UpdateHardwareTransferWarrantyAndSerial(inv_TransferSerialDetail inv_TransferSerialDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    //new Parameters("@StockTransferDetailId", _inv_StockTransferDetail.StockTransferDetailId,
                    //    DbType.Int64, ParameterDirection.Input),
                    new Parameters("@HardwareStockSerialId", inv_TransferSerialDetail.HardwareStockSerialId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", inv_TransferSerialDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@FromDepartmentId", inv_TransferSerialDetail.FromDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentId", inv_TransferSerialDetail.ToDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SerialNo", inv_TransferSerialDetail.SerialNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@WarrentyInDays", inv_TransferSerialDetail.WarrentyInDays, DbType.Int32,
                        ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_HardwareTransferWarrantyAndSerial_Update",
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
        public string Post(inv_StockTransfer _inv_StockTransfer)
        {
            var ret = "";
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@StockTransferId", _inv_StockTransfer.StockTransferId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@StockTransferNo ", _inv_StockTransfer.StockTransferNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks ", _inv_StockTransfer.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@StockTransferDate", _inv_StockTransfer.StockTransferDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@StockTransferTypeId", _inv_StockTransfer.StockTransferTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@FromStore", _inv_StockTransfer.FromStore, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ToStore", _inv_StockTransfer.ToStore, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IssuedBy", _inv_StockTransfer.IssuedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ReceivedBy", _inv_StockTransfer.ReceivedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_StockTransfer.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockTransfer.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@InternalWorkOrderId", _inv_StockTransfer.InternalWorkOrderId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ProductionId", _inv_StockTransfer.ProductionId, DbType.Int32, ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "inv_StockTransfer_Post",
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

        //public DbDataReader GetMaxStockTransferNo()
        //{
        //    try
        //    {
        //        var StockTransferNo =
        //            dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxStockTransferNo");
        //        return StockTransferNo;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        
        public List<xrpt_inv_Report> GetMaterialReturnAndISTMForReport(long StockTransferId, int StockTransferTypeId)
        {
            try
            {
                var xrpt_inv_Report = new List<xrpt_inv_Report>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@StockTransferId", StockTransferId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@StockTransferTypeId", StockTransferTypeId, DbType.Int32, ParameterDirection.Input)
                };
                xrpt_inv_Report = dbExecutor.FetchData<xrpt_inv_Report>(CommandType.StoredProcedure,
                    "xRpt_inv_MaterialReturnAndISTMReport", colparameters);
                return xrpt_inv_Report;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_inv_Report> StoreAndItemTransferReport(long StockTransferId, int StockTransferTypeId)
        {
            try
            {
                var xrpt_inv_Report = new List<xrpt_inv_Report>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@StockTransferId", StockTransferId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@StockTransferTypeId", StockTransferTypeId, DbType.Int32, ParameterDirection.Input)
                };
                xrpt_inv_Report = dbExecutor.FetchData<xrpt_inv_Report>(CommandType.StoredProcedure,
                    "xRpt_inv_StoreToStoreAndItemToItemTransfer", colparameters);
                return xrpt_inv_Report;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xrpt_inv_Report> StockTransferLog(DateTime FromDate, DateTime ToDate, int DepartmentId, int ? StockTransferTypeId =null, int ? ItemId=null, int? MaterialTypeId = null)
        {
            try
            {
                var xrpt_inv_Report = new List<xrpt_inv_Report>();
                var colparameters = new Parameters[6]
                {
                    new Parameters("@FromDate",FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate",ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@DepartmentId",DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@StockTransferTypeId",StockTransferTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemId",ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId",MaterialTypeId, DbType.Int32, ParameterDirection.Input),
                };
                xrpt_inv_Report = dbExecutor.FetchData<xrpt_inv_Report>(CommandType.StoredProcedure,
                    "xRpt_inv_StockTransfer_Log", colparameters);
                return xrpt_inv_Report;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public long GetMaxStockTransferNo()
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

                long MaxTarnsferNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxTarnsferNo = dbExecutor.ExecuteScalar64(true, CommandType.Text, "inv_GetMaxStockTransferNo", null, true);
                //var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(stockTransferDate);
                //TransferNo = "STN/" + aFiscalYearPart + "/" + MaxTarnsferNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxTarnsferNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}