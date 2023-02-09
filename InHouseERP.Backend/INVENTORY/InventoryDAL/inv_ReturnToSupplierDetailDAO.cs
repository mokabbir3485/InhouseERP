using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_ReturnToSupplierDetailDAO //: IDisposible
    {
        private static volatile inv_ReturnToSupplierDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_ReturnToSupplierDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_ReturnToSupplierDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_ReturnToSupplierDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_ReturnToSupplierDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_ReturnToSupplierDetailDAO();
            return instance;
        }

        public List<inv_ReturnToSupplierDetail> GetByReturnId(long returnId)
        {
            try
            {
                var inv_ReturnToSupplierDetailLst = new List<inv_ReturnToSupplierDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReturnId", returnId, DbType.Int64, ParameterDirection.Input)
                };
                inv_ReturnToSupplierDetailLst = dbExecutor.FetchData<inv_ReturnToSupplierDetail>(
                    CommandType.StoredProcedure, "inv_ReturnToSupplierDetail_GetByReturnId", colparameters);
                return inv_ReturnToSupplierDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnToSupplierDetail _inv_ReturnToSupplierDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@ReturnId", _inv_ReturnToSupplierDetail.ReturnId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_ReturnToSupplierDetail.ItemId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReturnUnitId", _inv_ReturnToSupplierDetail.ReturnUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReturnQuantity", _inv_ReturnToSupplierDetail.ReturnQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ReturnUnitPrice", _inv_ReturnToSupplierDetail.ReturnUnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@ReturnReasonId", _inv_ReturnToSupplierDetail.ReturnReasonId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_ReturnToSupplierDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnUnitName", _inv_ReturnToSupplierDetail.ReturnUnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnReasonName", _inv_ReturnToSupplierDetail.ReturnReasonName, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_ReturnToSupplierDetail_Create",
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