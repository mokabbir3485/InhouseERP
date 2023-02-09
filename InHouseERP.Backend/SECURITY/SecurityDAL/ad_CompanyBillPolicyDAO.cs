using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_CompanyBillPolicyDAO //: IDisposible
    {
        private static volatile ad_CompanyBillPolicyDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_CompanyBillPolicyDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_CompanyBillPolicyDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_CompanyBillPolicyDAO();
                    }

                return instance;
            }
        }

        public static ad_CompanyBillPolicyDAO GetInstance()
        {
            if (instance == null) instance = new ad_CompanyBillPolicyDAO();
            return instance;
        }

        public List<ad_CompanyBillPolicy> GetByCompanyId(int companyId)
        {
            try
            {
                var ad_CompanyBillPolicyLst = new List<ad_CompanyBillPolicy>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                };
                ad_CompanyBillPolicyLst = dbExecutor.FetchData<ad_CompanyBillPolicy>(CommandType.StoredProcedure,
                    "ad_CompanyBillPolicy_GetByCompanyId", colparameters);
                return ad_CompanyBillPolicyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_CompanyBillPolicy _ad_CompanyBillPolicy)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@CompanyId", _ad_CompanyBillPolicy.CompanyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PolicyDescription", _ad_CompanyBillPolicy.PolicyDescription, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_CompanyBillPolicy_Create",
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