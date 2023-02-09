using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_PaymentProcessDAO //: IDisposible
    {
        private static volatile exp_PaymentProcessDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_PaymentProcessDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_PaymentProcessDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_PaymentProcessDAO();
                    }

                return instance;
            }
        }

        public static exp_PaymentProcessDAO GetInstance()
        {
            if (instance == null) instance = new exp_PaymentProcessDAO();
            return instance;
        }

        public List<exp_PaymentProcess> GetAll(long? paymentProcessId = null)
        {
            try
            {
                var exp_PaymentProcessLst = new List<exp_PaymentProcess>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PaymentProcessId", paymentProcessId, DbType.Int32, ParameterDirection.Input)
                };
                exp_PaymentProcessLst = dbExecutor.FetchData<exp_PaymentProcess>(CommandType.StoredProcedure,
                    "exp_PaymentProcess_Get", colparameters);
                return exp_PaymentProcessLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_PaymentProcess> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_PaymentProcessLst = new List<exp_PaymentProcess>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_PaymentProcessLst = dbExecutor.FetchData<exp_PaymentProcess>(CommandType.StoredProcedure,
                    "exp_PaymentProcess_GetDynamic", colparameters);
                return exp_PaymentProcessLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_PaymentProcess> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_PaymentProcessLst = new List<exp_PaymentProcess>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_PaymentProcessLst = dbExecutor.FetchDataRef<exp_PaymentProcess>(CommandType.StoredProcedure,
                    "exp_PaymentProcess_GetPaged", colparameters, ref rows);
                return exp_PaymentProcessLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_PaymentProcess _exp_PaymentProcess)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[16]
                {
                    new Parameters("@PaymentProcessType", _exp_PaymentProcess.PaymentProcessType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@LcNo", _exp_PaymentProcess.LcNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Amount", _exp_PaymentProcess.Amount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ExpNo", _exp_PaymentProcess.ExpNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ExpTo", _exp_PaymentProcess.ExpTo, DbType.String, ParameterDirection.Input),
                    new Parameters("@AppliedBy", _exp_PaymentProcess.AppliedBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IrcNo", _exp_PaymentProcess.IrcNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@LcaNo", _exp_PaymentProcess.LcaNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@BbDcNo", _exp_PaymentProcess.BbDcNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@InvoiceIds", _exp_PaymentProcess.InvoiceIds, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ApplicationDate", _exp_PaymentProcess.ApplicationDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ExportContactNo", _exp_PaymentProcess.ExportContactNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ExportContactDate", _exp_PaymentProcess.ExportContactDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@LcDate", _exp_PaymentProcess.LcDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_PaymentProcess.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_PaymentProcess.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_PaymentProcess_Create",
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

        public int Update(exp_PaymentProcess _exp_PaymentProcess)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[17]
                {
                    new Parameters("@PaymentProcessId", _exp_PaymentProcess.PaymentProcessId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PaymentProcessType", _exp_PaymentProcess.PaymentProcessType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@LcNo", _exp_PaymentProcess.LcNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Amount", _exp_PaymentProcess.Amount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ExpNo", _exp_PaymentProcess.ExpNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ExpTo", _exp_PaymentProcess.ExpTo, DbType.String, ParameterDirection.Input),
                    new Parameters("@AppliedBy", _exp_PaymentProcess.AppliedBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IrcNo", _exp_PaymentProcess.IrcNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@LcaNo", _exp_PaymentProcess.LcaNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@BbDcNo", _exp_PaymentProcess.BbDcNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@InvoiceIds", _exp_PaymentProcess.InvoiceIds, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ApplicationDate", _exp_PaymentProcess.ApplicationDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ExportContactNo", _exp_PaymentProcess.ExportContactNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ExportContactDate", _exp_PaymentProcess.ExportContactDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@LcDate", _exp_PaymentProcess.LcDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_PaymentProcess.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_PaymentProcess.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_PaymentProcess_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long paymentProcessId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PaymentProcessId", paymentProcessId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_PaymentProcess_DeleteById",
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