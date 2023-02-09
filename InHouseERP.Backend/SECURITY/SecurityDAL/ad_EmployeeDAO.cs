using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_EmployeeDAO //: IDisposible
    {
        private static volatile ad_EmployeeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_EmployeeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_EmployeeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_EmployeeDAO();
                    }

                return instance;
            }
        }

        public static ad_EmployeeDAO GetInstance()
        {
            if (instance == null) instance = new ad_EmployeeDAO();
            return instance;
        }

        public List<ad_Employee> GetEmployeeByRefEmployeeId(int? RefEmployeeId = null)
        {
            try
            {
                var ad_EmployeeLst = new List<ad_Employee>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RefEmployeeId", RefEmployeeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_EmployeeLst = dbExecutor.FetchData<ad_Employee>(CommandType.StoredProcedure,
                    "ad_Employee_GetByRefEmployeeId", colparameters);
                return ad_EmployeeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetAll(int? EmployeeId = null, int? DesignationId = null)
        {
            try
            {
                var ad_EmployeeLst = new List<ad_Employee>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@EmployeeId", EmployeeId, DbType.Int32, ParameterDirection.Input)
                };
                ad_EmployeeLst =
                    dbExecutor.FetchData<ad_Employee>(CommandType.StoredProcedure, "ad_Employee_Get", colparameters);
                return ad_EmployeeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_EmployeeLst = new List<ad_Employee>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_EmployeeLst = dbExecutor.FetchData<ad_Employee>(CommandType.StoredProcedure,
                    "ad_Employee_GetDynamic", colparameters);
                return ad_EmployeeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_EmployeeLst = new List<ad_Employee>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_EmployeeLst = dbExecutor.FetchDataRef<ad_Employee>(CommandType.StoredProcedure,
                    "ad_Employee_GetPaged", colparameters, ref rows);
                return ad_EmployeeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetForShiftEntry(int branchId, DateTime from, DateTime to)
        {
            try
            {
                var ad_EmployeeLst = new List<ad_Employee>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@BranchId", branchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@fdt", from, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@tdt", to, DbType.DateTime, ParameterDirection.Input)
                };
                ad_EmployeeLst = dbExecutor.FetchData<ad_Employee>(CommandType.StoredProcedure,
                    "ad_Employee_GetForShiftEntry", colparameters);
                return ad_EmployeeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Employee> GetEmployeeEmailByDocumentRef(int refEmployeeId, int? PaymentProcessTypeId = null)
        {
            try
            {
                var ad_EmployeeLst = new List<ad_Employee>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RefEmployeeId", refEmployeeId, DbType.Int32, ParameterDirection.Input)
                    //new Parameters("@PaymentProcessTypeId", PaymentProcessTypeId, DbType.Int32
                    //    , ParameterDirection.Input)
                };
                ad_EmployeeLst = dbExecutor.FetchData<ad_Employee>(CommandType.StoredProcedure,
                    "ad_Employee_GetByDocumentRef", colparameters);
                return ad_EmployeeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int Add(ad_Employee _ad_Employee)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[27]
                {
                    new Parameters("@DepartmentId", _ad_Employee.DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DesignationId", _ad_Employee.DesignationId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Title", _ad_Employee.Title, DbType.String, ParameterDirection.Input),
                    new Parameters("@FirstName", _ad_Employee.FirstName, DbType.String, ParameterDirection.Input),
                    new Parameters("@MiddleName", _ad_Employee.MiddleName, DbType.String, ParameterDirection.Input),
                    new Parameters("@LastName", _ad_Employee.LastName, DbType.String, ParameterDirection.Input),
                    new Parameters("@EmployeeCode", _ad_Employee.EmployeeCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@ContactNo", _ad_Employee.ContactNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Email", _ad_Employee.Email, DbType.String, ParameterDirection.Input),
                    new Parameters("@Gender", _ad_Employee.Gender, DbType.String, ParameterDirection.Input),
                    new Parameters("@PresentAddress", _ad_Employee.PresentAddress, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DateOfBirth", _ad_Employee.DateOfBirth, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@IsUser", _ad_Employee.IsUser, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ContractTypeId", _ad_Employee.ContractTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SectionId", _ad_Employee.SectionId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_Employee.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_Employee.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Employee.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Employee.UpdateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Employee.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ManagerId", _ad_Employee.ManagerId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@GradeId", _ad_Employee.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BloodGroup", _ad_Employee.BloodGroup, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsFlexibleOnTime", _ad_Employee.IsFlexibleOnTime, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsFlexibleOnDate", _ad_Employee.IsFlexibleOnDate, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@BasicSalary", _ad_Employee.BasicSalary, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@JoiningDate", _ad_Employee.JoiningDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_Employee_Create", colparameters,
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

        public int Update(ad_Employee _ad_Employee)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[27]
                {
                    new Parameters("@EmployeeId", _ad_Employee.EmployeeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _ad_Employee.DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DesignationId", _ad_Employee.DesignationId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Title", _ad_Employee.Title, DbType.String, ParameterDirection.Input),
                    new Parameters("@FirstName", _ad_Employee.FirstName, DbType.String, ParameterDirection.Input),
                    new Parameters("@MiddleName", _ad_Employee.MiddleName, DbType.String, ParameterDirection.Input),
                    new Parameters("@LastName", _ad_Employee.LastName, DbType.String, ParameterDirection.Input),
                    new Parameters("@EmployeeCode", _ad_Employee.EmployeeCode, DbType.String, ParameterDirection.Input),
                    new Parameters("@ContactNo", _ad_Employee.ContactNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Email", _ad_Employee.Email, DbType.String, ParameterDirection.Input),
                    new Parameters("@Gender", _ad_Employee.Gender, DbType.String, ParameterDirection.Input),
                    new Parameters("@PresentAddress", _ad_Employee.PresentAddress, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@DateOfBirth", _ad_Employee.DateOfBirth, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@IsUser", _ad_Employee.IsUser, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ContractTypeId", _ad_Employee.ContractTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SectionId", _ad_Employee.SectionId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Employee.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Employee.UpdateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Employee.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ManagerId", _ad_Employee.ManagerId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@GradeId", _ad_Employee.GradeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BloodGroup", _ad_Employee.BloodGroup, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsFlexibleOnTime", _ad_Employee.IsFlexibleOnTime, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsFlexibleOnDate", _ad_Employee.IsFlexibleOnDate, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@BasicSalary", _ad_Employee.BasicSalary, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@JoiningDate", _ad_Employee.JoiningDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@FinishDate", _ad_Employee.FinishDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Employee_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int EmployeeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@EmployeeId", EmployeeId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Employee_DeleteById", colparameters,
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