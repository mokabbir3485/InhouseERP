using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using DbExecutor;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityEntity.SECURITY.SecurityDAL
{
   public class ad_FiscalYearDAO
    {
        private static volatile ad_FiscalYearDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_FiscalYearDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_FiscalYearDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_FiscalYearDAO();
                    }

                return instance;
            }
        }

        public static ad_FiscalYearDAO GetInstance()
        {
            if (instance == null) instance = new ad_FiscalYearDAO();
            return instance;
        }


        public int Post(ad_FiscalYear _ad_FiscalYear)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@FiscalYearId", _ad_FiscalYear.FiscalYearId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BranchId", _ad_FiscalYear.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@FromDate", _ad_FiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", _ad_FiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@FiscalYearName", _ad_FiscalYear.FiscalYearName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_FiscalYear.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_FiscalYear.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_FiscalYear.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_FiscalYear.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_FiscalYear.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_FiscalYearSetup_Post",
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


        public List<ad_FiscalYear> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_FiscalYearList = new List<ad_FiscalYear>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_FiscalYearList = dbExecutor.FetchDataRef<ad_FiscalYear>(CommandType.StoredProcedure,
                    "ad_FiscalYearSetup_GetPaged", colparameters, ref rows);
                return ad_FiscalYearList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_FiscalYear> GetAll(Int32? FiscalYearId = null)
        {
            try
            {
                var ad_FiscalYearList = new List<ad_FiscalYear>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@FiscalYearId", FiscalYearId, DbType.Int32, ParameterDirection.Input)
                };
                ad_FiscalYearList = dbExecutor.FetchData<ad_FiscalYear>(CommandType.StoredProcedure,
                    "ad_FiscalYearSetup_Get", colparameters);
                return ad_FiscalYearList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_FiscalYear> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_FiscalYearList = new List<ad_FiscalYear>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_FiscalYearList = dbExecutor.FetchData<ad_FiscalYear>(CommandType.StoredProcedure, "ad_FiscalYearSetup_GetDynamic",
                    colparameters);
                return ad_FiscalYearList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
