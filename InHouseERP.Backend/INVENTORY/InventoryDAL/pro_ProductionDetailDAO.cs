using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class pro_ProductionDetailDAO //: IDisposible
    {
        private static volatile pro_ProductionDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pro_ProductionDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pro_ProductionDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pro_ProductionDetailDAO();
                    }

                return instance;
            }
        }

        public static pro_ProductionDetailDAO GetInstance()
        {
            if (instance == null) instance = new pro_ProductionDetailDAO();
            return instance;
        }

        public List<xRpt_pro_ProductionReport> GetProductionReport(long ProductionId)
        {
            try
            {
                var ProductionReportLst = new List<xRpt_pro_ProductionReport>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ProductionId", ProductionId, DbType.Int64, ParameterDirection.Input)
                };
                ProductionReportLst = dbExecutor.FetchData<xRpt_pro_ProductionReport>(CommandType.StoredProcedure,
                    "xRpt_Pro_ProductionReport", colparameters);
                return ProductionReportLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<pro_ProductionDetail> ProductionWiseDepartmentAndProductionId(Int64 ProductionId, int DepartmentId)
        {
            try
            {
                var pro_ProductionDetailList = new List<pro_ProductionDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ProductionId", ProductionId, DbType.Int64, ParameterDirection.Input),
                     new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input)
                };
                pro_ProductionDetailList = dbExecutor.FetchData<pro_ProductionDetail>(CommandType.StoredProcedure,
                    "pro_ProductionDetail_GetByProductionId", colparameters);
                return pro_ProductionDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pro_ProductionDetail> GetAll(long? productionDetailId = null, long? productionId = null)
        {
            try
            {
                var pro_ProductionDetailLst = new List<pro_ProductionDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ProductionDetailId", productionDetailId, DbType.Int32, ParameterDirection.Input)
                };
                pro_ProductionDetailLst = dbExecutor.FetchData<pro_ProductionDetail>(CommandType.StoredProcedure,
                    "pro_ProductionDetail_Get", colparameters);
                return pro_ProductionDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_ProductionDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var pro_ProductionDetailLst = new List<pro_ProductionDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                pro_ProductionDetailLst = dbExecutor.FetchData<pro_ProductionDetail>(CommandType.StoredProcedure,
                    "pro_ProductionDetail_GetDynamic", colparameters);
                return pro_ProductionDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_ProductionDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var pro_ProductionDetailLst = new List<pro_ProductionDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pro_ProductionDetailLst = dbExecutor.FetchDataRef<pro_ProductionDetail>(CommandType.StoredProcedure,
                    "pro_ProductionDetail_GetPaged", colparameters, ref rows);
                return pro_ProductionDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(pro_ProductionDetail _pro_ProductionDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[21]
                {
                    new Parameters("@ProductionId", _pro_ProductionDetail.ProductionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RawUnitId", _pro_ProductionDetail.RawUnitId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@InternalWorkOrderDetailId", _pro_ProductionDetail.InternalWorkOrderDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _pro_ProductionDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@RawMatrialItemId", _pro_ProductionDetail.RawMatrialItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ProductionItemUnitId", _pro_ProductionDetail.ProductionItemUnitId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@WastageItemUnitId", _pro_ProductionDetail.WastageItemUnitId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@WastageQty ", _pro_ProductionDetail.WastageQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@MachineId", _pro_ProductionDetail.MachineId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UsedMaterialQtyInRoll", _pro_ProductionDetail.UsedMaterialQtyInRoll,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ProductionQuantity", _pro_ProductionDetail.ProductionQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ProductionQtyInRoll", _pro_ProductionDetail.ProductionQtyInRoll, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UsedMaterialLengthinMeter", _pro_ProductionDetail.UsedMaterialLengthinMeter,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UsedMaterialWeigntInKg", _pro_ProductionDetail.UsedMaterialWeigntInKg,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UsedMaterialAreaInSqm", _pro_ProductionDetail.UsedMaterialAreaInSqm,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UsedMaterialUnitCost", _pro_ProductionDetail.UsedMaterialUnitCost, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@WastageRemarks", _pro_ProductionDetail.WastageRemarks, DbType.String,
                        ParameterDirection.Input),
                     new Parameters("@MaterialTypeId", _pro_ProductionDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LabelBrandId", _pro_ProductionDetail.LabelBrandId, DbType.Int32,
                        ParameterDirection.Input),
                     new Parameters("@Raw_MaterialTypeId", _pro_ProductionDetail.Raw_MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                      new Parameters("@AttainableQty", _pro_ProductionDetail.AttainableQty, DbType.Decimal,
                        ParameterDirection.Input)
                     

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "pro_ProductionDetail_Create",
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

        public int Update(pro_ProductionDetail _pro_ProductionDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@ProductionDetailId", _pro_ProductionDetail.ProductionDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ProductionId", _pro_ProductionDetail.ProductionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _pro_ProductionDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@UsedRoll", _pro_ProductionDetail.UsedRoll, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ProductionQuantity", _pro_ProductionDetail.ProductionQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitCost", _pro_ProductionDetail.UnitCost, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pro_ProductionDetail_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long productionDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ProductionDetailId", productionDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pro_ProductionDetail_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_ProductionDetail> ProductionHistoryReport(DateTime FormDate, DateTime ToDate)
        {
            try
            {
                List<pro_ProductionDetail> pro_ProductionDetailLst = new List<pro_ProductionDetail>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FormDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pro_ProductionDetailLst = dbExecutor.FetchData<pro_ProductionDetail>(CommandType.StoredProcedure, "xRpt_Pro_ProductionHistoryReport", colparameters);
                return pro_ProductionDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}