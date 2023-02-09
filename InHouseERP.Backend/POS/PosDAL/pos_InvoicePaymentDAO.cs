using DbExecutor;
using SecurityEntity.POS.PosEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.POS.PosDAL
{
   public class pos_InvoicePaymentDAO
    {
        private static volatile pos_InvoicePaymentDAO instance;
        private static readonly object lockObj = new object();
       
        public static pos_InvoicePaymentDAO GetInstance()
        {
            if (instance == null)
            {
                instance = new pos_InvoicePaymentDAO();
            }
            return instance;
        }
        public static pos_InvoicePaymentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                {
                    lock (lockObj)
                    {
                        if (instance == null)
                        {
                            instance = new pos_InvoicePaymentDAO();
                        }
                    }
                }
                return instance;
            }
        }

        DBExecutor dbExecutor;
        public pos_InvoicePaymentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public string Post(pos_InvoicePayment _pos_InvoicePayment)
        {
            string ret = "";
            try
            {
                Common aCommon = new Common();

                Parameters[] colparameters = new Parameters[24]{
                new Parameters("@InvoicePaymentId", _pos_InvoicePayment.InvoicePaymentId, DbType.Int64, ParameterDirection.Input),
                new Parameters("@CompanyId", _pos_InvoicePayment.CompanyId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@PaymentDate", _pos_InvoicePayment.PaymentDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@Remarks", _pos_InvoicePayment.Remarks, DbType.String, ParameterDirection.Input),
                new Parameters("@ChequeTypeId", _pos_InvoicePayment.ChequeTypeId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@ChequeNo", _pos_InvoicePayment.ChequeNo, DbType.String, ParameterDirection.Input),
                new Parameters("@ChequeDate", _pos_InvoicePayment.ChequeDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@ReceiverBankAccountId", _pos_InvoicePayment.ReceiverBankAccountId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@CustomerBankAccountId", _pos_InvoicePayment.CustomerBankAccountId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@ReceiptVoucherNo", _pos_InvoicePayment.ReceiptVoucherNo, DbType.String, ParameterDirection.Input),
                new Parameters("@MoneyReceiptNo", _pos_InvoicePayment.MoneyReceiptNo, DbType.String, ParameterDirection.Input),
                new Parameters("@CurrencyId", _pos_InvoicePayment.CurrencyId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@ConversionRate ", _pos_InvoicePayment.ConversionRate, DbType.Decimal, ParameterDirection.Input),
                new Parameters("@PaidAmount", _pos_InvoicePayment.PaidAmount, DbType.Decimal, ParameterDirection.Input),
                new Parameters("@ConversionAmount", _pos_InvoicePayment.ConversionAmount, DbType.Decimal, ParameterDirection.Input),
                new Parameters("@TotalVAT", _pos_InvoicePayment.TotalVAT, DbType.Decimal, ParameterDirection.Input),
                new Parameters("@TotalAIT", _pos_InvoicePayment.TotalAIT, DbType.Decimal, ParameterDirection.Input),
                new Parameters("@UpdatorId", _pos_InvoicePayment.UpdatorId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@UpdatedDate", _pos_InvoicePayment.UpdatedDate, DbType.DateTime, ParameterDirection.Input),
                new Parameters("@PaymentTypeId", _pos_InvoicePayment.PaymentTypeId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@MobileBankingServiceId", _pos_InvoicePayment.MobileBankingServiceId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@MobileNo", _pos_InvoicePayment.MobileNo, DbType.String, ParameterDirection.Input),
                new Parameters("@TransactionNo", _pos_InvoicePayment.TransactionNo, DbType.String, ParameterDirection.Input),
                new Parameters("@SalesInvoiceId", _pos_InvoicePayment.SalesInvoiceId, DbType.Int64, ParameterDirection.Input),
              
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "pos_InvoicePayment_Post", colparameters, true);
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
