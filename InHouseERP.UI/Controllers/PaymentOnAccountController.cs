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
    public class PaymentOnAccountController : Controller
    {
        // GET: PaymentOnAccount
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult PaymentOnAccountGetDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.rcv_PaymentOnAccount.GetDynamic(searchCriteria, orderBy);
                string contentType = "application/json";

                return Json(list, contentType, Encoding.UTF8, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PaymentOnAccountController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }



        [HttpPost]
        public string  Post(rcv_PaymentOnAccount rcv_PaymentOnAccount)
        {
            if (rcv_PaymentOnAccount.ChequeNo == null) { rcv_PaymentOnAccount.ChequeNo = ""; }
            if (rcv_PaymentOnAccount.MobileNo == null) { rcv_PaymentOnAccount.MobileNo = ""; }
            if (rcv_PaymentOnAccount.MoneyReceiptNo == null) { rcv_PaymentOnAccount.MoneyReceiptNo = ""; }
            if (rcv_PaymentOnAccount.TransactionNo == null) { rcv_PaymentOnAccount.TransactionNo = ""; }
            string ret = "";
            string ret2 = "";

            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.rcv_PaymentOnAccount.Post(rcv_PaymentOnAccount);
                    string[] words = ret.Split(',');
                    ret = Convert.ToString(words[0]);
                    ret2 = Convert.ToString(words[1]);

                    if (Convert.ToInt64(ret) > 0)
                        ts.Complete();
                }
            }
            catch (Exception ex)
            {
               
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PaymentOnAccountController";
                new ErrorLogController().CreateErrorLog(error);
                return "";
            }

            return ret;
        }
        public JsonResult GetPaymentOnAccountPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.rcv_PaymentOnAccount.GetPaged(startRecordNo, rowPerPage, whereClause, "OnAccountId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PaymentOnAccountController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMaxCompanyPaymentOnAccount(DateTime companyOnPaymentDate)
        {
            try
            {
                var maxNumber = Facade.rcv_PaymentOnAccount.GetMaxCompanyPaymentOnAccount(companyOnPaymentDate);
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

    }
}