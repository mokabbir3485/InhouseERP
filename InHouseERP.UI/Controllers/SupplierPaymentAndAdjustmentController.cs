using DbExecutor;
using Newtonsoft.Json;
using PosEntity;
using ReceivableEntity;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InventoryEntity;
using System.Text;
using System.Web.Script.Serialization;
using InventoryBLL;
using System.Data;
using PayableEntity;

namespace Security.UI.Controllers
{
    public class SupplierPaymentAndAdjustmentController : Controller
    {
        // GET: SupplierPaymentAndAdjustment
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public Int64 SaveSupplierPayment(pay_SupplierPayment _SupplierPayment,pay_SupplierOpeningBalancePayment proc_SupplierOpeningBalancePayment, List<pay_SupplierPaymentDetail>proc_SupplierPaymentsdetail)
        {
            Int64 ret = 0;
            _SupplierPayment.UpdatedDate = DateTime.Now;

            if (_SupplierPayment.PBDate != null || _SupplierPayment.ChequeDate != null)
            {
                _SupplierPayment.PBDate = DateTime.Now;
              
            }
            if (_SupplierPayment.PaymentDate == null)
            {
                _SupplierPayment.PaymentDate = DateTime.Now;
            }

             _SupplierPayment.ChequeDate = _SupplierPayment.IsCheque == false ? "" : _SupplierPayment.ChequeDate;
            _SupplierPayment.Remarks = _SupplierPayment.Remarks == null ? "" : _SupplierPayment.Remarks;
            _SupplierPayment.ChequeType = _SupplierPayment.ChequeType == null ? "" : _SupplierPayment.ChequeType;
            _SupplierPayment.ChequeNo = _SupplierPayment.ChequeNo == null ? "" : _SupplierPayment.ChequeNo;
            try
            {
                if (_SupplierPayment.SupplierPaymentId == 0)
                {
                    ret = Facade.proc_SupplierPaymentAndAdjustmentBLL.Add(_SupplierPayment);
                    

                }

                var SupplierPaymentId =ret;

                foreach (var supplierDetail in proc_SupplierPaymentsdetail)
                {
                    supplierDetail.SupplierPaymentId = ret;
                    Facade.proc_SupplierPaymentAndAdjustmentBLL.AddDetail(supplierDetail);
                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpPost]
        public Int64 SaveSupplierOpeningPayment(pay_SupplierOpeningBalancePayment proc_SupplierOpeningBalancePayment)
        {
            Int64 ret = 0;
            proc_SupplierOpeningBalancePayment.UpdatedDate = DateTime.Now;

            if (proc_SupplierOpeningBalancePayment.PBDate != null || proc_SupplierOpeningBalancePayment.ChequeDate != null)
            {
                proc_SupplierOpeningBalancePayment.PBDate = DateTime.Now;

            }
            if (proc_SupplierOpeningBalancePayment.PaymentDate == null)
            {
                proc_SupplierOpeningBalancePayment.PaymentDate = DateTime.Now;
            }
            if(proc_SupplierOpeningBalancePayment.JVNo == null) { proc_SupplierOpeningBalancePayment.JVNo = ""; }

            proc_SupplierOpeningBalancePayment.ChequeDate = proc_SupplierOpeningBalancePayment.IsCheque == false ? null : proc_SupplierOpeningBalancePayment.ChequeDate;
            proc_SupplierOpeningBalancePayment.Remarks = proc_SupplierOpeningBalancePayment.Remarks == null ? "" : proc_SupplierOpeningBalancePayment.Remarks;
            proc_SupplierOpeningBalancePayment.ChequeType = proc_SupplierOpeningBalancePayment.ChequeType == null ? "" : proc_SupplierOpeningBalancePayment.ChequeType;
            proc_SupplierOpeningBalancePayment.ChequeNo = proc_SupplierOpeningBalancePayment.ChequeNo == null ? "" : proc_SupplierOpeningBalancePayment.ChequeNo;
            try
            {
                if (proc_SupplierOpeningBalancePayment.SupplierOpeningBalancePaymentId == 0)
                {
                    ret = Facade.proc_SupplierPaymentAndAdjustmentBLL.OpeningBalancePaymentPost(proc_SupplierOpeningBalancePayment);

                }

                var SupplierOpeningBalancePaymentId = ret;

                
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        public JsonResult GetSupplierPaymentMaxNo()
        {
            try
            {
                var maxNumber = Facade.proc_SupplierPaymentAndAdjustmentBLL.GetSupplierPaymentMaxNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMaxSupplierPaymentRefund()
        {
            try
            {
                var maxNumber = Facade.proc_SupplierPaymentAndAdjustmentBLL.GetMaxSupplierPaymentRefund();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMaxSupplierPaymentAdjustment()
        {
            try
            {
                var maxNumber = Facade.proc_SupplierPaymentAndAdjustmentBLL.GetMaxSupplierPaymentAdjustment();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetSupplierOpeningPaymentMaxNo()
        {
            try
            {
                var maxNumber = Facade.proc_SupplierPaymentAndAdjustmentBLL.GetSupplierOpeningPaymentMaxNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult SupplierAdjustmentGetById(long supId)
        {

            try
            {
                var supplierPaymentList = Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierPaymentAdjustmemtGetBySupplierId(supId);
                return Json(supplierPaymentList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult SupplierAdjustmentDetailGetById(Int32 SPAId)
        {

            try
            {
                var supplierPaymentList = Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierAdjustmentDetailGetById(SPAId);
                return Json(supplierPaymentList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult SupplierPaymentReport(Int64 SupplierPaymentId, bool IsOpeningPayment)
        {

            try
            {
                var supplierPaymentList = Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierPaymentReport(SupplierPaymentId, IsOpeningPayment);
                return Json(supplierPaymentList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult SupplierPaymentGetById(Int32 supId)
        {

            try
            {
                var supplierPaymentList = Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierPaymentGetBySupplierId(supId);
                return Json(supplierPaymentList,JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        

        [HttpPost]
        public Int64 Post(pay_SupplierPaymentAdjustment proc_SupplierPaymentAdjustment, List<pay_SupplierPaymentAdjustmentDetail> proc_SupplierPaymentAdjustmentDetail)
        {

            if (proc_SupplierPaymentAdjustment.Remarks == null) { proc_SupplierPaymentAdjustment.Remarks = ""; }

            proc_SupplierPaymentAdjustment.JVNo = null;

            Int64 ret = 0;
            Int64 SPAId = 0;
            if (proc_SupplierPaymentAdjustment.SPADate !=null)
            {
                proc_SupplierPaymentAdjustment.SPADate = DateTime.Now;
            }
            SPAId = proc_SupplierPaymentAdjustment.SPAId;
            try
             {
                if (proc_SupplierPaymentAdjustment.SPAId == 0)
                {
                    //proc_SupplierPaymentAdjustment.UpdatedBy = proc_SupplierPaymentAdjustment.UpdatedBy;
                    proc_SupplierPaymentAdjustment.UpdatedDate = DateTime.Now;
                    ret = Facade.proc_SupplierPaymentAndAdjustmentBLL.Post(proc_SupplierPaymentAdjustment);

                    if (proc_SupplierPaymentAdjustmentDetail != null)
                    {
                        foreach (var AdjustmentDetail in proc_SupplierPaymentAdjustmentDetail)
                        {
                            AdjustmentDetail.SPAId = Convert.ToInt64(ret);
                            Facade.proc_SupplierPaymentAndAdjustmentBLL.PostDetail(AdjustmentDetail);

                        }
                    }


                }
                else
                {
                    proc_SupplierPaymentAdjustment.UpdatedDate = DateTime.Now;
                    ret = Facade.proc_SupplierPaymentAndAdjustmentBLL.Post(proc_SupplierPaymentAdjustment);
                    if (proc_SupplierPaymentAdjustmentDetail != null)
                    {
                        SPAId = Convert.ToInt64(ret);
                        Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierPaymentAdjustmentDetailDeleteBySPAId(SPAId);
                        //Facade.inv_BillOfMaterialBLL.DeleteDetailByBOMId(ret);
                        foreach (var AdjustmentDetail in proc_SupplierPaymentAdjustmentDetail)
                        {
                            AdjustmentDetail.SPADetailId = 0;
                            AdjustmentDetail.SPAId = Convert.ToInt64(ret);
                            Facade.proc_SupplierPaymentAndAdjustmentBLL.PostDetail(AdjustmentDetail);
                        }
                    }


                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        public JsonResult GetSupplierPaymentAdjustmentPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.proc_SupplierPaymentAndAdjustmentBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "SPA.UpdatedDate", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SupplierPaymentAndAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult GetSupplierPaymentGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.proc_SupplierPaymentAndAdjustmentBLL.pay_SupplierPayment_GetPaged(startRecordNo, rowPerPage, whereClause, "UpdatedDate", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
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

        [HttpGet]
        public JsonResult GetAllSupplierLedger(int supplierId, string formDate, string toDate)
        {
            try
            {
                //if (supplierId==0)
                //{
                    var AllsupplierLedger = Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierLedger_Get(supplierId, formDate, toDate);
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
                error.FileName = "SalesOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult SupplierIdsAndPaymentIds(string supplierIds, DateTime? FromDate = null, DateTime? ToDate = null)
        {
            try
            {
              
                    var supplierList = Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierIdsAndPaymentIds(supplierIds, FromDate, ToDate);
                    return Json(supplierList, JsonRequestBehavior.AllowGet);
               
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
        [HttpGet]
        public JsonResult GetSupplierWiseOpeningBalance()
        {
            try
            {
              
                var supplierList = Facade.proc_SupplierPaymentAndAdjustmentBLL.GetSupplierWiseOpeningBalance();
                return Json(supplierList, JsonRequestBehavior.AllowGet);
               
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


        //[HttpGet]

        //public JsonResult SupplierAdjustmentDetailGetById(Int32 SPAId)
        //{

        //    try
        //    {
        //        var supplierPaymentList = Facade.proc_SupplierPaymentAndAdjustmentBLL.SupplierAdjustmentDetailGetById(SPAId);
        //        return Json(supplierPaymentList, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "SupplierPaymentAndAdjustmentController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}
    }
}

