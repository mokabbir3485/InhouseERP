using DbExecutor;
using Newtonsoft.Json;
using InventoryBLL;
using PosBLL;
using InventoryEntity;
using ReceivableBLL;
using RestSharp;
using System;
using System.Web.Mvc;
using Security.UI.Controllers;

namespace InHouseERP.UI.Controllers
{
    public class CompanyDashboardController : Controller
    {
        // GET: CompanyDashboard
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetDynamicForSalesInvoice(string searchCriteria, string orderBy)
        {
            try
            {
                var list = PosBLL.Facade.pos_SalesInvoiceBLL.GetDynamicForSalesInvoice(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetSalesInvoiceDetailBySalesInvoiceId(long SalesInvoiceId)
        {
            try
            {
                var list = PosBLL.Facade.pos_SalesInvoiceBLL.GetSalesInvoiceDetailBySalesInvoiceId(SalesInvoiceId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPaymentDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = ReceivableBLL.Facade.rcv_CompanyPaymentBLL.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPaymentDashboard(string CompanyIds, string PaymentTypeIds,DateTime FromDate,DateTime ToDate)
        {
            try
            {
                var list = ReceivableBLL.Facade.rcv_CompanyPaymentBLL.GetPaymentDashboard(CompanyIds, PaymentTypeIds, FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAdvancedDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = ReceivableBLL.Facade.rcv_CompanyPaymentBLL.CompanyAdvancePayment_GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CompanyOnAccountPayment_GetDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = ReceivableBLL.Facade.rcv_CompanyPaymentBLL.CompanyOnAccountPayment_GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetCompanyPaymentDetailByCompanyPaymentId(Int64 CompanyPaymentId)
        {
            try
            {
                var list = ReceivableBLL.Facade.rcv_CompanyPaymentDetailBLL.GetCompanyPaymentDetailByCompanyPaymentId(CompanyPaymentId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}