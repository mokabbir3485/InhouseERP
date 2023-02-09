using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_RequisitionPurposeDAO //: IDisposible
    {
        private static volatile ad_RequisitionPurposeDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_RequisitionPurposeDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_RequisitionPurposeDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_RequisitionPurposeDAO();
                    }

                return instance;
            }
        }

        public static ad_RequisitionPurposeDAO GetInstance()
        {
            if (instance == null) instance = new ad_RequisitionPurposeDAO();
            return instance;
        }

        public List<ad_RequisitionPurpose> GetAll(int? RequisitionPurposeId = null)
        {
            try
            {
                var ad_RequisitionPurposeLst = new List<ad_RequisitionPurpose>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RequisitionPurposeId", RequisitionPurposeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ad_RequisitionPurposeLst = dbExecutor.FetchData<ad_RequisitionPurpose>(CommandType.StoredProcedure,
                    "ad_RequisitionPurpose_Get", colparameters);
                return ad_RequisitionPurposeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_RequisitionPurpose> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_RequisitionPurposeLst = new List<ad_RequisitionPurpose>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_RequisitionPurposeLst = dbExecutor.FetchData<ad_RequisitionPurpose>(CommandType.StoredProcedure,
                    "ad_RequisitionPurpose_GetDynamic", colparameters);
                return ad_RequisitionPurposeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_RequisitionPurpose> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var ad_RequisitionPurposeLst = new List<ad_RequisitionPurpose>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_RequisitionPurposeLst = dbExecutor.FetchDataRef<ad_RequisitionPurpose>(CommandType.StoredProcedure,
                    "ad_RequisitionPurpose_GetPaged", colparameters, ref rows);
                return ad_RequisitionPurposeLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_RequisitionPurpose _ad_RequisitionPurpose)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@RequisitionPurposeName", _ad_RequisitionPurpose.RequisitionPurposeName,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_RequisitionPurpose.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_RequisitionPurpose.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_RequisitionPurpose.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_RequisitionPurpose.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_RequisitionPurpose.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_RequisitionPurpose_Create",
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

        public int Update(ad_RequisitionPurpose _ad_RequisitionPurpose)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@RequisitionPurposeId", _ad_RequisitionPurpose.RequisitionPurposeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionPurposeName", _ad_RequisitionPurpose.RequisitionPurposeName,
                        DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_RequisitionPurpose.IsActive, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_RequisitionPurpose.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_RequisitionPurpose.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_RequisitionPurpose_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int RequisitionPurposeId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RequisitionPurposeId", RequisitionPurposeId, DbType.Int32,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_RequisitionPurpose_DeleteById",
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