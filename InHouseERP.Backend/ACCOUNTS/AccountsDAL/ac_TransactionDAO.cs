using System;
using System.Collections.Generic;
using System.Data;
using AccountsEntity;
using DbExecutor;

namespace AccountsDAL
{
    public class ac_TransactionDAO //: IDisposible
    {
        private static volatile ac_TransactionDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ac_TransactionDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ac_TransactionDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ac_TransactionDAO();
                    }

                return instance;
            }
        }

        public static ac_TransactionDAO GetInstance()
        {
            if (instance == null) instance = new ac_TransactionDAO();
            return instance;
        }

        public List<ac_Transaction> GetAll(long? transactionId = null)
        {
            try
            {
                var ac_TransactionLst = new List<ac_Transaction>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TransactionId", transactionId, DbType.Int32, ParameterDirection.Input)
                };
                ac_TransactionLst = dbExecutor.FetchData<ac_Transaction>(CommandType.StoredProcedure,
                    "ac_Transaction_Get", colparameters);
                return ac_TransactionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_Transaction> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ac_TransactionLst = new List<ac_Transaction>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ac_TransactionLst = dbExecutor.FetchData<ac_Transaction>(CommandType.StoredProcedure,
                    "ac_Transaction_GetDynamic", colparameters);
                return ac_TransactionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_Transaction> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ac_TransactionLst = new List<ac_Transaction>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ac_TransactionLst = dbExecutor.FetchDataRef<ac_Transaction>(CommandType.StoredProcedure,
                    "ac_Transaction_GetPaged", colparameters, ref rows);
                return ac_TransactionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(ac_Transaction _ac_Transaction)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[33]
                {
                    new Parameters("@AccountId", _ac_Transaction.AccountId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TransactionDate", _ac_Transaction.TransactionDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@TransactionType", _ac_Transaction.TransactionType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@VoucherType", _ac_Transaction.VoucherType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Narration", _ac_Transaction.Narration, DbType.String, ParameterDirection.Input),
                    new Parameters("@DrAmt", _ac_Transaction.DrAmt, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@CrAmt", _ac_Transaction.CrAmt, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@BalanceAmt", _ac_Transaction.BalanceAmt, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _ac_Transaction.VoucherNo, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@VoucherNum", _ac_Transaction.VoucherNum, DbType.String, ParameterDirection.Input),
                    new Parameters("@AgainstAccountId", _ac_Transaction.AgainstAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AgainstNarration", _ac_Transaction.AgainstNarration, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", _ac_Transaction.CompanyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SupplierId", _ac_Transaction.SupplierId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BankId", _ac_Transaction.BankId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BranchId", _ac_Transaction.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ChequeNo", _ac_Transaction.ChequeNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ChequeBank", _ac_Transaction.ChequeBank, DbType.String, ParameterDirection.Input),
                    new Parameters("@ChequeDate", _ac_Transaction.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IsChqCleared", _ac_Transaction.IsChqCleared, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsAuto", _ac_Transaction.IsAuto, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsOpening", _ac_Transaction.IsOpening, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsApproved", _ac_Transaction.IsApproved, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsVoid", _ac_Transaction.IsVoid, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _ac_Transaction.ApprovedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _ac_Transaction.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@VoidBy", _ac_Transaction.VoidBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@VoidDate", _ac_Transaction.VoidDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@VoidReson", _ac_Transaction.VoidReson, DbType.String, ParameterDirection.Input),
                    new Parameters("@PurposeType", _ac_Transaction.PurposeType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CurrencyType", _ac_Transaction.CurrencyType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ac_Transaction.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ac_Transaction.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "ac_Transaction_Create",
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

        public int Update(ac_Transaction _ac_Transaction)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[34]
                {
                    new Parameters("@TransactionId", _ac_Transaction.TransactionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AccountId", _ac_Transaction.AccountId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TransactionDate", _ac_Transaction.TransactionDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@TransactionType", _ac_Transaction.TransactionType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@VoucherType", _ac_Transaction.VoucherType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Narration", _ac_Transaction.Narration, DbType.String, ParameterDirection.Input),
                    new Parameters("@DrAmt", _ac_Transaction.DrAmt, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@CrAmt", _ac_Transaction.CrAmt, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@BalanceAmt", _ac_Transaction.BalanceAmt, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@VoucherNo", _ac_Transaction.VoucherNo, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@VoucherNum", _ac_Transaction.VoucherNum, DbType.String, ParameterDirection.Input),
                    new Parameters("@AgainstAccountId", _ac_Transaction.AgainstAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AgainstNarration", _ac_Transaction.AgainstNarration, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", _ac_Transaction.CompanyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SupplierId", _ac_Transaction.SupplierId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BankId", _ac_Transaction.BankId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BranchId", _ac_Transaction.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ChequeNo", _ac_Transaction.ChequeNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ChequeBank", _ac_Transaction.ChequeBank, DbType.String, ParameterDirection.Input),
                    new Parameters("@ChequeDate", _ac_Transaction.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IsChqCleared", _ac_Transaction.IsChqCleared, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsAuto", _ac_Transaction.IsAuto, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsOpening", _ac_Transaction.IsOpening, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsApproved", _ac_Transaction.IsApproved, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsVoid", _ac_Transaction.IsVoid, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _ac_Transaction.ApprovedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _ac_Transaction.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@VoidBy", _ac_Transaction.VoidBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@VoidDate", _ac_Transaction.VoidDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@VoidReson", _ac_Transaction.VoidReson, DbType.String, ParameterDirection.Input),
                    new Parameters("@PurposeType", _ac_Transaction.PurposeType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CurrencyType", _ac_Transaction.CurrencyType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ac_Transaction.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ac_Transaction.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ac_Transaction_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long transactionId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TransactionId", transactionId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ac_Transaction_DeleteById",
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