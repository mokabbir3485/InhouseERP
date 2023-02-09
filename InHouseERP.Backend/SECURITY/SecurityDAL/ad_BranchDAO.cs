using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_BranchDAO : IDisposable
    {
        private static volatile ad_BranchDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_BranchDAO()
        {
            dbExecutor = DBExecutor.GetInstanceThreadSafe;
            //dbExecutor = new DBExecutor();
        }

        public static ad_BranchDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_BranchDAO();
                    }

                return instance;
            }
        }

        void IDisposable.Dispose()
        {
            throw new NotImplementedException();
        }

        public static ad_BranchDAO GetInstance()
        {
            if (instance == null) instance = new ad_BranchDAO();
            return instance;
        }

        public List<ad_Branch> GetAll(int? BranchId = null)
        {
            try
            {
                var ad_BranchLst = new List<ad_Branch>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BranchId", BranchId, DbType.Int32, ParameterDirection.Input)
                };
                ad_BranchLst =
                    dbExecutor.FetchData<ad_Branch>(CommandType.StoredProcedure, "ad_Branch_Get", colparameters);
                return ad_BranchLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Branch> GetByUserId(int userId, int? BranchId = null)
        {
            try
            {
                var ad_BranchLst = new List<ad_Branch>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@UserId", userId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BranchId", BranchId, DbType.Int32, ParameterDirection.Input)
                };
                ad_BranchLst = dbExecutor.FetchData<ad_Branch>(CommandType.StoredProcedure, "ad_Branch_GetByUserId",
                    colparameters);
                return ad_BranchLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Branch> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_BranchLst = new List<ad_Branch>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_BranchLst = dbExecutor.FetchData<ad_Branch>(CommandType.StoredProcedure, "ad_Branch_GetDynamic",
                    colparameters);
                return ad_BranchLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Branch> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_BranchLst = new List<ad_Branch>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_BranchLst = dbExecutor.FetchDataRef<ad_Branch>(CommandType.StoredProcedure, "ad_Branch_GetPaged",
                    colparameters, ref rows);
                return ad_BranchLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Branch _ad_Branch)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[15]
                {
                    new Parameters("@GroupId", _ad_Branch.GroupId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BranchName", _ad_Branch.BranchName, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchShortName", _ad_Branch.BranchShortName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Address", _ad_Branch.Address, DbType.String, ParameterDirection.Input),
                    new Parameters("@ContactNo", _ad_Branch.ContactNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Fax", _ad_Branch.Fax, DbType.String, ParameterDirection.Input),
                    new Parameters("@Email", _ad_Branch.Email, DbType.String, ParameterDirection.Input),
                    new Parameters("@Web", _ad_Branch.Web, DbType.String, ParameterDirection.Input),
                    new Parameters("@Logo", _ad_Branch.Logo, DbType.String, ParameterDirection.Input),
                    new Parameters("@TIN", _ad_Branch.TIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@VatRegNo", _ad_Branch.VatRegNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ManagerName", _ad_Branch.ManagerName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Branch.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@TermsAndConditions", _ad_Branch.TermsAndConditions, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PromotionalNotes", _ad_Branch.PromotionalNotes, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_Branch_Create", colparameters,
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

        public int Update(ad_Branch _ad_Branch)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[16]
                {
                    new Parameters("@BranchId", _ad_Branch.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@GroupId", _ad_Branch.GroupId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BranchName", _ad_Branch.BranchName, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchShortName", _ad_Branch.BranchShortName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Address", _ad_Branch.Address, DbType.String, ParameterDirection.Input),
                    new Parameters("@ContactNo", _ad_Branch.ContactNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Fax", _ad_Branch.Fax, DbType.String, ParameterDirection.Input),
                    new Parameters("@Email", _ad_Branch.Email, DbType.String, ParameterDirection.Input),
                    new Parameters("@Web", _ad_Branch.Web, DbType.String, ParameterDirection.Input),
                    new Parameters("@Logo", _ad_Branch.Logo, DbType.String, ParameterDirection.Input),
                    new Parameters("@TIN", _ad_Branch.TIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@VatRegNo", _ad_Branch.VatRegNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@ManagerName", _ad_Branch.ManagerName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Branch.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@TermsAndConditions", _ad_Branch.TermsAndConditions, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PromotionalNotes", _ad_Branch.PromotionalNotes, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Branch_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int BranchId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BranchId", BranchId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Branch_DeleteById", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int SyncIn(int BranchId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DestinationBranchId", BranchId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_SyncIn", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int SyncOut(int BranchId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SourceBranchId", BranchId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_SyncOut", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}