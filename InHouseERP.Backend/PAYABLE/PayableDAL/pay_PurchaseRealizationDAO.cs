using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using PayableEntity;

namespace PayableDAL
{
    public class pay_PurchaseRealizationDAO //: IDisposible
    {
        private static volatile pay_PurchaseRealizationDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pay_PurchaseRealizationDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pay_PurchaseRealizationDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pay_PurchaseRealizationDAO();
                    }

                return instance;
            }
        }

        public static pay_PurchaseRealizationDAO GetInstance()
        {
            if (instance == null) instance = new pay_PurchaseRealizationDAO();
            return instance;
        }

        public List<pay_PurchaseRealization> GetAll(long? realizationId = null)
        {
            try
            {
                var pay_PurchaseRealizationLst = new List<pay_PurchaseRealization>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RealizationId", realizationId, DbType.Int32, ParameterDirection.Input)
                };
                pay_PurchaseRealizationLst = dbExecutor.FetchData<pay_PurchaseRealization>(CommandType.StoredProcedure,
                    "pay_PurchaseRealization_Get", colparameters);
                return pay_PurchaseRealizationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_PurchaseRealization> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var pay_PurchaseRealizationLst = new List<pay_PurchaseRealization>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                pay_PurchaseRealizationLst = dbExecutor.FetchData<pay_PurchaseRealization>(CommandType.StoredProcedure,
                    "pay_PurchaseRealization_GetDynamic", colparameters);
                return pay_PurchaseRealizationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_PurchaseRealization> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var pay_PurchaseRealizationLst = new List<pay_PurchaseRealization>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pay_PurchaseRealizationLst = dbExecutor.FetchDataRef<pay_PurchaseRealization>(
                    CommandType.StoredProcedure, "pay_PurchaseRealization_GetPaged", colparameters, ref rows);
                return pay_PurchaseRealizationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(pay_PurchaseRealization _pay_PurchaseRealization)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[12]
                {
                    new Parameters("@FinancialCycleId", _pay_PurchaseRealization.FinancialCycleId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SupplierId", _pay_PurchaseRealization.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PBId", _pay_PurchaseRealization.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _pay_PurchaseRealization.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentDate", _pay_PurchaseRealization.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _pay_PurchaseRealization.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@FromAdvance", _pay_PurchaseRealization.FromAdvance, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TDS", _pay_PurchaseRealization.TDS, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VDS", _pay_PurchaseRealization.VDS, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _pay_PurchaseRealization.VoucherNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _pay_PurchaseRealization.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _pay_PurchaseRealization.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_PurchaseRealization_Create",
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

        public int Update(pay_PurchaseRealization _pay_PurchaseRealization)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@RealizationId", _pay_PurchaseRealization.RealizationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@FinancialCycleId", _pay_PurchaseRealization.FinancialCycleId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SupplierId", _pay_PurchaseRealization.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PBId", _pay_PurchaseRealization.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _pay_PurchaseRealization.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentDate", _pay_PurchaseRealization.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _pay_PurchaseRealization.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@FromAdvance", _pay_PurchaseRealization.FromAdvance, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TDS", _pay_PurchaseRealization.TDS, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VDS", _pay_PurchaseRealization.VDS, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _pay_PurchaseRealization.VoucherNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _pay_PurchaseRealization.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _pay_PurchaseRealization.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pay_PurchaseRealization_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long realizationId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RealizationId", realizationId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pay_PurchaseRealization_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetSupplierTotals(int financialCycleId, int supplierId)
        {
            try
            {
                var dt = new DataTable();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@FinancialCycleId", financialCycleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SupplierId", supplierId, DbType.Int32, ParameterDirection.Input)
                };
                dt = dbExecutor.GetDataTable(CommandType.StoredProcedure, "pay_GetSupplierTotals", colparameters, true);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}