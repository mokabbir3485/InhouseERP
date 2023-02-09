using DbExecutor;
using ExportBLL;
using ExportDAL;
using ExportEntity;
using System;
using System.Web.Mvc;

namespace Security.UI.Controllers
{
    public class ExportReportController : Controller
    {
        public JsonResult LoadCI()
        {
            try
            {
                var list = ExportBLL.Facade.exp_ExpReports.LoadCI();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportReportController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);

            }
        }

        [HttpGet]
        public JsonResult GetByInternalWorkOrderId(int internalWorkOrderId)
        {
            try
            {
                var list = InventoryBLL.Facade.inv_InternalWorkOrderDetailReportBLL.GetByInternalWorkOrderId(internalWorkOrderId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportReportController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);

            }
        }

        [HttpGet]
        public JsonResult GetExpImpLabelExport(DateTime FromDate, DateTime ToDate, string CategoryType)
        {
            try
            {
                var list = Facade.xRpt_ExpImp_LabelExportBLL.GetExpImpLabelExport(FromDate, ToDate, CategoryType);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportReportController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);

            }
        }
        [HttpGet]
        public JsonResult GetImportExportBalanceReport(DateTime FromDate, DateTime ToDate)
        {
            try
            {
                var list = Facade.xRpt_ExpImp_LabelExportBLL.GetImportExportBalanceReport(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportReportController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);

            }
        }

        [HttpGet]
        public JsonResult ImportReport(DateTime FromDate, DateTime ToDate,string CategoryType)
        {
            try
            {
                var list = Facade.xRpt_ExpImp_LabelExportBLL.GetImportReport(FromDate, ToDate,CategoryType);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ExportReportController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);

            }
        }
    }


}