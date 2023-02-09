using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class inv_InternalWorkOrderDAO //: IDisposible
    {
        private static volatile inv_InternalWorkOrderDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_InternalWorkOrderDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_InternalWorkOrderDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_InternalWorkOrderDAO();
                    }

                return instance;
            }
        }

        public static inv_InternalWorkOrderDAO GetInstance()
        {
            if (instance == null) instance = new inv_InternalWorkOrderDAO();
            return instance;
        }

        public List<inv_InternalWorkOrder> inv_InternalWorkOrderAmendment_GetForEdit(string approvalType,
            string approvalPassword)
        {
            try
            {
                var inv_InternalWorkOrderList = new List<inv_InternalWorkOrder>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@ApprovalType", approvalType, DbType.String, ParameterDirection.Input),
                    new Parameters("@ApprovalPassword", approvalPassword, DbType.String, ParameterDirection.Input)
                };
                inv_InternalWorkOrderList = dbExecutor.FetchData<inv_InternalWorkOrder>(CommandType.StoredProcedure,
                    "inv_InternalWorkOrderAmendment_GetForEdit", colparameters);
                return inv_InternalWorkOrderList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> GetAll(long? internalWorkOrderId = null)
        {
            try
            {
                var inv_InternalWorkOrderLst = new List<inv_InternalWorkOrder>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InternalWorkOrderId", internalWorkOrderId, DbType.Int32, ParameterDirection.Input)
                };
                inv_InternalWorkOrderLst = dbExecutor.FetchData<inv_InternalWorkOrder>(CommandType.StoredProcedure,
                    "inv_InternalWorkOrder_Get", colparameters);
                return inv_InternalWorkOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrderTemp> ProductionWiseInternalWorkOrder(int DepartmentId,int  StockTransferTypeId)
        {
            try
            {
                var inv_InternalWorkOrderLst = new List<inv_InternalWorkOrderTemp>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@DepartmentId",DepartmentId, DbType.Int32, ParameterDirection.Input),
                     new Parameters("@StockTransferTypeId",StockTransferTypeId, DbType.Int32, ParameterDirection.Input)
                };
                inv_InternalWorkOrderLst = dbExecutor.FetchData<inv_InternalWorkOrderTemp>(CommandType.StoredProcedure,
                    "pro_Production_InternalWorkOrderGetByDepartmentId", colparameters);
                return inv_InternalWorkOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


      

        public List<inv_InternalWorkOrder> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_InternalWorkOrderLst = new List<inv_InternalWorkOrder>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_InternalWorkOrderLst = dbExecutor.FetchData<inv_InternalWorkOrder>(CommandType.StoredProcedure,
                    "inv_InternalWorkOrder_GetDynamic", colparameters);
                return inv_InternalWorkOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> inv_InternalWorkOrder_ForProduction()
        {
            try
            {
                var inv_InternalWorkOrderLst = new List<inv_InternalWorkOrder>();
                inv_InternalWorkOrderLst = dbExecutor.FetchData<inv_InternalWorkOrder>(CommandType.StoredProcedure,
                    "inv_InternalWorkOrder_ForProduction", null);
                return inv_InternalWorkOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_InternalWorkOrderLst = new List<inv_InternalWorkOrder>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_InternalWorkOrderLst = dbExecutor.FetchDataRef<inv_InternalWorkOrder>(CommandType.StoredProcedure,
                    "inv_InternalWorkOrder_GetPaged", colparameters, ref rows);
                return inv_InternalWorkOrderLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(inv_InternalWorkOrder _inv_InternalWorkOrder)
        {
            var ret = "";
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@InternalWorkOrderId ", _inv_InternalWorkOrder.InternalWorkOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _inv_InternalWorkOrder.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_InternalWorkOrder.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@InternalWorkOrderNo", _inv_InternalWorkOrder.InternalWorkOrderNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InternalWorkOrderDate", _inv_InternalWorkOrder.InternalWorkOrderDate,
                        DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@PlaceOfDelivery", _inv_InternalWorkOrder.PlaceOfDelivery, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_InternalWorkOrder.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@PreparedById", _inv_InternalWorkOrder.PreparedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_InternalWorkOrder.CreatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_InternalWorkOrder.CreateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_InternalWorkOrder.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_InternalWorkOrder.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@IsAmendment", _inv_InternalWorkOrder.IsAmendment, DbType.Boolean,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalarString(true, CommandType.StoredProcedure, "inv_InternalWorkOrder_Post",
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

        public int Update(inv_InternalWorkOrder _inv_InternalWorkOrder)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@InternalWorkOrderId", _inv_InternalWorkOrder.InternalWorkOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_InternalWorkOrder.DepartmentId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SalesOrderId", _inv_InternalWorkOrder.SalesOrderId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@InternalWorkOrderNo", _inv_InternalWorkOrder.InternalWorkOrderNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@InternalWorkOrderDate", _inv_InternalWorkOrder.InternalWorkOrderDate,
                        DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@PlaceOfDelivery", _inv_InternalWorkOrder.PlaceOfDelivery, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_InternalWorkOrder.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@PreparedById", _inv_InternalWorkOrder.PreparedById, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_InternalWorkOrder.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_InternalWorkOrder.UpdateDate, DbType.DateTime,
                        ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_InternalWorkOrder_Update",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_InternalWorkOrder _inv_InternalWorkOrder)
        {
            int ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@InternalWorkOrderId", _inv_InternalWorkOrder.InternalWorkOrderId, DbType.Int64,
                        ParameterDirection.Input),          
                    new Parameters("@IsApproved", _inv_InternalWorkOrder.IsApproved, DbType.Boolean,
                        ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_InternalWorkOrder.ApprovedBy, DbType.Int32,
                        ParameterDirection.Input),
                  
                };
                //ret = dbExecutor.ExecuteScalarString(CommandType.StoredProcedure, "inv_InternalWorkOrder_UpdateApprove",
                //    colparameters, true);
                //return ret;


                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_InternalWorkOrder_UpdateApprove",
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

        public int Delete(long internalWorkOrderId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@InternalWorkOrderId", internalWorkOrderId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_InternalWorkOrder_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxInternalWorkerNo(DateTime iwDate)
        {
            try
            {
                var aCommon = new Common();
                var aFiscalYear = aCommon.GetFiscalFormDateAndToDate(iwDate);

                var colparameters = new Parameters[2]
                {
                    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                };

                long maxIWNo = 0;

                dbExecutor.ManageTransaction(TransactionType.Open);
                maxIWNo = dbExecutor.ExecuteScalar64(true, CommandType.Text,
                    "SELECT  InternalWorkOrderNo =CAST((ISNULL( MAX(CAST(SUBSTRING([InternalWorkOrderNo],11,((LEN([InternalWorkOrderNo])+1)-11)) AS BIGINT)),0)+1) AS VARCHAR(50)) FROM [inv_InternalWorkOrder] WHERE InternalWorkOrderNo !='' AND LEN(InternalWorkOrderNo)>=11 AND (InternalWorkOrderDate BETWEEN  @fromDate AND @toDate)",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return maxIWNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> GetBy_inv_CIFProductReports(string CompanyId, Int32? PreparedById = null, DateTime? startDate = null,
            DateTime? endDate = null)
        {
            try
            {
                var inv_InternalWorkOrderList = new List<inv_InternalWorkOrder>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@CompanyId", CompanyId, DbType.String, ParameterDirection.Input),
                    //new Parameters("@PreparedById", PreparedById, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@startDate", startDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@endDate", endDate, DbType.DateTime, ParameterDirection.Input)
                };
                inv_InternalWorkOrderList = dbExecutor.FetchData<inv_InternalWorkOrder>(CommandType.StoredProcedure,
                    "xRpt_inv_CIFProductDetail", colparameters);
                return inv_InternalWorkOrderList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> GetProductionStatusByNoAndDate(string ProductionOrIWONo, DateTime? FromDate,
            DateTime? ToDate)
        {
            try
            {
                var inv_InternalWorkOrderList = new List<inv_InternalWorkOrder>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@ProductionOrIWONo", ProductionOrIWONo, DbType.String, ParameterDirection.Input),
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                inv_InternalWorkOrderList = dbExecutor.FetchData<inv_InternalWorkOrder>(CommandType.StoredProcedure,
                    "inv_InternalWorkOrder_ProductionStatus", colparameters);
                return inv_InternalWorkOrderList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> GetBy_inv_CIFCustomerReports(long CompanyId)
        {
            try
            {
                var inv_InternalWorkOrderList = new List<inv_InternalWorkOrder>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@CompanyId", CompanyId, DbType.Int64, ParameterDirection.Input)
                };
                inv_InternalWorkOrderList = dbExecutor.FetchData<inv_InternalWorkOrder>(CommandType.StoredProcedure,
                    "xRpt_inv_CIFCustomerDetail", colparameters);
                return inv_InternalWorkOrderList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}