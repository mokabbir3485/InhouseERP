using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_BankDocumentDetailDAO //: IDisposible
    {
        private static volatile exp_BankDocumentDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_BankDocumentDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_BankDocumentDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_BankDocumentDetailDAO();
                    }

                return instance;
            }
        }

        public static exp_BankDocumentDetailDAO GetInstance()
        {
            if (instance == null) instance = new exp_BankDocumentDetailDAO();
            return instance;
        }

        public List<exp_BankDocumentDetail> GetAll(long? bankDocumentDetailId = null, long? bankDocumentId = null)
        {
            try
            {
                var exp_BankDocumentDetailLst = new List<exp_BankDocumentDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@BankDocumentDetailId", bankDocumentDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@BankDocumentId", bankDocumentId, DbType.Int64, ParameterDirection.Input)
                };
                exp_BankDocumentDetailLst = dbExecutor.FetchData<exp_BankDocumentDetail>(CommandType.StoredProcedure,
                    "exp_BankDocumentDetail_Get", colparameters);
                return exp_BankDocumentDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_BankDocumentDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_BankDocumentDetailLst = new List<exp_BankDocumentDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_BankDocumentDetailLst = dbExecutor.FetchData<exp_BankDocumentDetail>(CommandType.StoredProcedure,
                    "exp_BankDocumentDetail_GetDynamic", colparameters);
                return exp_BankDocumentDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_BankDocumentDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_BankDocumentDetailLst = new List<exp_BankDocumentDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_BankDocumentDetailLst = dbExecutor.FetchDataRef<exp_BankDocumentDetail>(CommandType.StoredProcedure,
                    "exp_BankDocumentDetail_GetPaged", colparameters, ref rows);
                return exp_BankDocumentDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_BankDocumentDetail _exp_BankDocumentDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@BankDocumentId", _exp_BankDocumentDetail.BankDocumentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@NameOfDocument", _exp_BankDocumentDetail.NameOfDocument, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@OriginSet", _exp_BankDocumentDetail.OriginSet, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Sets", _exp_BankDocumentDetail.Sets, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_BankDocumentDetail.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_BankDocumentDetail.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_BankDocumentDetail_Create",
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

        public int Update(exp_BankDocumentDetail _exp_BankDocumentDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@BankDocumentDetailId", _exp_BankDocumentDetail.BankDocumentDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@BankDocumentId", _exp_BankDocumentDetail.BankDocumentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@NameOfDocument", _exp_BankDocumentDetail.NameOfDocument, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@OriginSet", _exp_BankDocumentDetail.OriginSet, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Sets", _exp_BankDocumentDetail.Sets, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_BankDocumentDetail.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_BankDocumentDetail.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_BankDocumentDetail_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long bankDocumentDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BankDocumentDetailId", bankDocumentDetailId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_BankDocumentDetail_DeleteById",
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