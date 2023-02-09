using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_BranchGroupDAO
    {
        private readonly DBExecutor dbExecutor;

        public ad_BranchGroupDAO()
        {
            dbExecutor = DBExecutor.GetInstanceThreadSafe; // single tone instance
        }

        public List<ad_BranchGroup> GetAll(int? groupId = null)
        {
            try
            {
                var lst = new List<ad_BranchGroup>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@GroupId", groupId, DbType.Int32, ParameterDirection.Input)
                };
                lst = dbExecutor.FetchData<ad_BranchGroup>(CommandType.StoredProcedure, "ad_BranchGroup_Get",
                    colparameters);
                return lst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_BranchGroup _ad_BranchGroup)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[1]
                {
                    new Parameters("@GroupName", _ad_BranchGroup.GroupName, DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_BranchGroup_Create",
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