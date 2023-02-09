using DbExecutor;
using ExportBLL;
using ExportEntity;
using Security.UI.Controllers;
using System;
using System.Collections.Generic;
using System.Web.Mvc;


namespace InHouseERP.UI.Controllers
{
    public class ExportDashboardController : Controller
    {
        // GET: ExportDashboard
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllDashboardCompanyWiseTotalCi(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.exp_ExportDashboardBLL.GetAllDashboardCompanyWiseTotalCi(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphForPiCiMonthwiseCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.exp_ExportDashboardBLL.GetAllDashboardGraphForPiCiMonthwiseCount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardPaymentProcessWiseTotalCi(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.exp_ExportDashboardBLL.GetAllDashboardPaymentProcessWiseTotalCi(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardTotalPiCiCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.exp_ExportDashboardBLL.GetAllDashboardTotalPiCiCount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphCiAmountMonthwise(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.exp_ExportDashboardBLL.GetAllDashboardGraphCiAmountMonthwise(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}