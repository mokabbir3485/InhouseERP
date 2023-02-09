using DbExecutor;
using Newtonsoft.Json;
using InventoryBLL;
using InventoryEntity;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Security.UI.Controllers
{
    public class ProductionStatusController : Controller
    {
        // GET: ProductionStatus
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetProductionStatusByNoAndDate(string ProductionOrIWONo, DateTime? FromDate, DateTime? ToDate)
        {
            if (ProductionOrIWONo == null) { ProductionOrIWONo = ""; }
            try
            {
                var list = Facade.inv_InternalWorkOrderBLL.GetProductionStatusByNoAndDate(ProductionOrIWONo, FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ProductionStatusController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}