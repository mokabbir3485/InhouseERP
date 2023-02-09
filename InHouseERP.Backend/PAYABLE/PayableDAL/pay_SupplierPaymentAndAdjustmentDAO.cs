using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using PayableBLL;
using PayableEntity;
using ReceivableEntity;

namespace PayableDAO
{
    public class pay_SupplierPaymentAndAdjustmentDAO
    {
        private static volatile pay_SupplierPaymentAndAdjustmentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pay_SupplierPaymentAndAdjustmentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pay_SupplierPaymentAndAdjustmentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pay_SupplierPaymentAndAdjustmentDAO();
                    }

                return instance;
            }
        }

        public static pay_SupplierPaymentAndAdjustmentDAO GetInstance()
        {
            if (instance == null) instance = new pay_SupplierPaymentAndAdjustmentDAO();
            return instance;
        }

        public List<pay_SupplierPaymentDetail> GetAll(long? SupplierPaymentId = null)
        {
            try
            {
                var pay_SupplierPaymentDetailLst = new List<pay_SupplierPaymentDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierPaymentId", SupplierPaymentId, DbType.Int64, ParameterDirection.Input)
                };
                pay_SupplierPaymentDetailLst =
                    dbExecutor.FetchData<pay_SupplierPaymentDetail>(CommandType.StoredProcedure,
                        "pay_SupplierPaymentDetail_Get", colparameters);
                return pay_SupplierPaymentDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetSupplierPaymentMaxNo()
        {
            try
            {
                Int64 MaxSupplierPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxSupplierPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_GetMaxSupplierPaymentNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxSupplierPaymentNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public Int64 GetSupplierOpeningPaymentMaxNo()
        {
            try
            {
                Int64 MaxSupplierOpeningPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxSupplierOpeningPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_GetMaxSupplierOpeningPaymentNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxSupplierOpeningPaymentNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public Int64 GetMaxSupplierPaymentAdjustment()
        {
            try
            {
                Int64 MaxSupplierOpeningPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxSupplierOpeningPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_GetMaxSupplierPaymentAdjudtment", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxSupplierOpeningPaymentNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public Int64 GetMaxSupplierPaymentRefund()
        {
            try
            {
                Int64 MaxSupplierOpeningPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxSupplierOpeningPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_GetMaxSupplierPaymentRefund", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxSupplierOpeningPaymentNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public List<pay_SupplierPayment> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var pay_SupplierPaymentLst = new List<pay_SupplierPayment>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                pay_SupplierPaymentLst = dbExecutor.FetchData<pay_SupplierPayment>(CommandType.StoredProcedure,
                    "pay_SupplierPayment_GetDynamic", colparameters);
                return pay_SupplierPaymentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierPayment> SupplierPaymentDetailReport(string  SupplierIds, DateTime? FromDate = null, DateTime? ToDate = null, int? PaymentTypeId = null)
        {
            try
            {
                var pay_SupplierPaymentLst = new List<pay_SupplierPayment>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@SupplierIds", SupplierIds, DbType.String, ParameterDirection.Input),
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", PaymentTypeId, DbType.Int32, ParameterDirection.Input),
                };
                pay_SupplierPaymentLst = dbExecutor.FetchData<pay_SupplierPayment>(CommandType.StoredProcedure,
                    "xRpt_pay_SupplierPayment_Status", colparameters);
                return pay_SupplierPaymentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierPaymentAdjustmentDetail> SupplierAdjustmentDetailGetById(long SPAId)
        {
            try
            {
                var pay_SupplierPaymentAdjustmentDetailLst = new List<pay_SupplierPaymentAdjustmentDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SPAId", SPAId, DbType.Int64, ParameterDirection.Input)
                };
                pay_SupplierPaymentAdjustmentDetailLst =
                    dbExecutor.FetchData<pay_SupplierPaymentAdjustmentDetail>(CommandType.StoredProcedure,
                        "pay_SupplierAdjustmentDetailGetById", colparameters);
                return pay_SupplierPaymentAdjustmentDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<pay_SupplierPayment> SupplierIdsAndPaymentIds(string spIds, DateTime? FromDate = null, DateTime? ToDate = null)
        {
            try
            {
                var proc_SupplierPaymentLst = new List<pay_SupplierPayment>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@SupplierIds", spIds, DbType.String, ParameterDirection.Input),
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                };
                proc_SupplierPaymentLst = dbExecutor.FetchData<pay_SupplierPayment>(CommandType.StoredProcedure,
                    "xRpt_pay_SupplierPayment_Status", colparameters);
                return proc_SupplierPaymentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_SupplierPayment> GetSupplierWiseOpeningBalance()
        {
            try
            {
                var proc_SupplierPaymentLst = new List<pay_SupplierPayment>();
                //var colparameters = new Parameters[2]
                //{
                //    new Parameters("@SupplierIds", spId, DbType.String, ParameterDirection.Input),
                //    new Parameters("@PaymentTypeIds", paymentId, DbType.String, ParameterDirection.Input)
                //};
                proc_SupplierPaymentLst = dbExecutor.FetchData<pay_SupplierPayment>(CommandType.StoredProcedure,
                    "ad_Supplier_SupplierWiseOpeningBalance", null);
                return proc_SupplierPaymentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<pay_SupplierPaymentAdjustment> SupplierPaymentAdjustmentGetBySupplierId(long SupplierId)
        {
            try
            {
                var pay_SupplierPaymentAdjustmenttLst = new List<pay_SupplierPaymentAdjustment>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int64, ParameterDirection.Input)
                    //new Parameters("@isLocal", isLocal, DbType.Boolean, ParameterDirection.Input),
                };
                pay_SupplierPaymentAdjustmenttLst =
                    dbExecutor.FetchData<pay_SupplierPaymentAdjustment>(CommandType.StoredProcedure,
                        "pay_SupplierAdjustmentBySupplierId", colparameters);
                return pay_SupplierPaymentAdjustmenttLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierPaymentAdjustment> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var pay_SupplierPaymentAdjustment = new List<pay_SupplierPaymentAdjustment>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pay_SupplierPaymentAdjustment = dbExecutor.FetchDataRef<pay_SupplierPaymentAdjustment>(
                    CommandType.StoredProcedure, "pay_SupplierPaymentAdjustment_GetPaged", colparameters, ref rows);
                return pay_SupplierPaymentAdjustment;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierLedger> SupplierLedger_Get(long supplierId, string fromDate, string toDate)
        {
            try
            {
                var pay_SupplierLedger = new List<pay_SupplierLedger>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@supplierId", supplierId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@fromDate", fromDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@toDate", toDate, DbType.String, ParameterDirection.Input)
                };
                pay_SupplierLedger = dbExecutor.FetchData<pay_SupplierLedger>(CommandType.StoredProcedure,
                    "pay_SupplierLedger", colparameters);
                return pay_SupplierLedger;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(pay_SupplierPaymentAdjustment _proc_SupplierPaymentAdjustment)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@SPAId", _proc_SupplierPaymentAdjustment.SPAId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SPADate ", _proc_SupplierPaymentAdjustment.SPADate, DbType.DateTime,
                        ParameterDirection.Input),
                     new Parameters("@SPANo", _proc_SupplierPaymentAdjustment.SPANo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SupplierId", _proc_SupplierPaymentAdjustment.SupplierId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _proc_SupplierPaymentAdjustment.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@JVNo", _proc_SupplierPaymentAdjustment.JVNo, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _proc_SupplierPaymentAdjustment.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _proc_SupplierPaymentAdjustment.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "pay_SupplierPaymentAdjustment_Post", colparameters, true);
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


        public long PostDetail(pay_SupplierPaymentAdjustmentDetail _pay_SupplierPaymentAdjustmentDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@SPADetailId", _pay_SupplierPaymentAdjustmentDetail.SPADetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SPAId", _pay_SupplierPaymentAdjustmentDetail.SPAId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsLocalPurchase", _pay_SupplierPaymentAdjustmentDetail.IsLocalPurchase,
                        DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@PBId", _pay_SupplierPaymentAdjustmentDetail.PBId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AdjustedAmount", _pay_SupplierPaymentAdjustmentDetail.AdjustedAmount,
                        DbType.Decimal, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "pay_SupplierPaymentAdjustmentDetail_Post", colparameters, true);
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


        public int SupplierPaymentAdjustmentDetailDeleteBySPAId(long SPAId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SPAId", SPAId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "pay_SupplierPaymentAdjustmentDetail_Delete", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //SupplierPayment Part start

        public List<xrpt_SupplierPayment> SupplierPaymentReport(long SupplierPaymentId, bool IsOpeningPayment)
        {
            try
            {
                List<xrpt_SupplierPayment> xrpt_SupplierPaymentList = new List<xrpt_SupplierPayment>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@SupplierPaymentId", SupplierPaymentId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsOpeningPayment", IsOpeningPayment, DbType.Boolean, ParameterDirection.Input)
                    //new Parameters("@isLocal", isLocal, DbType.Boolean, ParameterDirection.Input),
                };
                xrpt_SupplierPaymentList = dbExecutor.FetchData<xrpt_SupplierPayment>(CommandType.StoredProcedure,
                    "pay_SupplierPayment_GetBySupplierPaymentId", colparameters);
                return xrpt_SupplierPaymentList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<pay_SupplierPayment> SupplierPaymentGetBySupplierId(int SupplierId)
        {
            try
            {
                var pay_SupplierPaymentLst = new List<pay_SupplierPayment>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input)
                    //new Parameters("@isLocal", isLocal, DbType.Boolean, ParameterDirection.Input),
                };
                pay_SupplierPaymentLst = dbExecutor.FetchData<pay_SupplierPayment>(CommandType.StoredProcedure,
                    "pay_SupplierPayment_GetBySupplierId", colparameters);
                return pay_SupplierPaymentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public long AddDetail(pay_SupplierPaymentDetail _pay_SupplierPaymentDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@SupplierPaymentId", _pay_SupplierPaymentDetail.SupplierPaymentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsLocalPurchase ", _pay_SupplierPaymentDetail.IsLocalPurchase, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsVDS", _pay_SupplierPaymentDetail.IsVDS, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@PBId", _pay_SupplierPaymentDetail.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PaidAmount", _pay_SupplierPaymentDetail.PaidAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@VAT", _pay_SupplierPaymentDetail.VAT, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@AIT", _pay_SupplierPaymentDetail.AIT, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PayableAmount", _pay_SupplierPaymentDetail.PayableAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ActualAmount", _pay_SupplierPaymentDetail.ActualAmount, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_SupplierPaymentDetail_Create",
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

        public long OpeningBalancePaymentPost(pay_SupplierOpeningBalancePayment _proc_SupplierOpeningBalancePayment)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[17]
                {
                    new Parameters("@SupplierOpeningBalancePaymentId",
                        _proc_SupplierOpeningBalancePayment.SupplierOpeningBalancePaymentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SupplierId", _proc_SupplierOpeningBalancePayment.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _proc_SupplierOpeningBalancePayment.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentDate ", _proc_SupplierOpeningBalancePayment.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@PaymentVoucherNo ", _proc_SupplierOpeningBalancePayment.PaymentVoucherNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SupplierOpeningPaymentNo ", _proc_SupplierOpeningBalancePayment.SupplierOpeningPaymentNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _proc_SupplierOpeningBalancePayment.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeTypeId", _proc_SupplierOpeningBalancePayment.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", _proc_SupplierOpeningBalancePayment.ChequeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeDate", _proc_SupplierOpeningBalancePayment.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@SupplierBankAccountId", _proc_SupplierOpeningBalancePayment.SupplierBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PayerBankAccountId", _proc_SupplierOpeningBalancePayment.PayerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaidAmount", _proc_SupplierOpeningBalancePayment.PaidAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalVAT", _proc_SupplierOpeningBalancePayment.TotalVAT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalAIT", _proc_SupplierOpeningBalancePayment.TotalAIT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _proc_SupplierOpeningBalancePayment.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _proc_SupplierOpeningBalancePayment.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "pay_SupplierOpeningBalancePayment_Post", colparameters, true);
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

        public long Add(pay_SupplierPayment _proc_SupplierPayment)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[24]
                {
                    new Parameters("@SupplierId", _proc_SupplierPayment.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _proc_SupplierPayment.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentDate ", _proc_SupplierPayment.PaymentDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@SupplierPaymentNo", _proc_SupplierPayment.SupplierPaymentNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Remarks", _proc_SupplierPayment.Remarks, DbType.String, ParameterDirection.Input),
                    //new Parameters("@IsCheque", _proc_SupplierPayment.IsCheque, DbType.Boolean,
                    //    ParameterDirection.Input),
                    new Parameters("@ChequeTypeId", _proc_SupplierPayment.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", _proc_SupplierPayment.ChequeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeDate", _proc_SupplierPayment.ChequeDate, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SupplierBankAccountId", _proc_SupplierPayment.SupplierBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PayerBankAccountId", _proc_SupplierPayment.PayerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@EmployeeId", _proc_SupplierPayment.EmployeeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentVoucherNo", _proc_SupplierPayment.PaymentVoucherNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@PaidAmount", _proc_SupplierPayment.PaidAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalVAT", _proc_SupplierPayment.TotalVAT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalAIT", _proc_SupplierPayment.TotalAIT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _proc_SupplierPayment.UpdatedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _proc_SupplierPayment.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input),

                    new Parameters("@MobileBankingServiceId", _proc_SupplierPayment.MobileBankingServiceId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@TransactionNo", _proc_SupplierPayment.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MobileNo", _proc_SupplierPayment.MobileNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MoneyReceiptNo", _proc_SupplierPayment.MoneyReceiptNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FromBranch", _proc_SupplierPayment.FromBranch, DbType.String,
                        ParameterDirection.Input),

                      new Parameters("@CurrencyId", _proc_SupplierPayment.CurrencyId, DbType.Int32,
                        ParameterDirection.Input),

                        new Parameters("@ConversionRate", _proc_SupplierPayment.ConversionRate, DbType.Decimal,
                        ParameterDirection.Input),




                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_SupplierPayment_Create",
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

        public List<pay_SupplierPayment> pay_SupplierPayment_GetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var pay_SupplierPayment = new List<pay_SupplierPayment>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pay_SupplierPayment = dbExecutor.FetchDataRef<pay_SupplierPayment>(CommandType.StoredProcedure,
                    "pay_SupplierPayment_GetPaged", colparameters, ref rows);
                return pay_SupplierPayment;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}