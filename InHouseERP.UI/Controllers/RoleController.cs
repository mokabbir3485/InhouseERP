using Security.UI.Controllers;
using SecurityBLL;
using SecurityEntity;
using System;
using System.Web.Mvc;
using DbExecutor;
using System.Collections.Generic;

namespace Security.UI
{
    public class RoleController : Controller
    {
        public JsonResult GetAllRole()
        {
            try
            {

                var rolList = Facade.Role.GetAll();
                return Json(rolList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetModuleByDomainId(int? DomainId = null)
        {
            try
            {

                var ModuleList = Facade.Module.GetByDomainId(DomainId);
                return Json(ModuleList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllFunction()
        {
            try
            {
                var FunctionList = Facade.Module.GetAllFunction();
                return Json(FunctionList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetRolePaged(int StartRecordNo, int RowPerPage,string whereClause, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.Role.GetPaged(StartRecordNo, RowPerPage, whereClause, "RoleName", "ASC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetScreenPaged(int StartRecordNo, int RowPerPage,string whereClause,string orderBy, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.Role.GetScreenPaged(StartRecordNo, RowPerPage, whereClause, orderBy, "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetFunctionPaged(int StartRecordNo, int RowPerPage,string whereClause,string orderBy, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.Role.GetFunctionPaged(StartRecordNo, RowPerPage, whereClause, orderBy, "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetRoleDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.Role.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public int Save(s_Role role)
        {
            int ret = 0;
            try
            {
                role.CreateDate = DateTime.Now;
                role.UpdateDate = DateTime.Now;
                if (role.RoleId == 0)
                {
                    ret = Facade.Role.Add(role);
                }
                else
                {
                    ret = Facade.Role.Update(role);
                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpPost]
        public int PostScreen(s_Screen Screen, List<s_ScreenDetail> ScreenDetailList)
        {
            int ret = 0;
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                try
                {
                    ret = Facade.Role.PostScreen(Screen);
                    if(ScreenDetailList != null)
                    {
                        if (ScreenDetailList.Count != 0)
                        {
                            foreach (s_ScreenDetail ScreenDetail in ScreenDetailList)
                            {
                                ScreenDetail.ScreenId = ret;
                                Facade.Role.AddScreenDetail(ScreenDetail);
                            }

                        }
                    }
                    
                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "RoleController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }
                return ret;
            }
        }
        [HttpPost]
        public int PostFunction(s_ScreenDetail Function)
        {
            int ret = 0;
            try
            {
                ret = Facade.Role.PostFunction(Function);

                

            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpPost]
        public int Delete(int roleId)
        {
            int ret = 0;
            try
            {
                ret = Facade.Role.Delete(roleId);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        public JsonResult GetConfirmationMessageForAdmin()
        {
            try
            {
                var ConfirmationMessageForAdmin = System.Configuration.ConfigurationManager.AppSettings["ConfirmationMessageForAdmin"].ToString(); 
                return Json(ConfirmationMessageForAdmin, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "RoleController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}