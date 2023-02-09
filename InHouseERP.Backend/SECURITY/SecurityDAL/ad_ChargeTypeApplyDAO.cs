using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ChargeTypeApplyDAO //: IDisposible
    {
        private static volatile ad_ChargeTypeApplyDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ChargeTypeApplyDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ChargeTypeApplyDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ChargeTypeApplyDAO();
                    }

                return instance;
            }
        }

        public static ad_ChargeTypeApplyDAO GetInstance()
        {
            if (instance == null) instance = new ad_ChargeTypeApplyDAO();
            return instance;
        }

        public List<ad_ChargeTypeApply> GetByChargeTypeId(int ChargeTypeId)
        {
            try
            {
                var ad_ItemChargeApplyLst = new List<ad_ChargeTypeApply>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ChargeTypeId", ChargeTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemChargeApplyLst = dbExecutor.FetchData<ad_ChargeTypeApply>(CommandType.StoredProcedure,
                    "ad_ChargeTypeApply_GetByChargeTypeId", colparameters);
                return ad_ItemChargeApplyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(ad_ChargeTypeApply ad_ItemChargeApply)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ChargeTypeId", ad_ItemChargeApply.ChargeTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ApplyOnId", ad_ItemChargeApply.ApplyOnId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@OrderId", ad_ItemChargeApply.OrderId, DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ChargeTypeApply_Create",
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