using DbExecutor;
using InventoryEntity;
using System;
using System.Collections.Generic;
using System.Data;


namespace InventoryDAL
{
    public class proc_ProcurementDashboardDAO
    {
        private static volatile proc_ProcurementDashboardDAO instance;
        private static readonly object lockObj = new object();
        public static proc_ProcurementDashboardDAO GetInstance()
        {
            if (instance == null)
            {
                instance = new proc_ProcurementDashboardDAO();
            }
            return instance;
        }
        public static proc_ProcurementDashboardDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                {
                    lock (lockObj)
                    {
                        if (instance == null)
                        {
                            instance = new proc_ProcurementDashboardDAO();
                        }
                    }
                }
                return instance;
            }
        }

        DBExecutor dbExecutor;
        public proc_ProcurementDashboardDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public List<proc_ProcurementDashboard> GetAllDashboardTotalCountImpLocalPurchase(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<proc_ProcurementDashboard> proc_ProcurementDashboardLst = new List<proc_ProcurementDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                proc_ProcurementDashboardLst = dbExecutor.FetchData<proc_ProcurementDashboard>(CommandType.StoredProcedure, "proc_DashboardTotalCountImpLocalPurchase", colparameters);
                return proc_ProcurementDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_ProcurementDashboard> GetAllDashboardGraphForCategoryWiseItemPurchaseLocalAndImport(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                List<proc_ProcurementDashboard> proc_ProcurementDashboardLst = new List<proc_ProcurementDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input)
                };
                proc_ProcurementDashboardLst = dbExecutor.FetchData<proc_ProcurementDashboard>(CommandType.StoredProcedure, "proc_DashboardGraphForCategoryWiseItemPurchaseLocalAndImport", colparameters);
                return proc_ProcurementDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_ProcurementDashboard> GetAllDashboardGraphForImportLocalPurchaseMonthOrYearWise(DateTime? FromDate, DateTime? ToDate, string ChartType)
        {
            try
            {
                List<proc_ProcurementDashboard> proc_ProcurementDashboardLst = new List<proc_ProcurementDashboard>();
                Parameters[] colparameters = new Parameters[3]{
                    new Parameters("@FromDate", FromDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ToDate", ToDate, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@ChartType", ChartType, DbType.String, ParameterDirection.Input)
                };
                proc_ProcurementDashboardLst = dbExecutor.FetchData<proc_ProcurementDashboard>(CommandType.StoredProcedure, "proc_DashboardGraphForImportLocalPurchaseMonthOrYearWise", colparameters);
                return proc_ProcurementDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_SupplierItem> GetSupplierItem()
        {
            try
            {
                var proc_SupplierItemLst = new List<proc_SupplierItem>();
                //var colparameters = new Parameters[2]
                //{
                //    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                //    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                //};
                proc_SupplierItemLst = dbExecutor.FetchData<proc_SupplierItem>(CommandType.StoredProcedure,
                    "proc_PurchaseDetail_GetSupplierItem", null);
                return proc_SupplierItemLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_PurchaseDashboard> GetPurchaseDashboard(string whereCondition, string orderByExpression)
        {
            try
            {
                List<proc_PurchaseDashboard> PurchaseDashboardLst = new List<proc_PurchaseDashboard>();
                Parameters[] colparameters = new Parameters[2]{
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input),
                };
                PurchaseDashboardLst = dbExecutor.FetchData<proc_PurchaseDashboard>(CommandType.StoredProcedure, "proc_PurchaseDashboard_GetPurchaseBySupplierId", colparameters);
                return PurchaseDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_PurchaseDashboard> PurchaseDashboard_GetPurchaseDetailByPurchaseId(Int64 PurchaseId, bool IsLocal, int? ItemId = 0)
        {
            try
            {
                List<proc_PurchaseDashboard> PurchaseDashboardLst = new List<proc_PurchaseDashboard>();
                Parameters[] colparameters = new Parameters[3]{
                    new Parameters("@PurchaseId", PurchaseId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsLocal", IsLocal, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input),
                };
                PurchaseDashboardLst = dbExecutor.FetchData<proc_PurchaseDashboard>(CommandType.StoredProcedure, "proc_PurchaseDashboard_GetPurchaseDetailByPBId", colparameters);
                return PurchaseDashboardLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Inv_HardwareWarrantyAndSerial> GetPurchaseBillDetailSerialLocalAndImport(Int32? PBId = null, Int32? DepartmentId = null, Int32? ItemId = null, bool? IsLocal = null)
        {
            try
            {
                List<Inv_HardwareWarrantyAndSerial> PurchaseBillDetailSerialLocalAndImportLst = new List<Inv_HardwareWarrantyAndSerial>();
                Parameters[] colparameters = new Parameters[4]{
                    new Parameters("@PBId", PBId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@IsLocal", IsLocal, DbType.Boolean, ParameterDirection.Input)
                };
                PurchaseBillDetailSerialLocalAndImportLst = dbExecutor.FetchData<Inv_HardwareWarrantyAndSerial>(CommandType.StoredProcedure, "proc_PurchaseBillDetailSerialLocalAndImport_Get", colparameters);
                return PurchaseBillDetailSerialLocalAndImportLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
