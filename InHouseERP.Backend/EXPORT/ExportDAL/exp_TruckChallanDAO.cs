using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_TruckChallanDAO //: IDisposible
    {
        private static volatile exp_TruckChallanDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_TruckChallanDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_TruckChallanDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_TruckChallanDAO();
                    }

                return instance;
            }
        }

        public static exp_TruckChallanDAO GetInstance()
        {
            if (instance == null) instance = new exp_TruckChallanDAO();
            return instance;
        }

        public List<exp_TruckChallan> Get(long? CommercialInvoiceId)
        {
            try
            {
                var exp_TruckChallanList = new List<exp_TruckChallan>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", CommercialInvoiceId, DbType.Int64, ParameterDirection.Input)
                };
                exp_TruckChallanList = dbExecutor.FetchData<exp_TruckChallan>(CommandType.StoredProcedure,
                    "exp_TruckChallan_Get", colparameters);
                return exp_TruckChallanList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Post(exp_TruckChallan _exp_TruckChallan)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@TruckChallanId", _exp_TruckChallan.TruckChallanId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceId", _exp_TruckChallan.CommercialInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@TruckNo", _exp_TruckChallan.TruckNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Footers", _exp_TruckChallan.Footers, DbType.String, ParameterDirection.Input),
                    new Parameters("@Sort", _exp_TruckChallan.Sort, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_TruckChallan.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_TruckChallan.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "exp_TruckChallan_Post",
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

        public int DeleteTruckChallanByCommercialInvoiceId(long commercialInvoiceId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", commercialInvoiceId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_TruckChallan_Delete", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_TruckChallan> TruckChallanGetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_TruckChallanLst = new List<exp_TruckChallan>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_TruckChallanLst = dbExecutor.FetchDataRef<exp_TruckChallan>(CommandType.StoredProcedure,
                    "exp_TruckChallan_GetPaged", colparameters, ref rows);
                return exp_TruckChallanLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}