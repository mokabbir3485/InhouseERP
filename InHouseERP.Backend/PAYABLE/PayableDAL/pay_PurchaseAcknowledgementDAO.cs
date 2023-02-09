using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using PayableEntity;

namespace PayableDAL
{
    public class pay_PurchaseAcknowledgementDAO
    {
        private static volatile pay_PurchaseAcknowledgementDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pay_PurchaseAcknowledgementDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pay_PurchaseAcknowledgementDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pay_PurchaseAcknowledgementDAO();
                    }

                return instance;
            }
        }

        public static pay_PurchaseAcknowledgementDAO GetInstance()
        {
            if (instance == null) instance = new pay_PurchaseAcknowledgementDAO();
            return instance;
        }

        public int AcknowledgeCreate(pay_PurchaseAcknowledgement pay_PurchaseAcknowledgement)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@PBId", pay_PurchaseAcknowledgement.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsLocal", pay_PurchaseAcknowledgement.IsLocal, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", pay_PurchaseAcknowledgement.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AcknowledgedBy", pay_PurchaseAcknowledgement.AcknowledgedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AcknowledgementDate", pay_PurchaseAcknowledgement.AcknowledgementDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@AcknowledgementNo", pay_PurchaseAcknowledgement.AcknowledgementNo, DbType.String, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pay_PurchaseAcknowledgement_Create",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int SupplierAitDetailCreate(pay_PurchaseAcknowledgement pay_PurchaseAcknowledgement)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@TDSIssueId", pay_PurchaseAcknowledgement.TDSIssueId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PBId", pay_PurchaseAcknowledgement.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsLocal", pay_PurchaseAcknowledgement.IsLocal, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@SupplierId", pay_PurchaseAcknowledgement.SupplierId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PaidFor", pay_PurchaseAcknowledgement.PaidFor, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AITAmount", pay_PurchaseAcknowledgement.AITAmount, DbType.Decimal,
                        ParameterDirection.Input),
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "Vat_TDSDetail_Create",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int SupplierAitCreate(pay_SupplierAIT pay_SupplierAit)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[23]
                {
                    new Parameters("@TDSIssueNo", pay_SupplierAit.TDSIssueNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@TDSIssueDate", pay_SupplierAit.TDSIssueDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ChallanNo", pay_SupplierAit.ChallanNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChallanDate", pay_SupplierAit.ChallanDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@Submitted_Bank", pay_SupplierAit.Submitted_Bank, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Bank_District", pay_SupplierAit.Bank_District, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Bank_Branch", pay_SupplierAit.Bank_Branch, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CodeNo ", pay_SupplierAit.CodeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@TotalAITAmount", pay_SupplierAit.TotalAITAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", pay_SupplierAit.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PayerBankAccountId", pay_SupplierAit.PayerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", pay_SupplierAit.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentDate", pay_SupplierAit.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@ChequeTypeId", pay_SupplierAit.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", pay_SupplierAit.ChequeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeDate", pay_SupplierAit.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@MobileBankingServiceId", pay_SupplierAit.MobileBankingServiceId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@TransactionNo", pay_SupplierAit.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MobileNo", pay_SupplierAit.MobileNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MoneyReceiptNo", pay_SupplierAit.MoneyReceiptNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SubmittedBy", pay_SupplierAit.SubmittedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubmittedTo", pay_SupplierAit.SubmittedTo , DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", pay_SupplierAit.UpdatorId, DbType.String,
                        ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "Vat_TDS_Create",
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

        public List<pay_PurchaseAcknowledgement> GetPurchaseAcknowledgement(long SupplierId)
        {
            try
            {
                var PurchaseLst = new List<pay_PurchaseAcknowledgement>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int64, ParameterDirection.Input)
                    //new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    //new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                PurchaseLst = dbExecutor.FetchData<pay_PurchaseAcknowledgement>(CommandType.StoredProcedure,
                    "proc_PurchaseBillLocalAndImport_GetPBForAcknowledgement", colparameters);
                return PurchaseLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_PurchaseAcknowledgement> GetSupplierPayment_GetBySupplierIdForAIT(string SupplierId)
        {
            try
            {
                var PurchaseLst = new List<pay_PurchaseAcknowledgement>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.String, ParameterDirection.Input)
                    //new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    //new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                PurchaseLst = dbExecutor.FetchData<pay_PurchaseAcknowledgement>(CommandType.StoredProcedure,
                    "pay_SupplierPayment_GetBySupplierIdForAIT", colparameters);
                return PurchaseLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_xrpt_TDSIssue> GetVat_TDS_GetByTDSIssueId(int TDSIssueId)
        {
            try
            {
                var pay_xrpt_TDSIssue = new List<pay_xrpt_TDSIssue>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TDSIssueId", TDSIssueId, DbType.Int32, ParameterDirection.Input)
                    //new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    //new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                pay_xrpt_TDSIssue = dbExecutor.FetchData<pay_xrpt_TDSIssue>(CommandType.StoredProcedure,
                    "xRpt_Vat_TDS_GetByTDSIssueId", colparameters);
                return pay_xrpt_TDSIssue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_PurchaseAcknowledgement> GetMaxAcknowledgementNo()
        {
            try
            {
                var PurchaseLst = new List<pay_PurchaseAcknowledgement>();
                //var colparameters = new Parameters[3]
                //{
                //    new Parameters("@SupplierId", SupplierId, DbType.Int64, ParameterDirection.Input),
                //    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                //};
                PurchaseLst = dbExecutor.FetchData<pay_PurchaseAcknowledgement>(CommandType.StoredProcedure,
                    "pay_GetMaxPurchaseAcknowledgementNo", null);
                return PurchaseLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int64 GetTDSIssueNo()
        {
            try
            {
                Int64 maxSalesOrderNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxSalesOrderNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "Vat_TDS_GetMaxTDSIssueNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxSalesOrderNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public List<pay_PurchaseAcknowledgement> GetPagedAcknowledge(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var pos_SalesInvoice = new List<pay_PurchaseAcknowledgement>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pos_SalesInvoice = dbExecutor.FetchDataRef<pay_PurchaseAcknowledgement>(CommandType.StoredProcedure,
                    "pay_PurchaseAcknowledgement_GetPaged", colparameters, ref rows);
                return pos_SalesInvoice;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_SupplierAIT> GetTDSIssuePaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var TDSIssue = new List<pay_SupplierAIT>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                TDSIssue = dbExecutor.FetchDataRef<pay_SupplierAIT>(CommandType.StoredProcedure,
                    "Vat_TDS_GetPaged", colparameters, ref rows);
                return TDSIssue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
