using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DbExecutor;
using Security.UI.Controllers;
using SecurityBLL;
using SecurityEntity.SECURITY.SecurityEntity;

namespace InHouseERP.UI.Controllers
{
    public class FiscalYearController : Controller
    {
        // GET: FiscalYear
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllFiscalYear(Int32? FiscalYearId = null)
        {
            try
            {
                var fiscalYearList = Facade.ad_FiscalYearBLL.GetAll(FiscalYearId);
                return Json(fiscalYearList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "FiscalYearController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public int AddFiscalYear(ad_FiscalYear _ad_FiscalYear)
        {
            var ret = 0;
            try
            {
                    _ad_FiscalYear.CreateDate= DateTime.Now;
                    _ad_FiscalYear.UpdateDate= DateTime.Now;
                    ret = Facade.ad_FiscalYearBLL.Post(_ad_FiscalYear);
            }
            catch (Exception ex)
            {
                var error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "FiscalYearController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }

        [HttpGet]
        public JsonResult FiscalYearGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.ad_FiscalYearBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "FYS.BranchId", "desc", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "FiscalYearEntryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetDynamic(string searchCriteria, string orderBy)
        {

            try
            {
                var list = Facade.ad_FiscalYearBLL.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "FiscalYearController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}