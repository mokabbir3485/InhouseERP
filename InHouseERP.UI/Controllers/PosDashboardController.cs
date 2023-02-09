using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DbExecutor;
using Newtonsoft.Json;
using PosBLL;
using PosDAL;
using PosEntity;
using System.Web.Mvc;
using Security.UI.Controllers;

namespace InHouseERP.UI.Controllers
{
    public class PosDashboardController : Controller
    {
        // GET: PosDashboard
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllDashboardGraphForSoIwoSi(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pos_PosDashboardBLL.GetAllDashboardGraphForSoIwoSi(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PosDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardGraphSiAmountMonthwise(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pos_PosDashboardBLL.GetAllDashboardGraphSiAmountMonthwise(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PosDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardCompanyWiseTotalSo(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pos_PosDashboardBLL.GetAllDashboardCompanyWiseTotalSo(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PosDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardTotalSoIwoSiCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pos_PosDashboardBLL.GetAllDashboardTotalSoIwoSiCount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PosDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllDashboardTotalExportImportCount(DateTime? FromDate, DateTime? ToDate)
        {
            try
            {
                var list = Facade.pos_PosDashboardBLL.GetAllDashboardTotalExportImportCount(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PosDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}