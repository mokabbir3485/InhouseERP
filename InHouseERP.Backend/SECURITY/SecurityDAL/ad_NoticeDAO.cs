using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_NoticeDAO //: IDisposible
    {
        private static volatile ad_NoticeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_NoticeDAO()
        {
            dbExecutor = DBExecutor.GetInstanceThreadSafe;
            //dbExecutor = new DBExecutor();
        }

        public static ad_NoticeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_NoticeDAO();
                    }

                return instance;
            }
        }

        public static ad_NoticeDAO GetInstance()
        {
            if (instance == null) instance = new ad_NoticeDAO();
            return instance;
        }

        public List<ad_Notice> GetByUserId(int userId)
        {
            try
            {
                var ad_NoticeLst = new List<ad_Notice>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@UserId", userId, DbType.Int32, ParameterDirection.Input)
                };
                ad_NoticeLst = dbExecutor.FetchData<ad_Notice>(CommandType.StoredProcedure, "ad_Notice_GetByUserId",
                    colparameters);
                return ad_NoticeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Notice> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_NoticeLst = new List<ad_Notice>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_NoticeLst = dbExecutor.FetchData<ad_Notice>(CommandType.StoredProcedure, "ad_Notice_GetDynamic",
                    colparameters);
                return ad_NoticeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Notice> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_NoticeLst = new List<ad_Notice>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_NoticeLst = dbExecutor.FetchDataRef<ad_Notice>(CommandType.StoredProcedure, "ad_Notice_GetPaged",
                    colparameters, ref rows);
                return ad_NoticeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(ad_Notice _ad_Notice)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@NoticeContent", _ad_Notice.NoticeContent, DbType.String, ParameterDirection.Input),
                    new Parameters("@SenderId", _ad_Notice.SenderId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SenderName", _ad_Notice.SenderName, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_Notice.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_Notice.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Notice.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Notice.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "ad_Notice_Create", colparameters,
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

        public int Update(ad_Notice _ad_Notice)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@NoticeId", _ad_Notice.NoticeId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@NoticeContent", _ad_Notice.NoticeContent, DbType.String, ParameterDirection.Input),
                    new Parameters("@SenderId", _ad_Notice.SenderId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SenderName", _ad_Notice.SenderName, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Notice.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Notice.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Notice_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long noticeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@NoticeId", noticeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Notice_DeleteById", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public int UpdateShift(Int64 shiftId, TimeSpan startedTime, TimeSpan endedTime, bool isOnLeave, bool isLateInApproved, string lateInApproveRemarks)
        public int UpdateShift(long shiftId, bool isOnLeave, bool isLateInApproved, string lateInApproveRemarks)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@ShiftId", shiftId, DbType.Int64, ParameterDirection.Input),
                    //new Parameters("@StartedTime", startedTime, DbType.Time, ParameterDirection.Input),
                    //new Parameters("@EndedTime", endedTime, DbType.Time, ParameterDirection.Input),
                    new Parameters("@IsOnLeave", isOnLeave, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsLateInApproved", isLateInApproved, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@LateInApproveRemarks", lateInApproveRemarks, DbType.String,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "hr_Shift_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddShift(int empId, int attPolicyId, string shiftDate, int isWH, int isPH, int isHD, string start,
            string end)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@EmployeeId", empId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AttPolicyId", attPolicyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ShiftDate", shiftDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsWH", isWH, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsPH", isPH, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsHD", isHD, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@StartTime", start, DbType.String, ParameterDirection.Input),
                    new Parameters("@EndTime", end, DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "hr_Shift_Create", colparameters,
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
    }
}