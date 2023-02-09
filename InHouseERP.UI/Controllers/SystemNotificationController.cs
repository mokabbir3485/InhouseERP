using SecurityBLL;
using SecurityEntity;
using System;
using System.Web.Mvc;
using DbExecutor;
using Security.UI.Controllers;
using System.Collections.Generic;
using Microsoft.AspNet.SignalR;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using System.Net;

namespace InHouseERP.UI.Controllers
{
    public class SystemNotificationController : Controller
    {

        // GET: SystemNotification
        //private System.Timers.Timer aTimer;
        //public Double TotalMilliseconds = 0;
        public void NotifyToAllUser(s_SystemNotification SystemNotification)
        {
            DateTime now = DateTime.Now;
            //DateTime startTime = SystemNotification.Maintenance_StartTime;
            //DateTime? endTime = SystemNotification.Maintenance_EndTime;

                //TotalMilliseconds = startTime.Subtract(now).TotalMilliseconds;

            if (SystemNotification.Type == "S_Message")
            {
                var hubContext = GlobalHost.ConnectionManager.GetHubContext<NotifyHub>();
                hubContext.Clients.All.notifyToAllUser(SystemNotification);
            }
            //if(TotalMilliseconds > 0)
            //{
            //    aTimer = new System.Timers.Timer(TotalMilliseconds);
            //    aTimer.Elapsed += OnTimedEvent;
            //    aTimer.AutoReset = true;
            //    aTimer.Enabled = true;
            //}


            //if (endTime == null && SystemNotification.Message == "")
            //{
            if (SystemNotification.IsActive && SystemNotification.Type == "S_Break")
            {
                LogoutAllUser();
            }
                
            //}
        }
        public void Notify(s_SystemNotification SystemNotification)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<NotifyHub>();
            hubContext.Clients.All.Notify(SystemNotification);

        }

        //public void OnTimedEvent(Object source, ElapsedEventArgs e)
        //{
        //    LogoutAllUser();
        //    aTimer.Stop();
        //    aTimer.Dispose();
        //}
        public void LogoutAllUser()
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<NotifyHub>();
            hubContext.Clients.All.logoutFromAllUser("Logout Fired!!!!");
        }
        //[HttpPost]
        //public Int64 SaveSystemMaintenance(s_SystemNotification SystemNotification,s_SystemNotification SystemNotificationUpdate)
        //{
        //    Int64 ret = 0;
        //    try
        //    {
        //        using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
        //        {
        //            if (SystemNotification.Message == null) { SystemNotification.Message = ""; }
        //                ret = Facade.s_SystemNotificationBLL.AddSystemMaintenance(SystemNotification);
        //            if (ret > 0)
        //            {
        //                ts.Complete();
        //            }
                    
        //        }
        //        NotifyToAllUser(SystemNotification);
        //        return ret;
                
        //    }
        //    catch (Exception ex)
        //    {
        //        ret = 0;
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "SystemNotificationController";
        //        new ErrorLogController().CreateErrorLog(error);
        //    }

        //    return ret;
        //}
        [HttpPost]
        public Int64 PostSystemNotification(s_SystemNotification SystemNotification)
        {
            Int64 ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    
                        ret = Facade.s_SystemNotificationBLL.PostSystemNotification(SystemNotification);
                    if (ret > 0)
                    {
                        ts.Complete();
                    }
                    
                }
                NotifyToAllUser(SystemNotification);
                
            }
            catch (Exception ex)
            {
                ret = 0;
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SystemNotificationController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }

            return ret;
        }

        //[HttpPost]
        //public Int64 SystemNotificationAllUser(s_SystemNotification SystemNotification)
        //{
        //    Int64 ret = 0;
        //    try
        //    {
        //        using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
        //        {
        //            if (SystemNotification.Message == null) { SystemNotification.Message = ""; }
        //                ret = Facade.s_SystemNotificationBLL.SystemNotificationAllUser(SystemNotification);
        //            if (ret > 0)
        //            {
        //                ts.Complete();
        //            }
                    
        //        }
        //        NotifyToAllUser(SystemNotification);
        //        return ret;
                
        //    }
        //    catch (Exception ex)
        //    {
        //        ret = 0;
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "SystemNotificationController";
        //        new ErrorLogController().CreateErrorLog(error);
        //    }

        //    return ret;
        //}


        [HttpGet]
        public JsonResult GetMaintenanceData(string Type)
        {
            try
            {
                var MaintenanceDataList = Facade.s_SystemNotificationBLL.GetMaintenanceData(Type);
                //foreach(s_SystemNotification aMaintenanceData in MaintenanceDataList)
                //{
                //    aMaintenanceData.SystemBlockCountDown = aMaintenanceData.SystemBlockCountDown * 1000;
                //}
                //Notify(MaintenanceDataList[0]);
                return Json(MaintenanceDataList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SystemNotificationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public JsonResult GetSystemNotification()
        {
            try
            {
                var SystemNotificationList = Facade.s_SystemNotificationBLL.GetSystemNotification();
                return Json(SystemNotificationList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SystemNotificationController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

    }
}