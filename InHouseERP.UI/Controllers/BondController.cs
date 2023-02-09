using System;
using System.Web.Mvc;
using DbExecutor;
using SecurityBLL;
using SecurityEntity;

namespace Security.UI.Controllers
{
    public class BondController : Controller
    {
       
        [HttpPost]
        public  int BondSave(ad_CustomBond _ad_CustomBond)
        {
          
            var ret = 0;
            try
            {
                _ad_CustomBond.CreateDate = DateTime.Now;
                _ad_CustomBond.UpdateDate = DateTime.Now;

                ret =Facade.ad_BondBLL.Post(_ad_CustomBond);
               
            }
            catch (Exception ex)
            {
                var error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "BankAccountController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }


        [HttpGet]
        public JsonResult BondGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.ad_BondBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "BondId", "desc", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult GetAllBond(Int64? BondId = null)
        {
            try
            {
                var bondList = Facade.ad_BondBLL.GetAll(BondId);
                return Json(bondList, JsonRequestBehavior.AllowGet);
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
        public JsonResult BondNoDuplicate(string BondNo)
        {
            try
            {
                var bondList = Facade.ad_BondBLL.BondDuplicate(BondNo);
                return Json(bondList, JsonRequestBehavior.AllowGet);
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

    }
}
