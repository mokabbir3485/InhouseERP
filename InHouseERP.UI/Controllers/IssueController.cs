using DbExecutor;
using InventoryBLL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;

namespace Security.UI.Controllers
{
    public class IssueController : Controller
    {




        //public JsonResult GetMaxStockIssueNumber()
        //{
        //    try
        //    {

        //        var dt = new DataTable();
        //        dt.Load(Facade.StockIssue.GetMaxIssueNumber());

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
        //        error.FileName = "IssueController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}


        [HttpGet]
        public JsonResult GetMaxSalesOrderNo()
        {
            try
            {
                var maxNumber = Facade.Requisition.GetMaxSalesOrderNo();
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

        [HttpGet]

        public JsonResult GetMaxStockIssueNumber()
        {
            try
            {
                var maxNumber = Facade.StockIssue.GetMaxIssueNo();
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

        public JsonResult InternalStockIssueGetMaxStockIssueNumber()
        {
            try
            {
                var maxNumber = Facade.StockIssue.InternalStockIssueGetMaxStockIssueNumber();
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



        [HttpGet]
        public JsonResult IssuedGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.StockIssue.GetPaged(startRecordNo, rowPerPage, whereClause, "IssueId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProductionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult InternalStockIssuedGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.StockIssue.InternalStockIssuedGetPaged(startRecordNo, rowPerPage, whereClause, "[ISI].[StockIssueId]", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProductionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

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
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetByIssueHistory(DateTime FromDate, DateTime ToDate)
        {
            try
            {
                var list = InventoryBLL.Facade.StockIssue.GetByIssueHistory(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetTopIssueForReturn(string whereCondition, string topQty)
        {
            try
            {
                var list = InventoryBLL.Facade.StockIssue.GetTopForReturn(whereCondition, topQty);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public string SaveStockIssue(inv_StockIssue stockIssue, List<inv_StockIssueDetail> issueDetailLst)
        {
            //Int64 ret = 0;
            string ret = "";
            string ret2 = "";
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                try
                {
                    stockIssue.CreateDate = DateTime.Now;
                    stockIssue.UpdateDate = DateTime.Now;
                    ret = InventoryBLL.Facade.StockIssue.Add(stockIssue);
                    string[] words = ret.Split(',');
                    ret = Convert.ToString(words[0]);
                    ret2 = Convert.ToString(words[1]);
                    //if (ret > 0)
                    //{
                        foreach (inv_StockIssueDetail issueDetail in issueDetailLst)
                        {
                            issueDetail.ItemName = "";
                            issueDetail.ItemCode = "N/A";
                            issueDetail.IssueUnitName = "N/A";
                            issueDetail.IssueUnitId = 0;
                            issueDetail.IssueId = Convert.ToInt64(ret);
                            Int64 IssueDetailId = Facade.StockIssueDetail.Add(issueDetail);
                        }
                   // }

                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "IssueController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }
                return ret2;
            }
        }


        [HttpPost]
        public string SaveInternalStockIssue(inv_InternalStockIssue InternalstockIssue, List<inv_InternalStockIssueDetail> InternalStockIssueDetailLst)
        {
            //Int64 ret = 0;
            string ret = "";
            string ret2 = "";
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                try
                {
                    InternalstockIssue.CreateDate = DateTime.Now;
                    InternalstockIssue.UpdateDate = DateTime.Now;
                    ret = InventoryBLL.Facade.StockIssue.AddInternalStockIssue(InternalstockIssue);
                    string[] words = ret.Split(',');
                    ret = Convert.ToString(words[0]);
                    ret2 = Convert.ToString(words[1]);

                    foreach (inv_InternalStockIssueDetail issueDetail in InternalStockIssueDetailLst)
                    {
                      
                        issueDetail.StockIssueId = Convert.ToInt64(ret2);
                        Int64 IssueDetailId = Facade.StockIssueDetail.InternalStockIssueDetailAdd(issueDetail);
                    }

                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "IssueController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }
                return ret;
            }
        }
        public string SaveStockIssueConsume(inv_StockIssue stockIssue, List<inv_StockIssueDetail> issueDetailLst)
        {
            //Int64 ret = 0;
            string ret = "";
            string ret2 = "";
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                try
                {
                    stockIssue.CreateDate = DateTime.Now;
                    stockIssue.UpdateDate = DateTime.Now;
                    ret = InventoryBLL.Facade.StockIssue.Add(stockIssue);
                    //if (ret > 0)
                    //{
                        string[] words = ret.Split(',');
                        ret = Convert.ToString(words[0]);
                        ret2 = Convert.ToString(words[1]);
                        foreach (inv_StockIssueDetail issueDetail in issueDetailLst)
                        {
                            issueDetail.ItemName = issueDetail.ItemName == null ? "" : issueDetail.ItemName;
                            issueDetail.ItemCode = issueDetail.ItemCode == null ? "N/A" : issueDetail.ItemCode;
                            issueDetail.IssueUnitName = issueDetail.IssueUnitName == null ? "N/A" : issueDetail.IssueUnitName;
                            //issueDetail.IssueUnitPrice = 10;
                            issueDetail.IssueUnitId = issueDetail.ItemUnitId;
                            issueDetail.IssueId = Convert.ToInt64(ret);
                            
                             Int64 IssueDetailId = Facade.StockIssueDetail.AddConsume(issueDetail);
                            

                        }
                   // }

                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "IssueController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }
                return ret2;
            }
        }

        //[HttpPost]
        //public int SaveStockIssue(inv_StockIssue _inv_StockIssue)
        //{
        //    _inv_StockIssue.CreateDate = DateTime.Now;
        //    _inv_StockIssue.UpdateDate = DateTime.Now;
        //    int ret = 0;

        //    try
        //    {
        //        ret = InventoryBLL.Facade.StockIssue.Add(_inv_StockIssue);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "IssueController";
        //        new ErrorLogController().CreateErrorLog(error);
        //    }
        //    return ret;
        //}
        [HttpPost]
        public int UpdateStockIssue(inv_StockIssue _inv_StockIssue)
        {
            _inv_StockIssue.CreateDate = DateTime.Now;
            _inv_StockIssue.UpdateDate = DateTime.Now;
            int ret = 0;

            try
            {
                ret = InventoryBLL.Facade.StockIssue.Update(_inv_StockIssue);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        //[HttpPost]
        //public int SaveStockIssueDetail(inv_StockIssueDetail _inv_StockIssueDetail)
        //{
        //    int ret = 0;
        //    try
        //    {
        //        //ret = 1;
        //        ret = InventoryBLL.Facade.StockIssueDetail.Add(_inv_StockIssueDetail);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "IssueController";
        //        new ErrorLogController().CreateErrorLog(error);
        //    }
        //    return ret;
        //}
        //[HttpPost]
        //public Int64 SaveStockIssueDetailAdAttribute(inv_StockIssueDetailAdAttribute _inv_StockIssueDetailAdAttribute)
        //{
        //    Int64 ret = 0;
        //    try
        //    {
        //        ret = InventoryBLL.Facade.StockIssueDetailAdAttribute.Add(_inv_StockIssueDetailAdAttribute);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "IssueController";
        //        new ErrorLogController().CreateErrorLog(error);
        //    }
        //    return ret;
        //}
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
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
            }
            return ret;
        }*/
        public JsonResult GetIssueById(Int64 id)
        {
            try
            {
                var list = InventoryBLL.Facade.StockIssue.GetById(id);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetIssueDetails(Int64 issueId)
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
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMaxIssueNoByDate(string issueDate)
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
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CheckDuplicateIssueNo(string IssueNo, string date)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(IssueNo) && !String.IsNullOrWhiteSpace(date))
                {
                    DateTime cDate = DateTime.ParseExact(date, "dd/MM/yyyy", null);

                    Common aCommon = new Common();
                    FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(cDate);
                    string formatedIssueNo = "IN/" + aFiscalYear.FromDate.Year.ToString().Substring(2, 2) + "-"
                                  + aFiscalYear.ToDate.Year.ToString().Substring(2, 2) + "/" + IssueNo;

                    var stockIssue = Facade.StockIssue.GetDynamic("[IssueNo]= '" + formatedIssueNo + "'", "[IssueDate]");

                    return Json(stockIssue, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMaterialDemandedIssuedForReport(Int64 ReportId, string ReportType)
        {
            try
            {
                var list = Facade.StockIssue.GetMaterialDemandedIssuedForReport(ReportId, ReportType);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult InternalStockIssueIssuedForReport(Int64 StockIssueId)
        {
            try
            {
                var list = Facade.StockIssue.InternalStockIssueIssuedForReport(StockIssueId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "IssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}