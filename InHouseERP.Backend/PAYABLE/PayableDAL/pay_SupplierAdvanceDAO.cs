using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using PayableEntity;

namespace PayableDAL
{
    public class pay_SupplierAdvanceDAO //: IDisposible
    {
        private static volatile pay_SupplierAdvanceDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pay_SupplierAdvanceDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pay_SupplierAdvanceDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pay_SupplierAdvanceDAO();
                    }

                return instance;
            }
        }

        public static pay_SupplierAdvanceDAO GetInstance()
        {
            if (instance == null) instance = new pay_SupplierAdvanceDAO();
            return instance;
        }

        public List<pay_SupplierAdvance> GetAll(long? advanceId = null)
        {
            try
            {
                var pay_SupplierAdvanceLst = new List<pay_SupplierAdvance>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AdvanceId", advanceId, DbType.Int32, ParameterDirection.Input)
                };
                pay_SupplierAdvanceLst = dbExecutor.FetchData<pay_SupplierAdvance>(CommandType.StoredProcedure,
                    "pay_SupplierAdvance_Get", colparameters);
                return pay_SupplierAdvanceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierAdvance> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var pay_SupplierAdvanceLst = new List<pay_SupplierAdvance>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                pay_SupplierAdvanceLst = dbExecutor.FetchData<pay_SupplierAdvance>(CommandType.StoredProcedure,
                    "pay_SupplierAdvance_GetDynamic", colparameters);
                return pay_SupplierAdvanceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierAdvance> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var pay_SupplierAdvanceLst = new List<pay_SupplierAdvance>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pay_SupplierAdvanceLst = dbExecutor.FetchDataRef<pay_SupplierAdvance>(CommandType.StoredProcedure,
                    "pay_SupplierAdvance_GetPaged", colparameters, ref rows);
                return pay_SupplierAdvanceLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(pay_SupplierAdvance _proc_SupplierAdvance)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[20]
                {
                    new Parameters("@AdvanceId", _proc_SupplierAdvance.AdvanceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SupplierId", _proc_SupplierAdvance.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AdvanceAmount", _proc_SupplierAdvance.AdvanceAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AdvanceDate", _proc_SupplierAdvance.AdvanceDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@PaymentSectorId", _proc_SupplierAdvance.PaymentSectorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SupplierBankAccountId", _proc_SupplierAdvance.SupplierBankAccountId, DbType.Int32,
                        ParameterDirection.Input), 
                    new Parameters("@PayerBankAccountId", _proc_SupplierAdvance.PayerBankAccountId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MobileBankingServiceId", _proc_SupplierAdvance.MobileBankingServiceId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TransactionNo", _proc_SupplierAdvance.TransactionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PaymentTypeId", _proc_SupplierAdvance.PaymentTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeNo", _proc_SupplierAdvance.ChequeNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ChequeTypeId", _proc_SupplierAdvance.ChequeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChequeDate", _proc_SupplierAdvance.ChequeDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _proc_SupplierAdvance.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _proc_SupplierAdvance.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MoneyReceiptNo", _proc_SupplierAdvance.MoneyReceiptNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@MobileNo", _proc_SupplierAdvance.MobileNo, DbType.String, ParameterDirection.Input),
                     new Parameters("@Remarks", _proc_SupplierAdvance.Remarks, DbType.String, ParameterDirection.Input),

                    new Parameters("@AdvancePaymentNo",_proc_SupplierAdvance.AdvancePaymentNo,DbType.String, ParameterDirection.Input),
                    new Parameters("@PaymentVoucherNo",_proc_SupplierAdvance.PaymentVoucherNo,DbType.String, ParameterDirection.Input),
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_SupplierAdvance_Post",
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


        public Int64 GetMaxSupAdvancedNo()
        {
            try
            {
                Int64 advanceNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                advanceNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "pay_GetMaxAdvancePaymentNo", null, true);
           
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return advanceNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }


        //public int Update(pay_SupplierAdvance _pay_SupplierAdvance)
        //{
        //    var ret = 0;
        //    try
        //    {
        //        var colparameters = new Parameters[10]
        //        {
        //            new Parameters("@AdvanceId", _pay_SupplierAdvance.AdvanceId, DbType.Int64,
        //                ParameterDirection.Input),
        //            new Parameters("@FinancialCycleId", _pay_SupplierAdvance.FinancialCycleId, DbType.Int32,
        //                ParameterDirection.Input),
        //            new Parameters("@SupplierId", _pay_SupplierAdvance.SupplierId, DbType.Int32,
        //                ParameterDirection.Input),
        //            new Parameters("@PaymentTypeId", _pay_SupplierAdvance.PaymentTypeId, DbType.Int32,
        //                ParameterDirection.Input),
        //            new Parameters("@AdvanceDate", _pay_SupplierAdvance.AdvanceDate, DbType.DateTime,
        //                ParameterDirection.Input),
        //            new Parameters("@Amount", _pay_SupplierAdvance.Amount, DbType.Decimal, ParameterDirection.Input),
        //            new Parameters("@VoucherNo", _pay_SupplierAdvance.VoucherNo, DbType.String,
        //                ParameterDirection.Input),
        //            new Parameters("@IsOpening", _pay_SupplierAdvance.IsOpening, DbType.Boolean,
        //                ParameterDirection.Input),
        //            new Parameters("@UpdatorId", _pay_SupplierAdvance.UpdatorId, DbType.Int32,
        //                ParameterDirection.Input),
        //            new Parameters("@UpdateDate", _pay_SupplierAdvance.UpdateDate, DbType.DateTime,
        //                ParameterDirection.Input)
        //        };
        //        ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pay_SupplierAdvance_Update",
        //            colparameters, true);
        //        return ret;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public int Delete(long advanceId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AdvanceId", advanceId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pay_SupplierAdvance_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable CheckVoucherNoExists(string voucherNo)
        {
            try
            {
                var dt = new DataTable();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@VoucherNo", voucherNo, DbType.String, ParameterDirection.Input)
                };
                dt = dbExecutor.GetDataTable(CommandType.StoredProcedure, "pay_CheckVoucherNoExists", colparameters,
                    true);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}