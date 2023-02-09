using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_BankDAO //: IDisposible
    {
        private static volatile ad_BankDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_BankDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_BankDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_BankDAO();
                    }

                return instance;
            }
        }

        public static ad_BankDAO GetInstance()
        {
            if (instance == null) instance = new ad_BankDAO();
            return instance;
        }

        public List<ad_Bank> GetAll(int? bankId = null)
        {
            try
            {
                var ad_BankLst = new List<ad_Bank>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BankId", bankId, DbType.Int32, ParameterDirection.Input)
                };
                ad_BankLst = dbExecutor.FetchData<ad_Bank>(CommandType.StoredProcedure, "ad_Bank_Get", colparameters);
                return ad_BankLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Bank> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_BankLst = new List<ad_Bank>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_BankLst =
                    dbExecutor.FetchData<ad_Bank>(CommandType.StoredProcedure, "ad_Bank_GetDynamic", colparameters);
                return ad_BankLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Bank> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_BankLst = new List<ad_Bank>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_BankLst = dbExecutor.FetchDataRef<ad_Bank>(CommandType.StoredProcedure, "ad_Bank_GetPaged",
                    colparameters, ref rows);
                return ad_BankLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Bank _ad_Bank)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@BankName", _ad_Bank.BankName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Description", _ad_Bank.Description, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Bank.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_Bank.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_Bank.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Bank.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Bank.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_Bank_Create", colparameters,
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

        public int Update(ad_Bank _ad_Bank)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@BankId", _ad_Bank.BankId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@BankName", _ad_Bank.BankName, DbType.String, ParameterDirection.Input),
                    new Parameters("@Description", _ad_Bank.Description, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Bank.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Bank.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Bank.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Bank_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int bankId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BankId", bankId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Bank_DeleteById", colparameters,
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