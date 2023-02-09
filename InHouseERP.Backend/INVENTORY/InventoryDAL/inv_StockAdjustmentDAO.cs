using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockAdjustmentDAO
    {
        private static volatile inv_StockAdjustmentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockAdjustmentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockAdjustmentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockAdjustmentDAO();
                    }

                return instance;
            }
        }

        public static inv_StockAdjustmentDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockAdjustmentDAO();
            return instance;
        }

        public List<inv_StockAdjustment> GetAll(long? OpeningQtyId = null)
        {
            try
            {
                var inv_OpeningQuantityLst = new List<inv_StockAdjustment>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@OpeningQtyId", OpeningQtyId, DbType.Int32, ParameterDirection.Input)
                };
                inv_OpeningQuantityLst = dbExecutor.FetchData<inv_StockAdjustment>(CommandType.StoredProcedure,
                    "inv_OpeningQuantity_Get", colparameters);
                return inv_OpeningQuantityLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockAdjustmentReason> StockAdjustmentReason(long? ReasonId = null)
        {
            try
            {
                var inv_StockAdjustmentReasonLst = new List<inv_StockAdjustmentReason>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReasonId", ReasonId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockAdjustmentReasonLst = dbExecutor.FetchData<inv_StockAdjustmentReason>(CommandType.StoredProcedure,
                    "inv_StockAdjustmentReason_GetAll", colparameters);
                return inv_StockAdjustmentReasonLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockAdjustment> SearchCurrentQuantity(int ItemId, int DepartmentId, int? MaterialTypeId = null, int? LabelBrandId = null)
        {
            try
            {
                var inv_CurrentQuantityLst = new List<inv_StockAdjustment>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", MaterialTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@LabelBrandId", LabelBrandId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input)
                };
                inv_CurrentQuantityLst = dbExecutor.FetchData<inv_StockAdjustment>(CommandType.StoredProcedure,
                    "inv_Item_CurrentStock_Get", colparameters);
                return inv_CurrentQuantityLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(inv_StockAdjustment _inv_StockAdjustment)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[14]
                {
                    new Parameters("@DepartmentId", _inv_StockAdjustment.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_StockAdjustment.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AdjustmentDate", _inv_StockAdjustment.AdjustmentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockAdjustment.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemUnitId", _inv_StockAdjustment.ItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AdjPcQty", _inv_StockAdjustment.AdjPcQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AdjRollQty", _inv_StockAdjustment.AdjRollQty,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UnitPrice", _inv_StockAdjustment.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockAdjustment.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                     new Parameters("@MaterialTypeId", _inv_StockAdjustment.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LabelBrandId", _inv_StockAdjustment.LabelBrandId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CategoryId", _inv_StockAdjustment.CategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryId", _inv_StockAdjustment.SubCategoryId, DbType.Int32,
                        ParameterDirection.Input),
                     new Parameters("@ReasonId", _inv_StockAdjustment.ReasonId, DbType.Int32,
                        ParameterDirection.Input),
                    

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockAdjustment_Create",
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
        public int CreateWarrentyAndSerialNo(AdjustmentWarrentyAndSerialNoList WarrentyAndSerialNoList)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@StockAdjustmentId", WarrentyAndSerialNoList.StockAdjustmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", WarrentyAndSerialNoList.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", WarrentyAndSerialNoList.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SerialNo", WarrentyAndSerialNoList.SerialNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@WarrentyInDays", WarrentyAndSerialNoList.WarrentyInDays, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsInQuantity", WarrentyAndSerialNoList.IsInQuantity, DbType.Boolean,
                        ParameterDirection.Input)


                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_HardwareStockAdjustmentWarrantyAndSerial_Create",
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
        public List<inv_StockAdjustment> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                List<inv_StockAdjustment> pos_StockAdjustmentLst = new List<inv_StockAdjustment>();
                Parameters[] colparameters = new Parameters[5]{
                new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input),
                };
                pos_StockAdjustmentLst = dbExecutor.FetchDataRef<inv_StockAdjustment>(CommandType.StoredProcedure, "inv_StockAdjustment_GetPaged", colparameters, ref rows);
                return pos_StockAdjustmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
