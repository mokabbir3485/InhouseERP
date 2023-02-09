using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DbExecutor;
using SecurityBLL;
using SecurityEntity;

namespace Security.UI.Controllers
{
    public class BankDocumentEntryController : Controller
    {
        // GET: BankDocumentEntry
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public Int64 Post(List<ad_BankDocumentEntry> BankDocumentlist)
        {
            Int64 ret = 0;
            try
            {

                
                Facade.ad_BankDocumentEntryBLL.DeleteBankDocumentEntryByBankAccountId(BankDocumentlist[0].BankAccountId);

                foreach (var aBankDocument in BankDocumentlist)
                {
                    ret = Facade.ad_BankDocumentEntryBLL.Post(aBankDocument);

                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "BankDocumentEntryController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        public JsonResult GetBankDocumentlistByBankAccountId(Int64 BankAccountId)
        {
            try
            {
                var list = Facade.ad_BankDocumentEntryBLL.ad_BankDocumentEntryDAO.GetBankDocumentEntryListByBankAccountId(BankAccountId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "BankAccountController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}