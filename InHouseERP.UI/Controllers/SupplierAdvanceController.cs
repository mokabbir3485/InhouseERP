using DbExecutor;
using Newtonsoft.Json;
using PayableBLL;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using PayableEntity;

namespace Security.UI.Controllers
{
    public class SupplierAdvanceController : Controller
    {
        //
        // GET: /SupplierAdvance/
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetMaxSupAdvancedNo()
        {
            try
            {
                var maxNumber = Facade.pay_SupplierAdvanceBLL.GetMaxSupAdvancedNo();
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


      
        [HttpPost]
        public Int64 Post(pay_SupplierAdvance proc_SupplierAdvance)
        {
            if (proc_SupplierAdvance.ChequeNo == null) { proc_SupplierAdvance.ChequeNo = ""; }
            if (proc_SupplierAdvance.MobileNo == null) { proc_SupplierAdvance.MobileNo = ""; }
            if (proc_SupplierAdvance.MoneyReceiptNo == null) { proc_SupplierAdvance.MoneyReceiptNo = ""; }
            if (proc_SupplierAdvance.TransactionNo == null) { proc_SupplierAdvance.TransactionNo = ""; }
            if (proc_SupplierAdvance.PaymentVoucherNo == null) { proc_SupplierAdvance.PaymentVoucherNo = ""; }
            if (proc_SupplierAdvance.Remarks == null) { proc_SupplierAdvance.Remarks = ""; }
            Int64 ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.pay_SupplierAdvanceBLL.Post(proc_SupplierAdvance);



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
                error.FileName = "SupplierAdvanceController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }

        public JsonResult GetSupplierAdvancePaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.pay_SupplierAdvanceBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "AdvanceId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierAdvanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}