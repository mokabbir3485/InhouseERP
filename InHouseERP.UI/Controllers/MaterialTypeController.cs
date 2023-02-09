
using DbExecutor;
using Security.UI.Controllers;
using SecurityEntity.SECURITY.SecurityEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SecurityBLL;

namespace InHouseERP.UI.Controllers
{
    public class MaterialTypeController : Controller
    {
        // GET: MaterialType
      
        [HttpGet]
        
        public JsonResult MatrialTypeGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
           
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.ad_MatrialType.GetPaged(startRecordNo, rowPerPage, whereClause, "MaterialTypeId", "DESC", ref rows),
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

        [HttpPost]
        public int SaveMaterialType(ad_MaterialType _ad_MaterialType)
        {
            int ret = 0;
            try
            {
                ret = Facade.ad_MatrialType.Post(_ad_MaterialType);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "CompanyController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpGet]

        public JsonResult GetAllMaterialType()
        {
            try
            {
                var list = Facade.ad_MatrialType.GetAll();
                return Json(list, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "MaterialType";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

    }
}