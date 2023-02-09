using DbExecutor;
using Newtonsoft.Json;
using ReceivableBLL;
using ReceivableEntity;
using RestSharp;
using Security.UI.Controllers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
namespace InHouseERP.UI.Controllers
{
    public class CompanyOpeningController : Controller
    {
        // GET: CompanyOpening
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public Int64 Post(rcv_CompanyOpeningBalance rcv_CompanyOpeningBalance)
        {

            Int64 ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    ret = Facade.rcv_CompanyOpeningBalance.rcv_CompanyOpeningBalanceDAO.Post(rcv_CompanyOpeningBalance);

                    if (ret > 0)
                        ts.Complete();
                }
            }
            catch (Exception ex)
            {
                ret = 0;
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyOpeningController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }

        public JsonResult GetCompanypeningBalancePaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.rcv_CompanyOpeningBalance.GetPaged(startRecordNo, rowPerPage, whereClause, "OpeningBalanceId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyOpeningBalanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult CompanyOpeningBalance_GetByCompanyId(int CompanyId)
        {
            try
            {
                var list = Facade.rcv_CompanyOpeningBalance.CompanyOpeningBalance_GetByCompanyId(CompanyId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyOpeningController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetCompanyOpeningBalanceDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.rcv_CompanyOpeningBalance.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyOpeningBalanceController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        
    }
}