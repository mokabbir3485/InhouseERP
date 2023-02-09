using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ReceivableBLL;
using ReceivableEntity;
using DbExecutor;
using Security.UI.Controllers;
using SecurityEntity.RECEIVABLE.ReceivableEntity;

namespace InHouseERP.UI.Controllers
{
    public class CompanyPaymentController : Controller
    {
        // GET: CompanyPayment
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetCompanyBankStatementReport(DateTime FormDate, DateTime ToDate, int BankAccountId)
        {
            try
            {
                var list = Facade.rcv_CompanyPaymentBLL.GetCompanyBankStatementReport(FormDate, ToDate, BankAccountId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetCompanyPaymentMaxNo()
        {
            try
            {
                var maxNumber = Facade.rcv_CompanyPaymentBLL.GetCompanyPaymentMaxNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetCompanyOpeningPaymentMaxNo()
        {
            try
            {
                var maxNumber = Facade.rcv_CompanyPaymentBLL.GetCompanyOpeningPaymentMaxNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult CompanyPaymentGetByCompanyType(Int32 CompanyId)
        {
            try
            {
                var companyTypeList = Facade.rcv_CompanyPaymentBLL.CompanyPaymentGetByCompanyType(CompanyId);
                return Json(companyTypeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult CompanyPaymentOnAccountByCompanyId(Int32 CompanyId)
        {
            try
            {
                var companyTypeList = Facade.rcv_CompanyPaymentBLL.CompanyPaymentOnAccountByCompanyId(CompanyId);
                return Json(companyTypeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult CompanyCurrentAdvancedGetByCompanyId(Int32 CompanyId)
        {
            try
            {
                var companyTypeList = Facade.rcv_CompanyPaymentBLL.CompanyCurrentAdvancedGetByCompanyId(CompanyId);
                return Json(companyTypeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public Int64 SaveCompanyOpeningPayment(rcv_CompanyOpeningBalancePayment rcv_CompanyOpeningBalancePayment)
        {
            Int64 ret = 0;
            rcv_CompanyOpeningBalancePayment.UpdatedDate = DateTime.Now;

            
            if (rcv_CompanyOpeningBalancePayment.PaymentDate == null)
            {
                rcv_CompanyOpeningBalancePayment.PaymentDate = DateTime.Now;
            }

            rcv_CompanyOpeningBalancePayment.Remarks = rcv_CompanyOpeningBalancePayment.Remarks == null ? "" : rcv_CompanyOpeningBalancePayment.Remarks;
            rcv_CompanyOpeningBalancePayment.ChequeNo = rcv_CompanyOpeningBalancePayment.ChequeNo == null ? "" : rcv_CompanyOpeningBalancePayment.ChequeNo;
            try
            {
                if (rcv_CompanyOpeningBalancePayment.CompanyOpeningBalancePaymentId == 0)
                {
                    ret = Facade.rcv_CompanyPaymentBLL.OpeningBalancePaymentPost(rcv_CompanyOpeningBalancePayment);

                }

                var SupplierOpeningBalancePaymentId = ret;


            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpGet]
        public JsonResult CompanyPaymentReport(Int64 CompanyPaymentId, bool IsOpeningPayment)
        {
            try
            {
                var companyTypeList = Facade.rcv_CompanyPaymentDetailBLL.xrpt_rcv_CompanyPayment_GetByCompanyPaymentId(CompanyPaymentId, IsOpeningPayment);
                return Json(companyTypeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

       
        [HttpPost]
        public long CompanyPaymentSave(rcv_CompanyPayment _rcv_CompanyPayment, List<rcv_CompanyPaymentDetail> _rcv_CompanyPaymentDetail)
        {

            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                Int64 ret = 0;

                // _rcv_CompanyPayment.ChequeDate = DateTime.Now;

                if (_rcv_CompanyPayment.Remarks==null)
                {
                    _rcv_CompanyPayment.Remarks = "";
                }
               
                
                try
                {
                    _rcv_CompanyPayment.UpdatedDate = DateTime.Now;

                    ret = Facade.rcv_CompanyPaymentBLL.Add(_rcv_CompanyPayment);

                    if (_rcv_CompanyPaymentDetail != null && _rcv_CompanyPaymentDetail.Count > 0)
                    {


                        foreach (rcv_CompanyPaymentDetail rcv_CompanyPaymentDetail in _rcv_CompanyPaymentDetail)
                        {

                            if (rcv_CompanyPaymentDetail.CompanyPaymentDetailId == 0)
                            {
                               
                                rcv_CompanyPaymentDetail.CompanyPaymentId= ret;
                               
                                Facade.rcv_CompanyPaymentDetailBLL.Add(rcv_CompanyPaymentDetail);

                            }
                           
                        }
                    }
                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "CompanyPaymentController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }
               
                return ret;
            }
        }

        [HttpGet]
        public JsonResult CompanyPaymentGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.rcv_CompanyPaymentBLL.CompanyPaymentGetPaged(startRecordNo, rowPerPage, whereClause, "CP.CompanyPaymentId", "desc", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult CompanyOpeningPaymentGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.rcv_CompanyPaymentBLL.CompanyOpeningPaymentGetPaged(startRecordNo, rowPerPage, whereClause, "CP.CompanyOpeningBalancePaymentId", "desc", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult GetAllCompanyLedger(int companyId, string formDate, string toDate)
        {
            try
            {
                //if (supplierId==0)
                //{
                var AllsupplierLedger = Facade.rcv_CompanyPaymentBLL.CompanyLedger_Get(companyId, formDate, toDate);
                return Json(AllsupplierLedger, JsonRequestBehavior.AllowGet);
                //}
                //else
                //{
                //    var supplierLedger = Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierLedger_Get(supplierId, formDate, toDate);
                //    return Json(supplierLedger, JsonRequestBehavior.AllowGet);
                //}

            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

    }
}