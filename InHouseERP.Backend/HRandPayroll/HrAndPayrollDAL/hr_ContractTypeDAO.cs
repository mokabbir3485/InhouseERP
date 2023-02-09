using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using HrAndPayrollEntity;

namespace HrAndPayrollDAL
{
    public class hr_ContractTypeDAO //: IDisposible
    {
        private static volatile hr_ContractTypeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public hr_ContractTypeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static hr_ContractTypeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new hr_ContractTypeDAO();
                    }

                return instance;
            }
        }

        public static hr_ContractTypeDAO GetInstance()
        {
            if (instance == null) instance = new hr_ContractTypeDAO();
            return instance;
        }

        public List<hr_ContractType> GetAll()
        {
            try
            {
                var hr_ContractTypeList = new List<hr_ContractType>();
                hr_ContractTypeList =
                    dbExecutor.FetchData<hr_ContractType>(CommandType.StoredProcedure, "hr_ContractType_GetAll");
                return hr_ContractTypeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}