using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_AdditionalAttributeDAO //: IDisposible
    {
        private static volatile ad_AdditionalAttributeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_AdditionalAttributeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_AdditionalAttributeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_AdditionalAttributeDAO();
                    }

                return instance;
            }
        }

        public static ad_AdditionalAttributeDAO GetInstance()
        {
            if (instance == null) instance = new ad_AdditionalAttributeDAO();
            return instance;
        }

        public List<ad_AdditionalAttribute> GetAll(int? attributeId = null)
        {
            try
            {
                var ad_AdditionalAttributeLst = new List<ad_AdditionalAttribute>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AttributeId", attributeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_AdditionalAttributeLst = dbExecutor.FetchData<ad_AdditionalAttribute>(CommandType.StoredProcedure,
                    "ad_AdditionalAttribute_Get", colparameters);
                return ad_AdditionalAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttribute> GetAllActiveByIds(string attributeIds)
        {
            try
            {
                var ad_AdditionalAttributeLst = new List<ad_AdditionalAttribute>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AttributeIds", attributeIds, DbType.String, ParameterDirection.Input)
                };
                ad_AdditionalAttributeLst = dbExecutor.FetchData<ad_AdditionalAttribute>(CommandType.StoredProcedure,
                    "ad_AdditionalAttribute_GetAllActiveByIds", colparameters);
                return ad_AdditionalAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttribute> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_AdditionalAttributeLst = new List<ad_AdditionalAttribute>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_AdditionalAttributeLst = dbExecutor.FetchData<ad_AdditionalAttribute>(CommandType.StoredProcedure,
                    "ad_AdditionalAttribute_GetDynamic", colparameters);
                return ad_AdditionalAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttribute> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_AdditionalAttributeLst = new List<ad_AdditionalAttribute>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_AdditionalAttributeLst = dbExecutor.FetchDataRef<ad_AdditionalAttribute>(CommandType.StoredProcedure,
                    "ad_AdditionalAttribute_GetPaged", colparameters, ref rows);
                return ad_AdditionalAttributeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_AdditionalAttribute ad_AdditionalAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@AttributeName", ad_AdditionalAttribute.AttributeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ValueAvailibilityType", ad_AdditionalAttribute.ValueAvailibilityType, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_AdditionalAttribute.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", ad_AdditionalAttribute.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", ad_AdditionalAttribute.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_AdditionalAttribute.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_AdditionalAttribute.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_AdditionalAttribute_Create",
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

        public int Update(ad_AdditionalAttribute ad_AdditionalAttribute)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@AttributeId", ad_AdditionalAttribute.AttributeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AttributeName", ad_AdditionalAttribute.AttributeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ValueAvailibilityType", ad_AdditionalAttribute.ValueAvailibilityType, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_AdditionalAttribute.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_AdditionalAttribute.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_AdditionalAttribute.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_AdditionalAttribute_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int attributeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AttributeId", attributeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_AdditionalAttribute_DeleteById",
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