using DbExecutor;
using SecurityBLL;
using SecurityEntity;
using System;
using System.Web.Mvc;
using System.IO;
using System.Net;

namespace Security.UI.Controllers
{
    public class ErrorLogController : Controller
    {
        [HttpPost]
        public void CreateErrorLog(error_Log error)
        {
            try
            {
                //if (System.Web.HttpContext.Current.Session["IP"].ToString() != "undefined")
                //{
                //        error.IpAddress =System.Web.HttpContext.Current.Session["IP"].ToString();
                //}
                //else
                //{
                //     error.IpAddress = "Session Time Out";
                //}
                //string hostName = Dns.GetHostName(); // Retrive the Name of HOST
                //string ServerIP = Dns.GetHostByName(hostName).AddressList[0].ToString();

                if (System.Web.HttpContext.Current.Session["UserId"] != null)
                {
                    error.UserId = Convert.ToInt32(System.Web.HttpContext.Current.Session["UserId"].ToString());
                }
                else
                {
                    error.UserId = 0;
                }
                error.IpAddress = "";
                error.ErrorSide = "Server";
                error.IsSolved = false;
                error.ErrorDate = DateTime.Now;
                //Facade.ErrorLog.Add(error);

                //Code For Saving Error Log in a File
                //string fileName = "ErrorLogFile.txt";
                //string fullPath = Server.MapPath("\\UploadedFiles\\" + fileName);
                
                //if (!Directory.Exists(fullPath))
                //{
                //    Directory.CreateDirectory(fullPath);
                //}
                //string fullPath = folder + fileName;
                string[] ErrorTextData = {
                    error.ErrorDate.ToString(),
                    error.UserId.ToString(),
                    error.FileName.ToString(),
                    error.ErrorSide.ToString(),
                    error.ErrorType.ToString(),
                    error.IpAddress.ToString(),
                    error.ErrorMessage.ToString(),
                };
                //System.IO.File.AppendAllText(fullPath, "Error Date : " + ErrorTextData[0] + ", User ID : " + ErrorTextData[1] + ", File Name : " + ErrorTextData[2] + ", Error Side : " + ErrorTextData[3] + ", Error Type : " + ErrorTextData[4] + ", IP Address :  " + ErrorTextData[5] + ", Error Message :  " + ErrorTextData[6] + Environment.NewLine);
            }
            catch (Exception ex)
            {
                //error_Log er = new error_Log();
                //er.ErrorSide = "Server";
                //er.ErrorMessage = ex.Message;
                //er.ErrorType = ex.GetType().ToString();
                //er.FileName = "ErrorLogController";
                //error.IpAddress = "Session Time Out";
                //er.UserId = 0;
                //new ErrorLogController().CreateErrorLog(er);
                return;
            }
           
        }

        [HttpPost]
        public void CreateErrorLogForClintSite(string message)
        {
            try
            {
                error_Log er = new error_Log();
                er.ErrorSide = "Client";
                er.ErrorMessage = message;
                er.ErrorType = "Angular Error";
                er.FileName = "App";
                //if (System.Web.HttpContext.Current.Session["IP"].ToString() != "undefined")
                //{
                //    er.IpAddress = System.Web.HttpContext.Current.Session["IP"].ToString();
                //}
                //else
                //{
                //    er.IpAddress = "Session Time Out";
                //}

                er.IpAddress = "";

                if (System.Web.HttpContext.Current.Session["UserId"] != null)
                {
                    er.UserId = Convert.ToInt32(System.Web.HttpContext.Current.Session["UserId"].ToString());
                }
                else
                {
                    er.UserId = 0;
                }
                er.IsSolved = false;
                er.ErrorDate = DateTime.Now;
                // Facade.ErrorLog.Add(er);

                //Code For Saving Error Log in a File
                string folder = Server.MapPath("~/UploadedFiles/");
                string fileName = "ErrorLogFile.txt";
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string fullPath = folder + fileName;
                string[] ErrorTextData = {
                    er.ErrorDate.ToString(),
                    er.UserId.ToString(),
                    er.FileName.ToString(),
                    er.ErrorSide.ToString(),
                    er.ErrorType.ToString(),
                    er.IpAddress.ToString(),
                    er.ErrorMessage.ToString(),
                };
                System.IO.File.AppendAllText(fullPath, "Error Date : " + ErrorTextData[0] + ", User ID : " + ErrorTextData[1] + ", File Name : " + ErrorTextData[2] + ", Error Side : " + ErrorTextData[3] + ", Error Type : " + ErrorTextData[4] + ", IP Address :  " + ErrorTextData[5] + ", Error Message :  " + ErrorTextData[6] + Environment.NewLine);
            }
            catch (Exception ex)
            {
                //error_Log er = new error_Log();
                //er.ErrorSide = "Server";
                //er.ErrorMessage = ex.Message;
                //er.ErrorType = ex.GetType().ToString();
                //er.FileName = "ErrorLogController";
                //er.IpAddress = "0";
                //er.UserId = 0;
                //new ErrorLogController().CreateErrorLog(er);
                return;
            }

        }

    }
}