using InventoryBLL;
using InventoryEntity;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DbExecutor;
using System.Linq;
using System.Data;

namespace Security.UI.Controllers
{
    public class IssueWithoutRequisitionController : Controller
    {
        public JsonResult GetItemAdditionalAttributeOperationalByItemId(int itemId)
        {
            try
            {
                var list1 = SecurityBLL.Facade.ItemAdditionalAttribute.GetOperationalByItemId(itemId);
                var list2 = SecurityBLL.Facade.ItemAdditionalAttributeValue.GetAll();
                var result = new { Attribute = list1, AttributeDetails = list2 };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]

        public JsonResult GetMaxStockTransferNumber()
        {
            try
            {
                var maxNumber = Facade.inv_StockTransfer.GetMaxStockTransferNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseBillController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetStockIssueDetailAdAttributeByDepartmentAndItemId(Int32 DepartmentId, Int32 itemId)
        {
            try
            {
                var list = InventoryBLL.Facade.StockIssueDetailAdAttribute.GetByDepartmentAndItemId(DepartmentId, itemId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public string SaveIssueWithoutReq(inv_StockTransfer stockTransfer, List<inv_StockTransferDetail> stockTransferDetail, List<inv_TransferSerialDetail> TransferSerialList)
        {

            if (stockTransfer.Remarks == null) { stockTransfer.Remarks = ""; }
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                string Tret = "";
                string Tret2 = "";

                try
                {
                    stockTransfer.UpdateDate = DateTime.Now;
                    Tret = Facade.inv_StockTransfer.Post(stockTransfer);

                    string[] Twords = Tret.Split(',');
                    Tret = Convert.ToString(Twords[0]);
                    Tret2 = Convert.ToString(Twords[1]);
                    if (Convert.ToInt64(Tret) > 0)
                    {
                        foreach (var aStockTransferDetail in stockTransferDetail)
                        {
                            //aStockTransferDetail.TransferDate = stockTransfer.StockTransferDate;
                            aStockTransferDetail.StockTransferId = Convert.ToInt64(Tret);
                            aStockTransferDetail.FromStore = stockTransfer.FromStore;
                            Facade.inv_StockTransfer.StockTransferDetailPost(aStockTransferDetail);
                        }
                    }

                    if(TransferSerialList != null)
                    {
                        foreach (var aTransferSerial in TransferSerialList)
                        {
                            Facade.inv_StockTransfer.UpdateHardwareTransferWarrantyAndSerial(aTransferSerial);
                        }
                    }


                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "IssueWithoutRequisitionController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }

                return Tret2;
            }
        }



        public JsonResult GetStockTransferPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.inv_StockTransfer.GetPaged(startRecordNo, rowPerPage, whereClause, "StockTransferId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        //public JsonResult GetMaxStockTransferNumber()
        //{
        //    try
        //    {

        //        var dt = new DataTable();
        //        dt.Load(Facade.inv_StockTransfer.GetMaxStockTransferNo());

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
        //        error.FileName = "IssueWithoutRequisitionController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}

        [HttpPost]
        public int UpdateIssueWithoutReq(inv_StockIssue stockIssue)
        {
            int ret = 0;
            stockIssue.CreateDate = DateTime.Now;
            stockIssue.UpdateDate = DateTime.Now;
            //stockIssue.UpdatorId = 1;
            //stockIssue.ApprovedBy = 0;
            //stockIssue.IssueDate = DateTime.Now;
            try
            {
                //ret = 1;
                ret = InventoryBLL.Facade.StockIssue.Update(stockIssue);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        [HttpPost]
        public Int64 SaveIssueWithoutReqDetail(inv_StockIssueDetail issueDetail, Int64 issueId)
        {
            Int64 ret = 0;
            try
            {
                issueDetail.IssueId = issueId;
                ret = Facade.StockIssueDetail.Add(issueDetail);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpPost]
        public int IssueApproveWithoutRequesition(inv_StockIssue stockIssue)
        {
            int ret = 0;
            //stockIssue.CreateDate = DateTime.Now;
            //stockIssue.UpdateDate = DateTime.Now;
            //stockIssue.UpdatorId = 1;
            //stockIssue.ApprovedBy = 0;
            //stockIssue.ApprovedDate = DateTime.Now;
            try
            {
                //ret = 1;
                ret = InventoryBLL.Facade.StockIssue.UpdateApprove(stockIssue);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpPost]
        public Int64 SaveStockIssueDetailAdAttribute(inv_StockIssueDetailAdAttribute _inv_StockIssueDetailAdAttribute)
        {
            Int64 ret = 0;
            try
            {
                ret = InventoryBLL.Facade.StockIssueDetailAdAttribute.Add(_inv_StockIssueDetailAdAttribute);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        /*
        [HttpPost]
        public Int64 SaveStockIssueDetailAdAttributeDetail(inv_StockIssueDetailAdAttributeDetail _inv_StockIssueDetailAdAttributeDetail)
        {
            Int64 ret = 0;
            try
            {
                if (_inv_StockIssueDetailAdAttributeDetail.AttributeValue == null)
                    _inv_StockIssueDetailAdAttributeDetail.AttributeValue = "";
                ret = InventoryBLL.Facade.StockIssueDetailAdAttributeDetail.Add(_inv_StockIssueDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
            }
            return ret;
        }
*/
        public JsonResult GetIssueDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = InventoryBLL.Facade.StockIssue.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllStockTransferType()
        {
            try
            {
                var list = InventoryBLL.Facade.inv_StockTransfer.GetAllStockTransferType();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetIssueByIssueId(Int64 issueId)
        {
            try
            {
                var list = InventoryBLL.Facade.StockIssue.GetById(issueId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetIssueDetailByIssueId(Int64 issueId)
        {
            try
            {
                var list = InventoryBLL.Facade.StockIssueDetail.GetByIssueId(issueId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllStockIssueDetailAdAttributeGetByIssueDetailId(Int64 IssueDetailId)
        {
            try
            {
                var list = Facade.StockIssueDetailAdAttribute.GetByIssueDetailId(IssueDetailId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }




      
        /*
        public JsonResult GetAllStockIssueDetailAdAttributeDetailGetByIssueDetailAdAttId(Int64 IssueDetailAdAttId)
        {
            try
            {
                var list = Facade.StockIssueDetailAdAttributeDetail.GetByIssueDetailAdAttId(IssueDetailAdAttId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }*/
        public JsonResult GetMaxIssueNoWithoutReqByDate(string issueDate)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(issueDate))
                {
                    var date = DateTime.ParseExact(issueDate, "dd/MM/yyyy", null);
                    var maxNumber = InventoryBLL.Facade.StockIssue.GetMaxIssueNoByDate(date);

                    return Json(maxNumber, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetMaterialReturnAndISTMForReport(Int64 StockTransferId, Int32 StockTransferTypeId)
        {
            try
            {
                var list = Facade.inv_StockTransfer.GetMaterialReturnAndISTMForReport(StockTransferId, StockTransferTypeId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult StoreAndItemTransferReport(Int64 StockTransferId, Int32 StockTransferTypeId)
        {
            try
            {
                var list = Facade.inv_StockTransfer.StoreAndItemTransferReport(StockTransferId, StockTransferTypeId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult StockTransferLog(DateTime FromDate,DateTime ToDate, int DepartmentId, int ? StockTransferTypeId=null, int? ItemId = null,int ? MaterialTypeId=null)
        {
            try
            {
                var list = Facade.inv_StockTransfer.StockTransferLog(FromDate, ToDate,DepartmentId, StockTransferTypeId, ItemId, MaterialTypeId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueWithoutRequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}