using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_JumboStockIssueDAO
    {
        private static volatile inv_JumboStockIssueDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_JumboStockIssueDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_JumboStockIssueDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_JumboStockIssueDAO();
                    }

                return instance;
            }
        }

        public static inv_JumboStockIssueDAO GetInstance()
        {
            if (instance == null) instance = new inv_JumboStockIssueDAO();
            return instance;
        }

        public string Post(inv_JumboStockIssue _inv_JumboStockIssue)
        {
            var ret = "";
            try
            {
                var aCommon = new Common();

                var colparameters = new Parameters[13]
                {
                    new Parameters("@JIssueId", _inv_JumboStockIssue.JIssueId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@JIssueNo", _inv_JumboStockIssue.JIssueNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@JIssueDate", _inv_JumboStockIssue.JIssueDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_JumboStockIssue.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    //new Parameters("@ToDepartmentId", _inv_JumboStockIssue.ToDepartmentId, DbType.Int32,
                    //    ParameterDirection.Input),
                    new Parameters("@IssuedById", _inv_JumboStockIssue.IssuedById, DbType.Int32,
                        ParameterDirection.Input),
                    //new Parameters("@ReceivedById", _inv_JumboStockIssue.ReceivedById, DbType.Int32,
                    //    ParameterDirection.Input),
                    new Parameters("@JumboItemId", _inv_JumboStockIssue.JumboItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _inv_JumboStockIssue.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@JumboItemUnitId", _inv_JumboStockIssue.JumboItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssuedJumboRollQty", _inv_JumboStockIssue.IssuedJumboRollQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@JumboWastageInMM", _inv_JumboStockIssue.JumboWastageInMM, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_JumboStockIssue.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    //new Parameters("@CreateDate", _inv_JumboStockIssue.CreateDate, DbType.DateTime,
                    //    ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_JumboStockIssue.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    //new Parameters("@UpdateDate", _inv_JumboStockIssue.UpdateDate, DbType.DateTime,
                    //    ParameterDirection.Input),
                      new Parameters("@InternalWorkOrderId", _inv_JumboStockIssue.InternalWorkOrderId, DbType.Int64,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "inv_JumboStockIssue_Post",
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

        public long PostJumboStockIssueDetail(inv_JumboStockIssueDetail _inv_JumboStockIssueDetail)
        {
            long ret = 0;
            try
            {
                var aCommon = new Common();

                var colparameters = new Parameters[10]
                {
                    new Parameters("@JIssueDetailId", _inv_JumboStockIssueDetail.JIssueDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@JIssueId", _inv_JumboStockIssueDetail.JIssueId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@JumboItemId", _inv_JumboStockIssueDetail.JumboItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RawItemId", _inv_JumboStockIssueDetail.RawItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RawItemUnitId", _inv_JumboStockIssueDetail.RawItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssuedJumboWidth", _inv_JumboStockIssueDetail.IssuedJumboWidth, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssuedJumboRollQty", _inv_JumboStockIssueDetail.IssuedJumboRollQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssuedRawMatQty", _inv_JumboStockIssueDetail.IssuedRawMatQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssuedRawMatUnitPrice", _inv_JumboStockIssueDetail.IssuedRawMatUnitPrice,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@JumboWastageInMM", _inv_JumboStockIssueDetail.JumboWastageInMM, DbType.Decimal,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_JumboStockIssueDetail_Post",
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

        public long AddDetail(inv_JumboStockIssueDetail _inv_JumboStockIssueDetail)
        {
            long ret = 0;
            try
            {
                var aCommon = new Common();

                var colparameters = new Parameters[7]
                {
                    new Parameters("@JIssueId", _inv_JumboStockIssueDetail.JIssueId, DbType.Int64,
                        ParameterDirection.Input),

                    new Parameters("@RawItemId", _inv_JumboStockIssueDetail.RawItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RawItemUnitId", _inv_JumboStockIssueDetail.RawItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_JumboStockIssueDetail.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _inv_JumboStockIssueDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssuedRawMatQty", _inv_JumboStockIssueDetail.IssuedRawMatQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssuedRawMatUnitPrice", _inv_JumboStockIssueDetail.IssuedRawMatUnitPrice,
                        DbType.Decimal, ParameterDirection.Input)

                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_JumboStockIssueDetail_Create",
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

        public int UpdateDetail(inv_JumboStockIssueDetail _inv_JumboStockIssueDetail)
        {
            var ret = 0;
            try
            {
                var aCommon = new Common();

                var colparameters = new Parameters[11]
                {
                    new Parameters("@JIssueDetailId", _inv_JumboStockIssueDetail.JIssueDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@JIssueId", _inv_JumboStockIssueDetail.JIssueId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@JumboItemId", _inv_JumboStockIssueDetail.JumboItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RawItemId", _inv_JumboStockIssueDetail.RawItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RawItemUnitId", _inv_JumboStockIssueDetail.RawItemUnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _inv_JumboStockIssueDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssuedJumboWidth", _inv_JumboStockIssueDetail.IssuedJumboWidth, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssuedJumboRollQty", _inv_JumboStockIssueDetail.IssuedJumboRollQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssuedRawMatQty", _inv_JumboStockIssueDetail.IssuedRawMatQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@IssuedRawMatUnitPrice", _inv_JumboStockIssueDetail.IssuedRawMatUnitPrice,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@JumboWastageInMM", _inv_JumboStockIssueDetail.JumboWastageInMM, DbType.Decimal,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_JumboStockIssueDetail_Update",
                    colparameters, true);
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


        public List<inv_JumboStockIssueDetail> JumboStockIssueDetailGetByJIssueId(long JIssueId)
        {
            try
            {
                var inv_JumboStockIssueDetailLst = new List<inv_JumboStockIssueDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@JIssueId", JIssueId, DbType.Int64, ParameterDirection.Input)
                };
                inv_JumboStockIssueDetailLst = dbExecutor.FetchData<inv_JumboStockIssueDetail>(
                    CommandType.StoredProcedure, "inv_JumboStockIssueDetail_GetByJIssueId", colparameters);
                return inv_JumboStockIssueDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_JumboStockIssueDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_JumboStockIssue = new List<inv_JumboStockIssueDetail>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_JumboStockIssue = dbExecutor.FetchDataRef<inv_JumboStockIssueDetail>(CommandType.StoredProcedure,
                    "inv_JumboStockIssueDetail_GetPaged", colparameters, ref rows);
                return inv_JumboStockIssue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxJumboStockIssueNumber()
        {
            try
            {
                var JumboStockIssueNo =
                    dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_JumboStockIssueGetMaxJumboNo");
                return JumboStockIssueNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        

        //public string GetMaxJumboIssueNo(DateTime jissueDate)
        //{
        //    try
        //    {
        //        var aCommon = new Common();
        //        var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(jissueDate);

        //        var colparameters = new Parameters[2]
        //        {
        //            new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
        //            new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
        //        };

        //        long maxJissueNo = 0;
        //        string JIssueNo;
        //        dbExecutor.ManageTransaction(TransactionType.Open);
        //        maxJissueNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
        //            "inv_GetMaxJumboStockIssueNo", colparameters, true);
        //        var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(jissueDate);
        //        JIssueNo = "JIN/" + aFiscalYearPart + "/" + maxJissueNo;
        //        dbExecutor.ManageTransaction(TransactionType.Commit);
        //        return JIssueNo;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        public Int64 GetMaxJumboIssueNo()
        {
            try
            {
                Int64 reqNo = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                reqNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_GetMaxJumboStockIssueNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return reqNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
    }
}