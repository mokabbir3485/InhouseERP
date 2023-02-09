using DbExecutor;
using Newtonsoft.Json;
using PayableBLL;
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
    public class PayableDashboardController : Controller
    {
        // GET: PayableDashboard
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllDashboardTotalPaidVATAITAndAmount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pay_PayableDashboardBLL.GetAllDashboardTotalPaidVATAITAndAmount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PayableDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphForLocalAndOverseasePaidAmount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pay_PayableDashboardBLL.GetAllDashboardGraphForLocalAndOverseasePaidAmount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PayableDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraph_MonthOrYearwisePaidAmount(DateTime? FromDate, DateTime? ToDate, string ChartType)
        {
            try
            {
                var list = Facade.pay_PayableDashboardBLL.GetAllDashboardGraph_MonthOrYearwisePaidAmount(FromDate, ToDate, ChartType);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PayableDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphSupplierWiseTotalPaidAmount(DateTime? FromDate, DateTime? ToDate, Int32 TopValues)
        {
            try
            {
                var list = Facade.pay_PayableDashboardBLL.GetAllDashboardGraphSupplierWiseTotalPaidAmount(FromDate, ToDate, TopValues);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PayableDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}