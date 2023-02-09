using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_EmailNotificationSetupDAO
    {
        private static volatile ad_EmailNotificationSetupDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_EmailNotificationSetupDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_EmailNotificationSetupDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_EmailNotificationSetupDAO();
                    }

                return instance;
            }
        }

        public static ad_EmailNotificationSetupDAO GetInstance()
        {
            if (instance == null) instance = new ad_EmailNotificationSetupDAO();
            return instance;
        }

        public List<ad_ReportNotificationName> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_ReportNotificationName = new List<ad_ReportNotificationName>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_ReportNotificationName = dbExecutor.FetchDataRef<ad_ReportNotificationName>(CommandType.StoredProcedure,
                    "s_ReportNotification_GetPaged", colparameters, ref rows);
                return ad_ReportNotificationName;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<AppNotificationSetup> GetAppNotificationSetupPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var AppNotificationSetup = new List<AppNotificationSetup>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                AppNotificationSetup = dbExecutor.FetchDataRef<AppNotificationSetup>(CommandType.StoredProcedure,
                    "s_AppNotificationSetup_GetPaged", colparameters, ref rows);
                return AppNotificationSetup;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_ReportNotificationName> GetReportNameForNotification()
        {
            try
            {
                var ad_ReportNameLst = new List<ad_ReportNotificationName>();
                ad_ReportNameLst = dbExecutor.FetchData<ad_ReportNotificationName>(CommandType.StoredProcedure, "s_ReportNotification_Get");
                return ad_ReportNameLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteEmailNotificationSetupDetailByNotificationReportDetailId(long NotificationReportDetailId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@NotificationReportDetailId", NotificationReportDetailId, DbType.Int64, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "s_EmailNotificationSetup_DeleteByNotificationReportDetailId", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(ad_EmailNotificationSetupDetail _ad_EmailNotificationSetupDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@NotificationReportDetailId", _ad_EmailNotificationSetupDetail.NotificationReportDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ReportId", _ad_EmailNotificationSetupDetail.ReportId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@EmployeeId", _ad_EmailNotificationSetupDetail.EmployeeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UserName", _ad_EmailNotificationSetupDetail.UserName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@EmailId", _ad_EmailNotificationSetupDetail.EmailId, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_EmailNotificationSetupDetail.IsActive, DbType.Boolean, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "s_EmailNotificationSetup_Post",
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
        public List<AppNotificationSetup> GetAppNotificationSetupByReportCode(string ReportCode)
        {
            try
            {
                var AppNotificationSetupList = new List<AppNotificationSetup>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ReportCode", ReportCode, DbType.String, ParameterDirection.Input)
                };
                AppNotificationSetupList = dbExecutor.FetchData<AppNotificationSetup>(CommandType.StoredProcedure,
                    "s_AppNotificationSetup_GetByReportCode", colparameters);
                return AppNotificationSetupList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //            @ReportId INT = NULl,
        //           @UserId INT = null,
        //@RoleId INT = null
        public List<AppNotificationSetup> s_AppNotificationSetup_GetAll(Int32 ? ReportId=null ,Int32 ? UserId=null ,Int32 ? RoleId=null)
        {
            try
            {
                var AppNotificationSetupList = new List<AppNotificationSetup>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ReportId", ReportId, DbType.Int32, ParameterDirection.Input),
                     new Parameters("@UserId", UserId, DbType.Int32, ParameterDirection.Input),
                      new Parameters("@RoleId", RoleId, DbType.Int32, ParameterDirection.Input)
                };
                AppNotificationSetupList = dbExecutor.FetchData<AppNotificationSetup>(CommandType.StoredProcedure,
                    "s_AppNotificationSetup_GetAll", colparameters);
                return AppNotificationSetupList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long AppNotificationSetupPost(AppNotificationSetup AppNotificationSetupList)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@AppNotificationId", AppNotificationSetupList.AppNotificationId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReportId", AppNotificationSetupList.ReportId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UserId", AppNotificationSetupList.UserId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", AppNotificationSetupList.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SectionId", AppNotificationSetupList.SectionId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RoleId", AppNotificationSetupList.RoleId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", AppNotificationSetupList.IsActive, DbType.Boolean, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "s_AppNotificationSetup_Post",
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
        public long AppNotificationLogPost(AppNotificationLog AppNotificationLogList)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@NotificationLogId", AppNotificationLogList.NotificationLogId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ReportId", AppNotificationLogList.ReportId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UserId", AppNotificationLogList.UserId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@NotificaitonTitle", AppNotificationLogList.NotificaitonTitle, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@NotificationDetail", AppNotificationLogList.NotificationDetail, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsRead", AppNotificationLogList.IsRead, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsDelete", AppNotificationLogList.IsDelete, DbType.Boolean, ParameterDirection.Input),
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "s_AppNotificationLog_Post",
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
        public List<s_SystemNotification> GetMaintenanceData(string Type)
        {
            try
            {
                var MaintenanceDataList = new List<s_SystemNotification>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@Type", Type, DbType.String, ParameterDirection.Input)
                };
                MaintenanceDataList = dbExecutor.FetchData<s_SystemNotification>(CommandType.StoredProcedure,
                    "s_SystemNotification_Get", colparameters);

                return MaintenanceDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }public List<AppNotificationLog> GetAppNotificationLogByUserId(int UserId, bool? IsRead = null)
        {
            try
            {
                var AppNotificationLogList = new List<AppNotificationLog>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@IsRead", IsRead, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UserId", UserId, DbType.Int32, ParameterDirection.Input)
                };
                AppNotificationLogList = dbExecutor.FetchData<AppNotificationLog>(CommandType.StoredProcedure,
                    "s_AppNotificationLog_GetByUserId", colparameters);

                return AppNotificationLogList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostReportNotificationName(ad_ReportNotificationName ad_ReportNotificationName)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@ReportId", ad_ReportNotificationName.ReportId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@ScreenId", ad_ReportNotificationName.ScreenId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ReportName", ad_ReportNotificationName.ReportName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ReportCode", ad_ReportNotificationName.ReportCode, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", ad_ReportNotificationName.IsActive, DbType.Boolean, ParameterDirection.Input)
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "s_ReportNotification_Post",
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
    }
}
