using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockDeclarationDAO //: IDisposible
    {
        private static volatile inv_StockDeclarationDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockDeclarationDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockDeclarationDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockDeclarationDAO();
                    }

                return instance;
            }
        }

        public static inv_StockDeclarationDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockDeclarationDAO();
            return instance;
        }

        public List<inv_StockDeclaration> GetAll(long? declarationId = null)
        {
            try
            {
                var inv_StockDeclarationLst = new List<inv_StockDeclaration>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeclarationId", declarationId, DbType.Int32, ParameterDirection.Input)
                };
                inv_StockDeclarationLst = dbExecutor.FetchData<inv_StockDeclaration>(CommandType.StoredProcedure,
                    "inv_StockDeclaration_Get", colparameters);
                return inv_StockDeclarationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<xrpt_StockDeclaration> StockDeclarationDetailGetById(long declarationId)
        {
            try
            {
                var xrpt_StockDeclarationList = new List<xrpt_StockDeclaration>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeclarationId", declarationId, DbType.Int64, ParameterDirection.Input)
                };
                xrpt_StockDeclarationList = dbExecutor.FetchData<xrpt_StockDeclaration>(CommandType.StoredProcedure,
                    "xrpt_inv_StockDeclarationDetailGetById", colparameters);
                return xrpt_StockDeclarationList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_StockDeclaration> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_StockDeclarationLst = new List<inv_StockDeclaration>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeclarationLst = dbExecutor.FetchData<inv_StockDeclaration>(CommandType.StoredProcedure,
                    "inv_StockDeclaration_GetDynamic", colparameters);
                return inv_StockDeclarationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeclaration> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockDeclarationLst = new List<inv_StockDeclaration>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockDeclarationLst = dbExecutor.FetchDataRef<inv_StockDeclaration>(CommandType.StoredProcedure,
                    "inv_StockDeclaration_GetPaged", colparameters, ref rows);
                return inv_StockDeclarationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(inv_StockDeclaration _inv_StockDeclaration)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@DeclarationId", _inv_StockDeclaration.DeclarationId, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationNo", _inv_StockDeclaration.DeclarationNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationDate", _inv_StockDeclaration.DeclarationDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockDeclaration.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DeclaredById", _inv_StockDeclaration.DeclaredById, DbType.Int32,
                        ParameterDirection.Input), 
                    new Parameters("@UpdatorId", _inv_StockDeclaration.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_StockDeclaration.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_StockDeclaration.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationTypeId", _inv_StockDeclaration.DeclarationTypeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockDeclaration_Post",
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

        public int Update(inv_StockDeclaration _inv_StockDeclaration)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[11]
                {
                    new Parameters("@DeclarationId", _inv_StockDeclaration.DeclarationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationNo", _inv_StockDeclaration.DeclarationNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeclarationDate", _inv_StockDeclaration.DeclarationDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockDeclaration.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DeclaredById", _inv_StockDeclaration.DeclaredById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_StockDeclaration.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockDeclaration.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_StockDeclaration.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentName", _inv_StockDeclaration.DepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DeclaredBy", _inv_StockDeclaration.DeclaredBy, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_StockDeclaration.IsApproved, DbType.Boolean,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDeclaration_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long GetMaxStockDeclarationNumber()
        {
            try
            {
                long MaxStockDeclarationNumber = 0;
                dbExecutor.ManageTransaction(TransactionType.Open);
                MaxStockDeclarationNumber = dbExecutor.ExecuteScalar64(true, CommandType.Text, "inv_GetMaxDeclarationNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaxStockDeclarationNumber;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int UpdateApprove(inv_StockDeclaration _inv_StockDeclaration)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@DeclarationId", _inv_StockDeclaration.DeclarationId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_StockDeclaration.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_StockDeclaration.ApprovedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_StockDeclaration.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_StockDeclaration_UpdateApprove", colparameters, true);
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

        public int Delete(long declarationId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DeclarationId", declarationId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockDeclaration_DeleteById",
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