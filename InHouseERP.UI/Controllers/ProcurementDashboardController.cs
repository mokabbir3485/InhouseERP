using DbExecutor;
using Newtonsoft.Json;
using InventoryBLL;
using InventoryEntity;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Security.UI.Controllers;

namespace InHouseERP.UI.Controllers
{
    public class ProcurementDashboardController : Controller
    {
        // GET: ProcurementDashboard
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllDashboardTotalCountImpLocalPurchase(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.proc_ProcurementDashboardBLL.GetAllDashboardTotalCountImpLocalPurchase(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProcurementDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                 return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphForCategoryWiseItemPurchaseLocalAndImport(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.proc_ProcurementDashboardBLL.GetAllDashboardGraphForCategoryWiseItemPurchaseLocalAndImport(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProcurementDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                 return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphForImportLocalPurchaseMonthOrYearWise(DateTime? FromDate, DateTime? ToDate, string ChartType)
        {
            try
            {
                var list = Facade.proc_ProcurementDashboardBLL.GetAllDashboardGraphForImportLocalPurchaseMonthOrYearWise(FromDate, ToDate, ChartType);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProcurementDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                 return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult GetSupplierItem()
        {
            try
            {
                var list = Facade.proc_ProcurementDashboardBLL.GetSupplierItem();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProcurementDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult GetPurchaseDashboard(string whereCondition, string orderByExpression)
        {
            try
            {
                var list = Facade.proc_ProcurementDashboardBLL.GetPurchaseDashboard(whereCondition, orderByExpression);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProcurementDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult PurchaseDashboard_GetPurchaseDetailByPurchaseId(Int64 PurchaseId, bool IsLocal, int? ItemId = 0)
        {
            try
            {
                var list = Facade.proc_ProcurementDashboardBLL.PurchaseDashboard_GetPurchaseDetailByPurchaseId(PurchaseId, IsLocal, ItemId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProcurementDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPurchaseBillDetailSerialLocalAndImport(Int32? PBId = null, Int32? DepartmentId = null, Int32? ItemId = null, bool? IsLocal = null)
        {
            try
            {
                var list = Facade.proc_ProcurementDashboardBLL.GetPurchaseBillDetailSerialLocalAndImport(PBId, DepartmentId, ItemId, IsLocal);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProcurementDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

    }
}