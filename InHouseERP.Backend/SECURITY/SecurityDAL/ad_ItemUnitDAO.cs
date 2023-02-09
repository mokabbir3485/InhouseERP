using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_ItemUnitDAO //: IDisposible
    {
        private static volatile ad_ItemUnitDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_ItemUnitDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_ItemUnitDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_ItemUnitDAO();
                    }

                return instance;
            }
        }

        public static ad_ItemUnitDAO GetInstance()
        {
            if (instance == null) instance = new ad_ItemUnitDAO();
            return instance;
        }

        public List<ad_ItemUnit> GetAll(int? ItemUnitId = null)
        {
            try
            {
                var ad_ItemUnitLst = new List<ad_ItemUnit>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemUnitId", ItemUnitId, DbType.Int32, ParameterDirection.Input)
                };
                ad_ItemUnitLst =
                    dbExecutor.FetchData<ad_ItemUnit>(CommandType.StoredProcedure, "ad_ItemUnit_Get", colparameters);
                return ad_ItemUnitLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemUnit> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var ad_ItemUnitLst = new List<ad_ItemUnit>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                ad_ItemUnitLst = dbExecutor.FetchData<ad_ItemUnit>(CommandType.StoredProcedure,
                    "ad_ItemUnit_GetDynamic", colparameters);
                return ad_ItemUnitLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemUnit> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_ItemUnitLst = new List<ad_ItemUnit>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_ItemUnitLst = dbExecutor.FetchDataRef<ad_ItemUnit>(CommandType.StoredProcedure,
                    "ad_ItemUnit_GetPaged", colparameters, ref rows);
                return ad_ItemUnitLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemUnit _ad_ItemUnit)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[7]
                {
                    new Parameters("@UnitName", _ad_ItemUnit.UnitName, DbType.String, ParameterDirection.Input),
                    new Parameters("@UnitFor", _ad_ItemUnit.UnitFor, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_ItemUnit.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_ItemUnit.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_ItemUnit.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_ItemUnit.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_ItemUnit.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_ItemUnit_Create", colparameters,
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

        public int Update(ad_ItemUnit _ad_ItemUnit)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[6]
                {
                    new Parameters("@ItemUnitId", _ad_ItemUnit.ItemUnitId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UnitName", _ad_ItemUnit.UnitName, DbType.String, ParameterDirection.Input),
                    new Parameters("@UnitFor", _ad_ItemUnit.UnitFor, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_ItemUnit.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_ItemUnit.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_ItemUnit.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemUnit_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int ItemUnitId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemUnitId", ItemUnitId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_ItemUnit_DeleteById", colparameters,
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