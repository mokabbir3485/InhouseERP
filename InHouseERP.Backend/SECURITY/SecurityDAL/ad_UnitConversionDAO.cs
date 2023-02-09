using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_UnitConversionDAO
    {
        private readonly DBExecutor dbExecutor = new DBExecutor();

        public List<ad_UnitConversion> GetAll(int? unitId = null)
        {
            try
            {
                var lst = new List<ad_UnitConversion>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@UnitId", unitId, DbType.Int32, ParameterDirection.Input)
                };
                lst = dbExecutor.FetchData<ad_UnitConversion>(CommandType.StoredProcedure, "ad_UnitConversion_Get",
                    colparameters);
                return lst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_UnitConversion ad_UnitConversion)
        {
            try
            {
                //DbCommand oDbCommand = DbProviderHelper.CreateCommand("ad_UnitConversion_Create", CommandType.StoredProcedure);

                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_UnitConversion ad_UnitConversion)
        {
            try
            {
                //DbCommand oDbCommand = DbProviderHelper.CreateCommand("ad_UnitConversion_Update", CommandType.StoredProcedure);

                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int unitId)
        {
            try
            {
                var ret = 0;
                Parameters[] parameters =
                {
                    new Parameters("@UnitId", unitId, DbType.Int32, ParameterDirection.Input)
                };

                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_UnitConversion_DeleteById",
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