using Security.UI.Controllers;
using InventoryBLL;
using InventoryEntity;
using System;
using System.Web.Mvc;
using DbExecutor;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Security.UI.Controllers
{
    public class ProductionController : Controller
    {
        [HttpGet]
        public JsonResult GetAllMachine()
        {
            try
            {
                var list = Facade.pro_Production.MachineGetAll();
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult ProductionWiseDepartmentAndProductionById(Int64 ProductionId, int DepartmentId)
        {
            try
            {
                var iwolist = Facade.pro_ProductionDetail.ProductionWiseDepartmentAndProductionId(ProductionId, DepartmentId);
                return Json(iwolist, JsonRequestBehavior.AllowGet);
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

        [HttpGet]
        public JsonResult GetPagedProduction(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.pro_Production.GetPaged(startRecordNo, rowPerPage, whereClause, "ProductionId", "DESC", ref rows),
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
        public JsonResult ProductionReport(Int64 ProductionId)
        {
            try
            {
                var productionReportList = Facade.pro_ProductionDetail.GetProductionReport(ProductionId);
                return Json(productionReportList, JsonRequestBehavior.AllowGet);
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

        //public JsonResult GetMaxProductionNumber()
        //{
        //    try
        //    {

        //        var dt = new DataTable();
        //        dt.Load(Facade.pro_Production.GetMaxProductionNumber());

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
        //        error.FileName = "ProductionController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}
        public JsonResult GetDynamicProduction(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.pro_Production.GetDynamic(searchCriteria,orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetDynamicProductionDetail(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.pro_ProductionDetail.GetDynamic(searchCriteria,orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public string Save(pro_Production pro_Production, List<pro_ProductionDetail> pro_ProductionDetailList)
        {
            string ret = "";
            string ret2 = "";
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
               // long ret = 0;
                pro_Production.ProductionNo = pro_Production.ProductionNo == null ? "" : pro_Production.ProductionNo;
                pro_Production.Remarks = pro_Production.Remarks == null ? "" : pro_Production.Remarks;

                pro_Production.CreateDate = DateTime.Now;
                pro_Production.UpdateDate = DateTime.Now;
                try
                {
                    ret = Facade.pro_Production.Add(pro_Production);
                    string[] words = ret.Split(',');
                    ret = Convert.ToString(words[0]);
                    ret2 = Convert.ToString(words[1]);

                    if (pro_ProductionDetailList != null && pro_ProductionDetailList.Count > 0)
                    {
                        foreach (pro_ProductionDetail pro_ProductionDetail in pro_ProductionDetailList)
                        {

                            pro_ProductionDetail.ProductionId = Convert.ToInt64(ret);
                            Facade.pro_ProductionDetail.Add(pro_ProductionDetail);
                        }
                    }
                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "ProductionController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }
        
                //string ProdIdWithNo = ret2 + "," + ret;
                return ret2 + "," + ret;
            }
        }
        [HttpGet]
        public JsonResult GetMaxProductionNo()
        {
            try
            {
                var maxNumber = Facade.pro_Production.GetMaxProductionNumber();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
              
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

        public JsonResult CheckDuplicateProductionNo(string ProductionNo, string date)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(ProductionNo) && !String.IsNullOrWhiteSpace(date))
                {
                    DateTime cDate = DateTime.ParseExact(date, "dd/MM/yyyy", null);

                    Common aCommon = new Common();
                    FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(cDate);
                    string formatedProductionNo = "PN/" + aFiscalYear.FromDate.Year.ToString().Substring(2, 2) + "-"
                                  + aFiscalYear.ToDate.Year.ToString().Substring(2, 2) + "/" + ProductionNo;

                    var production = Facade.pro_Production.GetDynamic("[ProductionNo]= '" + formatedProductionNo + "'", "[ProductionDate]");

                    return Json(production, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
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

        public JsonResult ProductionHistoryReport(DateTime FormDate, DateTime ToDate)
        {
            try
            {
                var list = Facade.pro_ProductionDetail.ProductionHistoryReport(FormDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
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
    }
}