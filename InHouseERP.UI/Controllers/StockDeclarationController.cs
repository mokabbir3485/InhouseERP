using InventoryBLL;
using InventoryEntity;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DbExecutor;

namespace Security.UI.Controllers
{
    public class StockDeclarationController : Controller
    {

        [HttpPost]
        public Int64 SaveStockDeclaration(inv_StockDeclaration stockDeclaration, List<inv_StockDeclarationDetail> stockDeclarationDetailList, List<inv_StockDeclarationDetail> DeletedStockDeclarationDetailList)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                Int64 ret = 0;
                stockDeclaration.Remarks = string.IsNullOrEmpty(stockDeclaration.Remarks) ? "" : stockDeclaration.Remarks;

                try
                {

                    ret = Facade.StockDeclaration.Post(stockDeclaration);
                    if (ret > 0)
                    {
                        if (DeletedStockDeclarationDetailList != null && DeletedStockDeclarationDetailList.Count > 0)
                        {
                            foreach (var aDeletedStockDeclarationDetail in DeletedStockDeclarationDetailList)
                            {
                                Facade.StockDeclarationDetail.DeleteStockDeclarationDetailId(aDeletedStockDeclarationDetail.DeclarationDetailId);

                            }
                        }

                        foreach (inv_StockDeclarationDetail stockDeclarationDetail in stockDeclarationDetailList)
                        {
                            stockDeclarationDetail.DeclarationId = ret;
                            Int64 declerationDetailId = Facade.StockDeclarationDetail.Post(stockDeclarationDetail);
                        }
                    }
                    
                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "StockDeclarationController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }
                return ret;
            }
        }

        [HttpGet]
        public JsonResult GetMaxStockDeclarationNumber()
        {
            try
            {
                var maxNumber = Facade.StockDeclaration.GetMaxStockDeclarationNumber();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public Int64 SaveStockDeclarationDetailAdAttribute(inv_StockDeclarationDetailAdAttribute stockDeclarationDetailAdAttribute)
        {
            Int64 ret = 0;
            try
            {
                ret = InventoryBLL.Facade.StockDeclarationDetailAdAttribute.Add(stockDeclarationDetailAdAttribute);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpPost]
        public Int64 SaveStockDeclarationDetailAdAttributeDetail(inv_StockDeclarationDetailAdAttributeDetail stockDeclarationDetailAdAttributeDetail)
        {
            Int64 ret = 0;
            try
            {
                if (stockDeclarationDetailAdAttributeDetail.AttributeValue == null)
                    stockDeclarationDetailAdAttributeDetail.AttributeValue = "";
                ret = InventoryBLL.Facade.StockDeclarationDetailAdAttributeDetail.Add(stockDeclarationDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        public JsonResult GetAllstockDeclaration(Int64? id = null)
        {
            try
            {
                var list = Facade.StockDeclaration.GetAll(id);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult StockDeclarationDetailGetById(Int64 DeclarationId )
        {
            try
            {
                var list = Facade.StockDeclaration.StockDeclarationDetailGetById(DeclarationId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetStockDeclarationDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.StockDeclaration.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetStockDeclarationPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.StockDeclaration.GetPaged(startRecordNo, rowPerPage, whereClause, "DeclarationId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllGetAllstockDeclarationDetailById(Int64 declarationId)
        {
            try
            {
                var list = Facade.StockDeclarationDetail.GetByDeclarationId(declarationId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllDeclarationDetailAdAttributeByDeclarationDetailId(Int64 DeclarationDetailId)
        {
            try
            {
                var list = Facade.StockDeclarationDetailAdAttribute.GetByDeclarationDetailId(DeclarationDetailId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetAllDeclarationDetailAdAttributeByDeclarationDetailAdAttId(Int64 DeclarationDetailAdAttId)
        {
            try
            {
                var list = Facade.StockDeclarationDetailAdAttributeDetail.GetByDeclarationDetailAdAttId(DeclarationDetailAdAttId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockDeclarationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}