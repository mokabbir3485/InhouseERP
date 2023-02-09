using DbExecutor;
using SecurityEntity.INVENTORY.InventoryEntity;
using System;
using System.Collections.Generic;
using System.Data;

namespace SecurityEntity.INVENTORY.InventoryDAL
{
    public class inv_MaterialsDemandDAO
    {
        private static volatile inv_MaterialsDemandDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_MaterialsDemandDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_MaterialsDemandDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_MaterialsDemandDAO();
                    }

                return instance;
            }
        }

        public static inv_MaterialsDemandDAO GetInstance()
        {
            if (instance == null) instance = new inv_MaterialsDemandDAO();
            return instance;
        }
        public string GetMaterialsDemandNo(DateTime DemandDate)
        {
            try
            {

                Common aCommon = new Common();
                DbExecutor.FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDate(DemandDate);

                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@fromDate", aFiscalYear.FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@toDate", aFiscalYear.ToDate, DbType.DateTime, ParameterDirection.Input)
                };

                Int64 maxMaterialsDemandNo = 0;
                string MaterialsDemandNo;
                dbExecutor.ManageTransaction(TransactionType.Open);
                maxMaterialsDemandNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_GetMaxMaterialsDemandNo", colparameters, true);
                string aFiscalYearPart = aCommon.GetFiscalFormDateAndToDateString(DemandDate);
                MaterialsDemandNo = "DM/" + aFiscalYearPart + "/" + maxMaterialsDemandNo;
                dbExecutor.ManageTransaction(TransactionType.Commit);
                return MaterialsDemandNo;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public List<inv_MaterialsDemand> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_MaterialsDemandLst = new List<inv_MaterialsDemand>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_MaterialsDemandLst = dbExecutor.FetchDataRef<inv_MaterialsDemand>(CommandType.StoredProcedure, "inv_MaterialsDemand_GetPaged", colparameters, ref rows);
                return inv_MaterialsDemandLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_MaterialsDemandDetail> DetailGetByMaterialsDemandId(long? MaterialsDemandId)
        {
            try
            {
                var inv_MaterialsDemandDetailLst = new List<inv_MaterialsDemandDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@MaterialsDemandId", MaterialsDemandId, DbType.Int64, ParameterDirection.Input)
                };
                inv_MaterialsDemandDetailLst = dbExecutor.FetchData<inv_MaterialsDemandDetail>(CommandType.StoredProcedure, "inv_MaterialsDemandDetail_GetByMaterialsDemandId", colparameters);
                return inv_MaterialsDemandDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_MaterialsDemand> GetMaterialsDemandUnApprovalList()
        {
            try
            {
                var inv_MaterialsDemandLst = new List<inv_MaterialsDemand>();

                inv_MaterialsDemandLst = dbExecutor.FetchData<inv_MaterialsDemand>(CommandType.StoredProcedure, "inv_MaterialsDemand_UnApprovalList", null);
                return inv_MaterialsDemandLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_MaterialsDemandDetail> MatrialDeleteById(Int64 MaterialsDemandId)
        {
            try
            {
                var inv_MaterialsDemandDetailLst = new List<inv_MaterialsDemandDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@MaterialsDemandDetailId", MaterialsDemandId, DbType.Int64, ParameterDirection.Input)
                };
                inv_MaterialsDemandDetailLst = dbExecutor.FetchData<inv_MaterialsDemandDetail>(CommandType.StoredProcedure,"inv_MaterialsDemandDetail_GetById", colparameters);
                return inv_MaterialsDemandDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        
        public Int64 Post(inv_MaterialsDemand _inv_MaterialsDemand)
        {
            Int64 ret = 0;
            try
            {
                var colparameters = new Parameters[13]
                {
                    new Parameters("@MaterialsDemandId", _inv_MaterialsDemand.MaterialsDemandId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@MaterialsDemandNo ", _inv_MaterialsDemand.MaterialsDemandNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@BranchId", _inv_MaterialsDemand.BranchId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DemandFromDeptId", _inv_MaterialsDemand.DemandFromDeptId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DemandToDeptId", _inv_MaterialsDemand.DemandToDeptId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@PreparedById", _inv_MaterialsDemand.PreparedById, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DemandDate", _inv_MaterialsDemand.DemandDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@DeliveryDate", _inv_MaterialsDemand.DeliveryDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@Remarks", _inv_MaterialsDemand.Remarks, DbType.String, ParameterDirection.Input),
                    new Parameters("@CreatorId", _inv_MaterialsDemand.CreatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CreateDate", _inv_MaterialsDemand.CreateDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_MaterialsDemand.UpdatorId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UpdateDate", _inv_MaterialsDemand.UpdateDate, DbType.DateTime, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_MaterialsDemand_Post",
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
        public Int64 ApprovalUpdate(inv_MaterialsDemand _inv_MaterialsDemand)
        {
            Int64 ret = 0;
            try
            {
                var colparameters = new Parameters[3]
                {
                    new Parameters("@MaterialsDemandId", _inv_MaterialsDemand.MaterialsDemandId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@ApprovedBy", _inv_MaterialsDemand.ApprovedBy, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsApproved", _inv_MaterialsDemand.IsApproved, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_MaterialsDemand_ApprovalUpdate",
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

        public Int64 GetMaterialsDemandNo()
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
                reqNo = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_GetMaxMaterialsDemandNo", null, true);
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

        public Int64 DetailPost(inv_MaterialsDemandDetail _inv_MaterialsDemandDetail)
        {
            Int64 ret = 0;
            try
            {
                var colparameters = new Parameters[10]
                {
                    new Parameters("@MaterialsDemandDetailId", _inv_MaterialsDemandDetail.MaterialsDemandDetailId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@MaterialsDemandId", _inv_MaterialsDemandDetail.MaterialsDemandId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@InternalWorkOrderId", _inv_MaterialsDemandDetail.InternalWorkOrderId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@NameOfMaterials", _inv_MaterialsDemandDetail.NameOfMaterials, DbType.String, ParameterDirection.Input),
                    new Parameters("@ItemSpecification", _inv_MaterialsDemandDetail.ItemSpecification, DbType.String, ParameterDirection.Input),
                    new Parameters("@CustomerName", _inv_MaterialsDemandDetail.CustomerName, DbType.String, ParameterDirection.Input),
                    new Parameters("@MCName", _inv_MaterialsDemandDetail.MCName, DbType.String, ParameterDirection.Input),
                    new Parameters("@StockDetails", _inv_MaterialsDemandDetail.StockDetails, DbType.String, ParameterDirection.Input),
                    new Parameters("@DemandQuantity", _inv_MaterialsDemandDetail.DemandQuantity, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@DemandUnitId", _inv_MaterialsDemandDetail.DemandUnitId, DbType.Int32, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "inv_MaterialsDemandDetail_Post",
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
    }
}
