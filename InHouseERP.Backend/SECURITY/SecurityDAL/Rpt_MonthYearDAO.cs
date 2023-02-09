using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class Rpt_MonthYearDAO //: IDisposible
    {
        private static volatile Rpt_MonthYearDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public Rpt_MonthYearDAO()
        {
            dbExecutor = DBExecutor.GetInstanceThreadSafe;
            //dbExecutor = new DBExecutor();
        }

        public static Rpt_MonthYearDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new Rpt_MonthYearDAO();
                    }

                return instance;
            }
        }

        public static Rpt_MonthYearDAO GetInstance()
        {
            if (instance == null) instance = new Rpt_MonthYearDAO();
            return instance;
        }

        public List<Rpt_MonthYear> Get()
        {
            try
            {
                var monthYearList = new List<Rpt_MonthYear>();
                monthYearList = dbExecutor.FetchData<Rpt_MonthYear>(CommandType.StoredProcedure, "GetRpt_MonthYear");
                return monthYearList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}