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
   public class rcv_CompanyPaymentAdjustmentDAO
    {
        private static volatile rcv_CompanyPaymentAdjustmentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public rcv_CompanyPaymentAdjustmentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static rcv_CompanyPaymentAdjustmentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new rcv_CompanyPaymentAdjustmentDAO();
                    }

                return instance;
            }
        }

        public static rcv_CompanyPaymentAdjustmentDAO GetInstance()
        {
            if (instance == null) instance = new rcv_CompanyPaymentAdjustmentDAO();
            return instance;
        }

        public long Post(rcv_CompanyPaymentAdjustment _rcv_CompanyPaymentAdjustment)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@CPAId ", _rcv_CompanyPaymentAdjustment.CPAId, DbType.Int64,
                        ParameterDirection.Input),
                     new Parameters("@CPANo ", _rcv_CompanyPaymentAdjustment.CPANo,DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CPADate", _rcv_CompanyPaymentAdjustment.CPADate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@CompanyId", _rcv_CompanyPaymentAdjustment.CompanyId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _rcv_CompanyPaymentAdjustment.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _rcv_CompanyPaymentAdjustment.UpdatorId, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatedDate ", _rcv_CompanyPaymentAdjustment.UpdatedDate , DbType.DateTime,
                        ParameterDirection.Input),

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "rcv_CompanyPaymentAdjustment_post",
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
        public List<rcv_CompanyPaymentAdjustment> CompanyPaymentAdjustmentGetPaged(int startRecordNo, int rowPerPage,
         string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var rcv_CompanyPaymentAdjustmentList = new List<rcv_CompanyPaymentAdjustment>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyPaymentAdjustmentList = dbExecutor.FetchDataRef<rcv_CompanyPaymentAdjustment>(CommandType.StoredProcedure,
                    "rcv_CompanyPaymentAdjustment_GetPaged", colparameters, ref rows);
                return rcv_CompanyPaymentAdjustmentList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public List<rcv_CompanyLedger> CompanyLedger_Get(int CompanyId, string fromDate, string toDate)
        {
            try
            {
                var rcv_CompanyLedger = new List<rcv_CompanyLedger>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@CompanyId", CompanyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@fromDate", fromDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@toDate", toDate, DbType.String, ParameterDirection.Input)
                };
                rcv_CompanyLedger = dbExecutor.FetchData<rcv_CompanyLedger>(CommandType.StoredProcedure,
                    "rcv_CompanyLedger", colparameters);
                return rcv_CompanyLedger;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
