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
    public class ProductionDashboardController : Controller
    {
        // GET: ProductionDashboard
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllDashboardTotalProductionCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pro_ProductionDashboardBLL.GetAllDashboardTotalProductionCount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProductionDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphForProductionMonthwiseCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pro_ProductionDashboardBLL.GetAllDashboardGraphForProductionMonthwiseCount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProductionDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphForUsedMatProdMonthwiseCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pro_ProductionDashboardBLL.GetAllDashboardGraphForUsedMatProdMonthwiseCount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProductionDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}