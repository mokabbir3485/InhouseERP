using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockReceiveDetailDAO //: IDisposible
    {
        private static volatile inv_StockReceiveDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockReceiveDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockReceiveDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockReceiveDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_StockReceiveDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockReceiveDetailDAO();
            return instance;
        }

        public List<inv_StockReceiveDetail> GetAll(long? sRDetailId = null)
        {
            try
            {
                var inv_StockReceiveDetailLst = new List<inv_StockReceiveDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SRDetailId", sRDetailId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockReceiveDetailLst = dbExecutor.FetchData<inv_StockReceiveDetail>(CommandType.StoredProcedure,
                    "inv_StockReceiveDetail_Get", colparameters);
                return inv_StockReceiveDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockReceiveDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_StockReceiveDetailLst = new List<inv_StockReceiveDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_StockReceiveDetailLst = dbExecutor.FetchData<inv_StockReceiveDetail>(CommandType.StoredProcedure,
                    "inv_StockReceiveDetail_GetDynamic", colparameters);
                return inv_StockReceiveDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockReceiveDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockReceiveDetailLst = new List<inv_StockReceiveDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockReceiveDetailLst = dbExecutor.FetchDataRef<inv_StockReceiveDetail>(CommandType.StoredProcedure,
                    "inv_StockReceiveDetail_GetPaged", colparameters, ref rows);
                return inv_StockReceiveDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockReceiveDetail _inv_StockReceiveDetail)
        {
            var ret = 0;
            try
            {

                var colparameters = new Parameters[22]
                {
                    new Parameters("@SRId", _inv_StockReceiveDetail.SRId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PBDetailId", _inv_StockReceiveDetail.PBDetailId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@CategoryId", _inv_StockReceiveDetail.CategoryId, DbType.Int32, ParameterDirection.Input),
                   
                    new Parameters("@SubCategoryId", _inv_StockReceiveDetail.SubCategoryId, DbType.Int32,
                        ParameterDirection.Input),

                    new Parameters("@ItemId", _inv_StockReceiveDetail.ItemId, DbType.Int32,
                        ParameterDirection.Input),

                    new Parameters("@MaterialTypeId", _inv_StockReceiveDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                
                    new Parameters("@ItemName", _inv_StockReceiveDetail.ItemName, DbType.String,
                        ParameterDirection.Input),

                    new Parameters("@ItemDescription", _inv_StockReceiveDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),

                    new Parameters("@ItemDescriptionTwo", _inv_StockReceiveDetail.ItemDescriptionTwo, DbType.String,
                        ParameterDirection.Input),

                    new Parameters("@HsCodeId", _inv_StockReceiveDetail.HsCodeId, DbType.Int32,
                        ParameterDirection.Input),

                    new Parameters("@RollWidthInMeter", _inv_StockReceiveDetail.RollWidthInMeter, DbType.Decimal,
                        ParameterDirection.Input),

                     new Parameters("@RollLenghtInMeter", _inv_StockReceiveDetail.RollLenghtInMeter, DbType.Decimal,
                        ParameterDirection.Input),

                     new Parameters("@RollAreaInSqMeter", _inv_StockReceiveDetail.RollAreaInSqMeter, DbType.Decimal,
                        ParameterDirection.Input),

                     new Parameters("@PcPerRoll", _inv_StockReceiveDetail.PcPerRoll, DbType.Decimal,
                        ParameterDirection.Input),
                       new Parameters("@RollPerCarton", _inv_StockReceiveDetail.RollPerCarton, DbType.Decimal,
                        ParameterDirection.Input),
                     

                     new Parameters("@UnitPerCarton", _inv_StockReceiveDetail.UnitPerCarton, DbType.Decimal,
                        ParameterDirection.Input),

                     new Parameters("@PackageWeight", _inv_StockReceiveDetail.PackageWeight, DbType.Decimal,
                        ParameterDirection.Input),

                     new Parameters("@CartonWeight", _inv_StockReceiveDetail.CartonWeight, DbType.Decimal,
                        ParameterDirection.Input),

                     new Parameters("@CartonSize", _inv_StockReceiveDetail.CartonSize, DbType.String,
                        ParameterDirection.Input),

                     new Parameters("@SRUnitId", _inv_StockReceiveDetail.SRUnitId, DbType.Int32,
                        ParameterDirection.Input),

                     new Parameters("@SRQuantity", _inv_StockReceiveDetail.SRQuantity, DbType.Decimal,
                        ParameterDirection.Input),

                     new Parameters("@SRUnitPrice", _inv_StockReceiveDetail.SRUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                 
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockReceiveDetail_Create",
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

        public int Update(inv_StockReceiveDetail _inv_StockReceiveDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[11]
                {
                    new Parameters("@SRDetailId", _inv_StockReceiveDetail.SRDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SRId", _inv_StockReceiveDetail.SRId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockReceiveDetail.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SRUnitId", _inv_StockReceiveDetail.SRUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SRQuantity", _inv_StockReceiveDetail.SRQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@FreeUnitId", _inv_StockReceiveDetail.FreeUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@FreeQty", _inv_StockReceiveDetail.FreeQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SRUnitPrice", _inv_StockReceiveDetail.SRUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_StockReceiveDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SRUnitName", _inv_StockReceiveDetail.SRUnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FreeUnitName", _inv_StockReceiveDetail.FreeUnitName, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockReceiveDetail_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long sRDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SRDetailId", sRDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockReceiveDetail_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_XrptStockReceive> GetByRecivedId(long SRId)
        {
            try
            {
                var inv_XrptStockReceiveList = new List<inv_XrptStockReceive>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SRId", SRId, DbType.Int64, ParameterDirection.Input)
                };
                inv_XrptStockReceiveList = dbExecutor.FetchData<inv_XrptStockReceive>(CommandType.StoredProcedure,
                    "xRpt_inv_StockReceive_GetBySRId", colparameters);
                return inv_XrptStockReceiveList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}