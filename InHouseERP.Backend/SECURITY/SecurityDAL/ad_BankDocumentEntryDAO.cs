using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_BankDocumentEntryDAO
    {
        private static volatile ad_BankDocumentEntryDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_BankDocumentEntryDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_BankDocumentEntryDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_BankDocumentEntryDAO();
                    }

                return instance;
            }
        }

        public static ad_BankDocumentEntryDAO GetInstance()
        {
            if (instance == null) instance = new ad_BankDocumentEntryDAO();
            return instance;
        }

        public List<ad_BankDocumentEntry> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_BankDocumentEntry = new List<ad_BankDocumentEntry>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_BankDocumentEntry = dbExecutor.FetchDataRef<ad_BankDocumentEntry>(CommandType.StoredProcedure,
                    "ad_BankDocumentEntry_GetPaged", colparameters, ref rows);
                return ad_BankDocumentEntry;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BankDocumentEntry> GetBankDocumentEntryListByBankAccountId(long BankAccountId)
        {
            try
            {
                var ad_BankDocumentEntryLst = new List<ad_BankDocumentEntry>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BankAccountId", BankAccountId, DbType.Int64, ParameterDirection.Input)
                };
                ad_BankDocumentEntryLst = dbExecutor.FetchData<ad_BankDocumentEntry>(CommandType.StoredProcedure,
                    "ad_BankDocumentEntry_GetByBankAccountId", colparameters);
                return ad_BankDocumentEntryLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteBankDocumentEntryByBankAccountId(long BankAccountId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BankAccountId", BankAccountId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "ad_BankDocumentEntry_DeleteByBankAccountId", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(ad_BankDocumentEntry _ad_BankDocumentEntry)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@BankDocumentEntryId", _ad_BankDocumentEntry.BankDocumentEntryId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@BankAccountId", _ad_BankDocumentEntry.BankAccountId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@NameOfDocument", _ad_BankDocumentEntry.NameOfDocument, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@OriginSet", _ad_BankDocumentEntry.OriginSet, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Sets", _ad_BankDocumentEntry.Sets, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _ad_BankDocumentEntry.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _ad_BankDocumentEntry.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "ad_BankDocumentEntry_Post",
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
    }
}