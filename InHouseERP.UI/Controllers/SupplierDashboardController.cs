using DbExecutor;
using Newtonsoft.Json;
using InventoryBLL;
using InventoryEntity;
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
    public class SupplierDashboardController : Controller
    {
        // GET: SupplierDashboard
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetPurchaseBillDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.PurchaseBill.GetDynamicForImportAndLocalPurchase(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPurchaseBillDetailByPBId(Int64 PBId, bool Islocal)
        {
            try
            {
                var list = Facade.PurchaseBillDetail.GetAllLocalAndImport(PBId, Islocal);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetPaymentDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.proc_SupplierPaymentAndAdjustmentBLL.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SupplierPaymentDetailReport(string SupplierIds, DateTime ? FromDate = null ,DateTime ? ToDate = null,int ? PaymentTypeId=null)
        {
            try
            {
                var list = Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierPaymentDetailReport(SupplierIds, FromDate, ToDate, PaymentTypeId);
                return Json(list, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPaymentDetailBySPId(Int64 SupplierPaymentId)
        {
            try
            {
                var list = Facade.proc_SupplierPaymentAndAdjustmentBLL.GetAll(SupplierPaymentId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}