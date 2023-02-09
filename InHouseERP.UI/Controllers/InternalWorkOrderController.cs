using Security.UI.Controllers;
using InventoryBLL;
using InventoryEntity;
using System;
using System.Web.Mvc;
using DbExecutor;
using System.Collections.Generic;
using PosEntity;
using System.IO;
using System.Web;
using SecurityEntity.INVENTORY.InventoryEntity;
using System.Net.Mail;
using System.Net;

namespace Security.UI
{
    public class InternalWorkOrderController : Controller
    {
        /// <summary>
        /// ///////////
        /// </summary>
        /// <returns></returns>
        /// 

        


        public JsonResult GetBy_inv_CIFProductReports(string CompanyId, Int32? PreparedById = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            try
            {
                var iwolist = Facade.inv_InternalWorkOrderBLL.GetBy_inv_CIFProductReports(CompanyId, PreparedById, startDate, endDate);
                return Json(iwolist, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(ex.Message, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetBy_inv_CIFCustomerReports(Int64 CompanyId)
        {
            try
            {
                var iwolist = Facade.inv_InternalWorkOrderBLL.GetBy_inv_CIFCustomerReports(CompanyId);
                return Json(iwolist, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(ex.Message, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


      
        /// <summary>
        /// //////////////
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpGet]
        public JsonResult inv_ExpAmendment_GetForEdit(string approvalType, string approvalPassword)
        {
            try
            {
                var invExpAmendmentList = Facade.inv_InternalWorkOrderBLL.inv_InternalWorkOrderAmendment_GetForEdit(approvalType, approvalPassword);
                return Json(invExpAmendmentList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log
                {
                    ErrorMessage = ex.Message,
                    ErrorType = ex.GetType().ToString(),
                    FileName = "ExpApprovalController"
                };
                new ErrorLogController().CreateErrorLog(error);
                //  return Json(ex.Message, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllInternalWorkOrder()
        {
            try
            {
                var iwolist = Facade.inv_InternalWorkOrderBLL.GetAll();
                return Json(iwolist, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(ex.Message, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult ProductionWiseInternalWorkOrder(int DepartmentId,int StockTransferTypeId)
        {
            try
            {
                var iwolist = Facade.inv_InternalWorkOrderBLL.ProductionWiseInternalWorkOrder(DepartmentId, StockTransferTypeId);
                return Json(iwolist, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                //return Json(ex.Message, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


      
        public JsonResult GetInternalWorkOrderDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.inv_InternalWorkOrderBLL.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                //  return Json(ex.Message, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult InternalWorkOrderGetDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.inv_InternalWorkOrderBLL.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(ex.Message, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult inv_InternalWorkOrder_ForProduction()
        {
            try
            {
                var list = Facade.inv_InternalWorkOrderBLL.inv_InternalWorkOrder_ForProduction();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                //  return Json(ex.Message, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult SaveFiles(string description)
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
                var artWorkFileName = "Art" + "_" + actualFileName;




                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles/ArtWork"), artWorkFileName));

                }
                catch (Exception ex)
                {
                    Message = "File upload failed! Please try again";
                }

            }
            return new JsonResult { Data = new { Message = Message, Status = flag } };
        }
        [HttpPost]
        public string Save(inv_InternalWorkOrder inv_InternalWorkOrder, List<inv_InternalWorkOrderDetail> inv_InternalWorkOrderDetailList,List<long> DeleteForIWOIds)
        {
           
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                string ret = "";
                string ret2 = "";

                //inv_InternalWorkOrder.InternalWorkOrderNo = inv_InternalWorkOrder.InternalWorkOrderNo == null ? "" : inv_InternalWorkOrder.InternalWorkOrderNo;
                inv_InternalWorkOrder.Remarks = inv_InternalWorkOrder.Remarks == null ? "" : inv_InternalWorkOrder.Remarks;

                inv_InternalWorkOrder.CreateDate = DateTime.Now;
                inv_InternalWorkOrder.UpdateDate = DateTime.Now;


                Int64 IWId = inv_InternalWorkOrder.InternalWorkOrderId;

                if (DeleteForIWOIds != null)
                {
                    foreach (var item in DeleteForIWOIds)
                    {
                        Facade.inv_InternalWorkOrderDetailBLL.IWODetailDelete(item);
                     
                    }
                }

                try
                {

                   
                    ret = Facade.inv_InternalWorkOrderBLL.Add(inv_InternalWorkOrder);
                        string[] words = ret.Split(',');
                        ret = Convert.ToString(words[0]);
                        ret2 = Convert.ToString(words[1]);
                    if (inv_InternalWorkOrderDetailList != null && inv_InternalWorkOrderDetailList.Count > 0)
                    {
                       

                        foreach (inv_InternalWorkOrderDetail inv_InternalWorkOrderDetail in inv_InternalWorkOrderDetailList)
                        {
                            if (String.IsNullOrEmpty(inv_InternalWorkOrderDetail.DetailRemarks))
                            {
                                inv_InternalWorkOrderDetail.DetailRemarks = "";
                            }
                            inv_InternalWorkOrderDetail.RollDirection = inv_InternalWorkOrderDetail.RollDirection == null ? "" : inv_InternalWorkOrderDetail.RollDirection;



                            //if ( inv_InternalWorkOrderDetail.InternalWorkOrderDetailId==0)
                            //{
                            //    inv_InternalWorkOrderDetail.InternalWorkOrderId =Convert.ToInt64(ret);
                            //    InventoryBLL.Facade.inv_InternalWorkOrderDetailBLL.Add(inv_InternalWorkOrderDetail);
                            //}
                            //else
                            //{
                            // 
                             Int64 InternalWorkOrderId = Convert.ToInt64(ret);
                            if (InternalWorkOrderId==0)
                            {
                                inv_InternalWorkOrderDetail.InternalWorkOrderId = inv_InternalWorkOrder.InternalWorkOrderId;
                            }
                            else
                            {
                                inv_InternalWorkOrderDetail.InternalWorkOrderId =InternalWorkOrderId;
                            }
                              
                               InventoryBLL.Facade.inv_InternalWorkOrderDetailBLL.Update(inv_InternalWorkOrderDetail);
                            //}
                        }
                    }
                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "InternalWorkOrderController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "" ;


                }
                string retIds = ret2 + "," + ret;
                return retIds;
            }
        }

       // [HttpGet]
        //public int Delete(Int64 internalWorkDetailId)
        //{
        //    int ret = 0;
        //    try
        //    {
        //        ret =Facade.inv_InternalWorkOrderDetailBLL.Delete(internalWorkDetailId);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "BranchController";
        //        new ErrorLogController().CreateErrorLog(error);
        //    }
            
        //    return ret;
        //}
        [HttpGet]
        public int IWOItemUpdatedForDelete(Int64 internalWorkDetailId)
        {
            int ret = 0;
            try
            {
                ret = Facade.inv_InternalWorkOrderDetailBLL.IWOUpdatedItemForDelete(internalWorkDetailId);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "BranchController";
                new ErrorLogController().CreateErrorLog(error);
                new ErrorLogController().CreateErrorLog(error);

                return 0;
            }

            return ret;
        }

        [HttpGet]
        public JsonResult IWOItemResetWithGetBySOItemLoad(Int64 SalesOrderId)
        {
            try
            {
                var SoItemList = Facade.inv_InternalWorkOrderDetailBLL.IWOItemResetWithGetBySOItemForLoad(SalesOrderId);
                return Json(SoItemList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }



        [HttpGet]
        public JsonResult InternalWorkOrderGetMaxNoBySalesOrderId(Int32 SalesOrderId)
        {
            try
            {
                var SoItemList = Facade.inv_InternalWorkOrderDetailBLL.InternalWorkOrderGetMaxNoBySalesOrderId(SalesOrderId);
                return Json(SoItemList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                //return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetConfirmationMessageForAdmin()
        {
            try
            {
                var ConfirmationMessageForAdmin = System.Configuration.ConfigurationManager.AppSettings["ConfirmationMessageForAdmin"].ToString();
                return Json(ConfirmationMessageForAdmin, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetExpairDate(DateTime date)
        {
            int daysCount = 0;
            DateTime myDate = new DateTime(date.Year, date.Month, date.Day + 1);
            while (daysCount < 30)
            {
                if (myDate.DayOfWeek != DayOfWeek.Saturday && myDate.DayOfWeek != DayOfWeek.Friday)
                {
                    daysCount++;
                }
                myDate = myDate.AddDays(1);
            }
            var x = myDate.AddDays(-1).ToString("dd/MM/yyyy");
             return Json(x, JsonRequestBehavior.AllowGet);
            
        }
        public JsonResult GetMaxInternalWorkerNo(string deliveryDate)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(deliveryDate))
                {
                    var date = DateTime.ParseExact(deliveryDate, "dd/MM/yyyy", null);
                    var maxNumber = InventoryBLL.Facade.inv_InternalWorkOrderBLL.GetMaxInternalWorkerNo(date);

                    return Json(maxNumber, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
               // return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                //return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult deleteFile(string FileName)
        {
            try
            {
                //DateTime date = DateTime.Now;
                //string n = date.ToString("yyyyMMddHHmmss");
                //string root = @"D:\Development\Current\FontEndCurrent\Inhouse-ERP\Security.UI\UploadedFiles\ArtWork\" + path;
                string pathName = Server.MapPath("\\UploadedFiles\\ArtWork\\" + FileName);
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
                //return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult CheckDuplicateIWO(string InternalWorkOrderNo, string date)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(InternalWorkOrderNo) && !String.IsNullOrWhiteSpace(date))
                {
                    DateTime cDate = DateTime.ParseExact(date, "dd/MM/yyyy", null);

                    Common aCommon = new Common();
                    FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(cDate);
                    string formatedIWONo = "IWO/" + aFiscalYear.FromDate.Year.ToString().Substring(2, 2) + "-"
                                  + aFiscalYear.ToDate.Year.ToString().Substring(2, 2) + "/" + InternalWorkOrderNo;

                    var internalWorkOrder = InventoryBLL.Facade.inv_InternalWorkOrderBLL.GetDynamic("[InternalWorkOrderNo]= '" + formatedIWONo + "'", " [InternalWorkOrderDate]");

                    return Json(internalWorkOrder, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                //  return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult GetInternalWorkOrderDetailByInternalWorkOrderId(int internalWorkId)
        {
            try
            {
                var getInternalWorkOrder =Facade.inv_InternalWorkOrderDetailBLL.GetByInternalWorkOrderId(internalWorkId);
                return Json(getInternalWorkOrder, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetInternalWorkOrderDetailByInternalWorkOrderIdForRequisition(Int64 internalWorkId)
        {
            try
            {
                var getInternalWorkOrder = InventoryBLL.Facade.inv_InternalWorkOrderDetailBLL.GetByInternalWorkOrderIdForRequisition(internalWorkId);
                return Json(getInternalWorkOrder, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetInternalWorkOrderDetailByInternalWorkOrderIdForProduction(int internalWorkId)
        {
            try
            {
                var getInternalWorkOrder = InventoryBLL.Facade.inv_InternalWorkOrderDetailBLL.GetByInternalWorkOrderIdForProduction(internalWorkId);
                return Json(getInternalWorkOrder, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPaged(int startRecordNo, int rowPerPage, string fromDate, string toDate, string wildCard, string sortColumn)
        {
            try
            {

                if (!String.IsNullOrEmpty(startRecordNo.ToString()) && !String.IsNullOrEmpty(fromDate) && !String.IsNullOrEmpty(toDate))
                {
                    string whereClause = "InternalWorkOrderDate BETWEEN '" + fromDate + "' AND '" + toDate + "' ";
                    if (!String.IsNullOrEmpty(wildCard.Trim()))
                    {
                        whereClause += " AND InternalWorkOrderNo LIKE '%" + wildCard + "%'";
                    }
                    var pbList = new
                    {
                        ListData = Facade.inv_InternalWorkOrderBLL.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, "ASC", ref rowPerPage),
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
                error.FileName = "InternalWorkOrderController";
                new ErrorLogController().CreateErrorLog(error);
                // return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public Int64 InternalWorkOrderDetail_For_UpdateArtWork(Int64 internalWorkOrderDetailId)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {

                Int64 ret = 0;

                try
                {
                    ret = Facade.inv_InternalWorkOrderDetailBLL.InternalWorkOrderDetail_For_UpdateArtWork(internalWorkOrderDetailId);

                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "InternalWorkOrderController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }
                return ret;
            }
        }

        [HttpGet]
        public JsonResult GetPagedIWO(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.inv_InternalWorkOrderBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "IWO.UpdateDate", "DESC", ref rows),
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
                //  return Json(null, JsonRequestBehavior.AllowGet);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        
       

    }
}