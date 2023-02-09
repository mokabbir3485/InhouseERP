using DbExecutor;
using InventoryBLL;
using InventoryEntity;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
namespace Security.UI.Controllers
{
    public class PurchaseOrderController : Controller
    {
        //
        // GET: /PurchaseOrder/
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetPurchaseOrderNo()
        {
            try
            {
                var maxNumber = Facade.PurchaseOrder.GetMaxPurchaseOrderNo();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public string Save(inv_PurchaseOrder PurchaseOrder, List<inv_PurchaseOrderDetail> PurchaseOrderDetailList, List<inv_PurchaseOrderDetail> VoidList)
        {

            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                string ret = "";
                string ret2 = "";

                if (PurchaseOrder.ManualPONo == null) { PurchaseOrder.ManualPONo = ""; }
                if (PurchaseOrder.QuotationNo == null) { PurchaseOrder.QuotationNo = ""; }
                if (PurchaseOrder.Remarks == null) { PurchaseOrder.Remarks = ""; }
                if (PurchaseOrder.ContactNo == null) { PurchaseOrder.ContactNo = ""; }
                if (PurchaseOrder.PlaceOfDelivery == null) { PurchaseOrder.PlaceOfDelivery = ""; }
                if (PurchaseOrder.AdditionalInfo == null) { PurchaseOrder.AdditionalInfo = ""; }
                if (PurchaseOrder.FreightLabel == null) { PurchaseOrder.FreightLabel = ""; }


                try
                {

                    ret = Facade.PurchaseOrder.Post(PurchaseOrder);

                    string[] words = ret.Split(',');
                    ret = Convert.ToString(words[0]);
                    ret2 = Convert.ToString(words[1]);

                    if (PurchaseOrder.POId > 0)
                    {
                        if (VoidList != null && VoidList.Count > 0)
                        {
                            foreach (inv_PurchaseOrderDetail aVoid in VoidList)
                            {
                                if (aVoid.ItemDescriptionTwo == null) { aVoid.ItemDescriptionTwo = ""; }

                                aVoid.POId = Convert.ToInt64(words[0]);
                                aVoid.IsVoid = true;
                                Facade.PurchaseOrderDetail.PostPODetail(aVoid);
                            }
                        }
                    }




                    if (PurchaseOrderDetailList != null && PurchaseOrderDetailList.Count > 0 && words.Length > 0)
                    {
                        foreach (inv_PurchaseOrderDetail aPurchaseOrderDetail in PurchaseOrderDetailList)
                        {
                            if (aPurchaseOrderDetail.ItemName == null) { aPurchaseOrderDetail.ItemName = ""; }
                            if (aPurchaseOrderDetail.ItemDescriptionTwo == null) { aPurchaseOrderDetail.ItemDescriptionTwo = ""; }
                            if (aPurchaseOrderDetail.PartCodeNo == null) { aPurchaseOrderDetail.PartCodeNo = ""; }
                            if (aPurchaseOrderDetail.RollDirection == null) { aPurchaseOrderDetail.RollDirection = ""; }
                            if (aPurchaseOrderDetail.CuttingSize == null) { aPurchaseOrderDetail.CuttingSize = ""; }

                            aPurchaseOrderDetail.POId = Convert.ToInt64(words[0]);
                            Facade.PurchaseOrderDetail.PostPODetail(aPurchaseOrderDetail);
                            
                        }
                    }

                    

                    ts.Complete();

                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "PurchaseOrderController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }
                string soIdWithNo = ret + "," + ret2;
                return soIdWithNo;
            }
        }
        public JsonResult GetPurchaseOrderDetailDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.PurchaseOrderDetail.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetPurchaseOrderPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.PurchaseOrder.GetPaged(startRecordNo, rowPerPage, whereClause, "POId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "SalesOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public int SavePurchaseOrderDetailAdAttribute(inv_PurchaseOrderDetailAdAttribute inv_PurchaseOrderDetailAdAttribute, int pODetailId)
        {
            int ret = 0;
            try
            {
                inv_PurchaseOrderDetailAdAttribute.PODetailId = pODetailId;
                // ret = 1;
                ret = InventoryBLL.Facade.PurchaseOrderDetailAdAttribute.Add(inv_PurchaseOrderDetailAdAttribute);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        [HttpPost]
        public int SavePurchaseOrderDetailAdAttributeDetail(inv_PurchaseOrderDetailAdAttributeDetail inv_PurchaseOrderDetailAdAttributeDetail, int pODetailAdAttId)
        {
            int ret = 0;
            try
            {
                inv_PurchaseOrderDetailAdAttributeDetail.PODetailAdAttId = pODetailAdAttId;
                if (inv_PurchaseOrderDetailAdAttributeDetail.AttributeValue == null)
                    inv_PurchaseOrderDetailAdAttributeDetail.AttributeValue = "";
                ret = InventoryBLL.Facade.PurchaseOrderDetailAdAttributeDetail.Add(inv_PurchaseOrderDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        public JsonResult GetItemAdditionalAttributeValueByItemAddAttId(int itemAddAttId)
        {
            try
            {
                var list = SecurityBLL.Facade.ItemAdditionalAttributeValue.GetByItemAddAttId(itemAddAttId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetAllPO(int? POId = null)
        {
            try
            {
                var list = Facade.PurchaseOrder.GetAll(POId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPurchaseOrderReport(int POId)
        {
            try
            {
                var list = Facade.PurchaseOrder.GetPurchaseOrderReport(POId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPOById(int id)
        {
            try
            {
                var list = Facade.PurchaseOrder.GetById(id);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPurchaseOrderDetailByPOId(Int64 POId)
        {
            try
            {
                var list = Facade.PurchaseOrderDetail.GetByPOId(POId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPurchaseOrderDetailAdAttributeByPODetailId(int PODetailId)
        {
            try
            {
                var list = Facade.PurchaseOrderDetailAdAttribute.GetByPODetailId(PODetailId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPurchaseOrderDetailAdAttributeDetailByPODetailAdAttId(Int64 PODetailAdAttId)
        {
            try
            {
                var list = Facade.PurchaseOrderDetailAdAttributeDetail.GetByPODetailAdAttId(PODetailAdAttId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPurchaseOrderDetailAdAttributeDetailByPODetailAdAttIdAndItemAddAttId(Int64 pODetailAdAttId, Int32 itemAddAttId)
        {
            try
            {
                var list = Facade.PurchaseOrderDetailAdAttributeDetail.GetByPODetailAdAttIdAndItemAddAttId(pODetailAdAttId, itemAddAttId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult GetPurchaseOrderUnApprovalList()
        {
            try
            {
                var PurchaseOrderList = Facade.PurchaseOrder.GetPurchaseOrderUnApprovalList();
                return Json(PurchaseOrderList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseOrderController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public Int64 ApprovalUpdate(List<inv_PurchaseOrder> proc_PurchaseOrderList)
        {
            Int64 ret = 0;
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {

                try
                {
                    foreach (var aPurchaseOrder in proc_PurchaseOrderList)
                    {
                        ret = Facade.PurchaseOrder.ApprovalUpdate(aPurchaseOrder);
                    }


                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "PurchaseOrderController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }
                //inv_MaterialsDemand_ApprovalUpdate
                return ret;
            }
        }

    }
}