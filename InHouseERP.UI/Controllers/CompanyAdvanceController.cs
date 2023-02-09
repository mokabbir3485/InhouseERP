using DbExecutor;
using Newtonsoft.Json;
using ReceivableBLL;
using ReceivableEntity;
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
    public class CompanyAdvanceController : Controller
    {
        //
        // GET: /CompanyAdvance/
        public ActionResult Index()
        {
            return View();
        }

        

        [HttpGet]
        public JsonResult GetByVoucherGenerate(string VoucherName)
        {
            try
            {

                var Voucherno = Facade.rcv_CompanyAdvance.GetByVoucherGenerate(VoucherName);
                return Json(Voucherno, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceController";

                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CompanyAdvanceGetDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.rcv_CompanyAdvance.GetDynamic(searchCriteria, orderBy);
                string contentType = "application/json";

                return Json(list, contentType, Encoding.UTF8, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CompanyOpeningBalanceGetDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.rcv_CompanyOpeningBalance.GetDynamic(searchCriteria, orderBy);
                //string contentType = "application/json";

                return Json(list,JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public string Post(rcv_CompanyAdvance rcv_CompanyAdvance)
        {
          
            if (rcv_CompanyAdvance.ChequeNo == null) { rcv_CompanyAdvance.ChequeNo = ""; }
            if (rcv_CompanyAdvance.MobileNo == null) { rcv_CompanyAdvance.MobileNo = ""; }
            if (rcv_CompanyAdvance.MoneyReceiptNo == null) { rcv_CompanyAdvance.MoneyReceiptNo = ""; }
            if (rcv_CompanyAdvance.TransactionNo == null) { rcv_CompanyAdvance.TransactionNo = ""; }
            rcv_CompanyAdvance.CreateDate = DateTime.Now;
            string ret = "";
           // string ret2 = "";
           // string retCombine = "";
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.rcv_CompanyAdvance.Post(rcv_CompanyAdvance);
                    string[] words = ret.Split(',');
                    ret = Convert.ToString(words[0]);
                 //   ret2 = Convert.ToString(words[1]);

                    if (Convert.ToInt64(ret) > 0)
                        ts.Complete();
                }
               
            }
            catch (Exception ex)
            {
              
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceController";
                new ErrorLogController().CreateErrorLog(error);
                return "";
            }

            return ret;
        }
        public JsonResult GetCompanyAdvancePaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.rcv_CompanyAdvance.GetPaged(startRecordNo, rowPerPage, whereClause, "AdvanceId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMaxCompanyAdvancedNo()
        {
            try
            {
                var maxNumber = Facade.rcv_CompanyAdvance.GetMaxCompanyAdvancedNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAllAdvancePaymentSector()
        {
            try
            {
                var list = Facade.rcv_CompanyAdvance.GetAllAdvancePaymentSector();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}