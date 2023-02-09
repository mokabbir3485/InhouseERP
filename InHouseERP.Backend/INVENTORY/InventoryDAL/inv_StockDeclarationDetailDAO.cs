using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockDeclarationDetailDAO //: IDisposible
    {
        private static volatile inv_StockDeclarationDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockDeclarationDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockDeclarationDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockDeclarationDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_StockDeclarationDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockDeclarationDetailDAO();
            return instance;
        }

        public List<inv_StockDeclarationDetail> GetByDeclarationId(long declarationId)
        {
            try
            {
                var inv_StockDeclarationDetailLst = new List<inv_StockDeclarationDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeclarationId", declarationId, DbType.Int64, ParameterDirection.Input)
                };
                inv_StockDeclarationDetailLst = dbExecutor.FetchData<inv_StockDeclarationDetail>(
                    CommandType.StoredProcedure, "inv_StockDeclarationDetail_GetByDeclarationId", colparameters);
                return inv_StockDeclarationDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeclarationDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_StockDeclarationDetailLst = new List<inv_StockDeclarationDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeclarationDetailLst =
                    dbExecutor.FetchData<inv_StockDeclarationDetail>(CommandType.StoredProcedure,
                        "inv_StockDeclarationDetail_GetDynamic", colparameters);
                return inv_StockDeclarationDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeclarationDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockDeclarationDetailLst = new List<inv_StockDeclarationDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeclarationDetailLst = dbExecutor.FetchDataRef<inv_StockDeclarationDetail>(
                    CommandType.StoredProcedure, "inv_StockDeclarationDetail_GetPaged", colparameters, ref rows);
                return inv_StockDeclarationDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(inv_StockDeclarationDetail _inv_StockDeclarationDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@DeclarationDetailId", _inv_StockDeclarationDetail.DeclarationDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationId", _inv_StockDeclarationDetail.DeclarationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockDeclarationDetail.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationUnitId", _inv_StockDeclarationDetail.DeclarationUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationQuantity", _inv_StockDeclarationDetail.DeclarationQuantity,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@DeclarationUnitPrice", _inv_StockDeclarationDetail.DeclarationUnitPrice,
                        DbType.Decimal, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockDeclarationDetail_Post",
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
        public int DeleteStockDeclarationDetailId(long DeclarationDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeclarationDetailId", DeclarationDetailId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_StockDeclarationDetail_DeleteByDeclarationDetailId", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int StockDeduct(inv_StockDeclarationDetail _inv_StockDeclarationDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@DeclarationId", _inv_StockDeclarationDetail.DeclarationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockDeclarationDetail.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationUnitId", _inv_StockDeclarationDetail.DeclarationUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationQuantity", _inv_StockDeclarationDetail.DeclarationQuantity,
                        DbType.Decimal, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDeclarationDetail_StockDeduct",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long declarationDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeclarationDetailId", declarationDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDeclarationDetail_DeleteById",
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