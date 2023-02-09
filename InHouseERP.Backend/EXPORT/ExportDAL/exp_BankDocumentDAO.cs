using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_BankDocumentDAO //: IDisposible
    {
        private static volatile exp_BankDocumentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_BankDocumentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_BankDocumentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_BankDocumentDAO();
                    }

                return instance;
            }
        }

        public static exp_BankDocumentDAO GetInstance()
        {
            if (instance == null) instance = new exp_BankDocumentDAO();
            return instance;
        }

        public List<exp_BankDocument> GetAll(long? bankDocumentId = null, long? commercialInvoiceId = null)
        {
            try
            {
                var exp_BankDocumentLst = new List<exp_BankDocument>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BankDocumentId", bankDocumentId, DbType.Int32, ParameterDirection.Input)
                };
                exp_BankDocumentLst = dbExecutor.FetchData<exp_BankDocument>(CommandType.StoredProcedure,
                    "exp_BankDocument_Get", colparameters);
                return exp_BankDocumentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_BankDocument> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_BankDocumentLst = new List<exp_BankDocument>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_BankDocumentLst = dbExecutor.FetchData<exp_BankDocument>(CommandType.StoredProcedure,
                    "exp_BankDocument_GetDynamic", colparameters);
                return exp_BankDocumentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_BankDocument> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var exp_BankDocumentLst = new List<exp_BankDocument>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_BankDocumentLst = dbExecutor.FetchDataRef<exp_BankDocument>(CommandType.StoredProcedure,
                    "exp_BankDocument_GetPaged", colparameters, ref rows);
                return exp_BankDocumentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_BankDocument _exp_BankDocument)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@CommercialInvoiceId", _exp_BankDocument.CommercialInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@BankApplicationTo", _exp_BankDocument.BankApplicationTo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@BankDocumentToDepartment", _exp_BankDocument.BankDocumentToDepartment,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@AppDate", _exp_BankDocument.AppDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_BankDocument.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_BankDocument.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_BankDocument_Create",
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

        public int Update(exp_BankDocument _exp_BankDocument)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@BankDocumentId", _exp_BankDocument.BankDocumentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceId", _exp_BankDocument.CommercialInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@BankApplicationTo", _exp_BankDocument.BankApplicationTo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@BankDocumentToDepartment", _exp_BankDocument.BankDocumentToDepartment,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@AppDate", _exp_BankDocument.AppDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_BankDocument.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_BankDocument.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_BankDocument_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long bankDocumentId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BankDocumentId", bankDocumentId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_BankDocument_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_BankDocument> BankDocumentGetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_BankDocumentLst = new List<exp_BankDocument>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_BankDocumentLst = dbExecutor.FetchDataRef<exp_BankDocument>(CommandType.StoredProcedure,
                    "exp_BankDocument_GetPaged", colparameters, ref rows);
                return exp_BankDocumentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}