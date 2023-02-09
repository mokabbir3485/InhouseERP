using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_AdditionalAttributeValueDAO //: IDisposible
    {
        private static volatile ad_AdditionalAttributeValueDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_AdditionalAttributeValueDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_AdditionalAttributeValueDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_AdditionalAttributeValueDAO();
                    }

                return instance;
            }
        }

        public static ad_AdditionalAttributeValueDAO GetInstance()
        {
            if (instance == null) instance = new ad_AdditionalAttributeValueDAO();
            return instance;
        }

        public List<ad_AdditionalAttributeValue> GetAll(int? attributevalueId = null)
        {
            try
            {
                var ad_AdditionalAttributeValueLst = new List<ad_AdditionalAttributeValue>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AttributeValueId", attributevalueId, DbType.Int32, ParameterDirection.Input)
                };
                ad_AdditionalAttributeValueLst =
                    dbExecutor.FetchData<ad_AdditionalAttributeValue>(CommandType.StoredProcedure,
                        "ad_AdditionalAttributeValue_Get", colparameters);
                return ad_AdditionalAttributeValueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttributeValue> GetByAttributeId(int attributeId)
        {
            try
            {
                var ad_AdditionalAttributeValueLst = new List<ad_AdditionalAttributeValue>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AttributeId", attributeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_AdditionalAttributeValueLst = dbExecutor.FetchData<ad_AdditionalAttributeValue>(
                    CommandType.StoredProcedure, "ad_AdditionalAttributeValue_GetByAttributeId", colparameters);
                return ad_AdditionalAttributeValueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttributeValue> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_AdditionalAttributeValueLst = new List<ad_AdditionalAttributeValue>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_AdditionalAttributeValueLst =
                    dbExecutor.FetchData<ad_AdditionalAttributeValue>(CommandType.StoredProcedure,
                        "ad_AdditionalAttributeValue_GetDynamic", colparameters);
                return ad_AdditionalAttributeValueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttributeValue> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_AdditionalAttributeValueLst = new List<ad_AdditionalAttributeValue>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_AdditionalAttributeValueLst = dbExecutor.FetchDataRef<ad_AdditionalAttributeValue>(
                    CommandType.StoredProcedure, "ad_AdditionalAttributeValue_GetPaged", colparameters, ref rows);
                return ad_AdditionalAttributeValueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_AdditionalAttributeValue _ad_AdditionalAttributeValue)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@AttributeId", _ad_AdditionalAttributeValue.AttributeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Value", _ad_AdditionalAttributeValue.Value, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_AdditionalAttributeValue.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_AdditionalAttributeValue.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_AdditionalAttributeValue.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_AdditionalAttributeValue.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_AdditionalAttributeValue.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "ad_AdditionalAttributeValue_Create", colparameters, true);
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

        public int AddWithAttributeName(ad_AdditionalAttributeValue _ad_AdditionalAttributeValue)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@AttributeName", _ad_AdditionalAttributeValue.AttributeName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Value", _ad_AdditionalAttributeValue.Value, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_AdditionalAttributeValue.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_AdditionalAttributeValue.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_AdditionalAttributeValue.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_AdditionalAttributeValue.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_AdditionalAttributeValue.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "ad_AdditionalAttributeValue_CreateWithAttributeName", colparameters, true);
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

        public int Update(ad_AdditionalAttributeValue _ad_AdditionalAttributeValue)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@AttributeValueId", _ad_AdditionalAttributeValue.AttributeValueId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AttributeId", _ad_AdditionalAttributeValue.AttributeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Value", _ad_AdditionalAttributeValue.Value, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_AdditionalAttributeValue.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_AdditionalAttributeValue.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_AdditionalAttributeValue.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_AdditionalAttributeValue_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int attributevalueId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@AttributeValueId", attributevalueId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_AdditionalAttributeValue_DeleteById",
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