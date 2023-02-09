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
using Security.UI.Controllers;
using PayableEntity;

namespace InHouseERP.UI.Controllers
{
    public class PurchaseAcknowledgementController : Controller
    {
        // GET: PurchaseAcknowledgement
        [HttpPost]
        public int AcknowledgeCreate(List<pay_PurchaseAcknowledgement> purBillList)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {

                int ret = 0;
                try
                {

                    foreach (pay_PurchaseAcknowledgement item in purBillList)
                    {
                        ret = Facade.pay_PurchaseAcknowledgementBLL.AcknowledgeCreate(item);
                    }


                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "PurchaseAcknowledgementController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }

                return ret;
            }
        }
        [HttpPost]
        public int SupplierAitCreate(pay_SupplierAIT pay_SupplierAit, List<pay_PurchaseAcknowledgement> purBillList)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {

                int ret = 0;
                try
                {

                    ret = Facade.pay_PurchaseAcknowledgementBLL.SupplierAitCreate(pay_SupplierAit);
                    foreach (pay_PurchaseAcknowledgement item in purBillList)
                    {
                        item.TDSIssueId = ret;
                        Facade.pay_PurchaseAcknowledgementBLL.SupplierAitDetailCreate(item);
                    }


                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "PurchaseAcknowledgementController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }

                return ret;
            }
        }

        [HttpGet]
        public JsonResult GetPurchaseAcknowledgement(long SupplierId)
        {
            try
            {
                var PurchaseList = Facade.pay_PurchaseAcknowledgementBLL.GetPurchaseAcknowledgement(SupplierId);
                return Json(PurchaseList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseAcknowledgementController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetSupplierPayment_GetBySupplierIdForAIT(string SupplierId)
        {
            try
            {
                var PurchaseList = Facade.pay_PurchaseAcknowledgementBLL.GetSupplierPayment_GetBySupplierIdForAIT(SupplierId);
                return Json(PurchaseList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseAcknowledgementController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetVat_TDS_GetByTDSIssueId(int TDSIssueId)
        {
            try
            {
                var PurchaseList = Facade.pay_PurchaseAcknowledgementBLL.GetVat_TDS_GetByTDSIssueId(TDSIssueId);
                return Json(PurchaseList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseAcknowledgementController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult GetAcknowledgementNo()
        {
            try
            {
                var maxNumber = Facade.pay_PurchaseAcknowledgementBLL.GetMaxAcknowledgementNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseAcknowledgementController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetTDSIssueNo()
        {
            try
            {
                var maxNumber = Facade.pay_PurchaseAcknowledgementBLL.GetTDSIssueNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseAcknowledgementController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAcknowledgePaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.pay_PurchaseAcknowledgementBLL.GetPagedAcknowledge(startRecordNo, rowPerPage, whereClause, "PAcknowledgementId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseAcknowledgementController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetTDSIssuePaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.pay_PurchaseAcknowledgementBLL.GetTDSIssuePaged(startRecordNo, rowPerPage, whereClause, "T.UpdateDate", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseAcknowledgementController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}