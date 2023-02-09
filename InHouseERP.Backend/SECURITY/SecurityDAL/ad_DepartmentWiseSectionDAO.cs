using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_DepartmentWiseSectionDAO //: IDisposible
    {
        private static volatile ad_DepartmentWiseSectionDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_DepartmentWiseSectionDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_DepartmentWiseSectionDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_DepartmentWiseSectionDAO();
                    }

                return instance;
            }
        }

        public static ad_DepartmentWiseSectionDAO GetInstance()
        {
            if (instance == null) instance = new ad_DepartmentWiseSectionDAO();
            return instance;
        }

        public int Add(ad_DepartmentWiseSection ad_DepartmentWiseSection)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@DepartmentId", ad_DepartmentWiseSection.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SectionId", ad_DepartmentWiseSection.SectionId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_DeparmentWiseSection_Create",
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

        public List<ad_DepartmentWiseSection> GetSectionByDepartmentId(int departmentId)
        {
            try
            {
                var ad_SectionLst = new List<ad_DepartmentWiseSection>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DepartmentId", departmentId, DbType.Int32, ParameterDirection.Input)
                };
                ad_SectionLst = dbExecutor.FetchData<ad_DepartmentWiseSection>(CommandType.StoredProcedure,
                    "ad_DeparmentWiseSection_GetByDepartmentId", colparameters);
                return ad_SectionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_DepartmentWiseSection> GetSectionByDepartmentIds(string departmentIds)
        {
            try
            {
                var ad_SectionLst = new List<ad_DepartmentWiseSection>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DepartmentIds", departmentIds, DbType.String, ParameterDirection.Input)
                };
                ad_SectionLst = dbExecutor.FetchData<ad_DepartmentWiseSection>(CommandType.StoredProcedure,
                    "ad_DeparmentWiseSection_GetByDepartmentIds", colparameters);
                return ad_SectionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}