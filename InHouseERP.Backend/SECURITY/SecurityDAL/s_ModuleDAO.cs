using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class s_ModuleDAO //: IDisposible
    {
        private static volatile s_ModuleDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public s_ModuleDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static s_ModuleDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new s_ModuleDAO();
                    }

                return instance;
            }
        }

        public static s_ModuleDAO GetInstance()
        {
            if (instance == null) instance = new s_ModuleDAO();
            return instance;
        }

        public List<s_Module> GetByDomainId(int? domainId = null)
        {
            try
            {
                var s_ModuleLst = new List<s_Module>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DomainId", domainId, DbType.Int32, ParameterDirection.Input)
                };
                s_ModuleLst = dbExecutor.FetchData<s_Module>(CommandType.StoredProcedure, "s_Module_GetByDomainId",
                    colparameters);
                return s_ModuleLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<s_ScreenDetail> GetAllFunction()
        {
            try
            {
                var FunctionLst = new List<s_ScreenDetail>();

                FunctionLst = dbExecutor.FetchData<s_ScreenDetail>(CommandType.StoredProcedure, "s_ScreenFunction_GetAll ",
                    null);
                return FunctionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_Module> GetActive()
        {
            try
            {
                var s_ModuleLst = new List<s_Module>();
                s_ModuleLst = dbExecutor.FetchData<s_Module>(CommandType.StoredProcedure, "s_Module_GetActive");
                return s_ModuleLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_Module> GetExAdminSecurity()
        {
            try
            {
                var s_ModuleLst = new List<s_Module>();
                s_ModuleLst =
                    dbExecutor.FetchData<s_Module>(CommandType.StoredProcedure, "s_Module_GetExAdminSecurity");
                return s_ModuleLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_Module s_Module)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@DomainId", s_Module.DomainId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ModuleName", s_Module.ModuleName, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", s_Module.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", s_Module.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", s_Module.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", s_Module.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "s_Module_Create", colparameters,
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

        public int Update(s_Module s_Module)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@ModuleId", s_Module.ModuleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DomainId", s_Module.DomainId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ModuleName", s_Module.ModuleName, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", s_Module.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", s_Module.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_Module_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int moduleId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ModuleId", moduleId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "s_Module_DeleteById", colparameters,
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