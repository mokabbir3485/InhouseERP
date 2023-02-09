using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ReceivableEntity;

namespace ReceivableDAL
{
    public class rcv_CompanyVatAitDAO
    {
        private static volatile rcv_CompanyVatAitDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_CompanyVatAitDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_CompanyVatAitDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_CompanyVatAitDAO();
                    }

                return instance;
            }
        }

        public static rcv_CompanyVatAitDAO GetInstance()
        {
            if (instance == null) instance = new rcv_CompanyVatAitDAO();
            return instance;
        }

        public List<rcv_CompanyVatAit> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var rcv_CompanyVatAitLst = new List<rcv_CompanyVatAit>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyVatAitLst = dbExecutor.FetchDataRef<rcv_CompanyVatAit>(
                    CommandType.StoredProcedure, "rcv_CompanyVatAit_GetPaged", colparameters, ref rows);
                return rcv_CompanyVatAitLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetMaxCompanyVatIssueNo()
        {
            try
            {

                Int64 reqNo = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                reqNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "vat_CompanyVAT_GetMaxTrChallanNo", null, true);

                dbExecutor.ManageTransaction(TransactionType.Commit);
                return reqNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public List<rcv_CompanyVAT> GetCompanyPayment_GetByCompanyIdForCompanyVATIssue(string CompanyIds)
        {
            try
            {
                var rcv_CompanyVATLst = new List<rcv_CompanyVAT>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId", CompanyIds, DbType.String, ParameterDirection.Input),

                };
                rcv_CompanyVATLst = dbExecutor.FetchData<rcv_CompanyVAT>(CommandType.StoredProcedure,
                    "rcv_CompanyPayment_GetByCompanyIdForCompanyVAT", colparameters);
                return rcv_CompanyVATLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Add(rcv_CompanyVAT rcv_CompanyVAT)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[23]
                {
                    new Parameters("@TrChallanNo", rcv_CompanyVAT.TrChallanNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@TrChallanDate", rcv_CompanyVAT.TrChallanDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ChallanNo", rcv_CompanyVAT.ChallanNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChallanDate", rcv_CompanyVAT.ChallanDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Submitted_Bank", rcv_CompanyVAT.Submitted_Bank,
                        DbType.String, ParameterDirection.Input),

                    new Parameters("@Bank_District", rcv_CompanyVAT.Bank_District , DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Bank_Branch", rcv_CompanyVAT.Bank_Branch, DbType.String, ParameterDirection.Input),
                    new Parameters("@CodeNo", rcv_CompanyVAT.CodeNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@TotalVATAmount", rcv_CompanyVAT.TotalVATAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", rcv_CompanyVAT.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PayerBankAccountId", rcv_CompanyVAT.PayerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", rcv_CompanyVAT.PaymentTypeId, DbType.Int32,
                         ParameterDirection.Input),

                    new Parameters("@PaymentDate", rcv_CompanyVAT.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),

                    new Parameters("@ChequeTypeId", rcv_CompanyVAT.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),

                    new Parameters("@ChequeNo", rcv_CompanyVAT.ChequeNo, DbType.String,
                         ParameterDirection.Input),
                    new Parameters("@ChequeDate", rcv_CompanyVAT.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),

                    new Parameters("@MobileBankingServiceId", rcv_CompanyVAT.MobileBankingServiceId, DbType.Int32,
                        ParameterDirection.Input),

                   new Parameters("@TransactionNo", rcv_CompanyVAT.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                   new Parameters("@MobileNo", rcv_CompanyVAT.MobileNo, DbType.String,
                        ParameterDirection.Input),
                   new Parameters("@MoneyReceiptNo", rcv_CompanyVAT.MoneyReceiptNo, DbType.String,
                        ParameterDirection.Input),
                   new Parameters("@SubmittedBy", rcv_CompanyVAT.SubmittedBy, DbType.Int32,
                        ParameterDirection.Input),
                   new Parameters("@SubmittedTo", rcv_CompanyVAT.SubmittedTo, DbType.String,
                        ParameterDirection.Input),
                   new Parameters("@UpdatorId", rcv_CompanyVAT.UpdatorId, DbType.Int32,
                        ParameterDirection.Input)
                };

                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "vat_CompanyVAT_Create",
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
        public int AddDetails(rcv_CompanyVAT rcv_CompanyVAT)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@TrChallanId", rcv_CompanyVAT.TrChallanId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SalesInvoiceId", rcv_CompanyVAT.SalesInvoiceId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", rcv_CompanyVAT.CompanyId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@VATAmount", rcv_CompanyVAT.VATAmount , DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PaidFor", rcv_CompanyVAT.PaidFor, DbType.String, ParameterDirection.Input)

                };

                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "vat_CompanyVATDetail_Create",
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

        public long Post(rcv_CompanyVatAit rcv_CompanyVatAit)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@CompanyVatAitId", rcv_CompanyVatAit.CompanyVatAitId , DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", rcv_CompanyVatAit.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReceiveDate", rcv_CompanyVatAit.ReceiveDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@VAT", rcv_CompanyVatAit.VAT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AIT", rcv_CompanyVatAit.AIT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", rcv_CompanyVatAit.UpdatorId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_CompanyVatAit_Post",
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
        public List<rcv_CompanyVAT> VATCompanyGetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                var rcv_CompanyVATLst = new List<rcv_CompanyVAT>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyVATLst = dbExecutor.FetchDataRef<rcv_CompanyVAT>(CommandType.StoredProcedure,
                    "vat_CompanyVAT_GetPaged", colparameters, ref rows);
                return rcv_CompanyVATLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyVAT> GetCompanyVAT_GetByTrChallanId(Int32 TrChallanId)
        {
            try
            {
                var rcv_CompanyVATLst = new List<rcv_CompanyVAT>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TrChallanId", TrChallanId, DbType.Int32, ParameterDirection.Input),
                };
                rcv_CompanyVATLst = dbExecutor.FetchData<rcv_CompanyVAT>(CommandType.StoredProcedure,
                    "xRpt_vat_CompanyVAT_GetByTrChallanId", colparameters);
                return rcv_CompanyVATLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
