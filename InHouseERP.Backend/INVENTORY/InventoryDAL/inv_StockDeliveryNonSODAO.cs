using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockDeliveryNonSODAO //: IDisposible
    {
        private static volatile inv_StockDeliveryNonSODAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockDeliveryNonSODAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockDeliveryNonSODAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockDeliveryNonSODAO();
                    }

                return instance;
            }
        }

        public static inv_StockDeliveryNonSODAO GetInstance()
        {
            if (instance == null) instance = new inv_StockDeliveryNonSODAO();
            return instance;
        }

        public List<inv_StockDeliveryNonSO> GetAll(long? deliveryId = null)
        {
            try
            {
                var inv_StockDeliveryNonSOLst = new List<inv_StockDeliveryNonSO>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeliveryId", deliveryId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockDeliveryNonSOLst = dbExecutor.FetchData<inv_StockDeliveryNonSO>(CommandType.StoredProcedure,
                    "inv_StockDeliveryNonSO_Get", colparameters);
                return inv_StockDeliveryNonSOLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeliveryNonSO> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_StockDeliveryNonSOLst = new List<inv_StockDeliveryNonSO>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeliveryNonSOLst = dbExecutor.FetchData<inv_StockDeliveryNonSO>(CommandType.StoredProcedure,
                    "inv_StockDeliveryNonSO_GetDynamic", colparameters);
                return inv_StockDeliveryNonSOLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeliveryNonSO> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockDeliveryNonSOLst = new List<inv_StockDeliveryNonSO>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeliveryNonSOLst = dbExecutor.FetchDataRef<inv_StockDeliveryNonSO>(CommandType.StoredProcedure,
                    "inv_StockDeliveryNonSO_GetPaged", colparameters, ref rows);
                return inv_StockDeliveryNonSOLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_StockDeliveryNonSO _inv_StockDeliveryNonSO)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@DeliveryNo", _inv_StockDeliveryNonSO.DeliveryNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _inv_StockDeliveryNonSO.DeliveryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryFromDepartmentId", _inv_StockDeliveryNonSO.DeliveryFromDepartmentId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DeliverydBy", _inv_StockDeliveryNonSO.DeliverydBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReceivedBy", _inv_StockDeliveryNonSO.ReceivedBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockDeliveryNonSO.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_StockDeliveryNonSO.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryFromDepartmentName", _inv_StockDeliveryNonSO.DeliveryFromDepartmentName,
                        DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_StockDeliveryNonSO_Create",
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

        public int Update(inv_StockDeliveryNonSO _inv_StockDeliveryNonSO)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[14]
                {
                    new Parameters("@DeliveryId", _inv_StockDeliveryNonSO.DeliveryId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryNo", _inv_StockDeliveryNonSO.DeliveryNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _inv_StockDeliveryNonSO.DeliveryDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryFromDepartmentId", _inv_StockDeliveryNonSO.DeliveryFromDepartmentId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DeliveryToDepartmentId", _inv_StockDeliveryNonSO.DeliveryToDepartmentId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DeliverydBy", _inv_StockDeliveryNonSO.DeliverydBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReceivedBy", _inv_StockDeliveryNonSO.ReceivedBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockDeliveryNonSO.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_StockDeliveryNonSO.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DeliveryFromDepartmentName", _inv_StockDeliveryNonSO.DeliveryFromDepartmentName,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@DeliveryToDepartmentName", _inv_StockDeliveryNonSO.DeliveryToDepartmentName,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_StockDeliveryNonSO.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_StockDeliveryNonSO.ApprovedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_StockDeliveryNonSO.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDeliveryNonSO_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long deliveryId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeliveryId", deliveryId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDeliveryNonSO_DeleteById",
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