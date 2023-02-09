using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class proc_ImportPurchaseBillDAO //: IDisposible
    {
        private static volatile proc_ImportPurchaseBillDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public proc_ImportPurchaseBillDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static proc_ImportPurchaseBillDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new proc_ImportPurchaseBillDAO();
                    }

                return instance;
            }
        }

        public static proc_ImportPurchaseBillDAO GetInstance()
        {
            if (instance == null) instance = new proc_ImportPurchaseBillDAO();
            return instance;
        }

        public List<proc_ImportPurchaseBill> GetAll(long? PBId = null)
        {
            try
            {
                var inv_PurchaseBillLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBId", PBId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillLst = dbExecutor.FetchData<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "proc_ImportPurchaseBill_Get", colparameters);
                return inv_PurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
      
        public List<inv_StockReceive> GetAllRecivedNo(int? SRID)
        {
            try
            {
                var inv_StockReceiveList = new List<inv_StockReceive>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SRId",SRID, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockReceiveList = dbExecutor.FetchData<inv_StockReceive>(CommandType.StoredProcedure,
                    "inv_GetAllWithoutPurchaseReceiveNo", colparameters);
                return inv_StockReceiveList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> LocalGetAll(long? LPBId = null)
        {
            try
            {
                var inv_LocalPurchaseBillLst = new List<inv_LocalPurchaseBill>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@LPBId", LPBId, DbType.Int64, ParameterDirection.Input)
                };
                inv_LocalPurchaseBillLst = dbExecutor.FetchData<inv_LocalPurchaseBill>(CommandType.StoredProcedure,
                    "proc_LocalPurchaseBill_Get", colparameters);
                return inv_LocalPurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_ImportPurchaseBill> GetPurchaseAcknowledgement(long SupplierId, DateTime FromDate, DateTime ToDate)
        {
            try
            {
                var PurchaseLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                PurchaseLst = dbExecutor.FetchData<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "proc_PurchaseBillLocalAndImport_GetPBForAcknowledgement", colparameters);
                return PurchaseLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_ImportPurchaseBill> GetDynamicForImportAndLocalPurchase(string whereCondition,
            string orderByExpression)
        {
            try
            {
                var inv_PurchaseBillLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillLst = dbExecutor.FetchData<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "proc_PurchaseBillImportAndLocal_GetDynamic", colparameters);
                return inv_PurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_PurchaseBillLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillLst = dbExecutor.FetchData<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "proc_ImportPurchaseBill_GetDynamic", colparameters);
                return inv_PurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetBySupplierId(int SupplierId)
        {
            try
            {
                var inv_PurchaseBillLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseBillLst = dbExecutor.FetchData<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "inv_PurchaseBillGetBySupplierId", colparameters);
                return inv_PurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_PurchaseMaterialType> PurchaseMaterialTypeGet()
        {
            try
            {
                var inv_PurchaseMaterialTypeList = new List<inv_PurchaseMaterialType>();

                inv_PurchaseMaterialTypeList =
                    dbExecutor.FetchData<inv_PurchaseMaterialType>(CommandType.StoredProcedure,
                        "inv_PurchaseMaterialTypeGet");
                return inv_PurchaseMaterialTypeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_MaterialDemandVM> GetAllMaterialsDemandNo()
        {
            try
            {
                var inv_MaterialsDemandList = new List<inv_MaterialDemandVM>();

                inv_MaterialsDemandList =
                    dbExecutor.FetchData<inv_MaterialDemandVM>(CommandType.StoredProcedure,
                        "inv_MatrialDemandIssueGetAll");
                return inv_MaterialsDemandList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> GetByLocalSupplierId(int SupplierId)
        {
            try
            {
                var inv_LocalPurchaseBillLst = new List<inv_LocalPurchaseBill>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input)
                };
                inv_LocalPurchaseBillLst = dbExecutor.FetchData<inv_LocalPurchaseBill>(CommandType.StoredProcedure,
                    "proc_PurchaseBillLocalAndImport_GetBySupplierId", colparameters);
                return inv_LocalPurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<proc_ImportPurchaseBillWithStockReceivedReference> GetPurchaseBillWithStockReceivedReferenceAfterSave(Int64 ? SRId)
        {
            try
            {
                var inv_PurchaseBillWithStockReceivedReferenceList = new List<proc_ImportPurchaseBillWithStockReceivedReference>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SRId", SRId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillWithStockReceivedReferenceList = dbExecutor.FetchData<proc_ImportPurchaseBillWithStockReceivedReference>(CommandType.StoredProcedure,
                    "GetAll_PurchaseBillWithStockReceivedReference", colparameters);
                return inv_PurchaseBillWithStockReceivedReferenceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_LocalPurchaseBill> WarrantyAndSerialGetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var proc_ImportPurchaseBill = new List<inv_LocalPurchaseBill>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                proc_ImportPurchaseBill = dbExecutor.FetchDataRef<inv_LocalPurchaseBill>(CommandType.StoredProcedure,
                    "inv_WarrantyAndSerial_GetPaged", colparameters, ref rows);
                return proc_ImportPurchaseBill;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<proc_ImportPurchaseBill> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var inv_PurchaseBillLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillLst = dbExecutor.FetchDataRef<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "proc_ImportPurchaseBill_GetPaged ", colparameters, ref rows);
                return inv_PurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> ImportGetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_PurchaseBillLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillLst = dbExecutor.FetchDataRef<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "proc_ImportPurchaseBill_GetPaged", colparameters, ref rows);
                return inv_PurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> LocalGetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_localPurchaseBillLst = new List<inv_LocalPurchaseBill>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_localPurchaseBillLst = dbExecutor.FetchDataRef<inv_LocalPurchaseBill>(CommandType.StoredProcedure,
                    "proc_LocalPurchaseBill_GetPaged", colparameters, ref rows);
                return inv_localPurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetTopForReceive(int topQty)
        {
            try
            {
                var inv_PurchaseBillLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TopQty", topQty, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseBillLst = dbExecutor.FetchData<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "proc_ImportPurchaseBill_GetTopForReceive ", colparameters);
                return inv_PurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> GetTopForLocalReceive(int topQty)
        {
            try
            {
                var inv_LocalPurchaseBillLst = new List<inv_LocalPurchaseBill>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TopQty", topQty, DbType.Int32, ParameterDirection.Input)
                };
                inv_LocalPurchaseBillLst = dbExecutor.FetchData<inv_LocalPurchaseBill>(CommandType.StoredProcedure,
                    "proc_LocalPurchaseBill_GetTopForReceive", colparameters);
                return inv_LocalPurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> GetTopForLocalWarrentyAndSerialNo(int topQty)
        {
            try
            {
                var inv_LocalPurchaseBillLst = new List<inv_LocalPurchaseBill>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TopQty", topQty, DbType.Int32, ParameterDirection.Input)
                };
                inv_LocalPurchaseBillLst = dbExecutor.FetchData<inv_LocalPurchaseBill>(CommandType.StoredProcedure,
                    "proc_LocalPurchaseBill_GetTopForWarrentyAndSerialNo", colparameters);
                return inv_LocalPurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetTopForImportWarrentyAndSerialNo(int topQty)
        {
            try
            {
                var inv_ImportPurchaseBillLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TopQty", topQty, DbType.Int32, ParameterDirection.Input)
                };
                inv_ImportPurchaseBillLst = dbExecutor.FetchData<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "proc_ImportPurchaseBill_GetTopForWarrentyAndSerialNo", colparameters);
                return inv_ImportPurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<proc_ImportPurchaseBill> GetTopForWarrentyAndSerialNo(int topQty)
        {
            try
            {
                var inv_PurchaseBillLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TopQty", topQty, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseBillLst = dbExecutor.FetchData<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "proc_PurchaseBill_GetTopForWarrentyAndSerialNo", colparameters);
                return inv_PurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string Add(proc_ImportPurchaseBillOwn _inv_PurchaseBill)
        {
            var ret = "";
            try
            {
                var aCommon = new Common();

                //SO/17-18/1, SO/17-18/2, SO/17-18/3, SO/17-18/100, SO/17-18/1001

                //string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(_inv_PurchaseBill.PBDate);
                //_inv_PurchaseBill.PBNo = "IPB/" + aFiscalYearPart + "/" + _inv_PurchaseBill.PBNo;
                //Common aCommon = new Common();

                ////PB/17-18/1, PB/17-18/2, PB/17-18/3, PB/17-18/100, PB/17-18/1001

                //string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(_inv_PurchaseBill.PBDate);
                //_inv_PurchaseBill.PBNo = "PB/" + aFiscalYearPart + "/" + _inv_PurchaseBill.PBNo;

                var colparameters = new Parameters[33]
                {
                    new Parameters("@PBNo", _inv_PurchaseBill.PBNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@LCorPONo", _inv_PurchaseBill.LCorPONo, DbType.String, ParameterDirection.Input),
                    new Parameters("@LCorPODate", _inv_PurchaseBill.LCorPODate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceNo", _inv_PurchaseBill.InvoiceNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@InvoiceDate", _inv_PurchaseBill.InvoiceDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@BondId", _inv_PurchaseBill.BondId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ImportPermitNo", _inv_PurchaseBill.ImportPermitNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ImportPermitDate", _inv_PurchaseBill.ImportPermitDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@BillOfEntryNo", _inv_PurchaseBill.BillOfEntryNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@BillOfEntryDate", _inv_PurchaseBill.BillOfEntryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@PBDate", _inv_PurchaseBill.PBDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@POId", _inv_PurchaseBill.POId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SupplierId", _inv_PurchaseBill.SupplierId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PreparedById", _inv_PurchaseBill.PreparedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ShipmentInfo", _inv_PurchaseBill.ShipmentInfo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_PurchaseBill.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_PurchaseBill.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_PurchaseBill.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@AdditionDiscount", _inv_PurchaseBill.AdditionDiscount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalAmount", _inv_PurchaseBill.TotalAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalAmountAfterDiscount", _inv_PurchaseBill.TotalAmountAfterDiscount,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_PurchaseBill.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_PurchaseBill.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Address", _inv_PurchaseBill.Address, DbType.String, ParameterDirection.Input),

                    new Parameters("@IsApproved", _inv_PurchaseBill.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_PurchaseBill.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@isRawMaterials", _inv_PurchaseBill.isRawMaterials, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@isVDS", _inv_PurchaseBill.isVDS, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@OrganizationId", _inv_PurchaseBill.OrganizationId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BranchId", _inv_PurchaseBill.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CurrencyId", _inv_PurchaseBill.CurrencyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ConversionRate", _inv_PurchaseBill.ConversionRate, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalPriceInBDT", _inv_PurchaseBill.TotalPriceInBDT, DbType.Decimal, ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "proc_ImportPurchaseBill_Create",
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


        public string PurchaseBillWithStockReceivedReferenceSave(proc_ImportPurchaseBillWithStockReceivedReference inv_PStockReference)
        {
            var ret = "";
            try
            {
                var aCommon = new Common();
                var colparameters = new Parameters[7]
                {
                    new Parameters("@PBId", inv_PStockReference.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SRId", inv_PStockReference.SRId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsLocalPurchase", inv_PStockReference.IsLocalPurchase, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", inv_PStockReference.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", inv_PStockReference.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", inv_PStockReference.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", inv_PStockReference.UpdateDate, DbType.DateTime, ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "proc_PurchaseBillWithStockReceivedReference_Create",
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
        public string LocalPBAdd(inv_LocalPurchaseBill local_inv_PurchaseBill)
        {
            var ret = "";
            try
            {
                //Common aCommon = new Common();

                ////PB/17-18/1, PB/17-18/2, PB/17-18/3, PB/17-18/100, PB/17-18/1001

                //string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(local_inv_PurchaseBill.PBDate);
                //local_inv_PurchaseBill.PBNo = "PBL/" + aFiscalYearPart + "/" + local_inv_PurchaseBill.PBNo;

                var colparameters = new Parameters[28]
                {
                    new Parameters("@POId", local_inv_PurchaseBill.POId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ManualPONo", local_inv_PurchaseBill.ManualPONo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ManualPODate", local_inv_PurchaseBill.ManualPODate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@PBNo", local_inv_PurchaseBill.PBNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PBDate", local_inv_PurchaseBill.PBDate, DbType.DateTime, ParameterDirection.Input),
                     new Parameters("@MaterialsDemandIds", local_inv_PurchaseBill.MaterialsDemandIds, DbType.String, ParameterDirection.Input),
                    new Parameters("@SupplierId", local_inv_PurchaseBill.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PreparedById", local_inv_PurchaseBill.PreparedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ShipmentInfo", local_inv_PurchaseBill.ShipmentInfo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PriceTypeId ", local_inv_PurchaseBill.PriceTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", local_inv_PurchaseBill.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", local_inv_PurchaseBill.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", local_inv_PurchaseBill.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@AdditionDiscount", local_inv_PurchaseBill.AdditionDiscount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", local_inv_PurchaseBill.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", local_inv_PurchaseBill.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Address", local_inv_PurchaseBill.Address, DbType.String, ParameterDirection.Input),
                    new Parameters("@TotalAmount", local_inv_PurchaseBill.TotalAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalAmountAfterDiscount", local_inv_PurchaseBill.TotalAmountAfterDiscount,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@isVDS", local_inv_PurchaseBill.isVDS, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsStockable", local_inv_PurchaseBill.IsStockable, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ChallanNo", local_inv_PurchaseBill.ChallanNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@OrganizationId", local_inv_PurchaseBill.OrganizationId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@BranchId", local_inv_PurchaseBill.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TotalAIT", local_inv_PurchaseBill.TotalAIT, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalSD", local_inv_PurchaseBill.TotalSD, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalVAT ", local_inv_PurchaseBill.TotalVAT, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@SupplierDetails ", local_inv_PurchaseBill.SupplierDetails, DbType.String, ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "proc_LocalPurchaseBill_Create",
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


        

       public string LocalPBUpdate(inv_LocalPurchaseBill local_inv_PurchaseBill)
        {
            var ret = "";
            try
            {
               
                var colparameters = new Parameters[27]
                {
                    new Parameters("@LPBId", local_inv_PurchaseBill.LPBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@POId", local_inv_PurchaseBill.POId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ManualPONo", local_inv_PurchaseBill.ManualPONo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ManualPODate", local_inv_PurchaseBill.ManualPODate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@PBNo", local_inv_PurchaseBill.PBNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PBDate", local_inv_PurchaseBill.PBDate, DbType.DateTime, ParameterDirection.Input),
                     new Parameters("@MaterialsDemandIds", local_inv_PurchaseBill.MaterialsDemandIds, DbType.String, ParameterDirection.Input),
                    new Parameters("@SupplierId", local_inv_PurchaseBill.SupplierId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@ShipmentInfo", local_inv_PurchaseBill.ShipmentInfo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PriceTypeId ", local_inv_PurchaseBill.PriceTypeId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@PreparedById ", local_inv_PurchaseBill.PreparedById, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@Remarks", local_inv_PurchaseBill.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", local_inv_PurchaseBill.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", local_inv_PurchaseBill.CreateDate, DbType.DateTime,ParameterDirection.Input),
                    new Parameters("@AdditionDiscount", local_inv_PurchaseBill.AdditionDiscount, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@UpdatorId", local_inv_PurchaseBill.UpdatorId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@UpdateDate", local_inv_PurchaseBill.UpdateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@Address", local_inv_PurchaseBill.Address, DbType.String, ParameterDirection.Input),
                    new Parameters("@TotalAmount", local_inv_PurchaseBill.TotalAmount, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@TotalAmountAfterDiscount", local_inv_PurchaseBill.TotalAmountAfterDiscount,DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@isVDS", local_inv_PurchaseBill.isVDS, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ChallanNo", local_inv_PurchaseBill.ChallanNo, DbType.String,ParameterDirection.Input),
                    new Parameters("@BranchId", local_inv_PurchaseBill.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TotalVAT", local_inv_PurchaseBill.TotalVAT, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalSD", local_inv_PurchaseBill.TotalSD, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalAIT", local_inv_PurchaseBill.TotalAIT, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@SupplierDetails ", local_inv_PurchaseBill.SupplierDetails, DbType.String, ParameterDirection.Input),



                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "proc_LocalPurchaseBill_Update",
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

        public int Update(proc_ImportPurchaseBillOwn _inv_PurchaseBill)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[33]
                {
                 
                    new Parameters("@PBId", _inv_PurchaseBill.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PBNo", _inv_PurchaseBill.PBNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PBDate", _inv_PurchaseBill.PBDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@POId", _inv_PurchaseBill.POId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SupplierId", _inv_PurchaseBill.SupplierId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@InvoiceNo", _inv_PurchaseBill.InvoiceNo, DbType.String,ParameterDirection.Input),
                    new Parameters("@InvoiceDate", _inv_PurchaseBill.InvoiceDate, DbType.DateTime,ParameterDirection.Input),
                    new Parameters("@LCorPONo", _inv_PurchaseBill.LCorPONo, DbType.String,ParameterDirection.Input),
                    new Parameters("@LCorPODate", _inv_PurchaseBill.LCorPODate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@BondId", _inv_PurchaseBill.BondId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ImportPermitNo", _inv_PurchaseBill.ImportPermitNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ImportPermitDate", _inv_PurchaseBill.ImportPermitDate, DbType.DateTime,ParameterDirection.Input),
                    new Parameters("@BillOfEntryNo", _inv_PurchaseBill.BillOfEntryNo, DbType.String,ParameterDirection.Input),
                    new Parameters("@BillOfEntryDate", _inv_PurchaseBill.BillOfEntryDate, DbType.String,ParameterDirection.Input),
                    new Parameters("@PreparedById", _inv_PurchaseBill.PreparedById , DbType.Int32,ParameterDirection.Input),
                    new Parameters("@ShipmentInfo", _inv_PurchaseBill.ShipmentInfo, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_PurchaseBill.CreatorId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@Remarks ", _inv_PurchaseBill.Remarks , DbType.String, ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_PurchaseBill.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_PurchaseBill.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_PurchaseBill.UpdateDate, DbType.DateTime,ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_PurchaseBill.IsApproved, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_PurchaseBill.ApprovedDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@Address", _inv_PurchaseBill.Address, DbType.String, ParameterDirection.Input),
                    new Parameters("@isRawMaterials", _inv_PurchaseBill.isRawMaterials, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@isVDS", _inv_PurchaseBill.isVDS, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@AdditionDiscount", _inv_PurchaseBill.AdditionDiscount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalAmount", _inv_PurchaseBill.TotalAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalAmountAfterDiscount", _inv_PurchaseBill.TotalAmountAfterDiscount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@OrganizationId", _inv_PurchaseBill.OrganizationId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CurrencyId", _inv_PurchaseBill.CurrencyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ConversionRate", _inv_PurchaseBill.ConversionRate, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalPriceInBDT", _inv_PurchaseBill.TotalPriceInBDT, DbType.Decimal, ParameterDirection.Input),

                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "proc_ImportPurchaseBill_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(proc_ImportPurchaseBill _inv_PurchaseBill)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@PBId", _inv_PurchaseBill.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_PurchaseBill.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_PurchaseBill.ApprovedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_PurchaseBill.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "proc_ImportPurchaseBill_UpdateApprove",
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

        public int Delete(long PBId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBId", PBId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_PurchaseBill_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetRawMaterialAndCombination()
        {
            try
            {
                var dt = new DataTable();
                dt = dbExecutor.GetDataTable(CommandType.StoredProcedure, "ad_Item_GetRawMaterialAndCombination", true);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxPurchaseBillNo()
        {
            try
            {
                //DbDataReader PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxPurchaseBillNo");
                //return PONo;


                //var aCommon = new Common();
                //var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(PBDate);
                //var colparameters = new Parameters[2]
                //{
                //    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                //};

                long MaxPurchaseBillNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxPurchaseBillNo = dbExecutor.ExecuteScalar64(true, CommandType.Text, "proc_GetMaxImportPurchaseBillNo", null, true);
                //var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(PBDate);
                //PBNo = "IPB/" + aFiscalYearPart + "/" + MaxPurchaseBillNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxPurchaseBillNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public long GetMaxLocalPBNo()
        {
            try
            {
                //DbDataReader PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxPurchaseBillNo");
                //return PONo;


                //var aCommon = new Common();
                //var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(PBDate);
                //var colparameters = new Parameters[2]
                //{
                //    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                //};

                long MaxLocalPurchaseBillNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxLocalPurchaseBillNo = dbExecutor.ExecuteScalar64(true, CommandType.Text, "proc_GetMaxLocalPurchaseBillNo", null, true);
                //var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(PBDate);
                //PBNo = "LPB/" + aFiscalYearPart + "/" + MaxLocalPurchaseBillNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxLocalPurchaseBillNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxLocalPurchaseBillNo()
        {
            try
            {
                var PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "proc_GetMaxLocalPurchaseBillNo");
                return PONo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Acknowledge(proc_ImportPurchaseBill _inv_PurchaseBill)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@PBId", _inv_PurchaseBill.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_PurchaseBill.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_PurchaseBill.ApprovedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_PurchaseBill.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@VoucherNo", _inv_PurchaseBill.VoucherNo, DbType.String, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_PurchaseBill_Acknowledge",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<proc_ImportPurchaseBill> GetForRealization(int financialCycleId, int supplierId)
        {
            try
            {
                var pos_SalesOrderLst = new List<proc_ImportPurchaseBill>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@FinancialCycleId", financialCycleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SupplierId", supplierId, DbType.Int32, ParameterDirection.Input)
                };
                pos_SalesOrderLst = dbExecutor.FetchData<proc_ImportPurchaseBill>(CommandType.StoredProcedure,
                    "pay_GetPurchaseBillForRealization", colparameters);
                return pos_SalesOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill_Mushak> Get_Mushak6_1(int PBId, bool IsLocal)
        {
            try
            {
                var inv_PurchaseBill_MushakList = new List<proc_ImportPurchaseBill_Mushak>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@PBId", PBId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsLocal", IsLocal, DbType.Boolean, ParameterDirection.Input)
                };
                inv_PurchaseBill_MushakList = dbExecutor.FetchData<proc_ImportPurchaseBill_Mushak>(CommandType.StoredProcedure,
                    "inv_PurchaseBill_Mushak_6_1", colparameters);
                return inv_PurchaseBill_MushakList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill_Mushak> Get_Mushak6_2(int PBId)
        {
            try
            {
                var inv_PurchaseBill_MushakList = new List<proc_ImportPurchaseBill_Mushak>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBId", PBId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseBill_MushakList = dbExecutor.FetchData<proc_ImportPurchaseBill_Mushak>(CommandType.StoredProcedure,
                    "inv_PurchaseBill_Mushak_6_2", colparameters);
                return inv_PurchaseBill_MushakList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBillDetail> GetLocalPB(long LPBId)
        {
            try
            {
                var localPbList = new List<inv_LocalPurchaseBillDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@LPBId", LPBId, DbType.Int64, ParameterDirection.Input)
                };
                localPbList = dbExecutor.FetchData<inv_LocalPurchaseBillDetail>(CommandType.StoredProcedure,
                    "xRpt_proc_LocalPurchaseBillByPBId", colparameters);
                return localPbList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}