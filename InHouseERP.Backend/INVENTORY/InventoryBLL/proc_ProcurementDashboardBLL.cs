using InventoryDAL;
using InventoryEntity;
using System;
using System.Collections.Generic;

namespace InventoryBLL
{
    public class proc_ProcurementDashboardBLL
    {
        public proc_ProcurementDashboardDAO proc_ProcurementDashboardDAO { get; set; }

        public proc_ProcurementDashboardBLL()
        {
            //pos_SalesOrderDAO = pos_SalesOrder.GetInstanceThreadSafe;
            proc_ProcurementDashboardDAO = new proc_ProcurementDashboardDAO();
        }

        public List<proc_ProcurementDashboard> GetAllDashboardTotalCountImpLocalPurchase(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                return proc_ProcurementDashboardDAO.GetAllDashboardTotalCountImpLocalPurchase(FromDate, ToDate);
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
                return proc_ProcurementDashboardDAO.GetAllDashboardGraphForCategoryWiseItemPurchaseLocalAndImport(FromDate, ToDate);
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
                return proc_ProcurementDashboardDAO.GetAllDashboardGraphForImportLocalPurchaseMonthOrYearWise(FromDate, ToDate, ChartType);
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
                return proc_ProcurementDashboardDAO.GetSupplierItem();
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
                return proc_ProcurementDashboardDAO.GetPurchaseDashboard(whereCondition, orderByExpression);
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
                return proc_ProcurementDashboardDAO.PurchaseDashboard_GetPurchaseDetailByPurchaseId(PurchaseId, IsLocal, ItemId);
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
                return proc_ProcurementDashboardDAO.GetPurchaseBillDetailSerialLocalAndImport(PBId, DepartmentId, ItemId, IsLocal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
