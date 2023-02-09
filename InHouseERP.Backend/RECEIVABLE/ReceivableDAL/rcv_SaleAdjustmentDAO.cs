using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ReceivableEntity;

namespace ReceivableDAL
{
    public class rcv_SaleAdjustmentDAO //: IDisposible
    {
        private static volatile rcv_SaleAdjustmentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_SaleAdjustmentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_SaleAdjustmentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_SaleAdjustmentDAO();
                    }

                return instance;
            }
        }

        public static rcv_SaleAdjustmentDAO GetInstance()
        {
            if (instance == null) instance = new rcv_SaleAdjustmentDAO();
            return instance;
        }

        public List<rcv_SaleAdjustment> GetAll(long? adjustmentId = null)
        {
            try
            {
                var rcv_SaleAdjustmentLst = new List<rcv_SaleAdjustment>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AdjustmentId", adjustmentId, DbType.Int32, ParameterDirection.Input)
                };
                rcv_SaleAdjustmentLst = dbExecutor.FetchData<rcv_SaleAdjustment>(CommandType.StoredProcedure,
                    "rcv_SaleAdjustment_Get", colparameters);
                return rcv_SaleAdjustmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_SaleAdjustment> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var rcv_SaleAdjustmentLst = new List<rcv_SaleAdjustment>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                rcv_SaleAdjustmentLst = dbExecutor.FetchData<rcv_SaleAdjustment>(CommandType.StoredProcedure,
                    "rcv_SaleAdjustment_GetDynamic", colparameters);
                return rcv_SaleAdjustmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_SaleAdjustment> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var rcv_SaleAdjustmentLst = new List<rcv_SaleAdjustment>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_SaleAdjustmentLst = dbExecutor.FetchDataRef<rcv_SaleAdjustment>(CommandType.StoredProcedure,
                    "rcv_SaleAdjustment_GetPaged", colparameters, ref rows);
                return rcv_SaleAdjustmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(rcv_SaleAdjustment _rcv_SaleAdjustment)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@FinancialCycleId", _rcv_SaleAdjustment.FinancialCycleId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _rcv_SaleAdjustment.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AdjustmentTypeId", _rcv_SaleAdjustment.AdjustmentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AdjustmentDate", _rcv_SaleAdjustment.AdjustmentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _rcv_SaleAdjustment.Amount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _rcv_SaleAdjustment.VoucherNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _rcv_SaleAdjustment.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _rcv_SaleAdjustment.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_SaleAdjustment_Create",
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

        public int Update(rcv_SaleAdjustment _rcv_SaleAdjustment)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@AdjustmentId", _rcv_SaleAdjustment.AdjustmentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@FinancialCycleId", _rcv_SaleAdjustment.FinancialCycleId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _rcv_SaleAdjustment.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AdjustmentTypeId", _rcv_SaleAdjustment.AdjustmentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AdjustmentDate", _rcv_SaleAdjustment.AdjustmentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _rcv_SaleAdjustment.Amount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _rcv_SaleAdjustment.VoucherNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _rcv_SaleAdjustment.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _rcv_SaleAdjustment.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "rcv_SaleAdjustment_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long adjustmentId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AdjustmentId", adjustmentId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "rcv_SaleAdjustment_DeleteById",
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