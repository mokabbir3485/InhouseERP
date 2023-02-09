using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_ReturnFromDepartmentDetailAdAttributeDetailDAO //: IDisposible
    {
        private static volatile inv_ReturnFromDepartmentDetailAdAttributeDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_ReturnFromDepartmentDetailAdAttributeDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_ReturnFromDepartmentDetailAdAttributeDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_ReturnFromDepartmentDetailAdAttributeDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_ReturnFromDepartmentDetailAdAttributeDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_ReturnFromDepartmentDetailAdAttributeDetailDAO();
            return instance;
        }

        public List<inv_ReturnFromDepartmentDetailAdAttributeDetail> GetByReturnDetailAdAttId(long returnDetailAdAttId)
        {
            try
            {
                var inv_ReturnFromDepartmentDetailAdAttributeDetailLst =
                    new List<inv_ReturnFromDepartmentDetailAdAttributeDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReturnDetailAdAttId", returnDetailAdAttId, DbType.Int64, ParameterDirection.Input)
                };
                inv_ReturnFromDepartmentDetailAdAttributeDetailLst =
                    dbExecutor.FetchData<inv_ReturnFromDepartmentDetailAdAttributeDetail>(CommandType.StoredProcedure,
                        "inv_ReturnFromDepartmentDetailAdAttributeDetail_GetByReturnDetailAdAttId", colparameters);
                return inv_ReturnFromDepartmentDetailAdAttributeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(
            inv_ReturnFromDepartmentDetailAdAttributeDetail _inv_ReturnFromDepartmentDetailAdAttributeDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ReturnDetailAdAttId",
                        _inv_ReturnFromDepartmentDetailAdAttributeDetail.ReturnDetailAdAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _inv_ReturnFromDepartmentDetailAdAttributeDetail.ItemAddAttId,
                        DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttributeValue", _inv_ReturnFromDepartmentDetailAdAttributeDetail.AttributeValue,
                        DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_ReturnFromDepartmentDetailAdAttributeDetail_Create", colparameters, true);
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