using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityDAL
{
    public class ad_CompanyDAO //: IDisposible
    {
        private static volatile ad_CompanyDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_CompanyDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_CompanyDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_CompanyDAO();
                    }

                return instance;
            }
        }

        public static ad_CompanyDAO GetInstance()
        {
            if (instance == null) instance = new ad_CompanyDAO();
            return instance;
        }

        public List<ad_Company> GetCompanyIdByDetail(string companyName, string contactPerson, string contactNo,
            string email)
        {
            try
            {
                var ad_CompanyLst = new List<ad_Company>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@CompanyName", companyName, DbType.String, ParameterDirection.Input),
                    new Parameters("@ContactPerson", contactPerson, DbType.String, ParameterDirection.Input),
                    new Parameters("@ContactNo", contactNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Email", email, DbType.String, ParameterDirection.Input)
                };
                ad_CompanyLst = dbExecutor.FetchData<ad_Company>(CommandType.StoredProcedure,
                    "ad_Company_GetCompanyIdByDetail", colparameters);
                return ad_CompanyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        public List<ad_CompanyAddress> GetCompanyBillDeliveryAddressByCompanyId(Int32 companyId)
        {
            try
            {
                var ad_CompanyLst = new List<ad_CompanyAddress>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                };
                ad_CompanyLst =
                    dbExecutor.FetchData<ad_CompanyAddress>(CommandType.StoredProcedure, "ad_CompanyAddress_GetByCompanyId", colparameters);
                return ad_CompanyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        public List<ad_Company> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_CompanyLst = new List<ad_Company>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_CompanyLst = dbExecutor.FetchData<ad_Company>(CommandType.StoredProcedure, "ad_Company_GetDynamic",
                    colparameters);
                return ad_CompanyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_Organization> GetAllOrgnazition(int? OrnazationId=null)
        {
            try
            {
                var ad_OrganizationLst = new List<ad_Organization>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@OrganizationId",OrnazationId, DbType.Int32, ParameterDirection.Input)
                };
                ad_OrganizationLst =
                    dbExecutor.FetchData<ad_Organization>(CommandType.StoredProcedure,
                        "ad_Organization_Get", colparameters);
                return ad_OrganizationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_Company> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_CompanyLst = new List<ad_Company>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_CompanyLst = dbExecutor.FetchDataRef<ad_Company>(CommandType.StoredProcedure, "ad_Company_GetPaged",
                    colparameters, ref rows);
                return ad_CompanyLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Company _ad_Company)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[11]
                {
                    new Parameters("@CompanyTypeId", _ad_Company.CompanyTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RefEmployeeId", _ad_Company.RefEmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CompanyCode", _ad_Company.CompanyCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@CompanyName", _ad_Company.CompanyName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Web", _ad_Company.Web, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Company.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsPayable", _ad_Company.IsPayable, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_Company.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_Company.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Company.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Company.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_Company_Create", colparameters,
                    true);
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
        public int CompanyWiseSupplierPost(ad_Company _ad_Company)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@CompanyWiseSupplierId", _ad_Company.CompanyWiseSupplierId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SupplierId", _ad_Company.SupplierId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CompanyId", _ad_Company.CompanyId, DbType.Int32, ParameterDirection.Input),
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_CompanyWiseSupplier_Post", colparameters,
                    true);
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

        public int Update(ad_Company _ad_Company)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@CompanyId", _ad_Company.CompanyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CompanyTypeId", _ad_Company.CompanyTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RefEmployeeId", _ad_Company.RefEmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CompanyCode", _ad_Company.CompanyCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@CompanyName", _ad_Company.CompanyName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Web", _ad_Company.Web, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Company.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsPayable", _ad_Company.IsPayable, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Company.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Company.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_Company_Update", colparameters,
                    true);
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

        public int Delete(int companyId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId", companyId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Company_DeleteById", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}