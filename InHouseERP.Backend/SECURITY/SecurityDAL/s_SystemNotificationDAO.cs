using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_SystemNotificationDAO
    {
        private static volatile s_SystemNotificationDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_SystemNotificationDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_SystemNotificationDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_SystemNotificationDAO();
                    }

                return instance;
            }
        }

        public static s_SystemNotificationDAO GetInstance()
        {
            if (instance == null) instance = new s_SystemNotificationDAO();
            return instance;
        }

        //public Int64 AddSystemMaintenance(s_SystemNotification SystemNotification)
        //{
        //    Int64 ret = 0;
        //    try
        //    {
        //        var colparameters = new Parameters[5]
        //        {
        //            new Parameters("@Message", SystemNotification.Message, DbType.String,
        //                ParameterDirection.Input),
        //            new Parameters("@Maintenance_StartTime", SystemNotification.Maintenance_StartTime, DbType.DateTime,
        //                ParameterDirection.Input),
        //            new Parameters("@Maintenance_EndTime", SystemNotification.Maintenance_EndTime, DbType.DateTime,
        //                ParameterDirection.Input),
        //             new Parameters("@IsMaintenance", SystemNotification.IsMaintenance, DbType.Boolean,
        //                ParameterDirection.Input),
        //             new Parameters("@IsActive", SystemNotification.IsActive, DbType.Boolean,
        //                ParameterDirection.Input),


        //        };
        //        dbExecutor.ManageTransaction(TransactionType.Open);
        //        ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "s_SystemNotification_Create",
        //            colparameters, true);
        //        dbExecutor.ManageTransaction(TransactionType.Commit);
        //    }
        //    catch (DBConcurrencyException except)
        //    {
        //        dbExecutor.ManageTransaction(TransactionType.Rollback);
        //        throw except;
        //    }
        //    catch (Exception ex)
        //    {
        //        dbExecutor.ManageTransaction(TransactionType.Rollback);
        //        throw ex;
        //    }

        //    return ret;
        //}

        //public Int64 SystemNotificationAllUser(s_SystemNotification SystemNotification)
        //{
        //    Int64 ret = 0;
        //    try
        //    {
        //        var colparameters = new Parameters[3]
        //        {
        //           new Parameters("@NotificationId", SystemNotification.NotificationId, DbType.Int32,
        //                ParameterDirection.Input),
        //             new Parameters("@Type", SystemNotification.Type, DbType.String,
        //                ParameterDirection.Input),
        //             new Parameters("@IsActive", SystemNotification.IsActive, DbType.Boolean,
        //                ParameterDirection.Input)


        //        };
        //        dbExecutor.ManageTransaction(TransactionType.Open);
        //        ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "s_SystemNotification_Create",
        //            colparameters, true);
        //        dbExecutor.ManageTransaction(TransactionType.Commit);
        //    }
        //    catch (DBConcurrencyException except)
        //    {
        //        dbExecutor.ManageTransaction(TransactionType.Rollback);
        //        throw except;
        //    }
        //    catch (Exception ex)
        //    {
        //        dbExecutor.ManageTransaction(TransactionType.Rollback);
        //        throw ex;
        //    }

        //    return ret;
        //}
        public Int64 PostSystemNotification(s_SystemNotification SystemNotification)
        {
            Int64 ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@NotificationId", SystemNotification.NotificationId, DbType.Int32,
                        ParameterDirection.Input),
                    //new Parameters("@Maintenance_EndTime", SystemNotification.Maintenance_EndTime, DbType.DateTime,
                    //    ParameterDirection.Input),
                     new Parameters("@Type", SystemNotification.Type, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Message", SystemNotification.Message, DbType.String,
                        ParameterDirection.Input),
                     new Parameters("@IsActive", SystemNotification.IsActive, DbType.Boolean,
                        ParameterDirection.Input)


                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "s_SystemNotification_Post",
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
        }
        public List<s_SystemNotification> GetSystemNotification()
        {
            try
            {
                var SystemNotificationList = new List<s_SystemNotification>();
                //var colparameters = new Parameters[1]
                //{
                //    new Parameters("@CurrentDateTime", now, DbType.DateTime, ParameterDirection.Input)
                //};
                SystemNotificationList = dbExecutor.FetchData<s_SystemNotification>(CommandType.StoredProcedure,
                    "s_SystemNotification_Bell", null);

                return SystemNotificationList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
