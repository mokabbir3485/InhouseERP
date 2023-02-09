using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_OverHeadDAO //: IDisposible
    {
        private static volatile ad_OverHeadDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_OverHeadDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_OverHeadDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_OverHeadDAO();
                    }

                return instance;
            }
        }

        public static ad_OverHeadDAO GetInstance()
        {
            if (instance == null) instance = new ad_OverHeadDAO();
            return instance;
        }

        public List<ad_OverHead> GetAll(int? OverHeadId = null)
        {
            try
            {
                var ad_OverHeadLst = new List<ad_OverHead>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@OverHeadId", OverHeadId, DbType.Int32, ParameterDirection.Input)
                };
                ad_OverHeadLst =
                    dbExecutor.FetchData<ad_OverHead>(CommandType.StoredProcedure, "ad_OverHead_Get", colparameters);
                return ad_OverHeadLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_OverHead> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_OverHeadLst = new List<ad_OverHead>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_OverHeadLst = dbExecutor.FetchData<ad_OverHead>(CommandType.StoredProcedure,
                    "ad_OverHead_GetDynamic", colparameters);
                return ad_OverHeadLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_OverHead> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_OverHeadLst = new List<ad_OverHead>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_OverHeadLst = dbExecutor.FetchDataRef<ad_OverHead>(CommandType.StoredProcedure,
                    "ad_OverHead_GetPaged", colparameters, ref rows);
                return ad_OverHeadLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_OverHead _ad_OverHead)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@OverHeadName", _ad_OverHead.OverHeadName, DbType.String, ParameterDirection.Input),
                    new Parameters("@AccountCode", _ad_OverHead.AccountCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_OverHead.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_OverHead.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_OverHead.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_OverHead.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_OverHead.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_OverHead_Create", colparameters,
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

        public int Update(ad_OverHead _ad_OverHead)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@OverHeadId", _ad_OverHead.OverHeadId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@OverHeadName", _ad_OverHead.OverHeadName, DbType.String, ParameterDirection.Input),
                    new Parameters("@AccountCode", _ad_OverHead.AccountCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_OverHead.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_OverHead.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_OverHead.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_OverHead_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int OverHeadId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@OverHeadId", OverHeadId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_OverHead_DeleteById", colparameters,
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