using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_SupplierBillPolicyDAO
    {
        private readonly DBExecutor dbExecutor;

        public ad_SupplierBillPolicyDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public List<ad_SupplierBillPolicy> GetBySupplierId(int SupplierId)
        {
            try
            {
                var lst = new List<ad_SupplierBillPolicy>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input)
                };
                lst = dbExecutor.FetchData<ad_SupplierBillPolicy>(CommandType.StoredProcedure,
                    "ad_SupplierBillPolicy_GetBySupplierId", colparameters);
                return lst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_SupplierBillPolicy ad_SupplierBillPolicy)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@SupplierId", ad_SupplierBillPolicy.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PolicyDescription", ad_SupplierBillPolicy.PolicyDescription, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_SupplierBillPolicy_Create",
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
    }
}