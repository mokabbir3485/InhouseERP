using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_ReturnToSupplierDAO //: IDisposible
    {
        private static volatile inv_ReturnToSupplierDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_ReturnToSupplierDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_ReturnToSupplierDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_ReturnToSupplierDAO();
                    }

                return instance;
            }
        }

        public static inv_ReturnToSupplierDAO GetInstance()
        {
            if (instance == null) instance = new inv_ReturnToSupplierDAO();
            return instance;
        }

        public List<inv_ReturnToSupplier> GetAll(long? returnId = null)
        {
            try
            {
                var inv_ReturnToSupplierLst = new List<inv_ReturnToSupplier>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReturnId", returnId, DbType.Int64, ParameterDirection.Input)
                };
                inv_ReturnToSupplierLst = dbExecutor.FetchData<inv_ReturnToSupplier>(CommandType.StoredProcedure,
                    "inv_ReturnToSupplier_Get", colparameters);
                return inv_ReturnToSupplierLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnToSupplier _inv_ReturnToSupplier)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[16]
                {
                    new Parameters("@DepartmentId", _inv_ReturnToSupplier.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReturnNo", _inv_ReturnToSupplier.ReturnNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnDate", _inv_ReturnToSupplier.ReturnDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@SRId", _inv_ReturnToSupplier.SRId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SupplierId", _inv_ReturnToSupplier.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChallanNo", _inv_ReturnToSupplier.ChallanNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnById", _inv_ReturnToSupplier.ReturnById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_ReturnToSupplier.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_ReturnToSupplier.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_ReturnToSupplier.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_ReturnToSupplier.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_ReturnToSupplier.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentName", _inv_ReturnToSupplier.DepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SupplierName", _inv_ReturnToSupplier.SupplierName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnBy", _inv_ReturnToSupplier.ReturnBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_ReturnToSupplier.IsApproved, DbType.Boolean,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_ReturnToSupplier_Create",
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

        public int Update(inv_ReturnToSupplier _inv_ReturnToSupplier)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[15]
                {
                    new Parameters("@ReturnId", _inv_ReturnToSupplier.ReturnId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_ReturnToSupplier.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReturnNo", _inv_ReturnToSupplier.ReturnNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnDate", _inv_ReturnToSupplier.ReturnDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@SRId", _inv_ReturnToSupplier.SRId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SupplierId", _inv_ReturnToSupplier.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ChallanNo", _inv_ReturnToSupplier.ChallanNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnById", _inv_ReturnToSupplier.ReturnById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_ReturnToSupplier.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_ReturnToSupplier.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_ReturnToSupplier.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentName", _inv_ReturnToSupplier.DepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@SupplierName", _inv_ReturnToSupplier.SupplierName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnBy", _inv_ReturnToSupplier.ReturnBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_ReturnToSupplier.IsApproved, DbType.Boolean,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_ReturnToSupplier_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_ReturnToSupplier _inv_ReturnToSupplier)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ReturnId", _inv_ReturnToSupplier.ReturnId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_ReturnToSupplier.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_ReturnToSupplier.ApprovedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_ReturnToSupplier.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_ReturnToSupplier_UpdateApprove", colparameters, true);
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