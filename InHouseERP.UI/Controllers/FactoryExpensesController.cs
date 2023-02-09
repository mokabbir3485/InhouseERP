using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DbExecutor;
using Security.UI.Controllers;
using SecurityBLL;
using SecurityEntity;


namespace InHouseERP.UI.Controllers
{
    public class FactoryExpensesController : Controller
    {
        // GET: FactoryExpenses
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetFactoryExpensesMaxNo()
        {
            try
            {
                var maxNumber = Facade.ad_FactoryExpensesBLL.GetFactoryExpensesMaxNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "FactoryExpensesController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public Int64 Post(ad_FactoryExpenses FactoryExpenses)
        {

            Int64 ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.ad_FactoryExpensesBLL.Post(FactoryExpenses);

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
                error.FileName = "FactoryExpensesController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }

        public JsonResult GetFactoryExpensesPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.ad_FactoryExpensesBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "ExpenseId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "FactoryExpensesController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAllFactoryExpensePurpose()
        {
            try
            {
                var fiscalYearList = Facade.ad_FactoryExpensesBLL.GetAllFactoryExpensePurpose();
                return Json(fiscalYearList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "FactoryExpensesController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}