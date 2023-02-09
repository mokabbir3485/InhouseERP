using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;


namespace SecurityDAL
{
    public class ad_FactoryExpensesDAO
    {
        private static volatile ad_FactoryExpensesDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_FactoryExpensesDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_FactoryExpensesDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_FactoryExpensesDAO();
                    }

                return instance;
            }
        }

        public static ad_FactoryExpensesDAO GetInstance()
        {
            if (instance == null) instance = new ad_FactoryExpensesDAO();
            return instance;
        }
        public Int64 GetFactoryExpensesMaxNo()
        {
            try
            {
                Int64 MaxSupplierPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxSupplierPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "ad_FactoryExpense_GetMaxExpenseNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxSupplierPaymentNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public long Post(ad_FactoryExpenses ad_FactoryExpenses)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@ExpenseId", ad_FactoryExpenses.ExpenseId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ExpenseNo", ad_FactoryExpenses.ExpenseNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@BillReferenceNo", ad_FactoryExpenses.BillReferenceNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", ad_FactoryExpenses.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@EmployeeId", ad_FactoryExpenses.EmployeeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PurposeId", ad_FactoryExpenses.PurposeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ExpenseDate", ad_FactoryExpenses.ExpenseDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Amount", ad_FactoryExpenses.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_FactoryExpenses.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                     new Parameters("@BranchId", ad_FactoryExpenses.BranchId, DbType.Int32,
                        ParameterDirection.Input),
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "ad_FactoryExpense_post",
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

        public List<ad_FactoryExpenses> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_FactoryExpenses = new List<ad_FactoryExpenses>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_FactoryExpenses = dbExecutor.FetchDataRef<ad_FactoryExpenses>(
                    CommandType.StoredProcedure, "ad_FactoryExpense_GetPaged", colparameters, ref rows);
                return ad_FactoryExpenses;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_FactoryExpenses> GetAllFactoryExpensePurpose(Int32? FiscalYearId = null)
        {
            try
            {
                var FactoryExpensePurposeList = new List<ad_FactoryExpenses>();

                FactoryExpensePurposeList = dbExecutor.FetchData<ad_FactoryExpenses>(CommandType.StoredProcedure,
                    "ad_FactoryExpensePurpose_GetALL", null);
                return FactoryExpensePurposeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
