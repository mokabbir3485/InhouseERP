using DbExecutor;
using Security.UI.Controllers;
using SecurityEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SecurityBLL;

namespace InHouseERP.UI.Controllers
{
    public class AdvanceToEmployeeController : Controller
    {
        // GET: AdvanceToEmployee
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAdvancePaymentMaxNo()
        {
            try
            {
                var maxNumber = Facade.ad_AdvanceToEmployeeBLL.GetAdvancePaymentMaxNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AdvanceToEmployeeController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public Int64 PostAdvanceToEmployee(ad_AdvanceToEmployee AdvanceToEmployee )
        {
            Int64 ret = 0;

            AdvanceToEmployee.Remarks = AdvanceToEmployee.Remarks == null ? "" : AdvanceToEmployee.Remarks;
            AdvanceToEmployee.ChequeType = AdvanceToEmployee.ChequeType == null ? "" : AdvanceToEmployee.ChequeType;
            AdvanceToEmployee.ChequeNo = AdvanceToEmployee.ChequeNo == null ? "" : AdvanceToEmployee.ChequeNo;
            try
            {
                ret = Facade.ad_AdvanceToEmployeeBLL.PostAdvanceToEmployee(AdvanceToEmployee);


            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AdvanceToEmployeeController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpGet]
        public JsonResult GetAdvanceToEmployeeGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.ad_AdvanceToEmployeeBLL.GetAdvanceToEmployeeGetPaged(startRecordNo, rowPerPage, whereClause, "AE.UpdatedDate", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AdvanceToEmployeeController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetDynamicAdvanceToEmployee(string whereCondition, string orderByExpression)
        {
            try
            {
                var list = Facade.ad_AdvanceToEmployeeBLL.GetDynamicAdvanceToEmployee(whereCondition, orderByExpression);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AdvanceToEmployeeController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}