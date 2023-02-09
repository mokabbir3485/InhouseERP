using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityEntity;

namespace SecurityDAL
{
    public class ad_PaymentGroupDAO //: IDisposible
    {
        private static volatile ad_PaymentGroupDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_PaymentGroupDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_PaymentGroupDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_PaymentGroupDAO();
                    }

                return instance;
            }
        }

        public static ad_PaymentGroupDAO GetInstance()
        {
            if (instance == null) instance = new ad_PaymentGroupDAO();
            return instance;
        }

        public List<ad_PaymentGroup> GetAllActive()
        {
            try
            {
                var ad_PaymentGroupLst = new List<ad_PaymentGroup>();
                ad_PaymentGroupLst =
                    dbExecutor.FetchData<ad_PaymentGroup>(CommandType.StoredProcedure, "ad_PaymentGroup_GetAllActive");
                return ad_PaymentGroupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

     

        public List<ad_PaymentGroup> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_PaymentGroupLst = new List<ad_PaymentGroup>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_PaymentGroupLst = dbExecutor.FetchData<ad_PaymentGroup>(CommandType.StoredProcedure,
                    "ad_PaymentGroup_GetDynamic", colparameters);
                return ad_PaymentGroupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_PaymentGroup> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_PaymentGroupLst = new List<ad_PaymentGroup>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_PaymentGroupLst = dbExecutor.FetchDataRef<ad_PaymentGroup>(CommandType.StoredProcedure,
                    "ad_PaymentGroup_GetPaged", colparameters, ref rows);
                return ad_PaymentGroupLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_PaymentGroup _ad_PaymentGroup)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@ModuleId", _ad_PaymentGroup.ModuleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PaymentGroupName", _ad_PaymentGroup.PaymentGroupName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_PaymentGroup.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsDefault", _ad_PaymentGroup.IsDefault, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_PaymentGroup.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_PaymentGroup.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_PaymentGroup.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_PaymentGroup.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_PaymentGroup_Create",
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

        public int Update(ad_PaymentGroup _ad_PaymentGroup)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@ModuleId", _ad_PaymentGroup.ModuleId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PaymentGroupId", _ad_PaymentGroup.PaymentGroupId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PaymentGroupName", _ad_PaymentGroup.PaymentGroupName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_PaymentGroup.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@IsDefault", _ad_PaymentGroup.IsDefault, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_PaymentGroup.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_PaymentGroup.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_PaymentGroup_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int PaymentGroupId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PaymentGroupId", PaymentGroupId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_PaymentGroup_DeleteById",
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