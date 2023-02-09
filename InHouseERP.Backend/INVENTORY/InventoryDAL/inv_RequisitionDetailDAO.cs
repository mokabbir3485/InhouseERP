using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_RequisitionDetailDAO //: IDisposible
    {
        private static volatile inv_RequisitionDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_RequisitionDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_RequisitionDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_RequisitionDetailDAO();
                    }

                return instance;
            }
        }

        public static inv_RequisitionDetailDAO GetInstance()
        {
            if (instance == null) instance = new inv_RequisitionDetailDAO();
            return instance;
        }

        public List<inv_RequisitionDetail> GetByRequisitionId(long requisitionId)
        {
            try
            {
                var inv_RequisitionDetailLst = new List<inv_RequisitionDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RequisitionId", requisitionId, DbType.Int64, ParameterDirection.Input)
                };
                inv_RequisitionDetailLst = dbExecutor.FetchData<inv_RequisitionDetail>(CommandType.StoredProcedure,
                    "inv_RequisitionDetail_GetByRequisitionId", colparameters);
                return inv_RequisitionDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_RequisitionDetail _inv_RequisitionDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@RequisitionId", _inv_RequisitionDetail.RequisitionId, DbType.Int64,
                        ParameterDirection.Input),
                      
                    new Parameters("@ItemId", _inv_RequisitionDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemUnitId", _inv_RequisitionDetail.ItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionUnitId", _inv_RequisitionDetail.RequisitionUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionQuantity", _inv_RequisitionDetail.RequisitionQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionPurposeId", _inv_RequisitionDetail.RequisitionPurposeId, DbType.Int32,
                        ParameterDirection.Input),
                  
                    new Parameters("@RequisitionUnitName", _inv_RequisitionDetail.RequisitionUnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionPurposeName", _inv_RequisitionDetail.RequisitionPurposeName,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@RollLenghtInMeter  ", _inv_RequisitionDetail.RollLenghtInMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollAreaInSqMeter  ", _inv_RequisitionDetail.RollAreaInSqMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PackageWeight  ", _inv_RequisitionDetail.PackageWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@InternalWorkOrderDetailId  ", _inv_RequisitionDetail.InternalWorkOrderDetailId,
                        DbType.Int64, ParameterDirection.Input),
                     new Parameters("@MaterialTypeId", _inv_RequisitionDetail.MaterialTypeId,
                        DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_RequisitionDetail_Create",
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

        public int Update(inv_RequisitionDetail _inv_RequisitionDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@RequisitionDetailId", _inv_RequisitionDetail.RequisitionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionId", _inv_RequisitionDetail.RequisitionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_RequisitionDetail.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemUnitId", _inv_RequisitionDetail.ItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionUnitId", _inv_RequisitionDetail.RequisitionUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionQuantity", _inv_RequisitionDetail.RequisitionQuantity, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionPurposeId", _inv_RequisitionDetail.RequisitionPurposeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_RequisitionDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionUnitName", _inv_RequisitionDetail.RequisitionUnitName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionPurposeName", _inv_RequisitionDetail.RequisitionPurposeName,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@RollLenghtInMeter  ", _inv_RequisitionDetail.RollLenghtInMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollAreaInSqMeter  ", _inv_RequisitionDetail.RollAreaInSqMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PackageWeight  ", _inv_RequisitionDetail.PackageWeight, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_RequisitionDetail_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}