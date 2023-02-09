using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using PosEntity;

namespace PosDAL
{
    public class pos_CashDepositDAO //: IDisposible
    {
        private static volatile pos_CashDepositDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pos_CashDepositDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pos_CashDepositDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pos_CashDepositDAO();
                    }

                return instance;
            }
        }

        public static pos_CashDepositDAO GetInstance()
        {
            if (instance == null) instance = new pos_CashDepositDAO();
            return instance;
        }

        public List<pos_CashDeposit> GetAll(long? depositId = null)
        {
            try
            {
                var pos_CashDepositLst = new List<pos_CashDeposit>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DepositId", depositId, DbType.Int32, ParameterDirection.Input)
                };
                pos_CashDepositLst = dbExecutor.FetchData<pos_CashDeposit>(CommandType.StoredProcedure,
                    "pos_CashDeposit_Get", colparameters);
                return pos_CashDepositLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_CashDeposit> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var pos_CashDepositLst = new List<pos_CashDeposit>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                pos_CashDepositLst = dbExecutor.FetchData<pos_CashDeposit>(CommandType.StoredProcedure,
                    "pos_CashDeposit_GetDynamic", colparameters);
                return pos_CashDepositLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_CashDeposit> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var pos_CashDepositLst = new List<pos_CashDeposit>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pos_CashDepositLst = dbExecutor.FetchDataRef<pos_CashDeposit>(CommandType.StoredProcedure,
                    "pos_CashDeposit_GetPaged", colparameters, ref rows);
                return pos_CashDepositLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(pos_CashDeposit _pos_CashDeposit)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[14]
                {
                    new Parameters("@BranchId", _pos_CashDeposit.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BankId", _pos_CashDeposit.BankId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BankBranchName", _pos_CashDeposit.BankBranchName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DepositDate", _pos_CashDeposit.DepositDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ReferenceNo", _pos_CashDeposit.ReferenceNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DepositById", _pos_CashDeposit.DepositById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _pos_CashDeposit.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@Amount", _pos_CashDeposit.Amount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@BankName", _pos_CashDeposit.BankName, DbType.String, ParameterDirection.Input),
                    new Parameters("@DepositByName", _pos_CashDeposit.DepositByName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _pos_CashDeposit.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _pos_CashDeposit.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _pos_CashDeposit.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _pos_CashDeposit.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "pos_CashDeposit_Create",
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

        public int Update(pos_CashDeposit _pos_CashDeposit)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@DepositId", _pos_CashDeposit.DepositId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@BranchId", _pos_CashDeposit.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BankId", _pos_CashDeposit.BankId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BankBranchName", _pos_CashDeposit.BankBranchName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DepositDate", _pos_CashDeposit.DepositDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ReferenceNo", _pos_CashDeposit.ReferenceNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DepositById", _pos_CashDeposit.DepositById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _pos_CashDeposit.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@Amount", _pos_CashDeposit.Amount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@BankName", _pos_CashDeposit.BankName, DbType.String, ParameterDirection.Input),
                    new Parameters("@DepositByName", _pos_CashDeposit.DepositByName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _pos_CashDeposit.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _pos_CashDeposit.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_CashDeposit_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long depositId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DepositId", depositId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_CashDeposit_DeleteById",
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