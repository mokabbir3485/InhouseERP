using System;
using System.Web.Mvc;
using InventoryEntity;
using InventoryBLL;
using DbExecutor;
using System.Collections.Generic;
using System.Linq;
using System.Data;

namespace Security.UI.Controllers
{
    public class RequisitionController : Controller
    {
        //
        // GET: /Requisition/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllRequisitionEntry()
        {
            try
            {
                var list = InventoryBLL.Facade.Requisition.GetAll();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetAllIWOForRequestion()
        {
            try
            {
                var list = InventoryBLL.Facade.Requisition.GetAllIWOForRequestion();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult RequisitionGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.Requisition.GetPaged(startRecordNo, rowPerPage, whereClause, " R.RequisitionId", "DESC", ref rows),
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



        [HttpPost]
        public string Save(inv_Requisition requisition, List<inv_RequisitionDetail> requisitionDetail, List<inv_RequisitionDetailAdAttribute> _inv_RequisitionDetailAdAttribute)
        {
            
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                string ret = "";
                string ret2 = "";
                requisition.CreateDate = DateTime.Now;
                requisition.UpdateDate = DateTime.Now;
                if (requisition.Remarks == null)
                {
                    requisition.Remarks = "";
                }
                try
                {
                    if (requisition.RequisitionId == 0)
                    {
                        ret = ret = Facade.Requisition.Add(requisition);
                        string[] words = ret.Split(',');
                        ret = Convert.ToString(words[0]);
                        ret2 = Convert.ToString(words[1]);

                      //  ret = Facade.Requisition.Add(requisition);
                       
                          
                            foreach (inv_RequisitionDetail aRequisitionDetail in requisitionDetail)
                            {
                              
                                //aRequisitionDetail.RequisitionPurposeName = aRequisitionDetail.RequisitionPurposeName == null ? "For Production" : aRequisitionDetail.RequisitionPurposeName;
                                //inv_RequisitionDetail adetail = new inv_RequisitionDetail()
                                //{
                                    
                                //    RollAreaInSqMeter=aRequisitionDetail.RollAreaInSqMeter,
                                //    RollLenghtInMeter= aRequisitionDetail.RollLenghtInMeter,
                                //    PackageWeight= aRequisitionDetail.PackageWeight,
                                //    RequisitionId = Convert.ToInt64(ret),
                                //    ItemUnitId = aRequisitionDetail.ItemUnitId,
                                //    ItemId = aRequisitionDetail.ItemAddAttId,
                                //    RequisitionUnitId = requisitionDetail.Where(d => d.RequisitionDetailId == aRequisitionDetail.RequisitionDetailId).FirstOrDefault().RequisitionUnitId,
                                //    RequisitionQuantity = aRequisitionDetail.AttributeQty,
                                //    RequisitionPurposeId = aRequisitionDetail.RequisitionPurposeId,
                                //    InternalWorkOrderDetailId = aRequisitionDetail.InternalWorkOrderDetailId,
                                //    ItemName = requisitionDetail.Where(a => a.RequisitionDetailId == aRequisitionDetail.RequisitionDetailId).FirstOrDefault().ItemName,
                                //    //ItemCode = requisitionDetail.Where(a => a.RequisitionDetailId == aRequisitionDetail.RequisitionDetailId).Select(i => i.ItemCode).FirstOrDefault(),
                                //    RequisitionUnitName = requisitionDetail.Where(d => d.RequisitionDetailId == aRequisitionDetail.RequisitionDetailId).FirstOrDefault().RequisitionUnitName,
                                //    RequisitionPurposeName = aRequisitionDetail.RequisitionPurposeName
                                //};

                                 

                                 int requisitonDetailId = Convert.ToInt32(words[0]);
                                 aRequisitionDetail.RequisitionId= Convert.ToInt64(ret);
                                 requisitonDetailId = InventoryBLL.Facade.RequisitionDetail.Add(aRequisitionDetail);
                                 
                            }

                      
                    }
                    else
                    {



                        //_inv_RequisitionDetailAdAttribute.Clear();
                        //_inv_RequisitionDetailAdAttribute=null;
                        //_inv_RequisitionDetailAdAttribute.Clear();

                        Int64 reqUpdate = 0;
                        reqUpdate = Facade.Requisition.Update(requisition);
                        if (reqUpdate==1)
                        {
                           ret2 = requisition.RequisitionNo;
                        }
                       

                        Int64 ReqId = requisition.RequisitionId;
                        Facade.Requisition.Delete(ReqId);

                       // List<inv_RequisitionDetailAdAttribute> List = new List<inv_RequisitionDetailAdAttribute>();
                        
                  
                       

                        foreach (inv_RequisitionDetail aRequisitionDetail in requisitionDetail)
                        {
                            Int64 reqDetailId = 0;
                            aRequisitionDetail.RequisitionId = requisition.RequisitionId;
                            aRequisitionDetail.RequisitionPurposeName = aRequisitionDetail.RequisitionPurposeName ==null ? "" : aRequisitionDetail.RequisitionPurposeName;
                           // aRequisitionDetail.RequisitionUnitName = aRequisitionDetail.RequisitionUnitName == null ? "" : aRequisitionDetail.RequisitionUnitName;
                            aRequisitionDetail.ItemCode = aRequisitionDetail.ItemCode ==null ? "" : aRequisitionDetail.ItemCode;
                            aRequisitionDetail.RequisitionUnitName = aRequisitionDetail.RequisitionUnitName == null ? "Rolls" : aRequisitionDetail.RequisitionUnitName;
                            reqDetailId = Facade.RequisitionDetail.Add(aRequisitionDetail);
                        }



                    }
                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "RequisitionController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }
                return  ret2;
            }
        }


        [HttpPost]
        public Int64 Update(inv_Requisition requisition, List<inv_RequisitionDetail> requisitionDetail)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                long ret = 0;
                requisition.CreateDate = DateTime.Now;
                requisition.UpdateDate = DateTime.Now;
                if (requisition.Remarks == null)
                {
                    requisition.Remarks = "";
                }
                try
                {
                   
                    ret = Facade.Requisition.Update(requisition);
                    Int64 ReqId = requisition.RequisitionId;
                    Facade.Requisition.Delete(ReqId);


                    foreach (inv_RequisitionDetail aRequisitionDetail in requisitionDetail)
                    {
                        aRequisitionDetail.RequisitionId = requisition.RequisitionId;
                        aRequisitionDetail.RequisitionPurposeName = aRequisitionDetail.RequisitionPurposeName == "" ? "" : aRequisitionDetail.RequisitionPurposeName;
                        aRequisitionDetail.ItemCode = aRequisitionDetail.ItemCode == "" ? "" : aRequisitionDetail.ItemCode;
                        aRequisitionDetail.RequisitionUnitName = aRequisitionDetail.RequisitionUnitName == "" ? "Rolls" : aRequisitionDetail.RequisitionUnitName;
                        ret = Facade.RequisitionDetail.Add(aRequisitionDetail);
                    }


                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "RequisitionController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }
                return ret;
            }
        }

        //[HttpPost]
        //public Int64 SaveRequisitionDetailAdAttribute(inv_RequisitionDetailAdAttribute _inv_RequisitionDetailAdAttribute)
        //{
        //    Int64 ret = 0;
        //    try
        //    {
        //        ret = InventoryBLL.Facade.RequisitionDetailAdAttribute.Add(_inv_RequisitionDetailAdAttribute);
        //    }
        //    catch (Exception ex)
        //    {

        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "RequisitionController";
        //        new ErrorLogController().CreateErrorLog(error);
        //    }
        //    return ret;
        //}

        //[HttpPost]
        //public Int64 SaveRequisitionDetailAdAttributeDetail(inv_RequisitionDetailAdAttributeDetail _inv_RequisitionDetailAdAttributeDetail)
        //{
        //    Int64 ret = 0;
        //    try
        //    {
        //        if (_inv_RequisitionDetailAdAttributeDetail.AttributeValue == null)
        //            _inv_RequisitionDetailAdAttributeDetail.AttributeValue = "";
        //        ret = InventoryBLL.Facade.RequisitionDetailAdAttributeDetail.Add(_inv_RequisitionDetailAdAttributeDetail);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "RequisitionController";
        //        new ErrorLogController().CreateErrorLog(error);

        //    }
        //    return ret;
        //}

        [HttpPost]
        public int Delete(int RequisitionId)
        {
            int ret = 0;
            try
            {

                ret = Facade.Requisition.Delete(RequisitionId);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        public JsonResult GetRequisitionById(Int64 id)
        {
            try
            {
                var list = Facade.Requisition.GetById(id);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetTopRequisitionForIssue()
        {
            try
            {
                var list = InventoryBLL.Facade.Requisition.GetTopForIssue();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetRequisitionDetailByRequisitionId(Int64 id)
        {
            try
            {
                var list = Facade.RequisitionDetail.GetByRequisitionId(id);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllReuisitionDetailAdAttributeByReuisitionDetailId(Int64 requisitionDetailId)
        {
            try
            {
                var list = Facade.RequisitionDetailAdAttribute.GetByRequisitionDetailId(requisitionDetailId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllRequisitionDetailAdAttributeByReuisitionDetailAdAttId(Int64 requisitionDetailAdAttId)
        {
            try
            {
                var list = Facade.RequisitionDetailAdAttributeDetail.GetByRequisitionDetailAdAttId(requisitionDetailAdAttId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);

            }
        }

        public JsonResult GetMaxIssueNoWithoutReqByDate(string requDate)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(requDate))
                {
                    var date = DateTime.ParseExact(requDate, "dd/MM/yyyy", null);
                    var maxNumber = Facade.Requisition.GetGeneralMaxRequNoByDate(date);

                    return Json(maxNumber, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
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
        public JsonResult GetMaxRequNoByDate(string requDate)
        {
            try
            {
                var maxNumber=0.00;
                if (!String.IsNullOrWhiteSpace(requDate))
                {
                    var date = DateTime.ParseExact(requDate, "dd/MM/yyyy", null);
                    maxNumber = Facade.Requisition.GetGeneralMaxRequNoByDate(date);  
                }
                return Json(maxNumber, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        //public JsonResult GetMaxReqNo()
        //{
        //    try
        //    {

        //        var dt = new DataTable();
        //        dt.Load(Facade.Requisition.GetMaxRequestionNumber());

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
        //        error.FileName = "PurchaseBillController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}


        public JsonResult CheckDuplicateRN(string RequisitionNo, string date)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(RequisitionNo) && !String.IsNullOrWhiteSpace(date))
                {
                    DateTime cDate = DateTime.ParseExact(date, "dd/MM/yyyy", null);

                    Common aCommon = new Common();
                    FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(cDate);
                    string formatedReqNo = "RN/" + aFiscalYear.FromDate.Year.ToString().Substring(2, 2) + "-"
                                  + aFiscalYear.ToDate.Year.ToString().Substring(2, 2) + "/" + RequisitionNo;

                    var requistion = Facade.Requisition.GetDynamic("[RequisitionNo]= '" + formatedReqNo + "'", "[RequisitionDate]");

                    return Json(requistion, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RequisitionController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}