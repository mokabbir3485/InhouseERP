using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class proc_AccessoriesPurchaseDAO
    {
        private static volatile proc_AccessoriesPurchaseDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public proc_AccessoriesPurchaseDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static proc_AccessoriesPurchaseDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new proc_AccessoriesPurchaseDAO();
                    }

                return instance;
            }
        }

        public static proc_AccessoriesPurchaseDAO GetInstance()
        {
            if (instance == null) instance = new proc_AccessoriesPurchaseDAO();
            return instance;
        }

        public Int64 GetMaxAccessoriesPurchaseNo()
        {
            try
            {
                Int64 maxAccessoriesPurchaseNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxAccessoriesPurchaseNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "proc_GetMaxAccessoriesPurchaseNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxAccessoriesPurchaseNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_AccessoriesPurchase> GetAllAccessoriesPurchase(int? PurchaseId = null)
        {
            try
            {
                var ad_CompanyLst = new List<proc_AccessoriesPurchase>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PurchaseId", PurchaseId, DbType.Int32, ParameterDirection.Input)
                };
                ad_CompanyLst =
                    dbExecutor.FetchData<proc_AccessoriesPurchase>(CommandType.StoredProcedure, "proc_AccessoriesPurchase_Get", colparameters);
                return ad_CompanyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int PostAccessoriesPurchase(proc_AccessoriesPurchase proc_AccessoriesPurchase)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[11]
                {
                    new Parameters("@PurchaseId", proc_AccessoriesPurchase.PurchaseId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PurchaseNo", proc_AccessoriesPurchase.PurchaseNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PurchaseDate", proc_AccessoriesPurchase.PurchaseDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ChallanNo", proc_AccessoriesPurchase.ChallanNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@SupplierName", proc_AccessoriesPurchase.SupplierName, DbType.String, ParameterDirection.Input),
                    new Parameters("@SupplierAddress", proc_AccessoriesPurchase.SupplierAddress, DbType.String, ParameterDirection.Input),
                    new Parameters("@NetTotal", proc_AccessoriesPurchase.NetTotal, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@AdditionalDiscount", proc_AccessoriesPurchase.AdditionalDiscount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalAmount", proc_AccessoriesPurchase.TotalAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@Remarks", proc_AccessoriesPurchase.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", proc_AccessoriesPurchase.UpdatorId, DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "proc_AccessoriesPurchase_Post",
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

        public int PostAccessoriesPurchaseDetail(proc_AccessoriesPurchaseDetail proc_AccessoriesPurchaseDetail)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@PurchaseDetailId", proc_AccessoriesPurchaseDetail.PurchaseDetailId, DbType.Int64,
                        ParameterDirection.Input),
                   new Parameters("@PurchaseId", proc_AccessoriesPurchaseDetail.PurchaseId, DbType.Int64,
                        ParameterDirection.Input),

                    new Parameters("@UnitName", proc_AccessoriesPurchaseDetail.UnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ProductName", proc_AccessoriesPurchaseDetail.ProductName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Quantity", proc_AccessoriesPurchaseDetail.Quantity, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UnitPrice", proc_AccessoriesPurchaseDetail.UnitPrice, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@DiscountAmount", proc_AccessoriesPurchaseDetail.DiscountAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VatAmount", proc_AccessoriesPurchaseDetail.VatAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@TotalAmount", proc_AccessoriesPurchaseDetail.Total, DbType.Decimal,
                        ParameterDirection.Input)

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "proc_AccessoriesPurchaseDetail_Post",
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
        public List<proc_AccessoriesPurchaseDetail> GetAccessoriesPurchaseDetailByPurchaseId(int? PurchaseId = null)
        {
            try
            {
                var proc_AccessoriesPurchaseDetailLst = new List<proc_AccessoriesPurchaseDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PurchaseId", PurchaseId, DbType.Int32, ParameterDirection.Input)
                };
                proc_AccessoriesPurchaseDetailLst = dbExecutor.FetchData<proc_AccessoriesPurchaseDetail>(CommandType.StoredProcedure,
                    "proc_AccessoriesPurchaseDetail_Get", colparameters);
                return proc_AccessoriesPurchaseDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_proc_AccessoriesPurchase> GetAccessoriesPurchaseDetailForReportByPurchaseId(int? PurchaseId = null)
        {
            try
            {
                var xrpt_proc_AccessoriesPurchaseDetailLst = new List<xrpt_proc_AccessoriesPurchase>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PurchaseId", PurchaseId, DbType.Int32, ParameterDirection.Input)
                };
                xrpt_proc_AccessoriesPurchaseDetailLst = dbExecutor.FetchData<xrpt_proc_AccessoriesPurchase>(CommandType.StoredProcedure,
                    "xRpt_proc_AccessoriesPurchaseBill", colparameters);
                return xrpt_proc_AccessoriesPurchaseDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_AccessoriesPurchase> GetPagedAccessoriesPurchase(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var proc_AccessoriesPurchase = new List<proc_AccessoriesPurchase>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                proc_AccessoriesPurchase = dbExecutor.FetchDataRef<proc_AccessoriesPurchase>(CommandType.StoredProcedure,
                    "proc_AccessoriesPurchase_GetPaged", colparameters, ref rows);
                return proc_AccessoriesPurchase;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int DeletedAccessoriesPurchaseDetailByPurchaseDetailId(int PurchaseDetailId)
        {
            try
            {
                int ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PurchaseDetailId", PurchaseDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "proc_AccessoriesPurchaseDetail_DeleteByPurchaseDetailId", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_AccessoriesPurchase> GetAccessoriesPurchaseNoExist(string PurchaseNo)
        {
            try
            {
                var pos_InvoiceNoExistList = new List<proc_AccessoriesPurchase>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PurchaseNo", PurchaseNo, DbType.String, ParameterDirection.Input)
                };
                pos_InvoiceNoExistList = dbExecutor.FetchData<proc_AccessoriesPurchase>(CommandType.StoredProcedure,
                    "proc_AccessoriesPurchase_PurchaseNoExist", colparameters);

                return pos_InvoiceNoExistList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
