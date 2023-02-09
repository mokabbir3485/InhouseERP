using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DbExecutor;
using Security.UI.Controllers;
using SecurityBLL;
using SecurityEntity;
using SecurityEntity.SECURITY.SecurityBLL;

namespace InHouseERP.UI.Controllers
{
    public class CancelProcessController : Controller
    {

        public JsonResult GetAllScreen()
        {
            try
            {
                var list = Facade.ad_CancelProcessBLL.GetAllScreen();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CancelProcessController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllReason()
        {
            try
            {
                var list = Facade.ad_CancelProcessBLL.GetAllReason();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CancelProcessController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetAllDocument(string DocumentTypeCode, int ? CompanyId=null)
        {
            try
            {
                var list = Facade.ad_CancelProcessBLL.GetAllDocument(DocumentTypeCode, CompanyId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CancelProcessController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public int CancelProcessSave(ad_CancelProcess _ad_CancelProcess)
        {

            int ret = 0;
            try
            {
                ret = Facade.ad_CancelProcessBLL.CancelProcessCreate(_ad_CancelProcess);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CancelProcessController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpGet]
        public JsonResult CancelPrcessGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
         {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.ad_CancelProcessBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "UpdatedDate", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CancelProcessController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

    }
}