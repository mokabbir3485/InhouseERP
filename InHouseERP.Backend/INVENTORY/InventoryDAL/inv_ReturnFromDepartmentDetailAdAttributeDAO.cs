using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_ReturnFromDepartmentDetailAdAttributeDAO //: IDisposible
    {
        private static volatile inv_ReturnFromDepartmentDetailAdAttributeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_ReturnFromDepartmentDetailAdAttributeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_ReturnFromDepartmentDetailAdAttributeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_ReturnFromDepartmentDetailAdAttributeDAO();
                    }

                return instance;
            }
        }

        public static inv_ReturnFromDepartmentDetailAdAttributeDAO GetInstance()
        {
            if (instance == null) instance = new inv_ReturnFromDepartmentDetailAdAttributeDAO();
            return instance;
        }

        public List<inv_ReturnFromDepartmentDetailAdAttribute> GetByReturnDetailId(long returnDetailId)
        {
            try
            {
                var inv_ReturnFromDepartmentDetailAdAttributeLst =
                    new List<inv_ReturnFromDepartmentDetailAdAttribute>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReturnDetailId", returnDetailId, DbType.Int64, ParameterDirection.Input)
                };
                inv_ReturnFromDepartmentDetailAdAttributeLst =
                    dbExecutor.FetchData<inv_ReturnFromDepartmentDetailAdAttribute>(CommandType.StoredProcedure,
                        "inv_ReturnFromDepartmentDetailAdAttribute_GetByReturnDetailId", colparameters);
                return inv_ReturnFromDepartmentDetailAdAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnFromDepartmentDetailAdAttribute _inv_ReturnFromDepartmentDetailAdAttribute)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ReturnDetailId", _inv_ReturnFromDepartmentDetailAdAttribute.ReturnDetailId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@AttributeQty", _inv_ReturnFromDepartmentDetailAdAttribute.AttributeQty,
                        DbType.Decimal, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_ReturnFromDepartmentDetailAdAttribute_Create", colparameters, true);
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