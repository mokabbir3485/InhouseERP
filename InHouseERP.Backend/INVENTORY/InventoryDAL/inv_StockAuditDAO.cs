using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockAuditDAO //: IDisposible
    {
        private static volatile inv_StockAuditDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockAuditDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockAuditDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockAuditDAO();
                    }

                return instance;
            }
        }

        public static inv_StockAuditDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockAuditDAO();
            return instance;
        }

        public List<inv_StockAudit> GetAll(long? auditId = null)
        {
            try
            {
                var inv_StockAuditLst = new List<inv_StockAudit>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AuditId", auditId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockAuditLst = dbExecutor.FetchData<inv_StockAudit>(CommandType.StoredProcedure,
                    "inv_StockAudit_Get", colparameters);
                return inv_StockAuditLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockAudit> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_StockAuditLst = new List<inv_StockAudit>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_StockAuditLst = dbExecutor.FetchData<inv_StockAudit>(CommandType.StoredProcedure,
                    "inv_StockAudit_GetDynamic", colparameters);
                return inv_StockAuditLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockAudit> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockAuditLst = new List<inv_StockAudit>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockAuditLst = dbExecutor.FetchDataRef<inv_StockAudit>(CommandType.StoredProcedure,
                    "inv_StockAudit_GetPaged", colparameters, ref rows);
                return inv_StockAuditLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockAudit _inv_StockAudit)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[14]
                {
                    new Parameters("@AuditNo", _inv_StockAudit.AuditNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@AuditDate", _inv_StockAudit.AuditDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockAudit.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AuditedById", _inv_StockAudit.AuditedById, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsSettled", _inv_StockAudit.IsSettled, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@SettledWithId", _inv_StockAudit.SettledWithId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_StockAudit.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_StockAudit.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_StockAudit.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockAudit.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_StockAudit.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentName", _inv_StockAudit.DepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AuditedBy", _inv_StockAudit.AuditedBy, DbType.String, ParameterDirection.Input),
                    new Parameters("@SettledWith", _inv_StockAudit.SettledWith, DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockAudit_Create",
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

        public int Update(inv_StockAudit _inv_StockAudit)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@AuditId", _inv_StockAudit.AuditId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@AuditNo", _inv_StockAudit.AuditNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@AuditDate", _inv_StockAudit.AuditDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockAudit.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AuditedById", _inv_StockAudit.AuditedById, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsSettled", _inv_StockAudit.IsSettled, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@SettledWithId", _inv_StockAudit.SettledWithId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_StockAudit.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockAudit.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_StockAudit.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentName", _inv_StockAudit.DepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AuditedBy", _inv_StockAudit.AuditedBy, DbType.String, ParameterDirection.Input),
                    new Parameters("@SettledWith", _inv_StockAudit.SettledWith, DbType.String, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockAudit_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long auditId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AuditId", auditId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockAudit_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_StockAdjustment> ItemGetCurrentStockGetByDepartmentIdAndItemIdAndPaperTypeIdWithLabelId(Int32 ? DepartmentId=null, Int32 ? ItemId=null, Int32 ? MaterialTypeId =null,Int32 ? LabelBrandId=null)
        {
            try
            {
                var inv_StockAuditLst = new List<inv_StockAdjustment>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", MaterialTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@LabelBrandId", LabelBrandId, DbType.Int32, ParameterDirection.Input),
                };
                inv_StockAuditLst = dbExecutor.FetchData<inv_StockAdjustment>(CommandType.StoredProcedure,
                    "inv_Item_CurrentStock_Get", colparameters);
                return inv_StockAuditLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}