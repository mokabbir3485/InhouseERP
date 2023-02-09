using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class proc_ImportPurchaseBillDetailAdAttributeDetailDAO //: IDisposible
    {
        private static volatile proc_ImportPurchaseBillDetailAdAttributeDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public proc_ImportPurchaseBillDetailAdAttributeDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static proc_ImportPurchaseBillDetailAdAttributeDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new proc_ImportPurchaseBillDetailAdAttributeDetailDAO();
                    }

                return instance;
            }
        }

        public static proc_ImportPurchaseBillDetailAdAttributeDetailDAO GetInstance()
        {
            if (instance == null) instance = new proc_ImportPurchaseBillDetailAdAttributeDetailDAO();
            return instance;
        }

        public List<proc_ImportPurchaseBillDetailAdAttributeDetail> GetAll(long? pBDetailAdAttDetailId = null,
            long? pBDetailAdAttId = null)
        {
            try
            {
                var inv_PurchaseBillDetailAdAttributeDetailLst = new List<proc_ImportPurchaseBillDetailAdAttributeDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailAdAttDetailId", pBDetailAdAttDetailId, DbType.Int32,
                        ParameterDirection.Input)
                };
                inv_PurchaseBillDetailAdAttributeDetailLst =
                    dbExecutor.FetchData<proc_ImportPurchaseBillDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_PurchaseBillDetailAdAttributeDetail_Get", colparameters);
                return inv_PurchaseBillDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttributeDetail> GetByPBDetailAdAttId(long pBDetailAdAttId)
        {
            try
            {
                var inv_PurchaseBillDetailAdAttributeDetailLst = new List<proc_ImportPurchaseBillDetailAdAttributeDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailAdAttId", pBDetailAdAttId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailAdAttributeDetailLst =
                    dbExecutor.FetchData<proc_ImportPurchaseBillDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_PurchaseBillDetailAdAttributeDetail_GetByPBDetailAdAttId", colparameters);
                return inv_PurchaseBillDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttributeDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_PurchaseBillDetailAdAttributeDetailLst = new List<proc_ImportPurchaseBillDetailAdAttributeDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailAdAttributeDetailLst =
                    dbExecutor.FetchData<proc_ImportPurchaseBillDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_PurchaseBillDetailAdAttributeDetail_GetDynamic", colparameters);
                return inv_PurchaseBillDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailAdAttributeDetail> GetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_PurchaseBillDetailAdAttributeDetailLst = new List<proc_ImportPurchaseBillDetailAdAttributeDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailAdAttributeDetailLst =
                    dbExecutor.FetchDataRef<proc_ImportPurchaseBillDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_PurchaseBillDetailAdAttributeDetail_GetPaged", colparameters, ref rows);
                return inv_PurchaseBillDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(proc_ImportPurchaseBillDetailAdAttributeDetail _inv_PurchaseBillDetailAdAttributeDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@PBDetailAdAttId", _inv_PurchaseBillDetailAdAttributeDetail.PBDetailAdAttId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _inv_PurchaseBillDetailAdAttributeDetail.ItemAddAttId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AttributeValue", _inv_PurchaseBillDetailAdAttributeDetail.AttributeValue,
                        DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_PurchaseBillDetailAdAttributeDetail_Create", colparameters, true);
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

        public int Update(proc_ImportPurchaseBillDetailAdAttributeDetail _inv_PurchaseBillDetailAdAttributeDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@PBDetailAdAttDetailId",
                        _inv_PurchaseBillDetailAdAttributeDetail.PBDetailAdAttDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PBDetailAdAttId", _inv_PurchaseBillDetailAdAttributeDetail.PBDetailAdAttId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _inv_PurchaseBillDetailAdAttributeDetail.ItemAddAttId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AttributeValue", _inv_PurchaseBillDetailAdAttributeDetail.AttributeValue,
                        DbType.String, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_PurchaseBillDetailAdAttributeDetail_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long pBDetailAdAttDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailAdAttDetailId", pBDetailAdAttDetailId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_PurchaseBillDetailAdAttributeDetail_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}