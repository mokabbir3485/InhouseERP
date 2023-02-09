using DbExecutor;
using InventoryBLL;
using InventoryEntity;
using Security.UI.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;

namespace InHouseERP.UI.Controllers
{
    public class AccessoriesPurchaseController : Controller
    {
        // GET: AccessoriesPurchase
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        //public int PostAccessoriesPurchase(proc_AccessoriesPurchase proc_AccessoriesPurchase, List<pos_SalesInvoiceDetail> pos_SalesInvoiceDetail, List<pos_SalesInvoiceDetail> DeletedSalesInvoiceDetailList)
        public int PostAccessoriesPurchase(proc_AccessoriesPurchase proc_AccessoriesPurchase, List<proc_AccessoriesPurchaseDetail> proc_AccessoriesPurchaseDetail, List<proc_AccessoriesPurchaseDetail> DeletedAccessoriesPurchaseDetailList)
        {

            if (proc_AccessoriesPurchase.PurchaseNo == null) { proc_AccessoriesPurchase.PurchaseNo = ""; }
            if (proc_AccessoriesPurchase.SupplierName == null) { proc_AccessoriesPurchase.SupplierName = ""; }
            if (proc_AccessoriesPurchase.SupplierAddress == null) { proc_AccessoriesPurchase.SupplierAddress = ""; }
            if (proc_AccessoriesPurchase.ChallanNo == null) { proc_AccessoriesPurchase.ChallanNo = ""; }
            if (proc_AccessoriesPurchase.Remarks == null) { proc_AccessoriesPurchase.Remarks = ""; }
            int ret = 0;



            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.proc_AccessoriesPurchaseBLL.PostAccessoriesPurchase(proc_AccessoriesPurchase);


                    if (DeletedAccessoriesPurchaseDetailList != null && DeletedAccessoriesPurchaseDetailList.Count > 0)
                    {
                        foreach (var aDeletedAccessoriesPurchaseDetailList in DeletedAccessoriesPurchaseDetailList)
                        {
                            Facade.proc_AccessoriesPurchaseBLL.DeletedAccessoriesPurchaseDetailByPurchaseDetailId(aDeletedAccessoriesPurchaseDetailList.PurchaseDetailId);

                        }
                    }

                    if (proc_AccessoriesPurchaseDetail != null && proc_AccessoriesPurchaseDetail.Count > 0)
                    {
                        foreach (proc_AccessoriesPurchaseDetail aAccessoriesPurchaseDetail in proc_AccessoriesPurchaseDetail)
                        {
                            aAccessoriesPurchaseDetail.PurchaseId = ret;
                            Facade.proc_AccessoriesPurchaseBLL.PostAccessoriesPurchaseDetail(aAccessoriesPurchaseDetail);
                        }
                    }


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
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }



        [HttpGet]
        public JsonResult GetAllAccessoriesPurchase(int? PurchaseId = null)
        {
            try
            {
                var list = Facade.proc_AccessoriesPurchaseBLL.GetAllAccessoriesPurchase(PurchaseId);
                string contentType = "application/json";

                return Json(list, contentType, Encoding.UTF8, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AccessoriesPurchaseController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }




        public JsonResult GetPagedAccessoriesPurchase(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.proc_AccessoriesPurchaseBLL.GetPagedAccessoriesPurchase(startRecordNo, rowPerPage, whereClause, "UpdateDate", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AccessoriesPurchaseController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetMaxAccessoriesPurchaseNo()
        {
            try
            {
                var maxNumber = Facade.proc_AccessoriesPurchaseBLL.GetMaxAccessoriesPurchaseNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AccessoriesPurchaseController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }






        [HttpGet]
        public JsonResult GetAccessoriesPurchaseDetailByPurchaseId(int? PurchaseId = null)
        {
            try
            {
                var AccessoriesPurchaseList = Facade.proc_AccessoriesPurchaseBLL.GetAccessoriesPurchaseDetailByPurchaseId(PurchaseId);
                return Json(AccessoriesPurchaseList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AccessoriesPurchaseController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult GetAccessoriesPurchaseNoExist(string PurchaseNo)
        {
            try
            {
                var PurchaseNoExistList = Facade.proc_AccessoriesPurchaseBLL.GetAccessoriesPurchaseNoExist(PurchaseNo);
                return Json(PurchaseNoExistList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AccessoriesPurchaseController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult GetAccessoriesPurchaseDetailForReportByPurchaseId(int? PurchaseId = null)
        {
            try
            {
                var SalesInvoiceDetailList = Facade.proc_AccessoriesPurchaseBLL.GetAccessoriesPurchaseDetailForReportByPurchaseId(PurchaseId); //pos_StockDeliveryDetail
                return Json(SalesInvoiceDetailList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "AccessoriesPurchaseController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

    }
}