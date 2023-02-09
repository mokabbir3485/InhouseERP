using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_TerminalDAO //: IDisposible
    {
        private static volatile ad_TerminalDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_TerminalDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_TerminalDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_TerminalDAO();
                    }

                return instance;
            }
        }

        public static ad_TerminalDAO GetInstance()
        {
            if (instance == null) instance = new ad_TerminalDAO();
            return instance;
        }

        public List<ad_Terminal> GetAll(int? TerminalId = null)
        {
            try
            {
                var ad_TerminalLst = new List<ad_Terminal>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TerminalId", TerminalId, DbType.Int32, ParameterDirection.Input)
                };
                ad_TerminalLst =
                    dbExecutor.FetchData<ad_Terminal>(CommandType.StoredProcedure, "ad_Terminal_Get", colparameters);
                return ad_TerminalLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Terminal> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_TerminalLst = new List<ad_Terminal>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_TerminalLst = dbExecutor.FetchData<ad_Terminal>(CommandType.StoredProcedure,
                    "ad_Terminal_GetDynamic", colparameters);
                return ad_TerminalLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Terminal> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_TerminalLst = new List<ad_Terminal>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_TerminalLst = dbExecutor.FetchDataRef<ad_Terminal>(CommandType.StoredProcedure,
                    "ad_Terminal_GetPaged", colparameters, ref rows);
                return ad_TerminalLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Terminal _ad_Terminal)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@DepartmentId", _ad_Terminal.DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TerminalName", _ad_Terminal.TerminalName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IpAddress", _ad_Terminal.IpAddress, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Terminal.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_Terminal.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_Terminal.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Terminal.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Terminal.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_Terminal_Create", colparameters,
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

        public int Update(ad_Terminal _ad_Terminal)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@TerminalId", _ad_Terminal.TerminalId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", _ad_Terminal.DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@TerminalName", _ad_Terminal.TerminalName, DbType.String, ParameterDirection.Input),
                    new Parameters("@IpAddress", _ad_Terminal.IpAddress, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Terminal.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Terminal.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Terminal.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Terminal_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int TerminalId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TerminalId", TerminalId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_Terminal_DeleteById", colparameters,
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