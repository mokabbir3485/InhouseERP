using DbExecutor;
using Newtonsoft.Json;
using ReceivableBLL;
using ReceivableEntity;
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
    public class ReceivableDashboardController : Controller
    {
        // GET: ReceivableDashboard
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllDashboardTotalCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.rcv_ReceivableDashboardBLL.GetAllDashboardTotalCount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceivableDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphForAdvPayRfund(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.rcv_ReceivableDashboardBLL.GetAllDashboardGraphForAdvPayRfund(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceivableDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphForPaymentMonthOrYearwiseTotalAmount(DateTime? FromDate, DateTime? ToDate, string ChartType)
        {
            try
            {
                var list = Facade.rcv_ReceivableDashboardBLL.GetAllDashboardGraphForPaymentMonthOrYearwiseTotalAmount(FromDate, ToDate, ChartType);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceivableDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardPaymentCompanyWiseTotalAmount(DateTime? FromDate, DateTime? ToDate, Int32 TopValues)
        {
            try
            {
                var list = Facade.rcv_ReceivableDashboardBLL.GetAllDashboardPaymentCompanyWiseTotalAmount(FromDate, ToDate, TopValues);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceivableDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}