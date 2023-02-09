using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_SupplierAddressDAO
    {
        private readonly DBExecutor dbExecutor;

        public ad_SupplierAddressDAO()
        {
            dbExecutor = new DBExecutor();
        }

        public List<ad_SupplierAddress> GetAll(int? SupplierId = null)
        {
            try
            {
                var ad_SupplierAddressLst = new List<ad_SupplierAddress>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input)
                };
                ad_SupplierAddressLst = dbExecutor.FetchData<ad_SupplierAddress>(CommandType.StoredProcedure,
                    "ad_SupplierAddress_Get", colparameters);
                return ad_SupplierAddressLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_SupplierAddress> GetBySupplierId(int SupplierId)
        {
            try
            {
                var lst = new List<ad_SupplierAddress>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input)
                };
                lst = dbExecutor.FetchData<ad_SupplierAddress>(CommandType.StoredProcedure,
                    "ad_SupplierAddress_GetBySupplierId", colparameters);
                return lst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_SupplierAddress ad_SupplierAddress)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[15]
                {
                    new Parameters("@SupplierId", ad_SupplierAddress.SupplierId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@AddressType", ad_SupplierAddress.AddressType, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Address", ad_SupplierAddress.Address, DbType.String, ParameterDirection.Input),
                    new Parameters("@ContactPerson", ad_SupplierAddress.ContactPerson, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ContactDesignation", ad_SupplierAddress.ContactDesignation, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Phone", ad_SupplierAddress.Phone, DbType.String, ParameterDirection.Input),
                    new Parameters("@Mobile", ad_SupplierAddress.Mobile, DbType.String, ParameterDirection.Input),
                    new Parameters("@Email", ad_SupplierAddress.Email, DbType.String, ParameterDirection.Input),
                    new Parameters("@Port", ad_SupplierAddress.Port, DbType.String, ParameterDirection.Input),
                    new Parameters("@Fax", ad_SupplierAddress.Fax, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsDefault", ad_SupplierAddress.IsDefault, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", ad_SupplierAddress.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", ad_SupplierAddress.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_SupplierAddress.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_SupplierAddress.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_SupplierAddress_Create",
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