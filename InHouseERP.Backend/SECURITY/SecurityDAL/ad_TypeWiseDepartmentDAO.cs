using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_TypeWiseDepartmentDAO //: IDisposible
    {
        private static volatile ad_TypeWiseDepartmentDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_TypeWiseDepartmentDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_TypeWiseDepartmentDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_TypeWiseDepartmentDAO();
                    }

                return instance;
            }
        }

        public static ad_TypeWiseDepartmentDAO GetInstance()
        {
            if (instance == null) instance = new ad_TypeWiseDepartmentDAO();
            return instance;
        }

        public List<ad_TypeWiseDepartment> GetByDepartmentId(int DepartmentId)
        {
            try
            {
                var ad_TypeWiseDepartmentLst = new List<ad_TypeWiseDepartment>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input)
                };
                ad_TypeWiseDepartmentLst = dbExecutor.FetchData<ad_TypeWiseDepartment>(CommandType.StoredProcedure,
                    "ad_TypeWiseDepartment_GetByDepartmentId", colparameters);
                return ad_TypeWiseDepartmentLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_TypeWiseDepartment ad_TypeWiseDepartment)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@DepartmentId", ad_TypeWiseDepartment.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentTypeId", ad_TypeWiseDepartment.DepartmentTypeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_TypeWiseDepartment_Create",
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

        //public int Update(ad_TypeWiseDepartment ad_TypeWiseDepartment)
        //{
        //    int ret = 0;
        //    try
        //    {
        //        Parameters[] colparameters = new Parameters[3]{
        //        new Parameters("@DptDepartmentTypeId", ad_TypeWiseDepartment.DptDepartmentTypeId, DbType.Int32, ParameterDirection.Input),
        //        new Parameters("@DepartmentId", ad_TypeWiseDepartment.DepartmentId, DbType.Int32, ParameterDirection.Input),
        //        new Parameters("@DepartmentTypeId", ad_TypeWiseDepartment.DepartmentTypeId, DbType.Int32, ParameterDirection.Input)
        //        };
        //        ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_TypeWiseDepartment_Update", colparameters, true);
        //    return ret;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        //public int Delete(Int32 DptDepartmentTypeId)
        //{
        //    try
        //    {
        //        int ret = 0;
        //        Parameters[] colparameters = new Parameters[1]{
        //        new Parameters("@DptDepartmentTypeId", DptDepartmentTypeId, DbType.Int32, ParameterDirection.Input)
        //        };
        //        ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_TypeWiseDepartment_DeleteById", colparameters, true);
        //        return ret;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
    }
}