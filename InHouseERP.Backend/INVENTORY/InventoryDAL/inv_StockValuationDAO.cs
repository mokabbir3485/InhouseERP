using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockValuationDAO //: IDisposible
    {
        private static volatile inv_StockValuationDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockValuationDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockValuationDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockValuationDAO();
                    }

                return instance;
            }
        }

        public static inv_StockValuationDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockValuationDAO();
            return instance;
        }

        public List<inv_StockValuationLedger> StockValuationLedgerStatusDate(DateTime StatusDate, string SubCategoryIds, Int32? CategoryId = null, Int32? DepartmentId = null)
        {
            try
            {
                var inv_StockValuationLedgerLst = new List<inv_StockValuationLedger>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@StatusDate", StatusDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@SubCategoryIds ", SubCategoryIds , DbType.String, ParameterDirection.Input),
                    new Parameters("@CategoryId", CategoryId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input),
                };
                inv_StockValuationLedgerLst =
                    dbExecutor.FetchData<inv_StockValuationLedger>(CommandType.StoredProcedure,
                        "inv_StockValuationLedger_StockStatus", colparameters);
                return inv_StockValuationLedgerLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockValuation> GetAll()
        {
            try
            {
                var inv_StockValuationLst = new List<inv_StockValuation>();
                //Parameters[] colparameters = new Parameters[1]{
                //new Parameters("@ValuationId", ValuationId, DbType.Int32, ParameterDirection.Input)
                //};
                inv_StockValuationLst =
                    dbExecutor.FetchData<inv_StockValuation>(CommandType.StoredProcedure,
                        "inv_HardwareAndFinishedGoodStock_ForAllItem");
                return inv_StockValuationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockValuation> GetByItemAndDepartment(int ItemId, int DepartmentId)
        {
            try
            {
                var inv_StockValuationLst = new List<inv_StockValuation>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockValuationLst = dbExecutor.FetchData<inv_StockValuation>(CommandType.StoredProcedure,
                    "inv_StockValuation_GetByItemAndDepartment", colparameters);
                return inv_StockValuationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockValuation> GetByItemAndUnitAndDepartment(int itemId, int unitId, int? departmentId = null)
        {
            try
            {
                var inv_StockValuationLst = new List<inv_StockValuation>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ItemId", itemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UnitIdParam", unitId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", departmentId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockValuationLst = dbExecutor.FetchData<inv_StockValuation>(CommandType.StoredProcedure,
                    "inv_StockValuation_GetByItemAndUnitAndDepartment", colparameters);
                return inv_StockValuationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockValuation> GetByItemId(int itemId, Int32 PaperTypeId)
        {
            try
            {
                var inv_StockValuationLst = new List<inv_StockValuation>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ItemId", itemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PaperTypeId", PaperTypeId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockValuationLst = dbExecutor.FetchData<inv_StockValuation>(CommandType.StoredProcedure,
                    "inv_CurrentStock_GetByItemId", colparameters);
                return inv_StockValuationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int GetCurrentStockByItemCode(string itemCode)
        {
            try
            {
                var inv_StockValuationLst = new List<inv_StockValuation>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemCode", itemCode, DbType.String, ParameterDirection.Input)
                };
                inv_StockValuationLst = dbExecutor.FetchData<inv_StockValuation>(CommandType.StoredProcedure,
                    "inv_StockValuation_GetCurrentStockByItemCode", colparameters);
                return Convert.ToInt32(inv_StockValuationLst.FirstOrDefault().CurrentQuantity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockValuation> GetCurrentStockByItemId(int itemId)
        {
            try
            {
                var inv_StockValuationLst = new List<inv_StockValuation>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemId", itemId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockValuationLst = dbExecutor.FetchData<inv_StockValuation>(CommandType.StoredProcedure,
                    "inv_StockValuation_GetCurrentStockByItemCode", colparameters);
                return inv_StockValuationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockValuation> GetAll_CurrentStock()
        {
            try
            {
                var inv_StockValuationLst = new List<inv_StockValuation>();

                inv_StockValuationLst =
                    dbExecutor.FetchData<inv_StockValuation>(CommandType.StoredProcedure,
                        "inv_StockValuation_ForAllItem");
                return inv_StockValuationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockValuation _inv_StockValuation)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ItemId", _inv_StockValuation.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockValuation.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_StockValuation.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ValuationPrice", _inv_StockValuation.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockValuation_Create",
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

        public int Update(inv_StockValuation _inv_StockValuation)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    //new Parameters("@ValuationId", _inv_StockValuation.ValuationId, DbType.Int64,
                    //    ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockValuation.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockValuation.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_StockValuation.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ValuationPrice", _inv_StockValuation.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockValuation_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateAdd(inv_StockValuation _inv_StockValuation)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ItemId", _inv_StockValuation.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockValuation.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_StockValuation.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ValuationPrice", _inv_StockValuation.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockValuation_UpdateAdd",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateDeduct(inv_StockValuation _inv_StockValuation)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ItemId", _inv_StockValuation.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockValuation.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_StockValuation.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ValuationPrice", _inv_StockValuation.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockValuation_UpdateDeduct",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long ValuationId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ValuationId", ValuationId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockValuation_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}