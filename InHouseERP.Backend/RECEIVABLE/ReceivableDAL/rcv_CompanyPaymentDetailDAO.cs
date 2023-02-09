using DbExecutor;
using SecurityEntity.RECEIVABLE.ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableDAL
{
   public class rcv_CompanyPaymentDetailDAO
    {
        private static volatile rcv_CompanyPaymentDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_CompanyPaymentDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_CompanyPaymentDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_CompanyPaymentDetailDAO();
                    }

                return instance;
            }
        }

        public static rcv_CompanyPaymentDetailDAO GetInstance()
        {
            if (instance == null) instance = new rcv_CompanyPaymentDetailDAO();
            return instance;
        }

        public long Add(rcv_CompanyPaymentDetail _rcv_CompanyPaymentDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@CompanyPaymentId", _rcv_CompanyPaymentDetail.CompanyPaymentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsLocalSale", _rcv_CompanyPaymentDetail.IsLocalSale, DbType.Boolean, ParameterDirection.Input),
                   
                    new Parameters("@InvoiceId", _rcv_CompanyPaymentDetail.InvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ActualAmount", _rcv_CompanyPaymentDetail.ActualAmount, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@ReceivableAmount", _rcv_CompanyPaymentDetail.ReceivableAmount, DbType.Decimal,
                        ParameterDirection.Input),

                    new Parameters("@PaidAmount", _rcv_CompanyPaymentDetail.PaidAmount, DbType.Decimal,
                        ParameterDirection.Input),

                    new Parameters("@VAT", _rcv_CompanyPaymentDetail.VAT, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@AIT", _rcv_CompanyPaymentDetail.AIT, DbType.Decimal,
                        ParameterDirection.Input),
                     new Parameters("@AdditionalCost", _rcv_CompanyPaymentDetail.AdditionalCost, DbType.Decimal,
                        ParameterDirection.Input),
                     new Parameters("@IsVDS", _rcv_CompanyPaymentDetail.IsVDS, DbType.Boolean,
                        ParameterDirection.Input),

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_CompanyPaymentDetail_Create",
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
        public List<rcv_CompanyPaymentDetail> GetCompanyPaymentDetailByCompanyPaymentId(long CompanyPaymentId)
        {
            try
            {
                var CompanyPaymentDetailLst = new List<rcv_CompanyPaymentDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyPaymentId", CompanyPaymentId, DbType.Int64, ParameterDirection.Input)
                };
                CompanyPaymentDetailLst =
                    dbExecutor.FetchData<rcv_CompanyPaymentDetail>(CommandType.StoredProcedure,
                        "rcv_CompanyPaymentDetail_GetByCompanyPaymentId", colparameters);
                return CompanyPaymentDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       


        public List<xrpt_rcv_CompanyPayment> xrpt_rcv_CompanyPayment_GetByCompanyPaymentId( Int64 CompanyPaymentId,  bool IsOpeningPayment)
        {
            try
            {
                var xrpt_rcv_CompanyPaymentList = new List<xrpt_rcv_CompanyPayment>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@CompanyPaymentId", CompanyPaymentId, DbType.Int64, ParameterDirection.Input),
                    //new Parameters("@SalesInvoiceId", SalesInvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsOpeningPayment", IsOpeningPayment, DbType.Boolean, ParameterDirection.Input)
                  
                };
                xrpt_rcv_CompanyPaymentList = dbExecutor.FetchData<xrpt_rcv_CompanyPayment>(CommandType.StoredProcedure,
                    "xrpt_rcv_CompanyPayment_GetByCompanyPaymentId", colparameters);
                return xrpt_rcv_CompanyPaymentList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
