using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockIssueDetailDAO //: IDisposible
    {
        private static volatile inv_StockIssueDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockIssueDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockIssueDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockIssueDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_StockIssueDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockIssueDetailDAO();
            return instance;
        }

        public List<inv_StockIssueDetail> GetByIssueId(long issueId)
        {
            try
            {
                var inv_StockIssueDetailLst = new List<inv_StockIssueDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@IssueId", issueId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockIssueDetailLst = dbExecutor.FetchData<inv_StockIssueDetail>(CommandType.StoredProcedure,
                    "inv_StockIssueDetail_GetByIssueId", colparameters);
                return inv_StockIssueDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_StockIssueDetail _inv_StockIssueDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@IssueId", _inv_StockIssueDetail.IssueId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockIssueDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@RequisitionDetailId", _inv_StockIssueDetail.RequisitionDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemUnitId", _inv_StockIssueDetail.ItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssueUnitId", _inv_StockIssueDetail.IssueUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssueQuantity", _inv_StockIssueDetail.IssueQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssueUnitPrice", _inv_StockIssueDetail.IssueUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_StockIssueDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IssueUnitName", _inv_StockIssueDetail.IssueUnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@RollLenghtInMeter", _inv_StockIssueDetail.RollLenghtInMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollAreaInSqMeter", _inv_StockIssueDetail.RollAreaInSqMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PackageWeight", _inv_StockIssueDetail.PackageWeight, DbType.Decimal,
                        ParameterDirection.Input),
                     new Parameters("@PaperTypeId", _inv_StockIssueDetail.PaperTypeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_StockIssueDetail_Create",
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
        public long InternalStockIssueDetailAdd(inv_InternalStockIssueDetail _inv_StockIssueDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StockIssueId", _inv_StockIssueDetail.StockIssueId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockIssueDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _inv_StockIssueDetail.MaterialTypeId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@UnitId", _inv_StockIssueDetail.UnitId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@Quantity", _inv_StockIssueDetail.Quantity, DbType.Decimal, ParameterDirection.Input),
                   
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_InternalStockIssueDetail_Create",
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

        public long AddConsume(inv_StockIssueDetail _inv_StockIssueDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@IssueId", _inv_StockIssueDetail.IssueId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@RequisitionDetailId", _inv_StockIssueDetail.RequisitionDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockIssueDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemUnitId", _inv_StockIssueDetail.ItemUnitId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IssueUnitId", _inv_StockIssueDetail.IssueUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssueQuantity", _inv_StockIssueDetail.IssueQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssueUnitPrice", _inv_StockIssueDetail.IssueUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_StockIssueDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IssueUnitName", _inv_StockIssueDetail.IssueUnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@RollLenghtInMeter", _inv_StockIssueDetail.RollLenghtInMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollAreaInSqMeter", _inv_StockIssueDetail.RollAreaInSqMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PackageWeight", _inv_StockIssueDetail.PackageWeight, DbType.Decimal,
                        ParameterDirection.Input),
                       new Parameters("@MaterialTypeId", _inv_StockIssueDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input)

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "inv_StockIssueDetailConsume_Create", colparameters, true);
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

        public int UpdateApprove(inv_StockIssueDetail _inv_StockIssueDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@IssueId", _inv_StockIssueDetail.IssueId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockIssueDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IssueUnitId", _inv_StockIssueDetail.IssueUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssueQuantity", _inv_StockIssueDetail.IssueQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssueUnitPrice", _inv_StockIssueDetail.IssueUnitPrice, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_StockIssueDetail_UpdateApprove", colparameters, true);
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