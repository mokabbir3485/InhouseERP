using SecurityBLL;
using SecurityEntity;
using System;
using System.Web.Mvc;
using DbExecutor;
using Security.UI.Controllers;

namespace InHouseERP.UI.Controllers
{
    public class LabelBrandController : Controller
    {
        // GET: LabelBrand
        public ActionResult Index()
        {
            return View();
        }
        //public JsonResult GetAllSubategory()
        //{
        //    try
        //    {
        //        var list = Facade.ad_LabelBrandBLL.GetAll();
        //        return Json(list, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "LabelBrandController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}

        public JsonResult GetLabelBrandPaged(int StartRecordNo, int RowPerPage, string SearchCr, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.ad_LabelBrandBLL.GetPaged(StartRecordNo, RowPerPage, SearchCr, "LB.UpdateDate", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "LabelBrandController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetLabelBrandDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.ad_LabelBrandBLL.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "LabelBrandController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public int Post(ad_LabelBrand ad_LabelBrand)
        {
            int ret = 0;
            ad_LabelBrand.CreateDate = DateTime.Now;
            ad_LabelBrand.UpdateDate = DateTime.Now;

            ad_LabelBrand.LabelBrandName = string.IsNullOrEmpty(ad_LabelBrand.LabelBrandName) ? "" : ad_LabelBrand.LabelBrandName;
            ad_LabelBrand.LabelBrandShortName = string.IsNullOrEmpty(ad_LabelBrand.LabelBrandShortName) ? "" : ad_LabelBrand.LabelBrandShortName;

            try
            {

                ret = Facade.ad_LabelBrandBLL.Post(ad_LabelBrand);

            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "LabelBrandController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

    }
}