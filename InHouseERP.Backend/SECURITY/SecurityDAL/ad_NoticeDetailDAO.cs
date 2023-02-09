using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_NoticeDetailDAO //: IDisposible
    {
        private static volatile ad_NoticeDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_NoticeDetailDAO()
        {
            dbExecutor = DBExecutor.GetInstanceThreadSafe;
            //dbExecutor = new DBExecutor();
        }

        public static ad_NoticeDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_NoticeDetailDAO();
                    }

                return instance;
            }
        }

        public static ad_NoticeDetailDAO GetInstance()
        {
            if (instance == null) instance = new ad_NoticeDetailDAO();
            return instance;
        }

        public List<ad_NoticeDetail> GetAll(long? noticeDetailId = null, long? noticeId = null)
        {
            try
            {
                var ad_NoticeDetailLst = new List<ad_NoticeDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@NoticeDetailId", noticeDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ad_NoticeDetailLst = dbExecutor.FetchData<ad_NoticeDetail>(CommandType.StoredProcedure,
                    "ad_NoticeDetail_Get", colparameters);
                return ad_NoticeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_NoticeDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_NoticeDetailLst = new List<ad_NoticeDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_NoticeDetailLst = dbExecutor.FetchData<ad_NoticeDetail>(CommandType.StoredProcedure,
                    "ad_NoticeDetail_GetDynamic", colparameters);
                return ad_NoticeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_NoticeDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_NoticeDetailLst = new List<ad_NoticeDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_NoticeDetailLst = dbExecutor.FetchDataRef<ad_NoticeDetail>(CommandType.StoredProcedure,
                    "ad_NoticeDetail_GetPaged", colparameters, ref rows);
                return ad_NoticeDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_NoticeDetail _ad_NoticeDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@NoticeId", _ad_NoticeDetail.NoticeId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@UserId", _ad_NoticeDetail.UserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsRead", _ad_NoticeDetail.IsRead, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_NoticeDetail_Create",
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

        public int UpdateIsRead(long noticeId, int userId)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@NoticeId", noticeId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@UserId", userId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_NoticeDetail_UpdateIsRead",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long noticeDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@NoticeDetailId", noticeDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_NoticeDetail_DeleteById",
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