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
    public class CompanyVatAitController : Controller
    {
        // GET: CompanyVatAit
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public Int64 Post(rcv_CompanyVatAit rcv_CompanyVatAit)
        {

            Int64 ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.rcv_CompanyVatAitBLL.Post(rcv_CompanyVatAit);

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
                error.FileName = "CompanyVatAitController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }
        [HttpGet]
        public JsonResult GetMaxCompanyVatIssueNo()
        {
            try
            {
                var maxNumber = Facade.rcv_CompanyVatAitBLL.GetMaxCompanyVatIssueNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyVatAitController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult GetCompanyPayment_GetByCompanyIdForCompanyVATIssue(string CompanyIds)
        {
            try
            {
                var list = Facade.rcv_CompanyVatAitBLL.GetCompanyPayment_GetByCompanyIdForCompanyVATIssue(CompanyIds);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyVatAitController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public int Save(rcv_CompanyVAT rcv_CompanyVAT, List<rcv_CompanyVAT> rcv_CompanyVATDetails)
        {

            int ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    rcv_CompanyVAT.CreateDate = DateTime.Now;
                    rcv_CompanyVAT.UpdateDate = DateTime.Now;
                    ret = Facade.rcv_CompanyVatAitBLL.Add(rcv_CompanyVAT);
                    foreach (rcv_CompanyVAT aVatDetails in rcv_CompanyVATDetails)
                    {
                        aVatDetails.TrChallanId = ret;
                        Facade.rcv_CompanyVatAitBLL.AddDetails(aVatDetails);
                    }

                    ts.Complete();
                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyVatAitController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        [HttpGet]
        public JsonResult VATCompanyGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.rcv_CompanyVatAitBLL.VATCompanyGetPaged(startRecordNo, rowPerPage, whereClause, "CV.TrChallanId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyVatAitController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetCompanyVAT_GetByTrChallanId(Int32 TrChallanId)
        {
            try
            {
                var list = Facade.rcv_CompanyVatAitBLL.GetCompanyVAT_GetByTrChallanId(TrChallanId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyVatAitController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetCompanyVatAitPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.rcv_CompanyVatAitBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "CompanyVatAitId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyVatAitController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}