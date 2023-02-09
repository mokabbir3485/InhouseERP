using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class inv_RequisitionDAO //: IDisposible
    {
        private static volatile inv_RequisitionDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_RequisitionDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_RequisitionDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_RequisitionDAO();
                    }

                return instance;
            }
        }

        public static inv_RequisitionDAO GetInstance()
        {
            if (instance == null) instance = new inv_RequisitionDAO();
            return instance;
        }
        
        public List<inv_Requisition> GetAll(long? requisitionId = null)
        {
            try
            {
                var inv_RequisitionLst = new List<inv_Requisition>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RequisitionId", requisitionId, DbType.Int32, ParameterDirection.Input)
                };
                inv_RequisitionLst = dbExecutor.FetchData<inv_Requisition>(CommandType.StoredProcedure,
                    "inv_Requisition_Get", colparameters);
                return inv_RequisitionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<IWoForRequestionEntity> GetAllIWOForRequestion()
        {
            try
            {
                var inv_RequisitionLst = new List<IWoForRequestionEntity>();
               
                inv_RequisitionLst = dbExecutor.FetchData<IWoForRequestionEntity>(CommandType.StoredProcedure,
                    "inv_InternalWorkOrder_ForRequisition");
                return inv_RequisitionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_Requisition> GetTopForIssue(int ? topQty = null)
        {
            try
            {
                var inv_RequisitionLst = new List<inv_Requisition>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@TopQty", topQty, DbType.Int32, ParameterDirection.Input)
                };
                inv_RequisitionLst = dbExecutor.FetchData<inv_Requisition>(CommandType.StoredProcedure,
                    "inv_Requisition_GetForIssue", colparameters);
                return inv_RequisitionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_Requisition> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_RequisitionLst = new List<inv_Requisition>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_RequisitionLst = dbExecutor.FetchData<inv_Requisition>(CommandType.StoredProcedure,
                    "inv_Requisition_GetDynamic", colparameters);
                return inv_RequisitionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_Requisition> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var inv_RequisitionLst = new List<inv_Requisition>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_RequisitionLst = dbExecutor.FetchDataRef<inv_Requisition>(CommandType.StoredProcedure,
                    "inv_Requisition_GetPaged", colparameters, ref rows);
                return inv_RequisitionLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(inv_Requisition _inv_Requisition)
        {
            var ret = "";
            try
            {
                //Common aCommon = new Common();

                //if (!_inv_Requisition.RequisitionNo.StartsWith("RQI/"))
                //{
                //    string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(_inv_Requisition.RequisitionDate);
                //    _inv_Requisition.RequisitionNo = "RQG/" + aFiscalYearPart + "/" + _inv_Requisition.RequisitionNo;
                //}

                var colparameters = new Parameters[16]
                {
                    new Parameters("@InternalWorkOrderId", _inv_Requisition.InternalWorkOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionNo", _inv_Requisition.RequisitionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionDate", _inv_Requisition.RequisitionDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentId", _inv_Requisition.FromDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentId", _inv_Requisition.ToDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PreparedById", _inv_Requisition.PreparedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_Requisition.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_Requisition.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_Requisition.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_Requisition.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_Requisition.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentName", _inv_Requisition.FromDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentName", _inv_Requisition.ToDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PreparedBy", _inv_Requisition.PreparedBy, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsSentBack", _inv_Requisition.IsSentBack, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_Requisition.IsApproved, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "inv_Requisition_Create",
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

        public int Update(inv_Requisition _inv_Requisition)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[14]
                {
                    new Parameters("@RequisitionId", _inv_Requisition.RequisitionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionNo", _inv_Requisition.RequisitionNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@RequisitionDate", _inv_Requisition.RequisitionDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentId", _inv_Requisition.FromDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentId", _inv_Requisition.ToDepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PreparedById", _inv_Requisition.PreparedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_Requisition.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_Requisition.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_Requisition.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@FromDepartmentName", _inv_Requisition.FromDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ToDepartmentName", _inv_Requisition.ToDepartmentName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@PreparedBy", _inv_Requisition.PreparedBy, DbType.String, ParameterDirection.Input),
                    new Parameters("@IsSentBack", _inv_Requisition.IsSentBack, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_Requisition.IsApproved, DbType.Boolean, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_Requisition_Update", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_Requisition _inv_Requisition)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@RequisitionId", _inv_Requisition.RequisitionId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_Requisition.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_Requisition.ApprovedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ApprovedDate", _inv_Requisition.ApprovedDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_Requisition_UpdateApprove",
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

        public int Delete(long requisitionId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@RequisitionId", requisitionId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_Requisition_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetGeneralMaxRequNoByDate(DateTime reqDate)
        {
            try
            {
                var aCommon = new Common();
                var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(reqDate);

                var colparameters = new Parameters[2]
                {
                    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                };

                long maxNumber = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                maxNumber = dbExecutor.ExecuteScalar64(true, CommandType.Text,
                    "SELECT RequisitionNo=CAST((ISNULL(MAX(CAST(SUBSTRING([RequisitionNo],10,((LEN([RequisitionNo])+1)-10)) AS BIGINT)),0)+1) AS VARCHAR(50)) FROM [inv_Requisition] WHERE [RequisitionDate] !='' AND LEN([RequisitionNo])>=10 AND ([RequisitionDate] BETWEEN @fromDate AND @toDate ) AND [RequisitionNo] LIKE 'RQG%'",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxNumber;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxRequestionNumber()
        {
            try
            {
                var PONo = dbExecutor.ExecuteReader(CommandType.StoredProcedure, "inv_GetMaxRequisitionNo");
                return PONo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Int64 GetMaxReqNo()
        {
            try
            {

                //Common aCommon = new Common();
                //DbExecutor.FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDate(salesOrderDate);

                //Parameters[] colparameters = new Parameters[2]{
                //    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                //    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                //};

                Int64 reqNo = 0;
                //string SalesOrderNo;
                dbExecutor.ManageTransaction(TransactionType.Open);
                reqNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,"pro_GetMaxRequistionNo", null, true);
                //string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(salesOrderDate);
                //SalesOrderNo = "SO/" + aFiscalYearPart + "/" + maxSalesOrderNo;
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