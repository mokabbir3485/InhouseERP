using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemStateDAO //: IDisposible
    {
        private static volatile ad_ItemStateDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemStateDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ItemStateDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemStateDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemStateDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemStateDAO();
            return instance;
        }

        public List<ad_ItemState> GetAll(int? itemStateId = null)
        {
            try
            {
                var ad_ItemStateLst = new List<ad_ItemState>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemStateId", itemStateId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemStateLst =
                    dbExecutor.FetchData<ad_ItemState>(CommandType.StoredProcedure, "ad_ItemState_Get", colparameters);
                return ad_ItemStateLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemState ad_ItemState)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ItemStateName", ad_ItemState.ItemStateName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsFixed", ad_ItemState.IsFixed, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ItemState_Create",
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

        public int Update(ad_ItemState ad_ItemState)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ItemStateId", ad_ItemState.ItemStateId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemStateName", ad_ItemState.ItemStateName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsFixed", ad_ItemState.IsFixed, DbType.Boolean, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemState_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int itemStateId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemStateId", itemStateId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemState_DeleteById", colparameters,
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