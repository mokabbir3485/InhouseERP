using System;
using System.Collections.Generic;
using System.Web.Mvc;
using InventoryEntity;
using InventoryBLL;
using DbExecutor;

namespace Security.UI.Controllers
{
    public class StockOpeningQtyController : Controller
    {
        //
        // GET: /ReorderLevelSetup/
        public ActionResult Index()
        {
            return View();
        }
        
        public JsonResult SearchOpeningQuantity(int ItemId, int depId, int? MaterialTypeId = null, int? LabelBrandId = null)
        {
            try
            {               
                var searchResultList = Facade.StockOpeningQuantity.Search(ItemId, depId, MaterialTypeId, LabelBrandId);
                return Json(searchResultList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockOpeningQtyController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult OpeningStockWarrantyAndSerialGetByStockOpeningQtyId(long StockOpeningQtyId)
        {
            try
            {               
                var WarrantyAndSerialList = Facade.StockOpeningQuantity.HardwareOpeningStockWarrantyAndSerialGetByStockOpeningQtyId(StockOpeningQtyId);
                return Json(WarrantyAndSerialList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockOpeningQtyController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public int PostOpeningQty(List<inv_StockOpeningQuantity> OpeningQuantityCheckList)
        {
            int ret = 0;
            try
            {
                foreach (inv_StockOpeningQuantity aOpeningQuantityCheck in OpeningQuantityCheckList)
                {
                    ret = Facade.StockOpeningQuantity.Post(aOpeningQuantityCheck);
                    if (aOpeningQuantityCheck.WarrentyAndSerialNoList != null)
                    {
                        if (aOpeningQuantityCheck.WarrentyAndSerialNoList.Count > 0)
                        {
                            foreach (OpeningWarrentyAndSerialNoList aWarrentyAndSerialNo in aOpeningQuantityCheck.WarrentyAndSerialNoList)
                            {
                                aWarrentyAndSerialNo.StockOpeningQtyId = ret;
                                Facade.StockOpeningQuantity.CreateWarrentyAndSerialNo(aWarrentyAndSerialNo);
                            }
                        }
                    }
                    
                    
                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockOpeningQtyController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        [HttpPost]
        public JsonResult GetHardwareWarrantyAndSerial_GetDynamic(List<Inv_HardwareWarrantyAndSerial> OpeningSerialList)
        {

            try
            {
                Inv_HardwareWarrantyAndSerial OpeningSerial = new Inv_HardwareWarrantyAndSerial();
                foreach (var item in OpeningSerialList)
                {
                    var criteria = "HSWS.[SerialNo]='" + item.SerialNo + "' And [ItemId]=" + item.ItemId;
                    var list = InventoryBLL.Facade.StockOpeningQuantity.GetDynamic(criteria, "HSWS.SerialNo");
                    if (list.Count > 0)
                    {
                        OpeningSerial = item;
                        break;
                    }

                }
                return Json(OpeningSerial, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockOpeningQtyController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetStockOpeningPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.StockOpeningQuantity.GetPaged(startRecordNo, rowPerPage, whereClause, "OS.StockOpeningQtyId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockOpeningQtyController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}