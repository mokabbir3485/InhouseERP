using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ReceivableBLL;
using DbExecutor;
using Security.UI.Controllers;
using ReceivableEntity;

namespace InHouseERP.UI.Controllers
{
    public class CompanyAdvanceRefundController : Controller
    {
        // GET: CompanyRefund
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public long CompanyRefundPost(rcv_CompanyAdvanceRefund _rcv_CompanyAdvanceRefund)
        {

            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                Int64 ret = 0;
               
                try
                {
                    _rcv_CompanyAdvanceRefund.CreateDate = DateTime.Now;
                     ret = Facade.rcv_CompanyAdvanceRefundBLL.Post(_rcv_CompanyAdvanceRefund);

                  
                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "CompanyAdvanceRefundController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }

                return ret;
            }
        }

        public JsonResult GetCompanyRefundPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.rcv_CompanyAdvanceRefundBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "RefundId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceRefundController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetCompanyRefundReport(Int64 RefundId)
        {
            try
            {
                var companyRefund = Facade.rcv_CompanyAdvanceRefundBLL.GetCompanyRefundReportById(RefundId);
                return Json(companyRefund, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceRefundController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult GetCompanyAdvance_GetAmountByCompanyId(Int64 CompanyId)
        {
            try
            {
                var companyAdvanceAmount = Facade.rcv_CompanyAdvanceRefundBLL.GetCompanyAdvance_GetAmountByCompanyId(CompanyId);
                return Json(companyAdvanceAmount, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyAdvanceRefundController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}