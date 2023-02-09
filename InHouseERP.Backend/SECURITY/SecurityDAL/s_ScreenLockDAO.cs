using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_ScreenLockDAO //: IDisposible
    {
        private static volatile s_ScreenLockDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_ScreenLockDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_ScreenLockDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_ScreenLockDAO();
                    }

                return instance;
            }
        }

        public static s_ScreenLockDAO GetInstance()
        {
            if (instance == null) instance = new s_ScreenLockDAO();
            return instance;
        }

        public List<s_ScreenLock> GetByUserAndScreen(int UserId, int ScreenId)
        {
            try
            {
                var s_ScreenLockLst = new List<s_ScreenLock>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@UserId", UserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ScreenId", ScreenId, DbType.Int32, ParameterDirection.Input)
                };
                s_ScreenLockLst =
                    dbExecutor.FetchData<s_ScreenLock>(CommandType.StoredProcedure, "s_ScreenLock_Get", colparameters);
                return s_ScreenLockLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_ScreenLock s_ScreenLock)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@UserId", s_ScreenLock.UserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ScreenId", s_ScreenLock.ScreenId, DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_ScreenLock_Create",
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

        public int UnLockAll(int UserId)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[1]
                {
                    new Parameters("@UserId", UserId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_ScreenLock_UnLockAll", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long ScreenLockId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ScreenLockId", ScreenLockId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_ScreenLock_DeleteById", colparameters,
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