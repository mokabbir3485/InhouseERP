using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_PurchaseRequisitionDAO //: IDisposible
    {
        private static volatile inv_PurchaseRequisitionDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_PurchaseRequisitionDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_PurchaseRequisitionDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_PurchaseRequisitionDAO();
                    }

                return instance;
            }
        }

        public static inv_PurchaseRequisitionDAO GetInstance()
        {
            if (instance == null) instance = new inv_PurchaseRequisitionDAO();
            return instance;
        }

        public List<inv_PurchaseRequisition> GetAll(long? purchaseRequisitionId = null)
        {
            try
            {
                var inv_PurchaseRequisitionLst = new List<inv_PurchaseRequisition>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PurchaseRequisitionId", purchaseRequisitionId, DbType.Int32,
                        ParameterDirection.Input)
                };
                inv_PurchaseRequisitionLst = dbExecutor.FetchData<inv_PurchaseRequisition>(CommandType.StoredProcedure,
                    "inv_PurchaseRequisition_Get", colparameters);
                return inv_PurchaseRequisitionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseRequisition> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_PurchaseRequisitionLst = new List<inv_PurchaseRequisition>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseRequisitionLst = dbExecutor.FetchData<inv_PurchaseRequisition>(CommandType.StoredProcedure,
                    "inv_PurchaseRequisition_GetDynamic", colparameters);
                return inv_PurchaseRequisitionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseRequisition> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_PurchaseRequisitionLst = new List<inv_PurchaseRequisition>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseRequisitionLst = dbExecutor.FetchDataRef<inv_PurchaseRequisition>(
                    CommandType.StoredProcedure, "inv_PurchaseRequisition_GetPaged", colparameters, ref rows);
                return inv_PurchaseRequisitionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_PurchaseRequisition _inv_PurchaseRequisition)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[16]
                {
                    new Parameters("@PurchaseRequisitionNo", _inv_PurchaseRequisition.PurchaseRequisitionNo,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@PurchaseRequisitionDate", _inv_PurchaseRequisition.PurchaseRequisitionDate,
                        DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ExpiryDate", _inv_PurchaseRequisition.ExpiryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentId", _inv_PurchaseRequisition.FromDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentId", _inv_PurchaseRequisition.ToDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PreparedById", _inv_PurchaseRequisition.PreparedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_PurchaseRequisition.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentName", _inv_PurchaseRequisition.FromDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentName", _inv_PurchaseRequisition.ToDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PreparedBy", _inv_PurchaseRequisition.PreparedBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsSentBack", _inv_PurchaseRequisition.IsSentBack, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _inv_PurchaseRequisition.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_PurchaseRequisition.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_PurchaseRequisition.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_PurchaseRequisition.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_PurchaseRequisition.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_PurchaseRequisition_Create",
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

        public int Update(inv_PurchaseRequisition _inv_PurchaseRequisition)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[15]
                {
                    new Parameters("@PurchaseRequisitionId", _inv_PurchaseRequisition.PurchaseRequisitionId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PurchaseRequisitionNo", _inv_PurchaseRequisition.PurchaseRequisitionNo,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@PurchaseRequisitionDate", _inv_PurchaseRequisition.PurchaseRequisitionDate,
                        DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ExpiryDate", _inv_PurchaseRequisition.ExpiryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentId", _inv_PurchaseRequisition.FromDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentId", _inv_PurchaseRequisition.ToDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PreparedById", _inv_PurchaseRequisition.PreparedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_PurchaseRequisition.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentName", _inv_PurchaseRequisition.FromDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentName", _inv_PurchaseRequisition.ToDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PreparedBy", _inv_PurchaseRequisition.PreparedBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsSentBack", _inv_PurchaseRequisition.IsSentBack, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _inv_PurchaseRequisition.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_PurchaseRequisition.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_PurchaseRequisition.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_PurchaseRequisition_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long purchaseRequisitionId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PurchaseRequisitionId", purchaseRequisitionId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_PurchaseRequisition_DeleteById",
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