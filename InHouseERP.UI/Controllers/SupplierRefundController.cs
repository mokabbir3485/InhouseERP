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
    public class SupplierRefundController : Controller
    {
        // GET: SupplierRefund
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public Int64 Post(pay_SupplierRefund pay_SupplierRefund)
        {
            if (pay_SupplierRefund.ChequeDate == null) { pay_SupplierRefund.ChequeDate = ""; }
            if (pay_SupplierRefund.ChequeNo == null) { pay_SupplierRefund.ChequeNo = ""; }
            if (pay_SupplierRefund.MobileNo == null) { pay_SupplierRefund.MobileNo = ""; }
            if (pay_SupplierRefund.TransactionNo == null) { pay_SupplierRefund.TransactionNo = ""; }
            if (pay_SupplierRefund.JVNo == null) { pay_SupplierRefund.JVNo = ""; }
            if (pay_SupplierRefund.Remarks == null) { pay_SupplierRefund.Remarks = ""; }
            Int64 ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.pay_SupplierRefund.Post(pay_SupplierRefund);



                    if (ret > 0)
                        ts.Complete();
                }
            }
            catch (Exception ex  )
            {
                ret = 0;
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierRefundController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }
       

        public JsonResult GetSupplierRefundPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.pay_SupplierRefund.GetPaged(startRecordNo, rowPerPage, whereClause, "RefundId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierRefundController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}