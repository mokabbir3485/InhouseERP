using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_ExporterDAO //: IDisposible
    {
        private static volatile exp_ExporterDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_ExporterDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_ExporterDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_ExporterDAO();
                    }

                return instance;
            }
        }

        public static exp_ExporterDAO GetInstance()
        {
            if (instance == null) instance = new exp_ExporterDAO();
            return instance;
        }

        public List<exp_Exporter> GetAll(int? exporterId = null)
        {
            try
            {
                var exp_ExporterLst = new List<exp_Exporter>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ExporterId", exporterId, DbType.Int32, ParameterDirection.Input)
                };
                exp_ExporterLst =
                    dbExecutor.FetchData<exp_Exporter>(CommandType.StoredProcedure, "exp_Exporter_Get", colparameters);
                return exp_ExporterLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Exporter> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_ExporterLst = new List<exp_Exporter>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_ExporterLst = dbExecutor.FetchData<exp_Exporter>(CommandType.StoredProcedure,
                    "exp_Exporter_GetDynamic", colparameters);
                return exp_ExporterLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Exporter> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var exp_ExporterLst = new List<exp_Exporter>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_ExporterLst = dbExecutor.FetchDataRef<exp_Exporter>(CommandType.StoredProcedure,
                    "exp_Exporter_GetPaged", colparameters, ref rows);
                return exp_ExporterLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(exp_Exporter _exp_Exporter)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@ExporterName", _exp_Exporter.ExporterName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ExporterAddress", _exp_Exporter.ExporterAddress, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@TIN", _exp_Exporter.TIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@VatRegNo", _exp_Exporter.VatRegNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@BIN", _exp_Exporter.BIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@TelephoneNo", _exp_Exporter.TelephoneNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@MobileNo", _exp_Exporter.MobileNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Email", _exp_Exporter.Email, DbType.String, ParameterDirection.Input),
                    new Parameters("@Website", _exp_Exporter.Website, DbType.String, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "exp_Exporter_Create",
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

        public int Update(exp_Exporter _exp_Exporter)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@ExporterId", _exp_Exporter.ExporterId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ExporterName", _exp_Exporter.ExporterName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ExporterAddress", _exp_Exporter.ExporterAddress, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@TIN", _exp_Exporter.TIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@VatRegNo", _exp_Exporter.VatRegNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@BIN", _exp_Exporter.BIN, DbType.String, ParameterDirection.Input),
                    new Parameters("@TelephoneNo", _exp_Exporter.TelephoneNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@MobileNo", _exp_Exporter.MobileNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@Email", _exp_Exporter.Email, DbType.String, ParameterDirection.Input),
                    new Parameters("@Website", _exp_Exporter.Website, DbType.String, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_Exporter_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int exporterId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ExporterId", exporterId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_Exporter_DeleteById", colparameters,
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