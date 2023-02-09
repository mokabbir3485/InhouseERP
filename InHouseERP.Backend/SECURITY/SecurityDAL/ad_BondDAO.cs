using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using SecurityEntity;

namespace SecurityDAL
{
    public class ad_BondDAO
    {
        private static volatile ad_BondDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public ad_BondDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static ad_BondDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new ad_BondDAO();
                    }

                return instance;
            }
        }

        public static ad_BondDAO GetInstance()
        {
            if (instance == null) instance = new ad_BondDAO();
            return instance;
        }


        public int Post(ad_CustomBond _ad_Bond)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@BondId", _ad_Bond.BondId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@BondNo", _ad_Bond.BondNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsActive", _ad_Bond.IsActive, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@BondDate", _ad_Bond.BondDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@CreatorId", _ad_Bond.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _ad_Bond.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _ad_Bond.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _ad_Bond.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_CustomsBond_Post",
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

        public List<ad_CustomBond> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var ad_BondList = new List<ad_CustomBond>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                ad_BondList = dbExecutor.FetchDataRef<ad_CustomBond>(CommandType.StoredProcedure,
                    "ad_CustomsBond_GetPaged", colparameters, ref rows);
                return ad_BondList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_CustomBond> GetAll(long? BondId = null)
        {
            try
            {
                var inv_PurchaseBillLst = new List<ad_CustomBond>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BondId", BondId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillLst = dbExecutor.FetchData<ad_CustomBond>(CommandType.StoredProcedure,
                    "ad_CustomsBond_Get", colparameters);
                return inv_PurchaseBillLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ad_CustomBond> BondDuplicate(string BondNo)
        {
            try
            {
                var bondList = new List<ad_CustomBond>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@BondNo", BondNo, DbType.String, ParameterDirection.Input)
                };
                bondList = dbExecutor.FetchData<ad_CustomBond>(CommandType.StoredProcedure,
                    "ad_CustomsBond_CheckDuplicateBondNo", colparameters);
                return bondList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}