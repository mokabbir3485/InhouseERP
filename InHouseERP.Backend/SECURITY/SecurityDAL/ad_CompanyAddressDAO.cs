using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityDAL
{
    public class ad_CompanyAddressDAO //: IDisposible
    {
        private static volatile ad_CompanyAddressDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_CompanyAddressDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_CompanyAddressDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_CompanyAddressDAO();
                    }

                return instance;
            }
        }

        public static ad_CompanyAddressDAO GetInstance()
        {
            if (instance == null) instance = new ad_CompanyAddressDAO();
            return instance;
        }

        public List<ad_CompanyAddress> GetByCompanyId(int companyId)
        {
            try
            {
                var ad_CompanyAddressLst = new List<ad_CompanyAddress>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                };
                ad_CompanyAddressLst = dbExecutor.FetchData<ad_CompanyAddress>(CommandType.StoredProcedure,
                    "ad_CompanyAddress_GetByCompanyId", colparameters);
                return ad_CompanyAddressLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

       

        public List<ad_CompanyAddress> GetCompanyAddresses(int companyId)
        {
            try
            {
                var ad_CompanyAddressLst = new List<ad_CompanyAddress>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                };
                ad_CompanyAddressLst = dbExecutor.FetchData<ad_CompanyAddress>(CommandType.StoredProcedure,
                    "ad_CompanyAddressType_Get", colparameters);
                return ad_CompanyAddressLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public int Add(ad_CompanyAddress _ad_CompanyAddress)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[14]
                {
                    new Parameters("@CompanyId", _ad_CompanyAddress.CompanyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@AddressType", _ad_CompanyAddress.AddressType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@AddressCompanyName", _ad_CompanyAddress.AddressCompanyName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Address", _ad_CompanyAddress.Address, DbType.String, ParameterDirection.Input),
                    new Parameters("@ContactPerson", _ad_CompanyAddress.ContactPerson, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ContactDesignation", _ad_CompanyAddress.ContactDesignation, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Phone", _ad_CompanyAddress.Phone, DbType.String, ParameterDirection.Input),
                    new Parameters("@Mobile", _ad_CompanyAddress.Mobile, DbType.String, ParameterDirection.Input),
                    new Parameters("@Email", _ad_CompanyAddress.Email, DbType.String, ParameterDirection.Input),
                    new Parameters("@Fax", _ad_CompanyAddress.Fax, DbType.String, ParameterDirection.Input),
                    new Parameters("@VatRegNo", _ad_CompanyAddress.VatRegNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@BIN", _ad_CompanyAddress.BIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@TIN", _ad_CompanyAddress.TIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsDefault", _ad_CompanyAddress.IsDefault, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_CompanyAddress_Create",
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