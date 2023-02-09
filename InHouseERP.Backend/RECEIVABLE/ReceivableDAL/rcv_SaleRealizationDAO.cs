using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ReceivableEntity;

namespace ReceivableDAL
{
    public class rcv_SaleRealizationDAO //: IDisposible
    {
        private static volatile rcv_SaleRealizationDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_SaleRealizationDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_SaleRealizationDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_SaleRealizationDAO();
                    }

                return instance;
            }
        }

        public static rcv_SaleRealizationDAO GetInstance()
        {
            if (instance == null) instance = new rcv_SaleRealizationDAO();
            return instance;
        }

        public List<rcv_SaleRealization> GetAll(long? realizationId = null)
        {
            try
            {
                var rcv_SaleRealizationLst = new List<rcv_SaleRealization>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RealizationId", realizationId, DbType.Int32, ParameterDirection.Input)
                };
                rcv_SaleRealizationLst = dbExecutor.FetchData<rcv_SaleRealization>(CommandType.StoredProcedure,
                    "rcv_SaleRealization_Get", colparameters);
                return rcv_SaleRealizationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_SaleRealization> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var rcv_SaleRealizationLst = new List<rcv_SaleRealization>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                rcv_SaleRealizationLst = dbExecutor.FetchData<rcv_SaleRealization>(CommandType.StoredProcedure,
                    "rcv_SaleRealization_GetDynamic", colparameters);
                return rcv_SaleRealizationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_SaleRealization> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var rcv_SaleRealizationLst = new List<rcv_SaleRealization>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_SaleRealizationLst = dbExecutor.FetchDataRef<rcv_SaleRealization>(CommandType.StoredProcedure,
                    "rcv_SaleRealization_GetPaged", colparameters, ref rows);
                return rcv_SaleRealizationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(rcv_SaleRealization _rcv_SaleRealization)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[15]
                {
                    new Parameters("@FinancialCycleId", _rcv_SaleRealization.FinancialCycleId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", _rcv_SaleRealization.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _rcv_SaleRealization.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _rcv_SaleRealization.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentDate", _rcv_SaleRealization.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _rcv_SaleRealization.Amount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@FromAdvance", _rcv_SaleRealization.FromAdvance, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TDS", _rcv_SaleRealization.TDS, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VDS", _rcv_SaleRealization.VDS, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _rcv_SaleRealization.VoucherNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _rcv_SaleRealization.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _rcv_SaleRealization.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", _rcv_SaleRealization.ChequeNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ChequeDate", _rcv_SaleRealization.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ChequeBank", _rcv_SaleRealization.ChequeBank, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_SaleRealization_Create",
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

        public int Update(rcv_SaleRealization _rcv_SaleRealization)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@RealizationId", _rcv_SaleRealization.RealizationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@FinancialCycleId", _rcv_SaleRealization.FinancialCycleId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", _rcv_SaleRealization.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _rcv_SaleRealization.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _rcv_SaleRealization.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentDate", _rcv_SaleRealization.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Amount", _rcv_SaleRealization.Amount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@FromAdvance", _rcv_SaleRealization.FromAdvance, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TDS", _rcv_SaleRealization.TDS, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VDS", _rcv_SaleRealization.VDS, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _rcv_SaleRealization.VoucherNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _rcv_SaleRealization.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _rcv_SaleRealization.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "rcv_SaleRealization_Update",
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
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "rcv_SaleRealization_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetCompanyTotals(int financialCycleId, int companyId)
        {
            try
            {
                var dt = new DataTable();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@FinancialCycleId", financialCycleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                };
                dt = dbExecutor.GetDataTable(CommandType.StoredProcedure, "rcv_GetCompanyTotals", colparameters, true);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}