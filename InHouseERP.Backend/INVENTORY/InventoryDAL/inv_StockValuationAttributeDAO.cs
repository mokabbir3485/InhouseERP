using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockValuationAttributeDAO //: IDisposible
    {
        private static volatile inv_StockValuationAttributeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockValuationAttributeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockValuationAttributeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockValuationAttributeDAO();
                    }

                return instance;
            }
        }

        public static inv_StockValuationAttributeDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockValuationAttributeDAO();
            return instance;
        }

        public List<inv_StockValuationAttribute> GetAll(long? ValuationId = null)
        {
            try
            {
                var inv_StockValuationAttributeLst = new List<inv_StockValuationAttribute>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ValuationId", ValuationId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockValuationAttributeLst =
                    dbExecutor.FetchData<inv_StockValuationAttribute>(CommandType.StoredProcedure,
                        "inv_StockValuationAttribute_Get", colparameters);
                return inv_StockValuationAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockValuationAttribute> GetByItemAndUnitAndDepartment(int itemId, int unitId,
            int? departmentId = null)
        {
            try
            {
                var inv_StockValuationAttributeLst = new List<inv_StockValuationAttribute>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ItemId", itemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UnitIdParam", unitId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", departmentId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockValuationAttributeLst = dbExecutor.FetchData<inv_StockValuationAttribute>(
                    CommandType.StoredProcedure, "inv_StockValuationAttribute_GetByItemAndUnitAndDepartment",
                    colparameters);
                return inv_StockValuationAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockValuationAttribute> GetByDepartmentAndItemAddAttId(int departmentId, string itemAddAttId)
        {
            try
            {
                var inv_StockValuationAttributeLst = new List<inv_StockValuationAttribute>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@DepartmentId", departmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", itemAddAttId, DbType.String, ParameterDirection.Input)
                };
                inv_StockValuationAttributeLst = dbExecutor.FetchData<inv_StockValuationAttribute>(
                    CommandType.StoredProcedure, "inv_StockValuationAttribute_GetByDepartmentAndItemAddAttId",
                    colparameters);
                return inv_StockValuationAttributeLst;
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
                var currentStock = 0;
                var inv_StockValuationAttributeLst = new List<inv_StockValuationAttribute>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemCode", itemCode, DbType.String, ParameterDirection.Input)
                };
                inv_StockValuationAttributeLst = dbExecutor.FetchData<inv_StockValuationAttribute>(
                    CommandType.StoredProcedure, "inv_StockValuationAttribute_GetCurrentStockByItemCode",
                    colparameters);
                return Convert.ToInt32(inv_StockValuationAttributeLst.FirstOrDefault().CurrentQuantity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockValuationAttribute _inv_StockValuationAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@DepartmentId", _inv_StockValuationAttribute.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _inv_StockValuationAttribute.ItemAddAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_StockValuationAttribute.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ValuationPrice", _inv_StockValuationAttribute.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_StockValuationAttribute_Create", colparameters, true);
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

        public int Update(inv_StockValuationAttribute _inv_StockValuationAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@ValuationId", _inv_StockValuationAttribute.ValuationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockValuationAttribute.ItemAddAttId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockValuationAttribute.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_StockValuationAttribute.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ValuationPrice", _inv_StockValuationAttribute.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockValuationAttribute_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateAdd(inv_StockValuationAttribute _inv_StockValuationAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ItemId", _inv_StockValuationAttribute.ItemAddAttId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockValuationAttribute.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_StockValuationAttribute.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ValuationPrice", _inv_StockValuationAttribute.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockValuationAttribute_UpdateAdd",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateDeduct(inv_StockValuationAttribute _inv_StockValuationAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ItemId", _inv_StockValuationAttribute.ItemAddAttId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockValuationAttribute.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CurrentQuantity", _inv_StockValuationAttribute.CurrentQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ValuationPrice", _inv_StockValuationAttribute.ValuationPrice, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_StockValuationAttribute_UpdateDeduct", colparameters, true);
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
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockValuationAttribute_DeleteById",
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