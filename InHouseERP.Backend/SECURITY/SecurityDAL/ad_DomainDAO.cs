using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_DomainDAO //: IDisposible
    {
        private static volatile ad_DomainDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_DomainDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_DomainDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_DomainDAO();
                    }

                return instance;
            }
        }

        public static ad_DomainDAO GetInstance()
        {
            if (instance == null) instance = new ad_DomainDAO();
            return instance;
        }

        public List<ad_Domain> GetAll(int? domainId = null)
        {
            try
            {
                var ad_DomainLst = new List<ad_Domain>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DomainId", domainId, DbType.Int32, ParameterDirection.Input)
                };
                ad_DomainLst =
                    dbExecutor.FetchData<ad_Domain>(CommandType.StoredProcedure, "ad_Domain_Get", colparameters);
                return ad_DomainLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Domain ad_Domain)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@GroupId", ad_Domain.GroupId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DomainName", ad_Domain.DomainName, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", ad_Domain.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", ad_Domain.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_Domain.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_Domain.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_Domain_Create", colparameters,
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

        public int Update(ad_Domain ad_Domain)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@DomainId", ad_Domain.DomainId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@GroupId", ad_Domain.GroupId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DomainName", ad_Domain.DomainName, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_Domain.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_Domain.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Domain_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int domainId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DomainId", domainId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Domain_DeleteById", colparameters,
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