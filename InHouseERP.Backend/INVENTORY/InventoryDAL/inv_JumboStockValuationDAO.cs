using System;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_JumboStockValuationDAO
    {
        private static volatile inv_JumboStockValuationDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_JumboStockValuationDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_JumboStockValuationDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_JumboStockValuationDAO();
                    }

                return instance;
            }
        }

        public static inv_JumboStockValuationDAO GetInstance()
        {
            if (instance == null) instance = new inv_JumboStockValuationDAO();
            return instance;
        }

        public int Post(inv_JumboStockValuation _inv_JumboStockValuation)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@JumboValuationId", _inv_JumboStockValuation.JumboValuationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_JumboStockValuation.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_JumboStockValuation.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemUnitId", _inv_JumboStockValuation.ItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CurrentWidth", _inv_JumboStockValuation.CurrentWidth, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_JumboStockValuation.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ValuationPrice", _inv_JumboStockValuation.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_JumboStockValuation.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_JumboStockValuation_Post",
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

        public int PostJumboValuationLedger(inv_JumboStockValuationLedger _inv_JumboStockValuationLedger)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@JumboValuationLedgerId", _inv_JumboStockValuationLedger.JumboValuationLedgerId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_JumboStockValuationLedger.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_JumboStockValuationLedger.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LedgerDate", _inv_JumboStockValuationLedger.LedgerDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@InWidth", _inv_JumboStockValuationLedger.InWidth, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@InQuantity", _inv_JumboStockValuationLedger.InQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@InPrice", _inv_JumboStockValuationLedger.InPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OutWidth", _inv_JumboStockValuationLedger.OutWidth, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OutQuantity", _inv_JumboStockValuationLedger.OutQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OutPrice", _inv_JumboStockValuationLedger.OutPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ItemUnitId", _inv_JumboStockValuationLedger.ItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@BalanceQuantity", _inv_JumboStockValuationLedger.BalanceQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AveragePrice", _inv_JumboStockValuationLedger.AveragePrice, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "_inv_JumboStockValuationLedger_Post", colparameters, true);
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