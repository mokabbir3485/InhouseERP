using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DbExecutor;
using Newtonsoft.Json;
using PosBLL;
using PosDAL;
using PosEntity;
using SecurityEntity;
using System.Web.Mvc;
using RestSharp;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Security.UI.Controllers
{
    public class SalesOrderController : Controller
    {
        // GET: /SalesOrder/
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GenerateFileData(string fileName)
        {
            //byte[] data = System.IO.File.ReadAllBytes(Server.MapPath(fileName));
            string fullName = Server.MapPath("~/UploadedFiles/SampleFiles/" + fileName);

            TempData["Data"] = fullName;
            return new JsonResult() { Data = new { FileName = fileName.Split('/')[fileName.Split('/').Length - 1] } };
        }

        [HttpGet]
        public virtual ActionResult Download(string fileName)
        {
            if (TempData["Data"] != null)
            {
                byte[] data = TempData["Data"] as byte[];
                return File(data, "application/octet-stream", fileName);
            }
            else
            {
                return new EmptyResult();
            }
        }


        //public ActionResult DownloadFile(string fileName)
        //{
        //    string fullName = Server.MapPath("~/UploadedFiles/SampleFiles/" + fileName);

        //    byte[] fileBytes = GetFile(fullName);
        //    return File(
        //        fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
        //}

        //byte[] GetFile(string s)
        //{
        //    System.IO.FileStream fs = System.IO.File.OpenRead(s);
        //    byte[] data = new byte[fs.Length];
        //    int br = fs.Read(data, 0, data.Length);
        //    if (br != fs.Length)
        //        throw new System.IO.IOException(s);
        //    return data;
        //}

            public JsonResult SavePOFiles([System.Web.Http.FromUri] string PONo)
        {

            string Message, fileName, actualFileName;
            Message = fileName = actualFileName = string.Empty;
            bool flag = false;
            if (Request.Files != null)
            {
                //Guid id = Guid.NewGuid();
                var file = Request.Files[0];

                actualFileName = file.FileName;

                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                int size = file.ContentLength;
                //DateTime date = DateTime.Now;
                //string Time = date.ToString("yyyyMMddHHmm");
                //var artWorkFileName ="Art" + "_" + Time + "_" + actualFileName;
               // var artWorkFileName =PONo +"_" + actualFileName;
                 //var artWorkFileName =PONo +"_" + actualFileName;

                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles/POAttachment"),PONo));

                }
                catch (Exception ex)
                {
                    Message = "File upload failed! Please try again";
                }

            }
            return new JsonResult { Data = new { Message = Message, Status = flag } };
        }


        [HttpGet]
        public JsonResult GetSalesOrderForDeliveryByCommercialInvoiceId(Int64 CommercialInvoiceId)
        {
            try
            {
                var SalesOrderList = Facade.pos_SalesOrderBLL.GetSalesOrderForDeliveryByCommercialInvoiceId(CommercialInvoiceId);
                return Json(SalesOrderList, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetItemForIWO(Int64 salesOrderId)
        {
            try
            {
                var list = Facade.pos_SalesOrderDetailBLL.GetItemForIWO(salesOrderId);
                return Json(list, JsonRequestBehavior.AllowGet);
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

        public JsonResult GetAllRole()
        {
            var list = Facade.pos_SalesOrderBLL.GetAll();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllCurrency(Int32? CurrencyId = null)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.GetAllCurrency(CurrencyId);
                return Json(list, JsonRequestBehavior.AllowGet);
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

        public JsonResult CompanyPaymentStatusReport(string FilterType,string SalesOrderType, string CompanyId, DateTime? FromDate = null, DateTime? ToDate = null, int? SectionId = null, int? EmployeeId = null, int? BranchId = null)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.CompanyPaymentStatusReport(FilterType, SalesOrderType, CompanyId, FromDate, ToDate, SectionId, EmployeeId, BranchId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        //public JsonResult GetSalesOrderPaged(int startRecordNo, int rowPerPage, int rows)
        //{
        //    try
        //    {
        //        var customMODEntity = new
        //        {
        //            ListData = Facade.pos_SalesOrderBLL.GetPaged(startRecordNo, rowPerPage, "", "SalesOrderNo", "DESC", ref rows),
        //            TotalRecord = rows
        //        };
        //        return Json(customMODEntity, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "SalesOrderController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}

        public JsonResult GetSalesOrderDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetCIFDashboard(string whereCondition, string orderByExpression)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.GetCIFDashboard(whereCondition, orderByExpression);
                return Json(list, JsonRequestBehavior.AllowGet);
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

        public JsonResult GetSalesOrderForPiUpdate(Int64 InvoiceId, Int32 CompanyId)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.GetForPiUpdate(InvoiceId, CompanyId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult SalesRegisterReport(string SalesOrderType, string companyId, DateTime? FormDate = null, DateTime? ToDate = null, int? sectionId = null, int? EmployeeId = null, int? BranchId = null)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.SalesRegisterReport( SalesOrderType, companyId, FormDate, ToDate, sectionId, EmployeeId, BranchId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult EPZExportSalesReport(string companyId, DateTime? FormDate = null, DateTime? ToDate = null, int? sectionId = null, int? EmployeeId = null, decimal? ConversionRate = null)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.EPZExportSalesReport(companyId, FormDate, ToDate, sectionId, EmployeeId, ConversionRate);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult SalesProductivityReport()
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.SalesProductivityReport();
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult pos_SalesOrderAmendment_GetForEdit(string approvalType, string approvalPassword)
        {
            try
            {
                var pos_SalesOrderAmendmenList = Facade.pos_SalesOrderBLL.pos_SalesOrderAmendment_GetForEdit(approvalType, approvalPassword);
                return Json(pos_SalesOrderAmendmenList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log
                {
                    ErrorMessage = ex.Message,
                    ErrorType = ex.GetType().ToString(),
                    FileName = "SalesOrderController"
                };
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetSalesOrderForEdit(DateTime fromDate, DateTime toDate, int? companyId)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.SalesOrderGetForEdit(fromDate, toDate, companyId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetSalesOrderForPI(int companyId)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.SalesOrderGetForPI(companyId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult CIFDashboard_GetSalesOrderDetail(int SalesOrderId)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.CIFDashboard_GetSalesOrderDetailBySalesOrderId(SalesOrderId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult SalesOrderDetailItemGetByCompanyId(int companyId)
        {
            try
            {
                var list = Facade.pos_SalesOrderDetailBLL.SalesOrderDetailItemGetByCompanyId(companyId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult SalesOrderReportGetBySalesOrderId(int SalesOrderId)
        {
            try
            {
                var list = Facade.pos_SalesOrderDetailBLL.SalesOrderReport(SalesOrderId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetTopForDelivery(int topQty)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.GetTopForDelivery(topQty);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetSalesOrderDetailDynamic(string searchCriteria, string orderBy)
        {
            try
            {
               var list = Facade.pos_SalesOrderDetailBLL.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetCompanyEmployeeItem()
        {
            try
            {
                var list = Facade.pos_SalesOrderDetailBLL.GetCompanyEmployeeItem();
                return Json(list, JsonRequestBehavior.AllowGet);
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
        [HttpPost]
        public string Save(pos_SalesOrder salesOrder, List<pos_SalesOrderDetail> pos_SaleOrderBillDetaillst, List<pos_SalesOrderDetail> VoidList, List<pos_POReference> POReferencelist)
        {
           
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                string ret="";
                string ret2="";
                long retInfo = 0;

                if (salesOrder.ReferenceNo == null){salesOrder.ReferenceNo = "";}
                if (salesOrder.Remarks == null){salesOrder.Remarks = "";}
                if (salesOrder.RefEmployeeName == null){salesOrder.RefEmployeeName = "";}
                if (salesOrder.CompanyNameBilling == null){salesOrder.CompanyNameBilling = "";}
                if (salesOrder.AddressBilling == null){salesOrder.AddressBilling = "";}
                if (salesOrder.CompanyNameDelivery == null){salesOrder.CompanyNameDelivery = "";}
                if (salesOrder.AddressDelivery == null){salesOrder.AddressDelivery = "";}
                
                try
                {

                    ret = Facade.pos_SalesOrderBLL.Add(salesOrder);
                    
                    string[] words = ret.Split(',');
                    ret =Convert.ToString( words[0]);
                    ret2 = Convert.ToString(words[1]);

                    if (salesOrder.SalesOrderId > 0)
                    {
                        if (VoidList != null && VoidList.Count > 0)
                        {
                            foreach (pos_SalesOrderDetail aVoid in VoidList)
                            {
                                if (aVoid.BuyerName == null) { aVoid.BuyerName = ""; }
                                if (aVoid.ItemDescription == null) { aVoid.ItemDescription = ""; }
                                if (aVoid.ItemDescriptionTwo == null) { aVoid.ItemDescriptionTwo = ""; }
                                if (aVoid.CartonSize == null) { aVoid.CartonSize = ""; }

                                aVoid.SalesOrderId = Convert.ToInt64(words[0]);
                                aVoid.IsVoid = true;
                                Facade.pos_SalesOrderDetailBLL.PostSODetail(aVoid);
                            }
                        }
                    }




                    if (pos_SaleOrderBillDetaillst != null && pos_SaleOrderBillDetaillst.Count > 0 && words.Length > 0)
                    {
                        foreach (pos_SalesOrderDetail apos_SalesOrderDetail in pos_SaleOrderBillDetaillst)
                        {
                            Int64 od_ret;
                            if (apos_SalesOrderDetail.BuyerName == null)
                            {
                                apos_SalesOrderDetail.BuyerName = "";
                            }
                            if (apos_SalesOrderDetail.ItemDescription == null) { apos_SalesOrderDetail.ItemDescription = ""; }
                            if (apos_SalesOrderDetail.ItemDescriptionTwo == null) { apos_SalesOrderDetail.ItemDescriptionTwo = ""; }
                            if (apos_SalesOrderDetail.CartonSize == null) { apos_SalesOrderDetail.CartonSize = ""; }

                            apos_SalesOrderDetail.SalesOrderId = Convert.ToInt64(words[0]);
                            od_ret=Facade.pos_SalesOrderDetailBLL.PostSODetail(apos_SalesOrderDetail);
                            apos_SalesOrderDetail.SalesOrderDetailId = od_ret;
                            if (apos_SalesOrderDetail.RollDirection == null) { apos_SalesOrderDetail.RollDirection = ""; }
                            if (apos_SalesOrderDetail.Ups == null) { apos_SalesOrderDetail.Ups = ""; }
                            retInfo = Facade.pos_SalesOrderDetailBLL.PostAdditionalInfo(apos_SalesOrderDetail);
                        }
                    }

                    if (POReferencelist != null && POReferencelist.Count > 0 && words.Length > 0)
                    {
                        foreach (pos_POReference aPOReferencelist in POReferencelist)
                        {
                            if (aPOReferencelist.AttachmentName == null) { aPOReferencelist.AttachmentName = ""; }
                            if (aPOReferencelist.PONo == null) { aPOReferencelist.PONo = ""; }
                            Int64 PO_ret;

                            aPOReferencelist.DocumentId = Convert.ToInt64(words[0]);
                            PO_ret = Facade.pos_POReferenceBLL.Add(aPOReferencelist);
                        }
                    }

                    ts.Complete();
                   
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "SalesOrderController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }
                string soIdWithNo = ret + "," + ret2;
                return soIdWithNo;
            }
        }

        public JsonResult PODeleteFile(string FileName)
        {
            try
            {
                //DateTime date = DateTime.Now;
                //string n = date.ToString("yyyyMMddHHmmss");
                //string root = @"D:\Development\Current\FontEndCurrent\Inhouse-ERP\Security.UI\UploadedFiles\ArtWork\" + path;
                string pathName = Server.MapPath("\\UploadedFiles\\POAttachment\\" + FileName);
                FileInfo file = new FileInfo(pathName);
                if (file.Exists)//check file exsit or not  
                {
                    file.Delete();
                }
                else
                {
                    Console.WriteLine("File not found");
                }

                return Json(JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPOReference(string DocType, Int64 DocumentId)
        {
            try
            {
                return Json(Facade.pos_POReferenceBLL.GetPOReference(DocType, DocumentId), JsonRequestBehavior.AllowGet);
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
        //public JsonResult GetSalesOrderNo()
        //{
        //    try
        //    {

        //        var dt = new DataTable();
        //        dt.Load(Facade.pos_SalesOrderBLL.GetMaxSalesOrderNo());

        //        List<string[]> results =
        //            dt.Select()
        //                .Select(drr =>
        //                    drr.ItemArray
        //                        .Select(x => x.ToString())
        //                        .ToArray())
        //                .ToList();

        //        return Json(results, JsonRequestBehavior.AllowGet);

        //    }


        //    catch (Exception ex)
        //    {

        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "SalesOrderController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}
        public JsonResult GetSalesOrderNo()
        {
            try
            {
                var maxNumber = Facade.pos_SalesOrderBLL.GetMaxSalesOrderNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetSalesOrderDetailBySalesOrderId(int salesOrderId)
        {
            try
            {
                return Json(Facade.pos_SalesOrderDetailBLL.GetBySalesOrderId(salesOrderId), JsonRequestBehavior.AllowGet);
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
        public JsonResult GetPaged(int startRecordNo, int rowPerPage, string fromDate, string toDate, string wildCard, string sortColumn)
        {
            try
            {

                if (!String.IsNullOrEmpty(startRecordNo.ToString()) && !String.IsNullOrEmpty(fromDate) && !String.IsNullOrEmpty(toDate))
                {
                    string whereClause = "SalesOrderDate BETWEEN '" + fromDate + "' AND '" + toDate + "' ";
                    if (!String.IsNullOrEmpty(wildCard.Trim()))
                    {
                        whereClause += " AND SalesOrderId LIKE '%" + wildCard + "%'";
                    }
                    var pbList = new
                    {
                        ListData = Facade.pos_SalesOrderBLL.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, "DESC", ref rowPerPage),
                        TotalRecord = rowPerPage
                    };
                    return Json(pbList, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetSalesOrderPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.pos_SalesOrderBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "SalesOrderId", "DESC", ref rows),
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
        [HttpPost]
        public int Acknowledge(pos_SalesOrder salesOrder)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                //Save in Accounts First
                var client = new RestClient("http://local.rtacct.com");
                var request = new RestRequest("api/action/RetailPos.insertData", Method.POST);

                request.AddParameter("data[tx_number]", "");
                request.AddParameter("data[action_type]", "Journal");
                request.AddParameter("data[ref_type]", "Sale");
                request.AddParameter("data[from_account_code]", "4001");
                request.AddParameter("data[to_account_code]", "1001");
                request.AddParameter("data[tx_date]", salesOrder.AcknowledgedDate);
                request.AddParameter("data[ref_Number]", salesOrder.SalesOrderId);
                request.AddParameter("data[amount]", salesOrder.Amount);

                bool accDataInsert = false;
                string voucherNo = string.Empty;

                int ret = 0;
                try
                {
                    IRestResponse response = client.Execute(request);

                    var jsonResult = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(response.Content);

                    foreach (var kv in jsonResult)
                    {
                        if (kv.Key == "error" && kv.Value == false)
                            accDataInsert = true;
                        else if (kv.Key == "data" && kv.Value != null)
                        {
                            voucherNo = (string)kv.Value["tx_number"];
                        }
                    }

                    if (accDataInsert && !string.IsNullOrEmpty(voucherNo))
                    {
                        salesOrder.IsAcknowledged = true;
                        salesOrder.VoucherNo = voucherNo;
                        ret = Facade.pos_SalesOrderBLL.Acknowledge(salesOrder);
                    }

                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "SalesOrderController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }

                return ret;
            }
        }
        public JsonResult GetForRealization(int financialCycleId, int companyId)
        {
            try
            {
                var list = Facade.pos_SalesOrderBLL.GetForRealization(financialCycleId, companyId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
    }
}