using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_TypeWiseBranchDAO
    {
        private readonly DBExecutor dbExecutor = new DBExecutor();

        public List<ad_TypeWiseBranch> GetAll(int? typeWiseBranchId = null)
        {
            try
            {
                var lst = new List<ad_TypeWiseBranch>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TypeWiseBranchId", typeWiseBranchId, DbType.Int32, ParameterDirection.Input)
                };
                lst = dbExecutor.FetchData<ad_TypeWiseBranch>(CommandType.StoredProcedure, "ad_TypeWiseBranch_Get",
                    colparameters);
                return lst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_TypeWiseBranch ad_TypeWiseBranch)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@BranchId", ad_TypeWiseBranch.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BranchTypeId", ad_TypeWiseBranch.BranchTypeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_TypeWiseBranch_Create",
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

        public int Update(ad_TypeWiseBranch ad_TypeWiseBranch)
        {
            try
            {
                var ret = 0;
                var parameters = new Parameters[3]
                {
                    new Parameters("@TypeWiseBranchId", ad_TypeWiseBranch.TypeWiseBranchId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@BranchId", ad_TypeWiseBranch.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BranchTypeId", ad_TypeWiseBranch.BranchTypeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_TypeWiseBranch_Update", parameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int typeWiseBranchId)
        {
            try
            {
                var ret = 0;
                Parameters[] parameters =
                {
                    new Parameters("@TypeWiseBranchId", typeWiseBranchId, DbType.Int32, ParameterDirection.Input)
                };

                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_TypeWiseBranch_DeleteById",
                    parameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}