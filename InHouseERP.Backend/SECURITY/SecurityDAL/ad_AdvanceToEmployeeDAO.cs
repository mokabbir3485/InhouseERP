using DbExecutor;
using SecurityDAL;
using SecurityEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace SecurityDAL
{
    public class ad_AdvanceToEmployeeDAO
    {
        private static volatile ad_AdvanceToEmployeeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_AdvanceToEmployeeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_AdvanceToEmployeeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_AdvanceToEmployeeDAO();
                    }

                return instance;
            }
        }

        public static ad_AdvanceToEmployeeDAO GetInstance()
        {
            if (instance == null) instance = new ad_AdvanceToEmployeeDAO();
            return instance;
        }

        public Int64 GetAdvancePaymentMaxNo()
        {
            try
            {
                Int64 MaxSupplierPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxSupplierPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "ad_AdvanceToEmployee_GetMaxPaymentNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxSupplierPaymentNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public long Post(ad_AdvanceToEmployee ad_AdvanceToEmployee)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[17]
                {
                    new Parameters("@AdvancePaymentId", ad_AdvanceToEmployee.AdvancePaymentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@EmployeeId", ad_AdvanceToEmployee.EmployeeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", ad_AdvanceToEmployee.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentDate ", ad_AdvanceToEmployee.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@AdvancePaymentNo", ad_AdvanceToEmployee.AdvancePaymentNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Remarks", ad_AdvanceToEmployee.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@ChequeTypeId", ad_AdvanceToEmployee.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", ad_AdvanceToEmployee.ChequeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeDate", ad_AdvanceToEmployee.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ReceiverBankAccountId", ad_AdvanceToEmployee.ReceiverBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PayerBankAccountId", ad_AdvanceToEmployee.PayerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaidAmount", ad_AdvanceToEmployee.PaidAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_AdvanceToEmployee.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MobileBankingServiceId", ad_AdvanceToEmployee.MobileBankingServiceId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@TransactionNo", ad_AdvanceToEmployee.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MobileNo", ad_AdvanceToEmployee.MobileNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MoneyReceiptNo", ad_AdvanceToEmployee.MoneyReceiptNo, DbType.String,
                        ParameterDirection.Input),

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "ad_AdvanceToEmployee_post",
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

        public List<ad_AdvanceToEmployee> GetAdvanceToEmployeeGetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_AdvanceToEmployee = new List<ad_AdvanceToEmployee>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_AdvanceToEmployee = dbExecutor.FetchDataRef<ad_AdvanceToEmployee>(CommandType.StoredProcedure,
                    "ad_AdvanceToEmployee_GetPaged", colparameters, ref rows);
                return ad_AdvanceToEmployee;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdvanceToEmployee> GetDynamicAdvanceToEmployee(string whereCondition, string orderByExpression)
        {
            try
            {
                List<ad_AdvanceToEmployee> ad_AdvanceToEmployeeLst = new List<ad_AdvanceToEmployee>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input),
                };
                ad_AdvanceToEmployeeLst = dbExecutor.FetchData<ad_AdvanceToEmployee>(CommandType.StoredProcedure, "ad_AdvanceToEmployee_GetDynamic", colparameters);
                return ad_AdvanceToEmployeeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
