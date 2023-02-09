using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockAuditDetailDAO //: IDisposible
    {
        private static volatile inv_StockAuditDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockAuditDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockAuditDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockAuditDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_StockAuditDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockAuditDetailDAO();
            return instance;
        }

        public List<inv_StockAuditDetail> GetAll(long? auditDetailId = null, long? auditId = null)
        {
            try
            {
                var inv_StockAuditDetailLst = new List<inv_StockAuditDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AuditDetailId", auditDetailId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockAuditDetailLst = dbExecutor.FetchData<inv_StockAuditDetail>(CommandType.StoredProcedure,
                    "inv_StockAuditDetail_Get", colparameters);
                return inv_StockAuditDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockAuditDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_StockAuditDetailLst = new List<inv_StockAuditDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_StockAuditDetailLst = dbExecutor.FetchData<inv_StockAuditDetail>(CommandType.StoredProcedure,
                    "inv_StockAuditDetail_GetDynamic", colparameters);
                return inv_StockAuditDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockAuditDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockAuditDetailLst = new List<inv_StockAuditDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockAuditDetailLst = dbExecutor.FetchDataRef<inv_StockAuditDetail>(CommandType.StoredProcedure,
                    "inv_StockAuditDetail_GetPaged", colparameters, ref rows);
                return inv_StockAuditDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockAuditDetail _inv_StockAuditDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@AuditId", _inv_StockAuditDetail.AuditId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockAuditDetail.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AuditUnitId", _inv_StockAuditDetail.AuditUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AuditQuantity", _inv_StockAuditDetail.AuditQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SettleQuantity", _inv_StockAuditDetail.SettleQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AuditUnitPrice", _inv_StockAuditDetail.AuditUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AuditTypeId", _inv_StockAuditDetail.AuditTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_StockAuditDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AuditUnitName", _inv_StockAuditDetail.AuditUnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AuditTypeName", _inv_StockAuditDetail.AuditTypeName, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockAuditDetail_Create",
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

        public int Update(inv_StockAuditDetail _inv_StockAuditDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[11]
                {
                    new Parameters("@AuditDetailId", _inv_StockAuditDetail.AuditDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AuditId", _inv_StockAuditDetail.AuditId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockAuditDetail.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AuditUnitId", _inv_StockAuditDetail.AuditUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AuditQuantity", _inv_StockAuditDetail.AuditQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SettleQuantity", _inv_StockAuditDetail.SettleQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AuditUnitPrice", _inv_StockAuditDetail.AuditUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AuditTypeId", _inv_StockAuditDetail.AuditTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_StockAuditDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AuditUnitName", _inv_StockAuditDetail.AuditUnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AuditTypeName", _inv_StockAuditDetail.AuditTypeName, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockAuditDetail_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long auditDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AuditDetailId", auditDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockAuditDetail_DeleteById",
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