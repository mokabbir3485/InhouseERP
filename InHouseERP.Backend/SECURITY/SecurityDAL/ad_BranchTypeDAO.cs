using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_BranchTypeDAO //: IDisposible
    {
        private static volatile ad_BranchTypeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_BranchTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_BranchTypeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_BranchTypeDAO();
                    }

                return instance;
            }
        }

        public static ad_BranchTypeDAO GetInstance()
        {
            if (instance == null) instance = new ad_BranchTypeDAO();
            return instance;
        }

        public List<ad_BranchType> GetAll(int? BranchTypeId = null)
        {
            try
            {
                var ad_BranchTypeLst = new List<ad_BranchType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BranchTypeId", BranchTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_BranchTypeLst =
                    dbExecutor.FetchData<ad_BranchType>(CommandType.StoredProcedure, "ad_BranchType_Get",
                        colparameters);
                return ad_BranchTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BranchType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_BranchTypeLst = new List<ad_BranchType>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_BranchTypeLst = dbExecutor.FetchData<ad_BranchType>(CommandType.StoredProcedure,
                    "ad_BranchType_GetDynamic", colparameters);
                return ad_BranchTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BranchType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_BranchTypeLst = new List<ad_BranchType>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_BranchTypeLst = dbExecutor.FetchDataRef<ad_BranchType>(CommandType.StoredProcedure,
                    "ad_BranchType_GetPaged", colparameters, ref rows);
                return ad_BranchTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_BranchType _ad_BranchType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BranchTypeName", _ad_BranchType.BranchTypeName, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_BranchType_Create",
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

        public int Update(ad_BranchType _ad_BranchType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@BranchTypeId", _ad_BranchType.BranchTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@BranchTypeName", _ad_BranchType.BranchTypeName, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_BranchType_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int BranchTypeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BranchTypeId", BranchTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_BranchType_DeleteById", colparameters,
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