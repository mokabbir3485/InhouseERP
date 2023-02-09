using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_ScreenDAO //: IDisposible
    {
        private static volatile s_ScreenDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_ScreenDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_ScreenDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_ScreenDAO();
                    }

                return instance;
            }
        }

        public static s_ScreenDAO GetInstance()
        {
            if (instance == null) instance = new s_ScreenDAO();
            return instance;
        }

        public List<s_Screen> GetAll(int? screenId = null)
        {
            try
            {
                var s_ScreenLst = new List<s_Screen>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ScreenId", screenId, DbType.Int32, ParameterDirection.Input)
                };
                s_ScreenLst =
                    dbExecutor.FetchData<s_Screen>(CommandType.StoredProcedure, "s_Screen_Get", colparameters);
                return s_ScreenLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_Screen> GetByModuleId(int? moduleId)
        {
            try
            {
                var s_ScreenLst = new List<s_Screen>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ModuleId", moduleId, DbType.Int32, ParameterDirection.Input)
                };
                s_ScreenLst = dbExecutor.FetchData<s_Screen>(CommandType.StoredProcedure, "s_Screen_GetByModuleId",
                    colparameters);
                return s_ScreenLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_Screen s_Screen)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@ModuleId", s_Screen.ModuleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ScreenName", s_Screen.ScreenName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Description", s_Screen.Description, DbType.String, ParameterDirection.Input),
                    new Parameters("@ScreenUrl", s_Screen.ScreenUrl, DbType.String, ParameterDirection.Input),
                    new Parameters("@ImageUrl", s_Screen.ImageUrl, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsPage", s_Screen.IsPage, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@Sorting", s_Screen.Sorting, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MainTableName", s_Screen.MainTableName, DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_Screen_Create", colparameters,
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

        public int Update(s_Screen s_Screen)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@ScreenId", s_Screen.ScreenId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ModuleId", s_Screen.ModuleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ScreenName", s_Screen.ScreenName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Description", s_Screen.Description, DbType.String, ParameterDirection.Input),
                    new Parameters("@ScreenUrl", s_Screen.ScreenUrl, DbType.String, ParameterDirection.Input),
                    new Parameters("@ImageUrl", s_Screen.ImageUrl, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsPage", s_Screen.IsPage, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@Sorting", s_Screen.Sorting, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MainTableName", s_Screen.MainTableName, DbType.String, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_Screen_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int screenId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ScreenId", screenId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_Screen_DeleteById", colparameters,
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