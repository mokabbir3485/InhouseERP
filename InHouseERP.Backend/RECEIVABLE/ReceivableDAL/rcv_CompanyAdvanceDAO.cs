using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ReceivableEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace ReceivableDAL
{
    public class rcv_CompanyAdvanceDAO //: IDisposible
    {
        private static volatile rcv_CompanyAdvanceDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_CompanyAdvanceDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_CompanyAdvanceDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_CompanyAdvanceDAO();
                    }

                return instance;
            }
        }

        public static rcv_CompanyAdvanceDAO GetInstance()
        {
            if (instance == null) instance = new rcv_CompanyAdvanceDAO();
            return instance;
        }

        public List<rcv_CompanyAdvance> GetAll(long? advanceId = null)
        {
            try
            {
                var rcv_CompanyAdvanceLst = new List<rcv_CompanyAdvance>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AdvanceId", advanceId, DbType.Int32, ParameterDirection.Input)
                };
                rcv_CompanyAdvanceLst = dbExecutor.FetchData<rcv_CompanyAdvance>(CommandType.StoredProcedure,
                    "rcv_CompanyAdvance_Get", colparameters);
                return rcv_CompanyAdvanceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetByVoucherGenerate(string VoucherName)
        {
            try
            {
                Parameters[] colparameters;
                colparameters = new Parameters[1]
                {
                        new Parameters("@VoucherName",VoucherName, DbType.String, ParameterDirection.Input)
                };
                string maxInvoiceNo = "";
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxInvoiceNo = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "sp_GetMaxVoucherNo", colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxInvoiceNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyAdvance> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var rcv_CompanyAdvanceLst = new List<rcv_CompanyAdvance>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyAdvanceLst = dbExecutor.FetchData<rcv_CompanyAdvance>(CommandType.StoredProcedure,
                    "rcv_CompanyAdvance_GetDynamic", colparameters);
                return rcv_CompanyAdvanceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

       
        public string Post(rcv_CompanyAdvance rcv_CompanyAdvance)
        {
            string ret = "";
            try
            {
                var colparameters = new Parameters[19]
                {
                    new Parameters("@AdvanceId", rcv_CompanyAdvance.AdvanceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CompanyId", rcv_CompanyAdvance.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentSectorId", rcv_CompanyAdvance.PaymentSectorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AdvanceAmount", rcv_CompanyAdvance.AdvanceAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AdvanceDate", rcv_CompanyAdvance.AdvanceDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@CustomerBankAccountId", rcv_CompanyAdvance.CustomerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReceiverBankAccountId", rcv_CompanyAdvance.ReceiverBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MobileBankingServiceId", rcv_CompanyAdvance.MobileBankingServiceId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TransactionNo", rcv_CompanyAdvance.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", rcv_CompanyAdvance.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", rcv_CompanyAdvance.ChequeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeTypeId", rcv_CompanyAdvance.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeDate", rcv_CompanyAdvance.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    //new Parameters("@CreatorId", rcv_CompanyAdvance.CreatorId, DbType.Int32,
                    //    ParameterDirection.Input),
                    new Parameters("@UpdatorId", rcv_CompanyAdvance.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MoneyReceiptNo", rcv_CompanyAdvance.MoneyReceiptNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MobileNo", rcv_CompanyAdvance.MobileNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@AdvancePaymentNo", rcv_CompanyAdvance.AdvancePaymentNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@FromBranch", rcv_CompanyAdvance.FromBranch, DbType.String, ParameterDirection.Input),
                    new Parameters("@Remarks", rcv_CompanyAdvance.Remarks, DbType.String, ParameterDirection.Input),
                };
               
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "rcv_CompanyAdvance_Post",
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
        public List<rcv_CompanyAdvance> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var rcv_CompanyAdvanceLst = new List<rcv_CompanyAdvance>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyAdvanceLst = dbExecutor.FetchDataRef<rcv_CompanyAdvance>(CommandType.StoredProcedure,
                    "rcv_CompanyAdvance_GetPaged", colparameters, ref rows);
                return rcv_CompanyAdvanceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Int64 GetMaxCompanyAdvancedNo()
        {
            try
            {
                Int64 advanceNo = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                advanceNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_GetMaxAdvancePaymentNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return advanceNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public List<rcv_PaymentSector> GetAllAdvancePaymentSector()
        {
            try
            {
                var AdvancePaymentSectorList = new List<rcv_PaymentSector>();
                AdvancePaymentSectorList =
                    dbExecutor.FetchData<rcv_PaymentSector>(CommandType.StoredProcedure, "rcv_AdvancePaymentSector_GetAll");
                return AdvancePaymentSectorList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public string GetMaxCompanyAdvancedNo(DateTime advancedDate)
        //{
        //    try
        //    {
        //        var aCommon = new Common();
        //        var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(advancedDate);

        //        var colparameters = new Parameters[2]
        //        {
        //            new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
        //            new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
        //        };

        //        long maxJissueNo = 0;
        //        string JIssueNo;
        //        dbExecutor.ManageTransaction(TransactionType.Open);
        //        maxJissueNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
        //            "rcv_GetMaxAdvancePaymentNo", colparameters, true);
        //        var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(advancedDate);
        //        JIssueNo = "CA/" + aFiscalYearPart + "/" + maxJissueNo;
        //        dbExecutor.ManageTransaction(TransactionType.Commit);
        //        return JIssueNo;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

    }
}