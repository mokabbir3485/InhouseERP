using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_ReturnFromDepartmentDAO //: IDisposible
    {
        private static volatile inv_ReturnFromDepartmentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_ReturnFromDepartmentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_ReturnFromDepartmentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_ReturnFromDepartmentDAO();
                    }

                return instance;
            }
        }

        public static inv_ReturnFromDepartmentDAO GetInstance()
        {
            if (instance == null) instance = new inv_ReturnFromDepartmentDAO();
            return instance;
        }

        public List<inv_ReturnFromDepartment> GetAll(long? returnId = null)
        {
            try
            {
                var inv_ReturnFromDepartmentLst = new List<inv_ReturnFromDepartment>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReturnId", returnId, DbType.Int64, ParameterDirection.Input)
                };
                inv_ReturnFromDepartmentLst =
                    dbExecutor.FetchData<inv_ReturnFromDepartment>(CommandType.StoredProcedure,
                        "inv_ReturnFromDepartment_Get", colparameters);
                return inv_ReturnFromDepartmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_ReturnFromDepartment> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_ReturnFromDepartmentLst = new List<inv_ReturnFromDepartment>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_ReturnFromDepartmentLst =
                    dbExecutor.FetchData<inv_ReturnFromDepartment>(CommandType.StoredProcedure,
                        "inv_ReturnFromDepartment_GetDynamic", colparameters);
                return inv_ReturnFromDepartmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_ReturnFromDepartment> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_ReturnFromDepartmentLst = new List<inv_ReturnFromDepartment>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_ReturnFromDepartmentLst = dbExecutor.FetchDataRef<inv_ReturnFromDepartment>(
                    CommandType.StoredProcedure, "inv_ReturnFromDepartment_GetPaged", colparameters, ref rows);
                return inv_ReturnFromDepartmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnFromDepartment _inv_ReturnFromDepartment)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[18]
                {
                    new Parameters("@FromDepartmentId", _inv_ReturnFromDepartment.FromDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentId", _inv_ReturnFromDepartment.ToDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReturnNo", _inv_ReturnFromDepartment.ReturnNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnDate", _inv_ReturnFromDepartment.ReturnDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IssueId", _inv_ReturnFromDepartment.IssueId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IssueNo", _inv_ReturnFromDepartment.IssueNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnFromId", _inv_ReturnFromDepartment.ReturnFromId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReturnToId", _inv_ReturnFromDepartment.ReturnToId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_ReturnFromDepartment.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_ReturnFromDepartment.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_ReturnFromDepartment.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_ReturnFromDepartment.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_ReturnFromDepartment.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentName", _inv_ReturnFromDepartment.FromDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentName", _inv_ReturnFromDepartment.ToDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnFrom", _inv_ReturnFromDepartment.ReturnFrom, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnTo", _inv_ReturnFromDepartment.ReturnTo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_ReturnFromDepartment.IsApproved, DbType.Boolean,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_ReturnFromDepartment_Create",
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

        public int Update(inv_ReturnFromDepartment _inv_ReturnFromDepartment)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[17]
                {
                    new Parameters("@ReturnId", _inv_ReturnFromDepartment.ReturnId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentId", _inv_ReturnFromDepartment.FromDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentId", _inv_ReturnFromDepartment.ToDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReturnNo", _inv_ReturnFromDepartment.ReturnNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnDate", _inv_ReturnFromDepartment.ReturnDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IssueId", _inv_ReturnFromDepartment.IssueId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IssueNo", _inv_ReturnFromDepartment.IssueNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnFromId", _inv_ReturnFromDepartment.ReturnFromId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReturnToId", _inv_ReturnFromDepartment.ReturnToId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_ReturnFromDepartment.Remarks, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_ReturnFromDepartment.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_ReturnFromDepartment.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentName", _inv_ReturnFromDepartment.FromDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentName", _inv_ReturnFromDepartment.ToDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnFrom", _inv_ReturnFromDepartment.ReturnFrom, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReturnTo", _inv_ReturnFromDepartment.ReturnTo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_ReturnFromDepartment.IsApproved, DbType.Boolean,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_ReturnFromDepartment_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_ReturnFromDepartment _inv_ReturnFromDepartment)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ReturnId", _inv_ReturnFromDepartment.ReturnId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_ReturnFromDepartment.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_ReturnFromDepartment.ApprovedBy, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_ReturnFromDepartment.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "inv_ReturnFromDepartment_UpdateApprove", colparameters, true);
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

        public int Delete(long returnId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReturnId", returnId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_ReturnFromDepartment_DeleteById",
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