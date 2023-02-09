using DbExecutor;
using InventoryEntity;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Security.UI.Controllers;
using SecurityBLL;
using SecurityEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InHouseERP.UI.Controllers
{
    public class EmailNotificationSetupController : Controller
    {
        // GET: EmailNotificationSetup
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetReportNameForNotification()
        {
            try
            {
                var RawItemList = Facade.ad_EmailNotificationSetupBLL.GetReportNameForNotification();
                return Json(RawItemList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public Int64 Post(List<ad_EmailNotificationSetupDetail> EmailNotificationSetupDetaillist,List<ad_EmailNotificationSetupDetail> DeletedEmailNotificationSetupDetaillist)
        {
            Int64 ret = 0;
            try
            {
                if (DeletedEmailNotificationSetupDetaillist != null && DeletedEmailNotificationSetupDetaillist.Count > 0)
                {
                    foreach (var aDeletedEmailNotificationSetupDetail in DeletedEmailNotificationSetupDetaillist)
                    {
                        Facade.ad_EmailNotificationSetupBLL.DeleteEmailNotificationSetupDetailByNotificationReportDetailId(aDeletedEmailNotificationSetupDetail.NotificationReportDetailId);

                    }
                }
                
                if (EmailNotificationSetupDetaillist != null && EmailNotificationSetupDetaillist.Count > 0)
                {
                    foreach (var aEmailNotificationSetupDetail in EmailNotificationSetupDetaillist)
                    {
                        ret = Facade.ad_EmailNotificationSetupBLL.Post(aEmailNotificationSetupDetail);

                    }
                }
                
                
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        


       [HttpGet]
        public JsonResult AppNotificationSetup_GetAll()
        {
            try
            {
                var list = Facade.ad_EmailNotificationSetupBLL.s_AppNotificationSetup_GetAll();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult GetAppNotificationSetupByReportCode(string ReportCode)
        {
            try
            {
                var list = Facade.ad_EmailNotificationSetupBLL.GetAppNotificationSetupByReportCode(ReportCode);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public Int64 AppNotificationSetupPost(List<AppNotificationSetup> AppNotificationSetupList)
        {
            Int64 ret = 0;
            List<AppNotificationSetup> listItem=new List<AppNotificationSetup>();

            try
            {

                if (AppNotificationSetupList != null && AppNotificationSetupList.Count > 0)
                {

                    foreach (var aAppNotificationSetupList in AppNotificationSetupList)
                    {
                       //var Report= ReportList.Where(x => x.ReportId == aAppNotificationSetupList.ReportId && x.RoleId == aAppNotificationSetupList.RoleId && x.UserId == aAppNotificationSetupList.UserId);

                        var ReportList = Facade.ad_EmailNotificationSetupBLL.s_AppNotificationSetup_GetAll(aAppNotificationSetupList.ReportId, aAppNotificationSetupList.UserId, aAppNotificationSetupList.RoleId);
                        
                        if (ReportList.Count ==0)
                        {
                            //foreach (AppNotificationSetup item in listItem)
                            //{
                                //if (item.ReportId != aAppNotificationSetupList.ReportId && aAppNotificationSetupList.UserId != item.UserId && aAppNotificationSetupList.RoleId != item.RoleId) 
                                //{
                                    ret = Facade.ad_EmailNotificationSetupBLL.AppNotificationSetupPost(aAppNotificationSetupList);
                                //}
                           // }
                         
                        }
                        else
                        {
                            ret = 0;
                            listItem = ReportList;
                           // break;
                        }
                       

                    }
                }
                
                
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        public void NotificationLog(List<AppNotificationLog> AppNotificationLogList)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<NotifyHub>();
            hubContext.Clients.All.NotificationLog(AppNotificationLogList);

        }
        [HttpPost]
        public Int64 AppNotificationLogPost(List<AppNotificationLog> AppNotificationLogList)
        {
            Int64 ret = 0;
            try
            {
                
                if (AppNotificationLogList != null && AppNotificationLogList.Count > 0)
                {
                    foreach (var aAppNotificationLog in AppNotificationLogList)
                    {
                        ret = Facade.ad_EmailNotificationSetupBLL.AppNotificationLogPost(aAppNotificationLog);
                        aAppNotificationLog.NotificationLogId = ret;
                        aAppNotificationLog.CreateDate = DateTime.Now;
                    }
                }
                if (ret > 0 && AppNotificationLogList[0].IsUpdate == false)
                {
                    NotificationLog(AppNotificationLogList);
                }
                
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        [HttpGet]
        public JsonResult GetAppNotificationLogByUserId(int UserId, bool? IsRead = null)
        {
            try
            {
                var AppNotificationLogList = Facade.ad_EmailNotificationSetupBLL.GetAppNotificationLogByUserId(UserId, IsRead);
                return Json(AppNotificationLogList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult GetReportNotificationNamePaged(int StartRecordNo, int RowPerPage, string whereClause, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.ad_EmailNotificationSetupBLL.GetPaged(StartRecordNo, RowPerPage, whereClause, "RN.ReportId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAppNotificationSetupPaged(int StartRecordNo, int RowPerPage, string whereClause, int rows)
        {
            try
            {
                var customMODEntity = new
                {
                    ListData = Facade.ad_EmailNotificationSetupBLL.GetAppNotificationSetupPaged(StartRecordNo, RowPerPage, whereClause, "AN.AppNotificationId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public Int64 PostReportNotificationName(ad_ReportNotificationName ReportNotificationName)
        {
            if (ReportNotificationName.ReportName == null)
                ReportNotificationName.ReportName = "";
            if (ReportNotificationName.ReportCode == null)
                ReportNotificationName.ReportCode = "";
            Int64 ret = 0;
            try
            {
                ret = Facade.ad_EmailNotificationSetupBLL.PostReportNotificationName(ReportNotificationName);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailNotificationSetupController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
    }
}