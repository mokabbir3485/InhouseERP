using DbExecutor;
using ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReceivableDAL
{
 
    public class rcv_CompanyAdvanceRefundDAO
    {
        private static volatile rcv_CompanyAdvanceRefundDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_CompanyAdvanceRefundDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_CompanyAdvanceRefundDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_CompanyAdvanceRefundDAO();
                    }

                return instance;
            }
        }

        public static rcv_CompanyAdvanceRefundDAO GetInstance()
        {
            if (instance == null) instance = new rcv_CompanyAdvanceRefundDAO();
            return instance;
        }

        public List<rcv_CompanyAdvanceRefund> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var rcv_SupplierRefund = new List<rcv_CompanyAdvanceRefund>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_SupplierRefund = dbExecutor.FetchDataRef<rcv_CompanyAdvanceRefund>(CommandType.StoredProcedure,
                    "rcv_CompanyAdvanceRefund_GetPaged", colparameters, ref rows);
                return rcv_SupplierRefund;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(rcv_CompanyAdvanceRefund _rcv_SupplierRefund)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[20]
                {
                    new Parameters("@RefundId", _rcv_SupplierRefund.RefundId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@CompanyId", _rcv_SupplierRefund.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RefundDate", _rcv_SupplierRefund.RefundDate, DbType.DateTime,
                        ParameterDirection.Input),
                      new Parameters("@CompanyPaymentRefundNo", _rcv_SupplierRefund.CompanyPaymentRefundNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _rcv_SupplierRefund.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                  
                    new Parameters("@ChequeTypeId", _rcv_SupplierRefund.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", _rcv_SupplierRefund.ChequeNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ChequeDate", _rcv_SupplierRefund.ChequeDate, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@BankAccountId", _rcv_SupplierRefund.BankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MobileBankingServiceId", _rcv_SupplierRefund.MobileBankingServiceId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@TransactionNo", _rcv_SupplierRefund.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MobileNo", _rcv_SupplierRefund.MobileNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@RefundAmount", _rcv_SupplierRefund.RefundAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _rcv_SupplierRefund.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", _rcv_SupplierRefund.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _rcv_SupplierRefund.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _rcv_SupplierRefund.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _rcv_SupplierRefund.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ReceiptVoucherNo", _rcv_SupplierRefund.ReceiptVoucherNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@MoneyReceiptNo", _rcv_SupplierRefund.MoneyReceiptNo, DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_CompanyAdvanceRefund_Post",
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

        public List<xrpt_rcv_CompanyAdvanceRefund> GetCompanyRefundReportById(Int64 RefundId)
        {
            try
            {
                var _rcv_CompanyRefund = new List<xrpt_rcv_CompanyAdvanceRefund>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RefundId",RefundId, DbType.Int64, ParameterDirection.Input)
                };
                _rcv_CompanyRefund =
                    dbExecutor.FetchData<xrpt_rcv_CompanyAdvanceRefund>(CommandType.StoredProcedure,
                        "xrpt_rcv_CompanyAdvanceRefundGetById", colparameters);
                return _rcv_CompanyRefund;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyAdvanceRefund> GetCompanyAdvance_GetAmountByCompanyId(Int64 CompanyId)
        {
            try
            {
                var rcv_CompanyAdvanceRefund = new List<rcv_CompanyAdvanceRefund>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId",CompanyId, DbType.Int64, ParameterDirection.Input)
                };
                rcv_CompanyAdvanceRefund =
                    dbExecutor.FetchData<rcv_CompanyAdvanceRefund>(CommandType.StoredProcedure,
                        "rcv_CompanyAdvance_GetAmountByCompanyId", colparameters);
                return rcv_CompanyAdvanceRefund;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
