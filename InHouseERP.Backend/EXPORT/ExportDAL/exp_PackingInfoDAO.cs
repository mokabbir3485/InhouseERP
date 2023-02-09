using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using ExportEntity;

namespace ExportDAL
{
    public class exp_PackingInfoDAO //: IDisposible
    {
        private static volatile exp_PackingInfoDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public exp_PackingInfoDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static exp_PackingInfoDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new exp_PackingInfoDAO();
                    }

                return instance;
            }
        }

        public static exp_PackingInfoDAO GetInstance()
        {
            if (instance == null) instance = new exp_PackingInfoDAO();
            return instance;
        }

        public List<exp_PackingInfo> GetAll(long? packingInfoId = null, long? InvoiceId = null)
        {
            try
            {
                var exp_PackingInfoLst = new List<exp_PackingInfo>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PackingInfoId", packingInfoId, DbType.Int32, ParameterDirection.Input)
                };
                exp_PackingInfoLst = dbExecutor.FetchData<exp_PackingInfo>(CommandType.StoredProcedure,
                    "exp_Invoice_PackingInfo_Get", colparameters);
                return exp_PackingInfoLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_PackingInfo> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var exp_PackingInfoLst = new List<exp_PackingInfo>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                exp_PackingInfoLst = dbExecutor.FetchData<exp_PackingInfo>(CommandType.StoredProcedure,
                    "exp_Invoice_PackingInfo_GetDynamic", colparameters);
                return exp_PackingInfoLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_PackingInfo> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var exp_PackingInfoLst = new List<exp_PackingInfo>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                exp_PackingInfoLst = dbExecutor.FetchDataRef<exp_PackingInfo>(CommandType.StoredProcedure,
                    "exp_PackingInfo_GetPaged", colparameters, ref rows);
                return exp_PackingInfoLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_PackingInfo _exp_PackingInfo)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[12]
                {
                    new Parameters("@InvoiceId", _exp_PackingInfo.InvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@TotalCarton", _exp_PackingInfo.TotalCarton, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LabelNetWeight", _exp_PackingInfo.LabelNetWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@LabelGrossWeight", _exp_PackingInfo.LabelGrossWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RibonNetWeight", _exp_PackingInfo.RibonNetWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RibonGrossWeight", _exp_PackingInfo.RibonGrossWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonMeasurement", _exp_PackingInfo.CartonMeasurement, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PortOfLoading", _exp_PackingInfo.PortOfLoading, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PortOfDischarge", _exp_PackingInfo.PortOfDischarge, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FinalDestination", _exp_PackingInfo.FinalDestination, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_PackingInfo.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_PackingInfo.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "exp_Invoice_PackingInfo_Create",
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

        public int Update(exp_PackingInfo _exp_PackingInfo)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@PackingInfoId", _exp_PackingInfo.PackingInfoId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@InvoiceId", _exp_PackingInfo.InvoiceId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@TotalCarton", _exp_PackingInfo.TotalCarton, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LabelNetWeight", _exp_PackingInfo.LabelNetWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@LabelGrossWeight", _exp_PackingInfo.LabelGrossWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RibonNetWeight", _exp_PackingInfo.RibonNetWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RibonGrossWeight", _exp_PackingInfo.RibonGrossWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonMeasurement", _exp_PackingInfo.CartonMeasurement, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PortOfLoading", _exp_PackingInfo.PortOfLoading, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PortOfDischarge", _exp_PackingInfo.PortOfDischarge, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FinalDestination", _exp_PackingInfo.FinalDestination, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_PackingInfo.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_PackingInfo.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_Invoice_PackingInfo_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateCertificateOfOrigin(exp_PackingInfo _exp_PackingInfo)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@PackingInfoId", _exp_PackingInfo.PackingInfoId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PortOfLoading", _exp_PackingInfo.PortOfLoading, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PortOfDischarge", _exp_PackingInfo.PortOfDischarge, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@FinalDestination", _exp_PackingInfo.FinalDestination, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UpdatedBy", _exp_PackingInfo.UpdatedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatedDate", _exp_PackingInfo.UpdatedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "exp_Invoice_PackingInfo_UpdateCertificateOfOrigin", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long packingInfoId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PackingInfoId", packingInfoId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "exp_PackingInfo_DeleteById",
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