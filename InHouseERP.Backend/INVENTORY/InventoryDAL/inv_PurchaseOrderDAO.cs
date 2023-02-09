using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_PurchaseOrderDAO //: IDisposible
    {
        private static volatile inv_PurchaseOrderDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_PurchaseOrderDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_PurchaseOrderDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_PurchaseOrderDAO();
                    }

                return instance;
            }
        }

        public static inv_PurchaseOrderDAO GetInstance()
        {
            if (instance == null) instance = new inv_PurchaseOrderDAO();
            return instance;
        }
        public Int64 GetMaxPurchaseOrderNo()
        {
            try
            {
                Int64 maxPurchaseOrderNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxPurchaseOrderNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "proc_GetMaxPurchaseOrderNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxPurchaseOrderNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public List<inv_PurchaseOrder> GetAll(int? POId = null)
        {
            try
            {
                var inv_PurchaseOrderLst = new List<inv_PurchaseOrder>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@POId", POId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseOrderLst = dbExecutor.FetchData<inv_PurchaseOrder>(CommandType.StoredProcedure,
                    "proc_PurchaseOrder_Get", colparameters);
                return inv_PurchaseOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrder> GetTopForPurchaseBill(int topQty)
        {
            try
            {
                var inv_PurchaseOrderLst = new List<inv_PurchaseOrder>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TopQty", topQty, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseOrderLst = dbExecutor.FetchData<inv_PurchaseOrder>(CommandType.StoredProcedure,
                    "inv_PurchaseOrder_GetTopForPurchaseBill", colparameters);
                return inv_PurchaseOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_inv_PurchaseOrder> GetPurchaseOrderReport(int POId)
        {
            try
            {
                var inv_PurchaseOrderLst = new List<xrpt_inv_PurchaseOrder>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@POId", POId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseOrderLst = dbExecutor.FetchData<xrpt_inv_PurchaseOrder>(CommandType.StoredProcedure,
                    "xRpt_proc_PurchaseOrderByPOId", colparameters);
                return inv_PurchaseOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Post(inv_PurchaseOrder PurchaseOrder)
        {
            string ret = "";
            try
            {
                Parameters[] colparameters = new Parameters[24]{
                new Parameters("@POId", PurchaseOrder.POId, DbType.Int64, ParameterDirection.Input),
                new Parameters("@SupplierId", PurchaseOrder.SupplierId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@BranchId", PurchaseOrder.BranchId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@MaterialsDemandId", PurchaseOrder.MaterialsDemandId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@IsLocal", PurchaseOrder.IsLocal, DbType.Boolean, ParameterDirection.Input),
                new Parameters("@IsChecked", PurchaseOrder.IsChecked, DbType.Boolean, ParameterDirection.Input),
                new Parameters("@PONo", PurchaseOrder.PONo, DbType.String, ParameterDirection.Input),
                new Parameters("@ManualPONo", PurchaseOrder.ManualPONo, DbType.String, ParameterDirection.Input),
                new Parameters("@PODate", PurchaseOrder.PODate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@DeliveryDate", PurchaseOrder.DeliveryDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@PreparedById", PurchaseOrder.PreparedById, DbType.Int32, ParameterDirection.Input),
                new Parameters("@CheckedBy", PurchaseOrder.CheckedBy, DbType.Int32, ParameterDirection.Input),
                new Parameters("@Remarks", PurchaseOrder.Remarks, DbType.String, ParameterDirection.Input),
                new Parameters("@ContactNo", PurchaseOrder.ContactNo, DbType.String, ParameterDirection.Input),
                new Parameters("@UpdatorId", PurchaseOrder.UpdatorId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@QuotationNo", PurchaseOrder.QuotationNo, DbType.String, ParameterDirection.Input),
                new Parameters("@PlaceOfDelivery", PurchaseOrder.PlaceOfDelivery, DbType.String, ParameterDirection.Input),
                new Parameters("@TermsAndCondition", PurchaseOrder.TermsAndCondition, DbType.String, ParameterDirection.Input),
                new Parameters("@AdditionalInfo", PurchaseOrder.AdditionalInfo, DbType.String, ParameterDirection.Input),
                new Parameters("@TotalVAT", PurchaseOrder.TotalVAT, DbType.Decimal, ParameterDirection.Input),
                new Parameters("@Amount", PurchaseOrder.Amount, DbType.Decimal, ParameterDirection.Input),
                new Parameters("@AdditionalDiscount ", PurchaseOrder.AdditionalDiscount , DbType.Decimal, ParameterDirection.Input),
                new Parameters("@FreightLabel ", PurchaseOrder.FreightLabel , DbType.String, ParameterDirection.Input),
                new Parameters("@SupplierAddressId", PurchaseOrder.SupplierAddressId, DbType.Int32, ParameterDirection.Input)

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "proc_PurchaseOrder_Post", colparameters, true);
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
        public List<inv_PurchaseOrder> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                List<inv_PurchaseOrder> inv_PurchaseOrderLst = new List<inv_PurchaseOrder>();
                Parameters[] colparameters = new Parameters[5]{
                new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input),
                };
                inv_PurchaseOrderLst = dbExecutor.FetchDataRef<inv_PurchaseOrder>(CommandType.StoredProcedure, "proc_PurchaseOrder_GetPaged", colparameters, ref rows);
                return inv_PurchaseOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrder> GetPurchaseOrderUnApprovalList()
        {
            try
            {
                var inv_PurchaseOrderLst = new List<inv_PurchaseOrder>();

                inv_PurchaseOrderLst = dbExecutor.FetchData<inv_PurchaseOrder>(CommandType.StoredProcedure, "proc_PurchaseOrder_GetUnApprovedPOList", null);
                return inv_PurchaseOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 ApprovalUpdate(inv_PurchaseOrder inv_PurchaseOrder)
        {
            Int64 ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@POId", inv_PurchaseOrder.POId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ApprovedBy", inv_PurchaseOrder.ApprovedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsApproved", inv_PurchaseOrder.IsApproved, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "proc_PurchaseOrder_UpdateApproval",
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
    }
}