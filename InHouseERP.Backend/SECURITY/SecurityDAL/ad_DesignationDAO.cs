using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_DesignationDAO //: IDisposible
    {
        private static volatile ad_DesignationDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_DesignationDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_DesignationDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_DesignationDAO();
                    }

                return instance;
            }
        }

        public static ad_DesignationDAO GetInstance()
        {
            if (instance == null) instance = new ad_DesignationDAO();
            return instance;
        }

        public List<ad_Designation> GetAll(int? designationId = null)
        {
            try
            {
                var ad_DesignationLst = new List<ad_Designation>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DesignationId", designationId, DbType.Int32, ParameterDirection.Input)
                };
                ad_DesignationLst = dbExecutor.FetchData<ad_Designation>(CommandType.StoredProcedure,
                    "ad_Designation_Get", colparameters);
                return ad_DesignationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Designation> GetByDepartmentId(int DepartmentId)
        {
            try
            {
                var ad_DesignationLst = new List<ad_Designation>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input)
                };
                ad_DesignationLst = dbExecutor.FetchData<ad_Designation>(CommandType.StoredProcedure,
                    "ad_Designation_GetByDepartmentId", colparameters);
                return ad_DesignationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Designation> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_DesignationLst = new List<ad_Designation>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_DesignationLst = dbExecutor.FetchData<ad_Designation>(CommandType.StoredProcedure,
                    "ad_Designation_GetDynamic", colparameters);
                return ad_DesignationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Designation> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_DesignationLst = new List<ad_Designation>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_DesignationLst = dbExecutor.FetchDataRef<ad_Designation>(CommandType.StoredProcedure,
                    "ad_Designation_GetPaged", colparameters, ref rows);
                return ad_DesignationLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Designation ad_Designation)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@DepartmentId", ad_Designation.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DesignationName", ad_Designation.DesignationName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ContactNo", ad_Designation.ContactNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@SerialNo", ad_Designation.SerialNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsActive", ad_Designation.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", ad_Designation.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", ad_Designation.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_Designation.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_Designation.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_Designation_Create",
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

        public int Update(ad_Designation ad_Designation)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@DesignationId", ad_Designation.DesignationId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", ad_Designation.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DesignationName", ad_Designation.DesignationName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ContactNo", ad_Designation.ContactNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@SerialNo", ad_Designation.SerialNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsActive", ad_Designation.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", ad_Designation.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", ad_Designation.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Designation_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int designationId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@DesignationId", designationId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Designation_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}