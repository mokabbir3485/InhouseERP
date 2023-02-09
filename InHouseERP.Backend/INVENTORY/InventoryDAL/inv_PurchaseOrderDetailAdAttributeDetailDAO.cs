using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_PurchaseOrderDetailAdAttributeDetailDAO //: IDisposible
    {
        private static volatile inv_PurchaseOrderDetailAdAttributeDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_PurchaseOrderDetailAdAttributeDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_PurchaseOrderDetailAdAttributeDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_PurchaseOrderDetailAdAttributeDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_PurchaseOrderDetailAdAttributeDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_PurchaseOrderDetailAdAttributeDetailDAO();
            return instance;
        }

        public List<inv_PurchaseOrderDetailAdAttributeDetail> GetAll(long? pODetailAdAttDetailId = null,
            long? pODetailAdAttId = null)
        {
            try
            {
                var inv_PurchaseOrderDetailAdAttributeDetailLst = new List<inv_PurchaseOrderDetailAdAttributeDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PODetailAdAttDetailId", pODetailAdAttDetailId, DbType.Int32,
                        ParameterDirection.Input)
                };
                inv_PurchaseOrderDetailAdAttributeDetailLst =
                    dbExecutor.FetchData<inv_PurchaseOrderDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_PurchaseOrderDetailAdAttributeDetail_Get", colparameters);
                return inv_PurchaseOrderDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrderDetailAdAttributeDetail> GetByPODetailAdAttId(long PODetailAdAttId)
        {
            try
            {
                var inv_PurchaseOrderDetailAdAttributeDetailLst = new List<inv_PurchaseOrderDetailAdAttributeDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PODetailAdAttId", PODetailAdAttId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseOrderDetailAdAttributeDetailLst =
                    dbExecutor.FetchData<inv_PurchaseOrderDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_PurchaseOrderDetailAdAttributeDetail_GetByPODetailAdAttId", colparameters);
                return inv_PurchaseOrderDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public inv_PurchaseOrderDetailAdAttributeDetail GetByPODetailAdAttIdAndItemAddAttId(long pODetailAdAttId,
            int itemAddAttId)
        {
            try
            {
                var inv_PurchaseOrderDetailAdAttributeDetail = new inv_PurchaseOrderDetailAdAttributeDetail();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@PODetailAdAttId", pODetailAdAttId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", itemAddAttId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseOrderDetailAdAttributeDetail = dbExecutor
                    .FetchData<inv_PurchaseOrderDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_PurchaseOrderDetailAdAttributeDetail_GetByPODetailAdAttIdAndItemAddAttId", colparameters)
                    .FirstOrDefault();
                return inv_PurchaseOrderDetailAdAttributeDetail;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrderDetailAdAttributeDetail> GetDynamic(string whereCondition,
            string orderByExpression)
        {
            try
            {
                var inv_PurchaseOrderDetailAdAttributeDetailLst = new List<inv_PurchaseOrderDetailAdAttributeDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseOrderDetailAdAttributeDetailLst =
                    dbExecutor.FetchData<inv_PurchaseOrderDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_PurchaseOrderDetailAdAttributeDetail_GetDynamic", colparameters);
                return inv_PurchaseOrderDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrderDetailAdAttributeDetail> GetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_PurchaseOrderDetailAdAttributeDetailLst = new List<inv_PurchaseOrderDetailAdAttributeDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseOrderDetailAdAttributeDetailLst =
                    dbExecutor.FetchDataRef<inv_PurchaseOrderDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_PurchaseOrderDetailAdAttributeDetail_GetPaged", colparameters, ref rows);
                return inv_PurchaseOrderDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_PurchaseOrderDetailAdAttributeDetail _inv_PurchaseOrderDetailAdAttributeDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@PODetailAdAttId", _inv_PurchaseOrderDetailAdAttributeDetail.PODetailAdAttId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _inv_PurchaseOrderDetailAdAttributeDetail.ItemAddAttId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttributeValue", _inv_PurchaseOrderDetailAdAttributeDetail.AttributeValue,
                        DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_PurchaseOrderDetailAdAttributeDetail_Create", colparameters, true);
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

        public int Update(inv_PurchaseOrderDetailAdAttributeDetail _inv_PurchaseOrderDetailAdAttributeDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@PODetailAdAttDetailId",
                        _inv_PurchaseOrderDetailAdAttributeDetail.PODetailAdAttDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PODetailAdAttId", _inv_PurchaseOrderDetailAdAttributeDetail.PODetailAdAttId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _inv_PurchaseOrderDetailAdAttributeDetail.ItemAddAttId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttributeValue", _inv_PurchaseOrderDetailAdAttributeDetail.AttributeValue,
                        DbType.String, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_PurchaseOrderDetailAdAttributeDetail_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long pODetailAdAttDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PODetailAdAttDetailId", pODetailAdAttDetailId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_PurchaseOrderDetailAdAttributeDetail_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}