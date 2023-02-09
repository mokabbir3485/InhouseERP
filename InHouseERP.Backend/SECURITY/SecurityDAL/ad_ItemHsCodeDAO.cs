using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemHsCodeDAO //: IDisposible
    {
        private static volatile ad_ItemHsCodeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemHsCodeDAO()
        {
            dbExecutor = DBExecutor.GetInstanceThreadSafe;
            //dbExecutor = new DBExecutor();
        }

        public static ad_ItemHsCodeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemHsCodeDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemHsCodeDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemHsCodeDAO();
            return instance;
        }

        public List<ad_ItemHsCode> Get(int? hsCodeId = null)
        {
            try
            {
                var ad_HsCodeList = new List<ad_ItemHsCode>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@HsCodeId", hsCodeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_HsCodeList =
                    dbExecutor.FetchData<ad_ItemHsCode>(CommandType.StoredProcedure, "ad_ItemHsCode_Get",
                        colparameters);
                return ad_HsCodeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}