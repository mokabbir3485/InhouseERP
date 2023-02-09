using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using DbExecutor;
using Security;
using Security.UI.Controllers;
using SecurityBLL;
namespace InHouseERP.UI.Controllers
{
    public class EmailSenderController : Controller
    {

        [HttpGet]
        public JsonResult ReportNotificationGetByReportCode(string ReportCode)
        {
            try
            {
                var list = Facade.s_ReportNotificationDetailBLL.GetByReportCode(ReportCode);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "EmailSenderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public string EmailSend(inv_EmailSend emailSend)
        {
            string senderEmail = System.Configuration.ConfigurationManager.AppSettings["SenderEmail"];
            string senderEmailPass = System.Configuration.ConfigurationManager.AppSettings["SenderEmailPass"];

            MailMessage mm = new MailMessage();
            mm.From = new MailAddress(senderEmail);
            mm.Subject = emailSend.EmailSubject;
            mm.Body = emailSend.EmailBody;

            try
            {
                foreach (var email in emailSend.ToEmail)
                {
                    mm.To.Add(email);
                }

                // for cc email
                if (emailSend.CcEmail !=null)
                {
                    if (emailSend.CcEmail.Length > 0)
                    {
                        foreach (var cc in emailSend.CcEmail)
                        {
                            mm.CC.Add(cc);
                        }
                    }
                }
               

                // for bcc email
                if (emailSend.BccEmail !=null)
                {
                    if (emailSend.BccEmail.Length > 0)
                    {
                        foreach (var bcc in emailSend.BccEmail)
                        {
                            mm.CC.Add(bcc);
                        }
                    }
                }
               

                mm.IsBodyHtml = true;

                SendSmtpEmail(mm, senderEmail, senderEmailPass);
                //return "The mail has been Sent";
                return "1";
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ShiftController";
                new ErrorLogController().CreateErrorLog(error);
                //return "Something Went Wrong, Please try again!!!";
                return "0";
            }
           

            
        }

        public void SendSmtpEmail(MailMessage mailMessage, string senderEmail, string senderEmailPass)
        {
            SmtpClient smtp = new SmtpClient();
            smtp.Host = System.Configuration.ConfigurationManager.AppSettings["SenderEmailHost"];
            smtp.Port = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["SenderEmailPort"]);
            smtp.UseDefaultCredentials = true;
            smtp.EnableSsl = false;
            smtp.Credentials = new NetworkCredential(senderEmail, senderEmailPass);
            smtp.Send(mailMessage);
        }


        public class inv_EmailSend
        {
            public string[]  ToEmail { get; set; }
            public string[] CcEmail { get; set; }
            public string[] BccEmail { get; set; }
            public string EmailBody { get; set; }
            public string EmailSubject { get; set; }

        }
    }
}