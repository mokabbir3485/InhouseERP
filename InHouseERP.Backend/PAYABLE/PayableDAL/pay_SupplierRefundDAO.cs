using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using PayableEntity;

namespace PayableDAL
{
    public class pay_SupplierRefundDAO
    {
        private static volatile pay_SupplierRefundDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pay_SupplierRefundDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pay_SupplierRefundDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pay_SupplierRefundDAO();
                    }

                return instance;
            }
        }

        public static pay_SupplierRefundDAO GetInstance()
        {
            if (instance == null) instance = new pay_SupplierRefundDAO();
            return instance;
        }

        public List<pay_SupplierRefund> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var pay_SupplierRefund = new List<pay_SupplierRefund>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pay_SupplierRefund = dbExecutor.FetchDataRef<pay_SupplierRefund>(CommandType.StoredProcedure,
                    "pay_SupplierRefund_GetPaged", colparameters, ref rows);
                return pay_SupplierRefund;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


       

        public long Post(pay_SupplierRefund _pay_SupplierRefund)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[20]
                {
                    new Parameters("@RefundId", _pay_SupplierRefund.RefundId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SupplierId", _pay_SupplierRefund.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RefundDate", _pay_SupplierRefund.RefundDate, DbType.DateTime,
                        ParameterDirection.Input),
                       new Parameters("@RefundNo", _pay_SupplierRefund.RefundNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _pay_SupplierRefund.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsCheque", _pay_SupplierRefund.IsCheque, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ChequeTypeId", _pay_SupplierRefund.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", _pay_SupplierRefund.ChequeNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ChequeDate", _pay_SupplierRefund.ChequeDate, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@BankAccountId", _pay_SupplierRefund.BankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MobileBankingServiceId", _pay_SupplierRefund.MobileBankingServiceId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@TransactionNo", _pay_SupplierRefund.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MobileNo", _pay_SupplierRefund.MobileNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PaidAmount", _pay_SupplierRefund.PaidAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PaymentVoucherNo", _pay_SupplierRefund.PaymentVoucherNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Remarks", _pay_SupplierRefund.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", _pay_SupplierRefund.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _pay_SupplierRefund.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _pay_SupplierRefund.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _pay_SupplierRefund.UpdatorId, DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_SupplierRefund_Post",
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