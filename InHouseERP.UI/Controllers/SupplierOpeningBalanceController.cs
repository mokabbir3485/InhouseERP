using DbExecutor;
using Newtonsoft.Json;
using PayableBLL;
using PayableEntity;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Security.UI.Controllers
{
    public class SupplierOpeningBalanceController : Controller
    {
        // GET: SupplierOpeningBalance
        public ActionResult Index()
        {
            return View();
        }



        [HttpPost]
        public Int64 Post(pay_SupplierOpeningBalance pay_SupplierOpeningBalance)
        {

            Int64 ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.pay_SupplierOpeningBalance.pay_SupplierOpeningBalanceDAO.Post(pay_SupplierOpeningBalance);

                    if (ret > 0)
                        ts.Complete();
                }
            }
            catch (Exception ex)
            {
                ret = 0;
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierOpeningBalanceController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }
        public JsonResult GetSupplierOpeningBalanceDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.pay_SupplierOpeningBalance.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierOpeningBalanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SupplierOpeningBalance_GetBySupplierId(int SupplierId)
        {
            try
            {
                var list = Facade.pay_SupplierOpeningBalance.SupplierOpeningBalance_GetBySupplierId(SupplierId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierOpeningBalanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetSupplierOpeningBalancePaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.pay_SupplierOpeningBalance.GetPaged(startRecordNo, rowPerPage, whereClause, "OpeningBalanceId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierOpeningBalanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}