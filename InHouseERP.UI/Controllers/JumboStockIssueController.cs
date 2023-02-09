using DbExecutor;
using InventoryBLL;
using InventoryEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;

namespace Security.UI.Controllers
{
    public class JumboStockIssueController : Controller
    {
        // GET: JumboStockIssue
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetMaxJumboStockIssueNumber()
        {
            try
            {

                var dt = new DataTable();
                dt.Load(Facade.inv_JumboStockIssueBLL.inv_JumboStockIssueDAO.GetMaxJumboStockIssueNumber());

                List<string[]> results =
                    dt.Select()
                        .Select(drr =>
                            drr.ItemArray
                                .Select(x => x.ToString())
                                .ToArray())
                        .ToList();

                return Json(results, JsonRequestBehavior.AllowGet);

            }


            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JumboStockIssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


       
        [HttpPost]
        public string Post(inv_JumboStockIssue inv_JumboStockIssue, List<inv_JumboStockIssueDetail> inv_JumboStockIssueDetail)
        {

            string ret = "";
            string ret2 = "";
            string jumboIssuNoWithId1 = "";
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.inv_JumboStockIssueBLL.inv_JumboStockIssueDAO.Post(inv_JumboStockIssue);
                    string[] words = ret.Split(',');
                    ret = Convert.ToString(words[0]);
                    ret2 = Convert.ToString(words[1]);

                    int retId = Convert.ToInt32(ret);
                    if (retId > 0)
                    {
                        foreach (inv_JumboStockIssueDetail aJumboStockIssueDetail in inv_JumboStockIssueDetail)
                        {
                            //aJumboStockIssueDetail.IssuedRawMatUnitPrice = 10;
                            aJumboStockIssueDetail.JIssueId =Convert.ToInt32(ret);
                            if (aJumboStockIssueDetail.JIssueDetailId == 0)
                            {
                                Int64 IssueDetailId = Facade.inv_JumboStockIssueBLL.inv_JumboStockIssueDAO.AddDetail(aJumboStockIssueDetail);

                            }
                            
                        }
                        
                    }
                    ts.Complete();

                }
                jumboIssuNoWithId1 = ret + "," + ret2;
                return jumboIssuNoWithId1;
            }
            catch (Exception ex)
            {
                
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JumboStockIssueController";
                new ErrorLogController().CreateErrorLog(error);
                return "";
            }
            //string jumboIssuNoWithId2 = ret + "," + ret2;
            //return jumboIssuNoWithId2;
        }

        [HttpGet]
        public JsonResult JumboIssuedGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.inv_JumboStockIssueBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "JSID.JIssueDetailId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JumboStockIssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult JumboStockIssueDetailGetByJIssueId(Int64 JIssueId)
        {
            try
            {
                var list = Facade.inv_JumboStockIssueBLL.inv_JumboStockIssueDAO.JumboStockIssueDetailGetByJIssueId(JIssueId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JumboStockIssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        

        public JsonResult GetMaxJumboIssueNo()
        {
            try
            {
                var maxNumber = Facade.inv_JumboStockIssueBLL.GetMaxJumboIssueNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "JumboStockIssueController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

      

    }
}