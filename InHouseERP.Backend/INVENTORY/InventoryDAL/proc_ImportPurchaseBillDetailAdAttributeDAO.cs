using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class proc_ImportPurchaseBillDetailAdAttributeDAO //: IDisposible
    {
        private static volatile proc_ImportPurchaseBillDetailAdAttributeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public proc_ImportPurchaseBillDetailAdAttributeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static proc_ImportPurchaseBillDetailAdAttributeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new proc_ImportPurchaseBillDetailAdAttributeDAO();
                    }

                return instance;
            }
        }

        public static proc_ImportPurchaseBillDetailAdAttributeDAO GetInstance()
        {
            if (instance == null) instance = new proc_ImportPurchaseBillDetailAdAttributeDAO();
            return instance;
        }

        public List<proc_ImportPurchaseBillDetailAdAttribute> GetAll(long? pBDetailAdAttId = null)
        {
            try
            {
                var inv_PurchaseBillDetailAdAttributeLst = new List<proc_ImportPurchaseBillDetailAdAttribute>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailAdAttId", pBDetailAdAttId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailAdAttributeLst =
                    dbExecutor.FetchData<proc_ImportPurchaseBillDetailAdAttribute>(CommandType.StoredProcedure,
                        "inv_PurchaseBillDetailAdAttribute_Get", colparameters);
                return inv_PurchaseBillDetailAdAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttribute> GetByPBDetailId(long pBDetailId)
        {
            try
            {
                var inv_PurchaseBillDetailAdAttributeLst = new List<proc_ImportPurchaseBillDetailAdAttribute>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailId", pBDetailId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailAdAttributeLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetailAdAttribute>(
                    CommandType.StoredProcedure, "inv_PurchaseBillDetailAdAttribute_GetByPBDetailId", colparameters);
                return inv_PurchaseBillDetailAdAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttribute> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_PurchaseBillDetailAdAttributeLst = new List<proc_ImportPurchaseBillDetailAdAttribute>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailAdAttributeLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetailAdAttribute>(
                    CommandType.StoredProcedure, "inv_PurchaseBillDetailAdAttribute_GetDynamic", colparameters);
                return inv_PurchaseBillDetailAdAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttribute> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_PurchaseBillDetailAdAttributeLst = new List<proc_ImportPurchaseBillDetailAdAttribute>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailAdAttributeLst = dbExecutor.FetchDataRef<proc_ImportPurchaseBillDetailAdAttribute>(
                    CommandType.StoredProcedure, "inv_PurchaseBillDetailAdAttribute_GetPaged", colparameters, ref rows);
                return inv_PurchaseBillDetailAdAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(proc_ImportPurchaseBillDetailAdAttribute _inv_PurchaseBillDetailAdAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@PBDetailId", _inv_PurchaseBillDetailAdAttribute.PBDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AttributeQty", _inv_PurchaseBillDetailAdAttribute.AttributeQty, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_PurchaseBillDetailAdAttribute_Create", colparameters, true);
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

        public int Update(proc_ImportPurchaseBillDetailAdAttribute _inv_PurchaseBillDetailAdAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@PBDetailAdAttId", _inv_PurchaseBillDetailAdAttribute.PBDetailAdAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PBDetailId", _inv_PurchaseBillDetailAdAttribute.PBDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AttributeQty", _inv_PurchaseBillDetailAdAttribute.AttributeQty, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_PurchaseBillDetailAdAttribute_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long pBDetailAdAttId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailAdAttId", pBDetailAdAttId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_PurchaseBillDetailAdAttribute_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}