using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_SectionDAO //: IDisposible
    {
        private static volatile ad_SectionDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_SectionDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_SectionDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_SectionDAO();
                    }

                return instance;
            }
        }

        public static ad_SectionDAO GetInstance()
        {
            if (instance == null) instance = new ad_SectionDAO();
            return instance;
        }

        public List<ad_Section> GetAll(int? sectionId = null)
        {
            try
            {
                var ad_SectionLst = new List<ad_Section>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SectionId", sectionId, DbType.Int32, ParameterDirection.Input)
                };
                ad_SectionLst =
                    dbExecutor.FetchData<ad_Section>(CommandType.StoredProcedure, "ad_section_Get", colparameters);
                return ad_SectionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}