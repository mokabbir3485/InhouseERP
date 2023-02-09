using DbExecutor;
using PosBLL;
using SecurityEntity.POS.PosEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Security.UI.Controllers
{
    public class SalesInvoiceController : Controller
    {
        // GET: SalesInvoice
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public Int64 Post(pos_SalesInvoice pos_SalesInvoice, List<pos_SalesInvoiceDetail> pos_SalesInvoiceDetail, List<pos_SalesInvoiceDetail> DeletedSalesInvoiceDetailList, pos_InvoicePayment _pos_InvoicePayment)
        {
            string InvoicePaymentret2 = "";
            //string InvoicePaymentret3 = "";
            // pos_SalesInvoice.SalesInvoiceDate = DateTime.Now;
            if (pos_SalesInvoice.DeliveryIds == null) { pos_SalesInvoice.DeliveryIds = ""; }
            if (pos_SalesInvoice.ManualSalesInvoiceNo == null) { pos_SalesInvoice.ManualSalesInvoiceNo = ""; }
            if (pos_SalesInvoice.Remarks == null) { pos_SalesInvoice.Remarks = ""; }
            Int64 ret = 0;


            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.pos_SalesInvoiceBLL.Post(pos_SalesInvoice);

                    if (pos_SalesInvoice.DeliveryIds != "")
                    {
                        List<Int64> DeliveryIdList = pos_SalesInvoice.DeliveryIds.Split(',').Select(Int64.Parse).ToList();
                        foreach (Int64 DeliveryId in DeliveryIdList)
                        {

                            Facade.pos_SalesInvoiceBLL.SaveSalesInvoiceAndDeliveryId(ret, DeliveryId);
                        }
                    }


                    if (DeletedSalesInvoiceDetailList != null && DeletedSalesInvoiceDetailList.Count > 0)
                    {
                        foreach (var aDeletedSalesInvoiceDetailList in DeletedSalesInvoiceDetailList)
                        {
                            Facade.pos_SalesInvoiceBLL.DeletedSalesInvoiceDetailBySalesInvoiceDetailId(aDeletedSalesInvoiceDetailList.SalesInvoiceDetailId);

                        }
                    }

                    if (pos_SalesInvoiceDetail != null && pos_SalesInvoiceDetail.Count > 0)
                    {
                        foreach (pos_SalesInvoiceDetail aSalesInvoiceDetail in pos_SalesInvoiceDetail)
                        {
                            aSalesInvoiceDetail.SalesInvoiceId = ret;
                            Facade.pos_SalesInvoiceBLL.PostSalesInvoiceDetail(aSalesInvoiceDetail);
                        }
                    }

                    _pos_InvoicePayment.UpdatedDate = DateTime.Now;

                    _pos_InvoicePayment.SalesInvoiceId = ret;
                    InvoicePaymentret2 = Facade.pos_InvoicePaymentBLL.Post(_pos_InvoicePayment);


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
        [HttpPost]
        public Int64 PostManualInvoice(pos_SalesInvoice pos_SalesInvoice, List<pos_SalesInvoiceDetail> pos_SalesInvoiceDetail, List<pos_SalesInvoiceDetail> DeletedSalesInvoiceDetailList)
        {

            if (pos_SalesInvoice.ManualSalesInvoiceNo == null) { pos_SalesInvoice.ManualSalesInvoiceNo = ""; }
            if (pos_SalesInvoice.CompanyNameBilling == null) { pos_SalesInvoice.CompanyNameBilling = ""; }
            //if (pos_SalesInvoice.VatChallanNo == null) { pos_SalesInvoice.VatChallanNo = ""; }
            if (pos_SalesInvoice.Remarks == null) { pos_SalesInvoice.Remarks = ""; }
            Int64 ret = 0;



            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.pos_SalesInvoiceBLL.PostManualInvoice(pos_SalesInvoice);


                    if (DeletedSalesInvoiceDetailList != null && DeletedSalesInvoiceDetailList.Count > 0)
                    {
                        foreach (var aDeletedSalesInvoiceDetailList in DeletedSalesInvoiceDetailList)
                        {
                            Facade.pos_SalesInvoiceBLL.DeletedManualInvoiceDetailByManualInvoiceDetailId(aDeletedSalesInvoiceDetailList.ManualInvoiceDetailId);

                        }
                    }

                    if (pos_SalesInvoiceDetail != null && pos_SalesInvoiceDetail.Count > 0)
                    {
                        foreach (pos_SalesInvoiceDetail aSalesInvoiceDetail in pos_SalesInvoiceDetail)
                        {
                            aSalesInvoiceDetail.ManualInvoiceId = ret;
                            Facade.pos_SalesInvoiceBLL.PostManualInvoiceDetail(aSalesInvoiceDetail);
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


          [HttpPost]
        public Int32 AdditionalSalesInvoiceCostSave( List<pos_AdditionalSalesInvoiceCost> _pos_AdditionalSalesInvoiceCost)
        {
            Int32 ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    foreach (pos_AdditionalSalesInvoiceCost AdditionalSalesInvoiceCost in _pos_AdditionalSalesInvoiceCost)
                    {
                        Facade.pos_SalesInvoiceBLL.AdditionalSalesInvoiceCostSave(AdditionalSalesInvoiceCost);

                    }

                    ts.Complete();
                }
            }
            catch (Exception ex)
            {
              
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
        public JsonResult GetCompanyForPayment()
        {
            try
            {
                var list = Facade.pos_SalesInvoiceBLL.GetCompanyForPayment();
                string contentType = "application/json";

                return Json(list, contentType, Encoding.UTF8, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAllManualSalesInvoice()
        {
            try
            {
                var list = Facade.pos_SalesInvoiceBLL.GetAllManualSalesInvoice();
                string contentType = "application/json";

                return Json(list, contentType, Encoding.UTF8, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetAllSalesInvoice()
        {
            try
            {
                var list = Facade.pos_SalesInvoiceBLL.GetAllSalesInvoice();
                string contentType = "application/json";

                return Json(list, contentType, Encoding.UTF8, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public string SaveInvoicePayment(pos_InvoicePayment _pos_InvoicePayment)
        {
            //Int64 ret = 0;
            string ret = "";
            string ret2 = "";
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                try
                {
                    //_pos_InvoicePayment.Create = DateTime.Now;
                    _pos_InvoicePayment.UpdatedDate = DateTime.Now;
                    ret = Facade.pos_InvoicePaymentBLL.Post(_pos_InvoicePayment);
                    string[] words = ret.Split(',');
                    ret = Convert.ToString(words[0]);
                    ret2 = Convert.ToString(words[1]);

                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "SalesInvoiceController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }
                return ret2;
            }
        }
        [HttpPost]
        public Int64 PostAcknowledge(List<pos_SalesInvoice> rcv_Acknowledge)
        {
            Int64 ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {

                    if (rcv_Acknowledge != null && rcv_Acknowledge.Count > 0)
                    {
                        foreach (pos_SalesInvoice aAcknowledge in rcv_Acknowledge)
                        {
                            if (aAcknowledge.AcknowledgementNo == null) { aAcknowledge.AcknowledgementNo = ""; }
                            if (aAcknowledge.JvNo == null) { aAcknowledge.JvNo = ""; }
                            ret = Facade.pos_SalesInvoiceBLL.PostAcknowledge(aAcknowledge);
                        }
                    }
                    if (ret > 0)
                        ts.Complete();
                }
                return ret;
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
        }

        public JsonResult GetSalesInvoicePaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.pos_SalesInvoiceBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "SI.SalesInvoiceId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPagedManualInvoice(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.pos_SalesInvoiceBLL.GetPagedManualInvoice(startRecordNo, rowPerPage, whereClause, "MI.ManualInvoiceId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        

       public JsonResult AdditionalSalesInvoiceGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.pos_SalesInvoiceBLL.AdditionalSalesInvoiceGetPaged(startRecordNo, rowPerPage, whereClause, "Id", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
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

                    ListData = Facade.pos_SalesInvoiceBLL.GetPagedAcknowledge(startRecordNo, rowPerPage, whereClause, "SA.UpdateDate", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetSalesInvoiceNo()
        {
            try
            {
                var maxNumber = Facade.pos_SalesInvoiceBLL.GetMaxSalesInvoiceNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetManualInvoiceNo()
        {
            try
            {
                var maxNumber = Facade.pos_SalesInvoiceBLL.GetMaxManualInvoiceNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetReportForCreditAcknoledge(Int64 SaleAcknowledgementId)
        {
            try
            {
                var list = Facade.pos_SalesInvoiceBLL.GetReportForCreditAcknoledge(SaleAcknowledgementId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAcknowledgementNo(DateTime AcknowledgementDate)
        {
            try
            {
                var maxNumber = Facade.pos_SalesInvoiceBLL.GetMaxAcknowledgementNo(AcknowledgementDate);
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetBySalesInvoiceId(Int64 SalesInvoiceId, int? CurrencyId = null)
        {
            try
            {
                var salesInvoiceList = Facade.pos_SalesInvoiceBLL.GetSalesInvoiceDetailForReport(SalesInvoiceId, CurrencyId);
                return Json(salesInvoiceList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetMushak_6_3BySalesInvoiceId(Int32? CompanyId = null, Int32? SalesInvoiceId = null)
        {
            try
            {
                var Mushak_6_3List = Facade.pos_SalesInvoiceBLL.GetMushak_6_3BySalesInvoiceId(CompanyId, SalesInvoiceId);
                return Json(Mushak_6_3List, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetSalesInvoiceDetailBySalesInvoiceId(Int64 SalesInvoiceId)
        {
            try
            {
                var salesInvoiceList = Facade.pos_SalesInvoiceBLL.GetSalesInvoiceDetailBySalesInvoiceId(SalesInvoiceId);
                return Json(salesInvoiceList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetByManualInvoiceId(Int64 ManualInvoiceId)
        {
            try
            {
                var salesInvoiceList = Facade.pos_SalesInvoiceBLL.GetManualInvoiceDetailForReport(ManualInvoiceId);
                return Json(salesInvoiceList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetManualInvoiceNoExist(string ManualInvoiceNo)
        {
            try
            {
                var InvoiceNoExistList = Facade.pos_SalesInvoiceBLL.GetManualInvoiceNoExist(ManualInvoiceNo);
                return Json(InvoiceNoExistList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetSalesInvoiceDetail(Int64 SalesInvoiceId)
        {
            try
            {
                var SalesInvoiceDetailList = Facade.pos_SalesInvoiceBLL.GetSalesInvoiceDetail(SalesInvoiceId); //pos_StockDeliveryDetail
                return Json(SalesInvoiceDetailList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetManualInvoiceDetail(Int64 ManualInvoiceId)
        {
            try
            {
                var SalesInvoiceDetailList = Facade.pos_SalesInvoiceBLL.GetManualInvoiceDetail(ManualInvoiceId); //pos_StockDeliveryDetail
                return Json(SalesInvoiceDetailList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetInvoiceWithAcknowledgement(Int32 companyId)
        {
            try
            {
                var salesInvoiceList = Facade.pos_SalesInvoiceBLL.GetInvoiceWithAcknowledgement(companyId);
                return Json(salesInvoiceList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult GetByDeliveryIds(string DeliveryIds)
        {
            try
            {
                var salesInvoiceList = Facade.pos_SalesInvoiceBLL.GetByDeliveryId(DeliveryIds); //pos_StockDeliveryDetail
                return Json(salesInvoiceList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult GetNumberSearchResultPaged(int StartRecordNo, int RowPerPage, string whClause, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.pos_SalesInvoiceBLL.GetNumberPaged(StartRecordNo, RowPerPage, whClause, "SalesOrderId", "desc", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesInvoiceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

    }
}