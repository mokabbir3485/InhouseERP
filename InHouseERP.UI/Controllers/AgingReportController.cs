using DbExecutor;
using Newtonsoft.Json;
using ReceivableBLL;
using ReceivableEntity;
using RestSharp;
using Security.UI.Controllers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace InHouseERP.UI.Controllers
{
    public class AgingReportController : Controller
    {
        // GET: AgingReport

        [HttpGet]
        public JsonResult GetByAgingReport(Int32 DayRange)
        {
            try
            {
                var AgingReportList = Facade.rcv_AgingBLL.AgingReport(DayRange);
                return Json(AgingReportList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AgingReportController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult PayableAgingReport(Int32 DayRange)
        {
            try
            {
                var AgingReportList = Facade.rcv_AgingBLL.PayableAgingReport(DayRange);
                return Json(AgingReportList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AgingReportController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        

    }
}