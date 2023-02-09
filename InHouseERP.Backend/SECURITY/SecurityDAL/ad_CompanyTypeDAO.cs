using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_CompanyTypeDAO //: IDisposible
    {
        private static volatile ad_CompanyTypeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_CompanyTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_CompanyTypeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_CompanyTypeDAO();
                    }

                return instance;
            }
        }

        public static ad_CompanyTypeDAO GetInstance()
        {
            if (instance == null) instance = new ad_CompanyTypeDAO();
            return instance;
        }

        public List<ad_CompanyType> GetAll(int? CompanyTypeId = null)
        {
            try
            {
                var ad_CompanyTypeLst = new List<ad_CompanyType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyTypeId", CompanyTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_CompanyTypeLst = dbExecutor.FetchData<ad_CompanyType>(CommandType.StoredProcedure,
                    "ad_CompanyType_Get", colparameters);
                return ad_CompanyTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CompanyType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_CompanyTypeLst = new List<ad_CompanyType>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_CompanyTypeLst = dbExecutor.FetchData<ad_CompanyType>(CommandType.StoredProcedure,
                    "ad_CompanyType_GetDynamic", colparameters);
                return ad_CompanyTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CompanyType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_CompanyTypeLst = new List<ad_CompanyType>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_CompanyTypeLst = dbExecutor.FetchDataRef<ad_CompanyType>(CommandType.StoredProcedure,
                    "ad_CompanyType_GetPaged", colparameters, ref rows);
                return ad_CompanyTypeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_CompanyType _ad_CompanyType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@CompanyTypeName", _ad_CompanyType.CompanyTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_CompanyType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_CompanyType.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_CompanyType.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_CompanyType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_CompanyType.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_CompanyType_Create",
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

        public int Update(ad_CompanyType _ad_CompanyType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@CompanyTypeId", _ad_CompanyType.CompanyTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CompanyTypeName", _ad_CompanyType.CompanyTypeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_CompanyType.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_CompanyType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_CompanyType.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_CompanyType_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int CompanyTypeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyTypeId", CompanyTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_CompanyType_DeleteById",
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