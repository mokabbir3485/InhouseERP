using System;
using System.Collections.Generic;
using System.Web.Mvc;
using InventoryEntity;
using SecurityBLL;
using DbExecutor;
using Security.UI.Controllers;

namespace InHouseERP.UI.Controllers
{
    public class StockAdjustmentController : Controller
    {
        // GET: StockOpeningQtyAdjustment
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllStore()
        {
            try
            {
                var storeList = Facade.Department.GetAllStore();
                return Json(storeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult StockAdjustmentReason()
        {
            try
            {
                var storeList = InventoryBLL.Facade.StockAdjustment.StockAdjustmentReason();
                return Json(storeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SearchCurrentQuantity(int ItemId, int depId, int? MaterialTypeId = null, int? LabelBrandId = null)
        {
            try
            {
                var searchResultList = InventoryBLL.Facade.StockAdjustment.SearchCurrentQuantity(ItemId, depId, MaterialTypeId, LabelBrandId);
                return Json(searchResultList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public int PostAdjustment(List<inv_StockAdjustment> StockAdjustmentCheckList)
        {
            int ret = 0;
            try
            {
                foreach (inv_StockAdjustment aStockAdjustmentCheck in StockAdjustmentCheckList)
                {
                    ret = InventoryBLL.Facade.StockAdjustment.Create(aStockAdjustmentCheck);
                    if (aStockAdjustmentCheck.WarrentyAndSerialNoList != null)
                    {
                        foreach (AdjustmentWarrentyAndSerialNoList aWarrentyAndSerialNo in aStockAdjustmentCheck.WarrentyAndSerialNoList)
                        {
                            aWarrentyAndSerialNo.StockAdjustmentId = ret;
                            InventoryBLL.Facade.StockAdjustment.CreateWarrentyAndSerialNo(aWarrentyAndSerialNo);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpGet]
        public JsonResult GetHardwareWarrantyAndSerial_GetDynamic(string criteria, string orderBy)
        {

            try
            {
                //var criteria = " [SerialNo]='" + item.SerialNo + "' And [ItemId]=" + item.ItemId;
                var list = InventoryBLL.Facade.StockOpeningQuantity.GetDynamic(criteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetStockAdjustmentPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {

                    ListData = InventoryBLL.Facade.StockAdjustment.GetPaged(startRecordNo, rowPerPage, whereClause, "SA.StockAdjustmentId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockAdjustmentController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}