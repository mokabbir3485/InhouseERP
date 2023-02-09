using System;
using System.Collections.Generic;
using System.Data;

namespace DbExecutor
{
    public class error_LogDAO //: IDisposible
    {
        private static volatile error_LogDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public error_LogDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static error_LogDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new error_LogDAO();
                    }

                return instance;
            }
        }

        public static error_LogDAO GetInstance()
        {
            if (instance == null) instance = new error_LogDAO();
            return instance;
        }

        public List<error_Log> GetAll(long? ErrorId = null)
        {
            try
            {
                var error_LogLst = new List<error_Log>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ErrorId", ErrorId, DbType.Int32, ParameterDirection.Input)
                };
                error_LogLst =
                    dbExecutor.FetchData<error_Log>(CommandType.StoredProcedure, "error_Log_Get", colparameters);
                return error_LogLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(error_Log _error_Log)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@ErrorDate", _error_Log.ErrorDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ErrorSide", _error_Log.ErrorSide, DbType.String, ParameterDirection.Input),
                    new Parameters("@ErrorMessage", _error_Log.ErrorMessage, DbType.String, ParameterDirection.Input),
                    new Parameters("@ErrorType", _error_Log.ErrorType, DbType.String, ParameterDirection.Input),
                    new Parameters("@FileName", _error_Log.FileName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IpAddress", _error_Log.IpAddress, DbType.String, ParameterDirection.Input),
                    new Parameters("@UserId", _error_Log.UserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsSolved", _error_Log.IsSolved, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "error_Log_Create", colparameters,
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

        public int Update(error_Log _error_Log)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@ErrorId", _error_Log.ErrorId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ErrorDate", _error_Log.ErrorDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ErrorSide", _error_Log.ErrorSide, DbType.String, ParameterDirection.Input),
                    new Parameters("@ErrorMessage", _error_Log.ErrorMessage, DbType.String, ParameterDirection.Input),
                    new Parameters("@ErrorType", _error_Log.ErrorType, DbType.String, ParameterDirection.Input),
                    new Parameters("@FileName", _error_Log.FileName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IpAddress", _error_Log.IpAddress, DbType.String, ParameterDirection.Input),
                    new Parameters("@UserId", _error_Log.UserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsSolved", _error_Log.IsSolved, DbType.Boolean, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "error_Log_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long ErrorId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ErrorId", ErrorId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "error_Log_DeleteById", colparameters,
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