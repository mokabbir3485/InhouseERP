using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityDAL
{
    public class ad_SupplierDAO //: IDisposible
    {
        private static volatile ad_SupplierDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_SupplierDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_SupplierDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_SupplierDAO();
                    }

                return instance;
            }
        }

        public static ad_SupplierDAO GetInstance()
        {
            if (instance == null) instance = new ad_SupplierDAO();
            return instance;
        }

        public List<ad_Supplier> GetAll(int? SupplierId = null)
        {
            try
            {
                var ad_SupplierLst = new List<ad_Supplier>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input)
                };
                ad_SupplierLst =
                    dbExecutor.FetchData<ad_Supplier>(CommandType.StoredProcedure, "ad_Supplier_Get", colparameters);
                return ad_SupplierLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<vat_Mushak_6_6_GetBySupplierId> GetBySupplierFormushak_6_6(int? SupplierId = null)
        {
            try
            {
                var ad_SupplierLst = new List<vat_Mushak_6_6_GetBySupplierId>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@Supplier", SupplierId, DbType.Int32, ParameterDirection.Input)
                };
                ad_SupplierLst =
                    dbExecutor.FetchData<vat_Mushak_6_6_GetBySupplierId>(CommandType.StoredProcedure, "vat_Mushak_6_6_GetBySupplierId", colparameters);
                return ad_SupplierLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        


        public List<ad_Supplier> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_SupplierLst = new List<ad_Supplier>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_SupplierLst = dbExecutor.FetchData<ad_Supplier>(CommandType.StoredProcedure,
                    "ad_Supplier_GetDynamic", colparameters);
                return ad_SupplierLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Supplier> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_SupplierLst = new List<ad_Supplier>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_SupplierLst = dbExecutor.FetchDataRef<ad_Supplier>(CommandType.StoredProcedure,
                    "ad_Supplier_GetPaged", colparameters, ref rows);
                return ad_SupplierLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Supplier _ad_Supplier)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[12]
                {
                    new Parameters("@SupplierTypeId", _ad_Supplier.SupplierTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    //new Parameters("@SupplierCode", _ad_Supplier.SupplierCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@SupplierName", _ad_Supplier.SupplierName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Web", _ad_Supplier.Web, DbType.String, ParameterDirection.Input),
                    new Parameters("@NID", _ad_Supplier.NID, DbType.String, ParameterDirection.Input),
                    new Parameters("@BIN", _ad_Supplier.BIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@TIN", _ad_Supplier.TIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Supplier.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsReceivable", _ad_Supplier.IsReceivable, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_Supplier.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_Supplier.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Supplier.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Supplier.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_Supplier_Create", colparameters,
                    true);
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

        public int Update(ad_Supplier _ad_Supplier)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[11]
                {
                    new Parameters("@SupplierId", _ad_Supplier.SupplierId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SupplierTypeId", _ad_Supplier.SupplierTypeId, DbType.String,
                        ParameterDirection.Input),
                    //new Parameters("@SupplierCode", _ad_Supplier.SupplierCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@NID", _ad_Supplier.NID, DbType.String, ParameterDirection.Input),
                    new Parameters("@BIN", _ad_Supplier.BIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@TIN", _ad_Supplier.TIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@SupplierName", _ad_Supplier.SupplierName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Web", _ad_Supplier.Web, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Supplier.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsReceivable", _ad_Supplier.IsReceivable, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Supplier.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Supplier.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Supplier_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int SupplierId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Supplier_DeleteById", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}