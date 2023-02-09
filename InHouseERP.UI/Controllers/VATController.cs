using Security.UI.Controllers;
using InventoryBLL;
using InventoryEntity;
using System;
using System.Web.Mvc;
using DbExecutor;
using System.Collections.Generic;
using PosEntity;
using System.IO;
using System.Web;
using SecurityEntity.INVENTORY.InventoryEntity;
using System.Net.Mail;
using System.Net;

namespace InHouseERP.UI.Controllers
{
    public class VATController : Controller
    {

        [HttpPost]
        public int Save(Vat_VDS  _VAT_VDS,List<Vat_VDSDetail> _vatDetails)
        {
          
            int ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                    _VAT_VDS.CreateDate = DateTime.Now;
                    _VAT_VDS.UpdateDate = DateTime.Now;
                    ret = Facade.Vat_SupplierVdsIssueBLL.Add(_VAT_VDS);
                    foreach (Vat_VDSDetail aVatDetails in _vatDetails)
                    {
                        aVatDetails.VDSIssueId = ret;
                        Facade.Vat_SupplierVdsIssueBLL.AddDetails(aVatDetails);
                    }
                 
                  ts.Complete();
                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "VatController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }


        [HttpPost]
        public int Mushak_6_6Save(vat_Mushak_6_6 _Mushak_6_6, List<vat_MushakDetails_6_6> _MushakDetails_6_6)
        {

            int ret = 0;
            try
            {
                using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
                {
                  
                    ret = Facade.Vat_SupplierVdsIssueBLL.AddMushak6_6(_Mushak_6_6);
                    foreach (vat_MushakDetails_6_6 aVatDetails in _MushakDetails_6_6)
                    {
                        aVatDetails.IssueId = ret;
                        Facade.Vat_SupplierVdsIssueBLL.AddMushakDetails6_6(aVatDetails);
                    }

                    ts.Complete();
                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "VatController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        


       [HttpGet]
        public JsonResult Musuk_6_GetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.Vat_SupplierVdsIssueBLL.Musuk_6_GetPaged(startRecordNo, rowPerPage, whereClause, "[VM].[IssueId]", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "VatController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult VAT_VDSCertifications_GetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.Vat_SupplierVdsIssueBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "VDSIssueId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "VatController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult GetMaxSupplierVdsIssueNo()
        {
            try
            {
                var maxNumber = Facade.Vat_SupplierVdsIssueBLL.GetMaxSupplierVdsIssueNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "VatController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult vat_Mushak_6_6_GetMaxIssueNo()
        {
            try
            {
                var maxNumber = Facade.Vat_SupplierVdsIssueBLL.vat_Mushak_6_6_GetMaxIssueNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
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
        public JsonResult xRpt_vat_Mushak_6_6_GetByIssueId(Int32? SupplierId = null, Int64? IssueId = null)
        {
            try
            {
                var list = Facade.Vat_SupplierVdsIssueBLL.xRpt_vat_Mushak_6_6_GetByIssueId(SupplierId, IssueId);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult pay_SupplierPayment_GetBySupplierIdForVDSIssue(string SupplierIds )
        {
            try
            {
                var list = Facade.Vat_SupplierVdsIssueBLL.pay_SupplierPayment_GetBySupplierIdForVDSIssue(SupplierIds);
                return Json(list, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetVat_TDS_GetByTDSIssueId(Int32 VDSIssueId)
        {
            try
            {
                var list = Facade.Vat_SupplierVdsIssueBLL.GetVat_TDS_GetByTDSIssueId(VDSIssueId);
                return Json(list, JsonRequestBehavior.AllowGet);
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