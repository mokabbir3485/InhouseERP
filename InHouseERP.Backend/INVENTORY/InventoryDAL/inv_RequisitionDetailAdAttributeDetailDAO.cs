using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_RequisitionDetailAdAttributeDetailDAO //: IDisposible
    {
        private static volatile inv_RequisitionDetailAdAttributeDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_RequisitionDetailAdAttributeDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_RequisitionDetailAdAttributeDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_RequisitionDetailAdAttributeDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_RequisitionDetailAdAttributeDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_RequisitionDetailAdAttributeDetailDAO();
            return instance;
        }

        public List<inv_RequisitionDetailAdAttributeDetail> GetByRequisitionDetailAdAttId(long requisitionDetailAdAttId)
        {
            try
            {
                var inv_RequisitionDetailAdAttributeDetailLst = new List<inv_RequisitionDetailAdAttributeDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RequisitionDetailAdAttId", requisitionDetailAdAttId, DbType.Int64,
                        ParameterDirection.Input)
                };
                inv_RequisitionDetailAdAttributeDetailLst =
                    dbExecutor.FetchData<inv_RequisitionDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_RequisitionDetailAdAttributeDetail_GetByRequisitionDetailAdAttId", colparameters);
                return inv_RequisitionDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_RequisitionDetailAdAttributeDetail _inv_RequisitionDetailAdAttributeDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@RequisitionDetailAdAttId",
                        _inv_RequisitionDetailAdAttributeDetail.RequisitionDetailAdAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _inv_RequisitionDetailAdAttributeDetail.ItemAddAttId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AttributeValue", _inv_RequisitionDetailAdAttributeDetail.AttributeValue,
                        DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_RequisitionDetailAdAttributeDetail_Create", colparameters, true);
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