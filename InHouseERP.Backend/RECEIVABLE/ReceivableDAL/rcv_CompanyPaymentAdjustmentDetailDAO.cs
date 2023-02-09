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
   public class rcv_CompanyPaymentAdjustmentDetailDAO
    {
        private static volatile rcv_CompanyPaymentAdjustmentDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_CompanyPaymentAdjustmentDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_CompanyPaymentAdjustmentDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_CompanyPaymentAdjustmentDetailDAO();
                    }

                return instance;
            }
        }

        public static rcv_CompanyPaymentAdjustmentDetailDAO GetInstance()
        {
            if (instance == null) instance = new rcv_CompanyPaymentAdjustmentDetailDAO();
            return instance;
        }

        

         public Int64 GetCompanyPaymentAdjustmentMaxNo()
        {
            try
            {
                Int64 MaxCompanyPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxCompanyPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_GetMaxCompanyPaymentAdjustmentNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxCompanyPaymentNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public Int64 GetCompanyPaymentRefundMaxNo()
        {
            try
            {
                Int64 MaxCompanyPaymentNo = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxCompanyPaymentNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_GetMaxCompanyPaymentRefundNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxCompanyPaymentNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }



        public List<rcv_CompanyPaymentAdjustmentDetail> rcv_CompanyPaymentAdjustmentByCompanyId(Int32 CompanyId)
        {
            try
            {
                var rcv_CompanyPaymentAdjustmentDetailList = new List<rcv_CompanyPaymentAdjustmentDetail>();
                var colparameters = new Parameters[1]
                {

                    new Parameters("@CompanyId", CompanyId, DbType.Int32, ParameterDirection.Input),
                };
                rcv_CompanyPaymentAdjustmentDetailList = dbExecutor.FetchData<rcv_CompanyPaymentAdjustmentDetail>(CommandType.StoredProcedure,
                    "rcv_CompanyPaymentAdjustmentByCompanyId", colparameters);
                return rcv_CompanyPaymentAdjustmentDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

      


        public long AddDetail(rcv_CompanyPaymentAdjustmentDetail _rcv_CompanyPaymentAdjustmentDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
              
                    new Parameters("@CPAId ", _rcv_CompanyPaymentAdjustmentDetail.CPAId, DbType.Int64,
                        ParameterDirection.Input),
                 
                    new Parameters("@IsLocalSale", _rcv_CompanyPaymentAdjustmentDetail.IsLocalSale, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceId", _rcv_CompanyPaymentAdjustmentDetail.InvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AdjustedAmount", _rcv_CompanyPaymentAdjustmentDetail.AdjustedAmount, DbType.Decimal, ParameterDirection.Input),
                  
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_CompanyPaymentAdjustmentDetail_Create",
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

        public long CompanyPaymentAdjustmentDetailUpdate(rcv_CompanyPaymentAdjustmentDetail _rcv_CompanyPaymentAdjustmentDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                       new Parameters("@CPADetailId",_rcv_CompanyPaymentAdjustmentDetail.CPADetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CPAId ", _rcv_CompanyPaymentAdjustmentDetail.CPAId,DbType.Int64,
                        ParameterDirection.Input),

                 
                    new Parameters("@IsLocalSale", _rcv_CompanyPaymentAdjustmentDetail.IsLocalSale, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceId", _rcv_CompanyPaymentAdjustmentDetail.InvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AdjustedAmount", _rcv_CompanyPaymentAdjustmentDetail.AdjustedAmount, DbType.Decimal, ParameterDirection.Input),

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_CompanyPaymentAdjustmentDetail_Update",
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

        
        public List<xrpt_CompanyPaymentAdjustment> rcv_CompanyPaymentAdjustmentByReport(Int64 CPAId)
        {
            try
            {
                var xrpt_CompanyPaymentAdjustmentList = new List<xrpt_CompanyPaymentAdjustment>();
                var colparameters = new Parameters[1]
                {

                    new Parameters("@CPAId", CPAId, DbType.Int64, ParameterDirection.Input),
                };
                xrpt_CompanyPaymentAdjustmentList = dbExecutor.FetchData<xrpt_CompanyPaymentAdjustment>(CommandType.StoredProcedure,
                    "rcv_CompanyPaymentAdjustment_GetByCPAId", colparameters);

                return xrpt_CompanyPaymentAdjustmentList;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        //public List<rcv_CompanyPaymentAdjustmentDetail> CompanyPaymentAdjustmentGetByCPAId(Int64 CPAId)
        //{
        //    try
        //    {
        //        var rcv_CompanyPaymentList = new List<rcv_CompanyPaymentAdjustmentDetail>();
        //        var colparameters = new Parameters[1]
        //        {
        //            new Parameters("@CPAId",CPAId, DbType.Int64, ParameterDirection.Input)
        //        };
        //        rcv_CompanyPaymentList = dbExecutor.FetchData<rcv_CompanyPaymentAdjustmentDetail>(CommandType.StoredProcedure,
        //            "rcv_CompanyPaymentAdjustmentDetailGetById");
        //        return rcv_CompanyPaymentList;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public List<rcv_CompanyPaymentAdjustmentDetail> CompanyPaymentAdjustmentGetByCPAId(Int64 CPAId)
        {
            try
            {
                var rcv_CompanyPaymentAdjustmentDetailList = new List<rcv_CompanyPaymentAdjustmentDetail>();
                var colparameters = new Parameters[1]
                {

                    new Parameters("@CPAId",CPAId, DbType.Int64, ParameterDirection.Input),
                };
                rcv_CompanyPaymentAdjustmentDetailList = dbExecutor.FetchData<rcv_CompanyPaymentAdjustmentDetail>(CommandType.StoredProcedure,
                    "rcv_CompanyPaymentAdjustmentDetailGetById", colparameters);

                return rcv_CompanyPaymentAdjustmentDetailList;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
