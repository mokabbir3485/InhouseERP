using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemAdditionalAttributeValueDAO //: IDisposible
    {
        private static volatile ad_ItemAdditionalAttributeValueDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemAdditionalAttributeValueDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ItemAdditionalAttributeValueDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemAdditionalAttributeValueDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemAdditionalAttributeValueDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemAdditionalAttributeValueDAO();
            return instance;
        }

        public List<ad_ItemAdditionalAttributeValue> GetAll(int? itemaddattvalueid = null, int? itemaddattid = null)
        {
            try
            {
                var ad_ItemAdditionalAttributeValueLst = new List<ad_ItemAdditionalAttributeValue>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemAddAttValueId", itemaddattvalueid, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemAdditionalAttributeValueLst =
                    dbExecutor.FetchData<ad_ItemAdditionalAttributeValue>(CommandType.StoredProcedure,
                        "ad_ItemAdditionalAttributeValue_Get", colparameters);
                return ad_ItemAdditionalAttributeValueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttributeValue> GetByItemAddAttId(int ItemAddAttId)
        {
            try
            {
                var ad_ItemAdditionalAttributeValueList = new List<ad_ItemAdditionalAttributeValue>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemAddAttId", ItemAddAttId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemAdditionalAttributeValueList = dbExecutor.FetchData<ad_ItemAdditionalAttributeValue>(
                    CommandType.StoredProcedure, "ad_ItemAdditionalAttributeValue_GetByItemAddAttId", colparameters);
                return ad_ItemAdditionalAttributeValueList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttributeValue> GetByItemAddAttIdForItemEdit(int itemId, int attributeId)
        {
            try
            {
                var ad_ItemAdditionalAttributeValueList = new List<ad_ItemAdditionalAttributeValue>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ItemId", itemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttributeId", attributeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemAdditionalAttributeValueList = dbExecutor.FetchData<ad_ItemAdditionalAttributeValue>(
                    CommandType.StoredProcedure, "ad_ItemAdditionalAttributeValue_GetByItemAddAttIdForItemEdit",
                    colparameters);
                return ad_ItemAdditionalAttributeValueList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttributeValue> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_ItemAdditionalAttributeValueLst = new List<ad_ItemAdditionalAttributeValue>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_ItemAdditionalAttributeValueLst = dbExecutor.FetchData<ad_ItemAdditionalAttributeValue>(
                    CommandType.StoredProcedure, "ad_ItemAdditionalAttributeValue_GetDynamic", colparameters);
                return ad_ItemAdditionalAttributeValueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttributeValue> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_ItemAdditionalAttributeValueLst = new List<ad_ItemAdditionalAttributeValue>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_ItemAdditionalAttributeValueLst = dbExecutor.FetchDataRef<ad_ItemAdditionalAttributeValue>(
                    CommandType.StoredProcedure, "ad_ItemAdditionalAttributeValue_GetPaged", colparameters, ref rows);
                return ad_ItemAdditionalAttributeValueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(ad_ItemAdditionalAttributeValue _ad_ItemAdditionalAttributeValue)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ItemAddAttId", _ad_ItemAdditionalAttributeValue.ItemAddAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AttributeValueId", _ad_ItemAdditionalAttributeValue.AttributeValueId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "ad_ItemAdditionalAttributeValue_Create", colparameters, true);
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

        public long AddWithValue(ad_ItemAdditionalAttributeValue _ad_ItemAdditionalAttributeValue)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ItemAddAttId", _ad_ItemAdditionalAttributeValue.ItemAddAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@Value", _ad_ItemAdditionalAttributeValue.Value, DbType.String,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure,
                    "ad_ItemAdditionalAttributeValue_CreateWithValue", colparameters, true);
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

        public int Update(ad_ItemAdditionalAttributeValue _ad_ItemAdditionalAttributeValue)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ItemAddAttValueId", _ad_ItemAdditionalAttributeValue.ItemAddAttValueId,
                        DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ItemAddAttId", _ad_ItemAdditionalAttributeValue.ItemAddAttId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@AttributeValueId", _ad_ItemAdditionalAttributeValue.AttributeValueId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemAdditionalAttributeValue_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int itemaddattvalueid)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemAddAttValueId", itemaddattvalueid, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "ad_ItemAdditionalAttributeValue_DeleteById", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetByItemId(int itemId)
        {
            try
            {
                var dt = new DataTable();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemId", itemId, DbType.Int32, ParameterDirection.Input)
                };
                dt = dbExecutor.GetDataTable(CommandType.StoredProcedure, "ad_ItemAdditionalAttributeValue_GetByItemId",
                    colparameters, true);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}