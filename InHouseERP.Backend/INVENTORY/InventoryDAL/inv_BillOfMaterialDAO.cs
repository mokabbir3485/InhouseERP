using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_BillOfMaterialDAO
    {
        private static volatile inv_BillOfMaterialDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_BillOfMaterialDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_BillOfMaterialDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_BillOfMaterialDAO();
                    }

                return instance;
            }
        }

        public static inv_BillOfMaterialDAO GetInstance()
        {
            if (instance == null) instance = new inv_BillOfMaterialDAO();
            return instance;
        }

        public List<inv_BillOfMaterial> Get(long? BillOfMaterialId = null)
        {
            try
            {
                var inv_BillOfMaterialLst = new List<inv_BillOfMaterial>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BillOfMaterialId", BillOfMaterialId, DbType.Int64, ParameterDirection.Input)
                };
                inv_BillOfMaterialLst = dbExecutor.FetchData<inv_BillOfMaterial>(CommandType.StoredProcedure,
                    "inv_BillOfMaterial_Get", colparameters);
                return inv_BillOfMaterialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_BillOfMaterialOverhead> OverheadGetAll(long? BOMId = null, string SectorType = null)
        {
            try
            {
                var inv_BillOfMaterialOverheadLst = new List<inv_BillOfMaterialOverhead>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@BOMId", BOMId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SectorType", SectorType, DbType.String, ParameterDirection.Input)
                };
                inv_BillOfMaterialOverheadLst =
                    dbExecutor.FetchData<inv_BillOfMaterialOverhead>(CommandType.StoredProcedure,
                        "inv_BillOfMaterialOverhead_Get", colparameters);
                return inv_BillOfMaterialOverheadLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_BillOfMaterialDetail> GetDetail(long? BOMId = null)
        {
            try
            {
                var inv_BillOfMaterialDetailLst = new List<inv_BillOfMaterialDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BOMId", BOMId, DbType.Int64, ParameterDirection.Input)
                };
                inv_BillOfMaterialDetailLst =
                    dbExecutor.FetchData<inv_BillOfMaterialDetail>(CommandType.StoredProcedure,
                        "inv_BillOfMaterialDetail_Get", colparameters);
                return inv_BillOfMaterialDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_BillOfMaterial> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_BillOfMaterial = new List<inv_BillOfMaterial>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_BillOfMaterial = dbExecutor.FetchDataRef<inv_BillOfMaterial>(CommandType.StoredProcedure,
                    "inv_BillOfMaterial_GetPaged", colparameters, ref rows);
                return inv_BillOfMaterial;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int DeleteOerheadByBOMId(long BOMId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BOMId", BOMId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_BillOfMaterialOverhead_DeleteByBOMId", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteDetailByBOMId(long BOMId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BOMId", BOMId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_BillOfMaterialDetail_DeleteByBOMId",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Post(inv_BillOfMaterial _inv_BillOfMaterial)
        {
            string ret = "";
            try
            {
                var colparameters = new Parameters[12]
                {
                    new Parameters("@BillOfMaterialId", _inv_BillOfMaterial.BillOfMaterialId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@BillOfMaterialNo", _inv_BillOfMaterial.BillOfMaterialNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_BillOfMaterial.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_BillOfMaterial.ItemName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Qty", _inv_BillOfMaterial.Qty, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UnitId", _inv_BillOfMaterial.UnitId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SubmitDate", _inv_BillOfMaterial.SubmitDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _inv_BillOfMaterial.DeliveryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_BillOfMaterial.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_BillOfMaterial.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_BillOfMaterial.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_BillOfMaterial.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "inv_BillOfMaterial_Post",
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

        public long PostDetail(inv_BillOfMaterialDetail _inv_BillOfMaterialDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[11]
                {
                    new Parameters("@BOMDetailId", _inv_BillOfMaterialDetail.BOMDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@BOMId", _inv_BillOfMaterialDetail.BOMId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_BillOfMaterialDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_BillOfMaterialDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Qty", _inv_BillOfMaterialDetail.Qty, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UnitId", _inv_BillOfMaterialDetail.UnitId, DbType.String, ParameterDirection.Input),
                    new Parameters("@WastagePercentage", _inv_BillOfMaterialDetail.WastagePercentage, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@WastageAmount", _inv_BillOfMaterialDetail.WastageAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalProduction", _inv_BillOfMaterialDetail.TotalProduction, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitPrice", _inv_BillOfMaterialDetail.UnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalValue", _inv_BillOfMaterialDetail.TotalValue, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_BillOfMaterialDetail_Post",
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

        public long PostOverhead(inv_BillOfMaterialOverhead _inv_BillOfMaterialOverhead)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@BOMOverheadId", _inv_BillOfMaterialOverhead.BOMOverheadId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@BOMId", _inv_BillOfMaterialOverhead.BOMId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SectorName", _inv_BillOfMaterialOverhead.SectorName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _inv_BillOfMaterialOverhead.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SectorType", _inv_BillOfMaterialOverhead.SectorType, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_BillOfMaterialOverhead_Post",
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

        //public DbDataReader GetMaxBillOfMaterialNo()
        //{
        //    try
        //    {
        //        var BillOfMaterialNo =
        //            dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxBillOfMaterial");
        //        return BillOfMaterialNo;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public long GetMaxBillOfMaterialNo()
        {
            try
            {
                //DbDataReader PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxPurchaseBillNo");
                //return PONo;


                //var aCommon = new Common();
                //var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(productionDate);
                //var colparameters = new Parameters[2]
                //{
                //    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                //};

                long BOMNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                BOMNo = dbExecutor.ExecuteScalar64(true, CommandType.Text, "inv_GetMaxBillOfMetrialsNo", null, true);
                //var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(productionDate);
                //proNo = "PRO/" + aFiscalYearPart + "/" + productionNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return BOMNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetMaxBillOfMaterialNumber(DateTime bomDate)
        {
            try
            {
                var aCommon = new Common();
                var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(bomDate);

                var colparameters = new Parameters[2]
                {
                    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                };

                long bomNo = 0;
                string bomNumber;
                dbExecutor.ManageTransaction(TransactionType.Open);
                bomNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_GetMaxBillOfMaterialNo",
                    colparameters, true);
                var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(bomDate);
                bomNumber = "BOM/" + aFiscalYearPart + "/" + bomNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return bomNumber;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}