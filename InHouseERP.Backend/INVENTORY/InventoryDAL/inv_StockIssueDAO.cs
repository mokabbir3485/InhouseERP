using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockIssueDAO //: IDisposible
    {
        private static volatile inv_StockIssueDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockIssueDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockIssueDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockIssueDAO();
                    }

                return instance;
            }
        }

        public static inv_StockIssueDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockIssueDAO();
            return instance;
        }

        public List<inv_StockIssue> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockIssue = new List<inv_StockIssue>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockIssue = dbExecutor.FetchDataRef<inv_StockIssue>(CommandType.StoredProcedure,
                    "inv_StockIssue_GetPaged", colparameters, ref rows);
                return inv_StockIssue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalStockIssue> InternalStockIssuedGetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var inv_StockIssue = new List<inv_InternalStockIssue>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_StockIssue = dbExecutor.FetchDataRef<inv_InternalStockIssue>(CommandType.StoredProcedure,
                    "inv_InternalStockIssue_GetPaged", colparameters, ref rows);
                return inv_StockIssue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockIssue> GetAll(long? issueId = null)
        {
            try
            {
                var inv_StockIssueLst = new List<inv_StockIssue>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@IssueId", issueId, DbType.Int64, ParameterDirection.Input)
                };
                inv_StockIssueLst = dbExecutor.FetchData<inv_StockIssue>(CommandType.StoredProcedure,
                    "inv_StockIssue_Get", colparameters);
                return inv_StockIssueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockIssue> GetTopForReturn(string whereCondition, string topQty)
        {
            try
            {
                var inv_StockIssueLst = new List<inv_StockIssue>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@TopQty", topQty, DbType.String, ParameterDirection.Input)
                };
                inv_StockIssueLst = dbExecutor.FetchData<inv_StockIssue>(CommandType.StoredProcedure,
                    "inv_StockIssue_GetTopForReturn", colparameters);
                return inv_StockIssueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockIssue> GetForDashboard()
        {
            try
            {
                var inv_StockIssueLst = new List<inv_StockIssue>();
                inv_StockIssueLst =
                    dbExecutor.FetchData<inv_StockIssue>(CommandType.StoredProcedure,
                        "inv_StockIssueByDateForDashboard");
                return inv_StockIssueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockIssue> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_StockIssueLst = new List<inv_StockIssue>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_StockIssueLst = dbExecutor.FetchData<inv_StockIssue>(CommandType.StoredProcedure,
                    "inv_StockIssue_GetDynamic", colparameters);
                return inv_StockIssueLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_inv_StockIssueHistory> GetByIssueHistory(DateTime FromDate, DateTime ToDate)
        {
            try
            {
                var inv_StockIssueDetailLst = new List<xrpt_inv_StockIssueHistory>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@fromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                inv_StockIssueDetailLst = dbExecutor.FetchData<xrpt_inv_StockIssueHistory>(CommandType.StoredProcedure,
                    "xrpt_inv_StockIssueHistory", colparameters);
                return inv_StockIssueDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

         public string AddInternalStockIssue(inv_InternalStockIssue _inv_StockIssue)
        {
            var ret = "";
            try
            {
                var aCommon = new Common();

               
                var colparameters = new Parameters[5]
                {
                    new Parameters("@IssueNo", _inv_StockIssue.IssueNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@IssueDate", _inv_StockIssue.IssueDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@FromDepartmentId", _inv_StockIssue.FromDepartmentId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@IssuedById", _inv_StockIssue.IssuedById, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockIssue.UpdatorId, DbType.Int32, ParameterDirection.Input),
                   
                
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "inv_InternalStockIssue_post",
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
        public string Add(inv_StockIssue _inv_StockIssue)
        {
            var ret = "";
            try
            {
                var aCommon = new Common();

                //IN/17-18/1, IN/17-18/2, IN/17-18/3, IN/17-18/100, IN/17-18/1001

                //string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(_inv_StockIssue.IssueDate);
                //_inv_StockIssue.IssueNo = "IN/" + aFiscalYearPart + "/" + _inv_StockIssue.IssueNo;

                var colparameters = new Parameters[16]
                {
                    new Parameters("@RequisitionId", _inv_StockIssue.RequisitionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IssueNo", _inv_StockIssue.IssueNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@IssueDate", _inv_StockIssue.IssueDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@IssueFromDepartmentId", _inv_StockIssue.IssueFromDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssueToDepartmentId", _inv_StockIssue.IssueToDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssuedById", _inv_StockIssue.IssuedById, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ReceivedById", _inv_StockIssue.ReceivedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_StockIssue.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_StockIssue.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockIssue.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_StockIssue.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IssueFromDepartmentName", _inv_StockIssue.IssueFromDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IssueToDepartmentName", _inv_StockIssue.IssueToDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IssuedBy", _inv_StockIssue.IssuedBy, DbType.String, ParameterDirection.Input),
                    new Parameters("@ReceivedBy", _inv_StockIssue.ReceivedBy, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_StockIssue.IsApproved, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "inv_StockIssue_Create",
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

        public int Update(inv_StockIssue _inv_StockIssue)
        {
            var ret = 0;
            try
            {
                var aCommon = new Common();

                //IN/17-18/1, IN/17-18/2, IN/17-18/3, IN/17-18/100, IN/17-18/1001

                var aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(_inv_StockIssue.IssueDate);
                _inv_StockIssue.IssueNo = "IN/" + aFiscalYearPart + "/" + _inv_StockIssue.IssueNo;

                var colparameters = new Parameters[15]
                {
                    new Parameters("@IssueId", _inv_StockIssue.IssueId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@RequisitionId", _inv_StockIssue.RequisitionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IssueNo", _inv_StockIssue.IssueNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@IssueDate", _inv_StockIssue.IssueDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@IssueFromDepartmentId", _inv_StockIssue.IssueFromDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssueToDepartmentId", _inv_StockIssue.IssueToDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IssuedById", _inv_StockIssue.IssuedById, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ReceivedById", _inv_StockIssue.ReceivedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockIssue.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_StockIssue.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IssueFromDepartmentName", _inv_StockIssue.IssueFromDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IssueToDepartmentName", _inv_StockIssue.IssueToDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@IssuedBy", _inv_StockIssue.IssuedBy, DbType.String, ParameterDirection.Input),
                    new Parameters("@ReceivedBy", _inv_StockIssue.ReceivedBy, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_StockIssue.IsApproved, DbType.Boolean, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_StockIssue_Update", colparameters,
                    true);
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

        public int UpdateApprove(inv_StockIssue _inv_StockIssue)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@IssueId", _inv_StockIssue.IssueId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_StockIssue.IsApproved, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_StockIssue.ApprovedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_StockIssue.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockIssue_UpdateApprove",
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

        public long GetMaxIssueNoByDate(DateTime issueDate)
        {
            try
            {
                var aCommon = new Common();
                var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(issueDate);

                var colparameters = new Parameters[2]
                {
                    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                };

                long maxNumber = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                maxNumber = dbExecutor.ExecuteScalar64(true, CommandType.Text,
                    "SELECT IssueNo=CAST((ISNULL( MAX(CAST(SUBSTRING([IssueNo],10,((LEN([IssueNo])+1)-10)) AS BIGINT)),0)+1) AS VARCHAR(50)) FROM [inv_StockIssue] WHERE [IssueNo] IS NOT NULL AND LEN([IssueNo])>=10 AND ( [IssueDate] BETWEEN @fromDate AND @toDate)",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxNumber;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxIssueNumber()
        {
            try
            {
                var PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxStockIssueNo");
                return PONo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public List<inv_InternalStockIssue> InternalStockIssueIssuedForReport(Int64 StockIssueId)
        {
            try
            {
                var inv_InternalStockIssueList = new List<inv_InternalStockIssue>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@StockIssueId", StockIssueId, DbType.Int64, ParameterDirection.Input)
                   
                };
                inv_InternalStockIssueList = dbExecutor.FetchData<inv_InternalStockIssue>(CommandType.StoredProcedure,
                    "xRpt_inv_InternalStockIssue_GetByStockIssueId", colparameters);
                return inv_InternalStockIssueList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_inv_Report> GetMaterialDemandedIssuedForReport(Int64 ReportId, string ReportType)
        {
            try
            {
                var xrpt_inv_Report = new List<xrpt_inv_Report>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ReportId", ReportId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ReportType", ReportType, DbType.String, ParameterDirection.Input)
                };
                xrpt_inv_Report = dbExecutor.FetchData<xrpt_inv_Report>(CommandType.StoredProcedure,
                    "xRpt_inv_MaterialsDemandedAndIssuedMemoReport", colparameters);
                return xrpt_inv_Report;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int64 GetMaxIssueNo()
        {
            try
            {
                Int64 reqNo = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                reqNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_GetMaxStockIssueNo", null, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return reqNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public Int64 InternalStockIssueGetMaxStockIssueNumber()
        {
            try
            {
                Int64 reqNo = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                reqNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_InternalStockIssue_GetMaxIssueNo", null, true);
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