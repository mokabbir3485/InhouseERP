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
    public class CompanyPaymentAdjustmentController : Controller
    {
        // GET: CompanyPaymentAdjustment
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetByCompanyPaymentAdjustmentType(Int32 CompanyId)
        {
            try
            {
                var companyTypeList = Facade.rcv_CompanyPaymentAdjustmentDetailBLL.rcv_CompanyPaymentAdjustmentByCompanyId(CompanyId);
                return Json(companyTypeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetCompanyPaymentAdjustmentMaxNo()
        {
            try
            {
                var maxNumber = Facade.rcv_CompanyPaymentAdjustmentDetailBLL.GetCompanyPaymentAdjustmentMaxNo();
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


        public JsonResult GetCompanyPaymentRefundMaxNo()
        {
            try
            {
                var maxNumber = Facade.rcv_CompanyPaymentAdjustmentDetailBLL.GetCompanyPaymentRefundMaxNo();
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
        //[HttpGet]
        //public JsonResult GetCompanyWithSalesInvoice()
        //{
        //    try
        //    {
        //        var companyTypeList = Facade.rcv_CompanyPaymentAdjustmentBLL.GetAllCompanyWithSales();
        //        return Json(companyTypeList, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "CompanyPaymentAdjustmentController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}




        [HttpGet]
        public JsonResult GetByCompanyPaymentAdjustmentReport(Int64 CPAId)
        {
            try
            {
                var companyTypeList = Facade.rcv_CompanyPaymentAdjustmentDetailBLL.rcv_CompanyPaymentAdjustmentByReport(CPAId);
                return Json(companyTypeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult CompanyPaymentAdjustmentGetByCPAId(Int64 CPAId)
        {
            try
            {
                var adjustmentList = Facade.rcv_CompanyPaymentAdjustmentDetailBLL.CompanyPaymentAdjustmentGetByCPAId(CPAId);
                return Json(adjustmentList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public long CompanyPaymentAdjustmentSave(rcv_CompanyPaymentAdjustment  _rcv_CompanyPaymentAdjustment, List<rcv_CompanyPaymentAdjustmentDetail> _rcv_CompanyPaymentAdjustmentDetail)
        {

            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                Int64 ret = 0;

                // _rcv_CompanyPayment.ChequeDate = DateTime.Now;





                try
                {
                    _rcv_CompanyPaymentAdjustment.UpdatedDate = DateTime.Now;
                    if (_rcv_CompanyPaymentAdjustment.Remarks == null || _rcv_CompanyPaymentAdjustment.Remarks =="")
                    {
                        _rcv_CompanyPaymentAdjustment.Remarks="";
                    }

                    ret = Facade.rcv_CompanyPaymentAdjustmentBLL.Post(_rcv_CompanyPaymentAdjustment);

                    if (_rcv_CompanyPaymentAdjustmentDetail != null && _rcv_CompanyPaymentAdjustmentDetail.Count > 0)
                    {


                        foreach (rcv_CompanyPaymentAdjustmentDetail rcv_CompanyAdjustmentDetail in _rcv_CompanyPaymentAdjustmentDetail)
                        {
                          
                            if (rcv_CompanyAdjustmentDetail.CPADetailId == 0)
                            {
                                rcv_CompanyAdjustmentDetail.CPAId = ret;

                                Facade.rcv_CompanyPaymentAdjustmentDetailBLL.AddDetail(rcv_CompanyAdjustmentDetail);

                            }
                            else
                            {
                                rcv_CompanyAdjustmentDetail.CPAId = ret;

                                Facade.rcv_CompanyPaymentAdjustmentDetailBLL.CompanyPaymentAdjustmentDetailUpdate(rcv_CompanyAdjustmentDetail);
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
                    error.FileName = "CompanyPaymentAdjustmentController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }

                return ret;
            }
        }

        [HttpGet]
        public JsonResult CompanyPaymentAdjustmentGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.rcv_CompanyPaymentAdjustmentBLL.CompanyPaymentAdjustmentGetPaged(startRecordNo, rowPerPage, whereClause, "CPA.CPAId", "desc", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyPaymentAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAllCompanyLedger(int CompanyId, string formDate, string toDate)
        {
            try
            {
                //if (supplierId==0)
                //{
                var AllsupplierLedger = Facade.rcv_CompanyPaymentAdjustmentBLL.CompanyLedger_Get(CompanyId, formDate, toDate);
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
                error.FileName = "CompanyPaymentAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

    }
}