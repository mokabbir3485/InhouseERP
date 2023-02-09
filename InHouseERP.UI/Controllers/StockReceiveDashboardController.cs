using DbExecutor;
using InventoryEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using InventoryBLL;
using System.Text;
using Security.UI.Controllers;

namespace InHouseERP.UI.Controllers
{
    public class StockReceiveDashboardController : Controller
    {
        // GET: StockReceiveDashboard

        public JsonResult GetAllReceiveAndPurchaseNo()
        {
            try
            {
                var list = Facade.inv_StockReceiveDashboardBLL.GetAllReceiveAndPurchaseNo();
                return Json(list, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockReceiveDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetStockReceiveDashboard(string whereCondition, string orderByExpression)
        {
            try
            {
                var list = Facade.inv_StockReceiveDashboardBLL.GetStockReceiveDashboard(whereCondition, orderByExpression);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "StockReceiveDashboardController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}