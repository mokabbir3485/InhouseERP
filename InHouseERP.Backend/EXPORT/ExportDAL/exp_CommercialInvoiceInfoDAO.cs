using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_CommercialInvoiceInfoDAO //: IDisposible
    {
        private static volatile exp_CommercialInvoiceInfoDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_CommercialInvoiceInfoDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_CommercialInvoiceInfoDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_CommercialInvoiceInfoDAO();
                    }

                return instance;
            }
        }

        public static exp_CommercialInvoiceInfoDAO GetInstance()
        {
            if (instance == null) instance = new exp_CommercialInvoiceInfoDAO();
            return instance;
        }

        public List<exp_CommercialInvoiceInfo> GetAll(long? infoId = null)
        {
            try
            {
                var exp_CommercialInvoiceInfoLst = new List<exp_CommercialInvoiceInfo>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InfoId", infoId, DbType.Int32, ParameterDirection.Input)
                };
                exp_CommercialInvoiceInfoLst =
                    dbExecutor.FetchData<exp_CommercialInvoiceInfo>(CommandType.StoredProcedure,
                        "exp_CommercialInvoiceInfo_Get", colparameters);
                return exp_CommercialInvoiceInfoLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoiceInfo> GetByCiId(int ciId)
        {
            try
            {
                var exp_CommercialInvoiceInfoLst = new List<exp_CommercialInvoiceInfo>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", ciId, DbType.Int64, ParameterDirection.Input)
                };
                exp_CommercialInvoiceInfoLst =
                    dbExecutor.FetchData<exp_CommercialInvoiceInfo>(CommandType.StoredProcedure,
                        "exp_CommercialInvoiceInfo_Get", colparameters);
                return exp_CommercialInvoiceInfoLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoiceInfo> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_CommercialInvoiceInfoLst = new List<exp_CommercialInvoiceInfo>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_CommercialInvoiceInfoLst =
                    dbExecutor.FetchData<exp_CommercialInvoiceInfo>(CommandType.StoredProcedure,
                        "exp_CommercialInvoiceInfo_GetDynamic", colparameters);
                return exp_CommercialInvoiceInfoLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoiceInfo> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var exp_CommercialInvoiceInfoLst = new List<exp_CommercialInvoiceInfo>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_CommercialInvoiceInfoLst = dbExecutor.FetchDataRef<exp_CommercialInvoiceInfo>(
                    CommandType.StoredProcedure, "exp_CommercialInvoiceInfo_GetPaged", colparameters, ref rows);
                return exp_CommercialInvoiceInfoLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_CommercialInvoiceInfo _exp_CommercialInvoiceInfo)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@CommercialInvoiceId", _exp_CommercialInvoiceInfo.CommercialInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@InfoType", _exp_CommercialInvoiceInfo.InfoType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InfoSubType", _exp_CommercialInvoiceInfo.InfoSubType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InfoLabel", _exp_CommercialInvoiceInfo.InfoLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InfoValue", _exp_CommercialInvoiceInfo.InfoValue, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Sorting", _exp_CommercialInvoiceInfo.Sorting, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_CommercialInvoiceInfo_Create",
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

        public int Update(exp_CommercialInvoiceInfo _exp_CommercialInvoiceInfo)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@InfoId", _exp_CommercialInvoiceInfo.InfoId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceId", _exp_CommercialInvoiceInfo.CommercialInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@InfoType", _exp_CommercialInvoiceInfo.InfoType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InfoSubType", _exp_CommercialInvoiceInfo.InfoSubType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InfoLabel", _exp_CommercialInvoiceInfo.InfoLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InfoValue", _exp_CommercialInvoiceInfo.InfoValue, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Sorting", _exp_CommercialInvoiceInfo.Sorting, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_CommercialInvoiceInfo_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(exp_CommercialInvoiceInfo _exp_CommercialInvoiceInfo)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@InfoId", _exp_CommercialInvoiceInfo.InfoId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CommercialInvoiceId", _exp_CommercialInvoiceInfo.CommercialInvoiceId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@InfoType", _exp_CommercialInvoiceInfo.InfoType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InfoSubType", _exp_CommercialInvoiceInfo.InfoSubType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InfoLabel", _exp_CommercialInvoiceInfo.InfoLabel, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InfoValue", _exp_CommercialInvoiceInfo.InfoValue, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Sorting", _exp_CommercialInvoiceInfo.Sorting, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_CommercialInvoiceInfo_Post",
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

        public int Delete(int ciId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CommercialInvoiceId", ciId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_CommercialInvoiceInfo_Delete",
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