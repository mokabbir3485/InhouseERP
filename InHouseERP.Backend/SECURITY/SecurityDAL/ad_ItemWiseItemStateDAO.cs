using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemWiseItemStateDAO //: IDisposible
    {
        private static volatile ad_ItemWiseItemStateDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemWiseItemStateDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ItemWiseItemStateDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemWiseItemStateDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemWiseItemStateDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemWiseItemStateDAO();
            return instance;
        }

        public List<ad_ItemWiseItemState> GetByItemId(int ItemId)
        {
            try
            {
                var ad_ItemWiseItemStateLst = new List<ad_ItemWiseItemState>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemWiseItemStateLst = dbExecutor.FetchData<ad_ItemWiseItemState>(CommandType.StoredProcedure,
                    "ad_ItemWiseItemState_GetByItemId", colparameters);
                return ad_ItemWiseItemStateLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemWiseItemState ad_ItemWiseItemState)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ItemId", ad_ItemWiseItemState.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemStateId", ad_ItemWiseItemState.ItemStateId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ItemWiseItemState_Create",
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

        public int Update(ad_ItemWiseItemState ad_ItemWiseItemState)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ItemWiseItemStateId", ad_ItemWiseItemState.ItemWiseItemStateId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", ad_ItemWiseItemState.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemStateId", ad_ItemWiseItemState.ItemStateId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemWiseItemState_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int itemWiseItemStateId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemWiseItemStateId", itemWiseItemStateId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemWiseItemState_DeleteById",
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