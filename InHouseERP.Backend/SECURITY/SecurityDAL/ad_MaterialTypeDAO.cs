using DbExecutor;
using SecurityDAL;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityDAL
{
    public class ad_MaterialTypeDAO
    {
        private static volatile ad_BondDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_MaterialTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_BondDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_BondDAO();
                    }

                return instance;
            }
        }

        public static ad_BondDAO GetInstance()
        {
            if (instance == null) instance = new ad_BondDAO();
            return instance;
        }

        public int Post(ad_MaterialType _ad_MaterialType)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                  new Parameters("@MaterialTypeId", _ad_MaterialType.MaterialTypeId, DbType.Int32, ParameterDirection.Input),
                  new Parameters("@MaterialTypeName", _ad_MaterialType.MaterialTypeName, DbType.String, ParameterDirection.Input),
                  new Parameters("@MaterialTypeCode", _ad_MaterialType.MaterialTypeCode, DbType.String, ParameterDirection.Input),
                  new Parameters("@MaterialTypeDescription", _ad_MaterialType.MaterialTypeDescription, DbType.String, ParameterDirection.Input),
                  new Parameters("@IsActive", _ad_MaterialType.IsActive, DbType.Boolean, ParameterDirection.Input),
                  new Parameters("@CreatorId", _ad_MaterialType.CreatorId, DbType.Int32, ParameterDirection.Input),
                  new Parameters("@UpdatorId", _ad_MaterialType.UpdatorId, DbType.Int32, ParameterDirection.Input),
                

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_MaterialType_Post",
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

        public List<ad_MaterialType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                var ad_MaterialTypeList = new List<ad_MaterialType>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_MaterialTypeList = dbExecutor.FetchDataRef<ad_MaterialType>(CommandType.StoredProcedure,
                    "ad_MaterialType_GetPaged", colparameters, ref rows);
                return ad_MaterialTypeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_MaterialType> GetAll(int? MaterialTypeId = null)
        {
            try
            {
                var ad_MaterialTypeList = new List<ad_MaterialType>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@MaterialTypeId", MaterialTypeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_MaterialTypeList =
                    dbExecutor.FetchData<ad_MaterialType>(CommandType.StoredProcedure, "ad_MaterialType_Get", colparameters);
                return ad_MaterialTypeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
