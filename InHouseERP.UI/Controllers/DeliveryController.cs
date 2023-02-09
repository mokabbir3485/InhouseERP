using InventoryBLL;
using InventoryEntity;
using System;
using System.Web.Mvc;
using DbExecutor;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Security.UI.Controllers
{
    public class DeliveryController : Controller
    {
        [HttpPost]
        public string SaveDelivery(inv_StockDelivery inv_stockDelivery, List<inv_StockDeliveryDetail> inv_stockDeliveryDetail, List<proc_ImportPurchaseBillDetailSerial> serialList)
        {
            string ret = "";
            string ret2 = "";
            string DnNoWithDId = "";
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                inv_stockDelivery.CreateDate = DateTime.Now;
                inv_stockDelivery.UpdateDate = DateTime.Now;
                inv_stockDelivery.DeliveryToDepartmentName = string.Empty;
                if (inv_stockDelivery.ReceivedBy == null)
                {
                    inv_stockDelivery.ReceivedBy = "";
                }
                if (inv_stockDelivery.ManualDeliveryNo == null)
                {
                    inv_stockDelivery.ManualDeliveryNo = "";
                }
                try
                {
                    
                    if (inv_stockDelivery.DeliveryId == 0)
                    {
                        inv_stockDelivery.TotalDeliveryQty = inv_stockDeliveryDetail
                                                             .Where(item=>item.DeliveryQuantity>0)
                                                             .Sum(item => item.DeliveryQuantity);
                        ret = Facade.StockDelivery.Add(inv_stockDelivery);
                        string[] words = ret.Split(',');
                        ret = Convert.ToString(words[0]);
                        ret2 = Convert.ToString(words[1]);
                        Int64 retId = Convert.ToInt64(ret);
                        if (retId > 0)
                        {
                            if (inv_stockDeliveryDetail != null && inv_stockDeliveryDetail.Count > 0)
                            {
                                foreach (inv_StockDeliveryDetail ainv_stockDeliveryDetail in inv_stockDeliveryDetail)
                                {
                                    ainv_stockDeliveryDetail.DeliveryId = Convert.ToInt64(ret);
                                    if (ainv_stockDeliveryDetail.ItemName == null)
                                    {
                                        ainv_stockDeliveryDetail.ItemName = "";
                                    }
                                    if (ainv_stockDeliveryDetail.ItemDescription == null)
                                    {
                                        ainv_stockDeliveryDetail.ItemDescription = "";
                                    }
                                    if (ainv_stockDeliveryDetail.DeliveryUnitName == null)
                                    {
                                        ainv_stockDeliveryDetail.DeliveryUnitName = "";
                                    }

                                    long sdID = InventoryBLL.Facade.StockDeliveryDetail.Add(ainv_stockDeliveryDetail);

                                    if (serialList != null)
                                    {
                                      
                                        var dSerialByItemAttAddId = serialList.Where(x => x.ItemId == ainv_stockDeliveryDetail.ItemId).ToList();
                                        foreach (var deliveryItemSerial in dSerialByItemAttAddId)
                                        {
                                            deliveryItemSerial.DeliveryDetailId = sdID;
                                            Facade.inv_PurchaseBillDetailSerialBLL.CreateDeliveryWarrantyAndSerial(deliveryItemSerial);

                                        }
                                    }

                                }
                            }
                            
                        }
                        DnNoWithDId = ret + "," + ret2;
                        
                    }
                    else
                    {
                        DnNoWithDId = Facade.StockDelivery.Update(inv_stockDelivery);

                        if (inv_stockDeliveryDetail != null && inv_stockDeliveryDetail.Count > 0)
                        {
                            foreach (inv_StockDeliveryDetail ainv_stockDeliveryDetail in inv_stockDeliveryDetail)
                            {

                                long sdID = InventoryBLL.Facade.StockDeliveryDetail.Update(ainv_stockDeliveryDetail);

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
                    error.FileName = "DeliveryController";
                    new ErrorLogController().CreateErrorLog(error);

                    return "";
                }
                return DnNoWithDId;

            }
        }
        [HttpGet]
        public JsonResult GetByManualDeliveryId(Int64 manualDeliveryId)
        {
            try
            {
                var list = Facade.StockDelivery.GetByManualDeliveryId(manualDeliveryId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        

        [HttpGet]
        public JsonResult GetByDeliveryHistory(DateTime FromDate, DateTime ToDate)
        {
            try
            {
               
                var list = Facade.StockDelivery.GetByDeliveryHistory(FromDate, ToDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult ManualDeliveryNoDuplicateCheek(string manualDeliveryNo)
        {
            try
            {
                var manualDeliveryNo1 = manualDeliveryNo.Trim();
                var list = Facade.StockDelivery.CheckDuplicateManualDeliveryNo(manualDeliveryNo1);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public int SaveManualStockDelivery(inv_ManualStockDelivery _ManualStockDelivery, List<inv_ManualStockDeliveryDetail> _ManualStockDeliveryDetail,List<Int64> DeleteByIdList)
        {
            int ret = 0;


            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {

                try
                {
                    ret = Facade.StockDelivery.ManualStockDeliveryAdd(_ManualStockDelivery);
                    if (DeleteByIdList !=null)
                    {
                        foreach (var item in DeleteByIdList)
                        {
                            Facade.StockDelivery.ManualDeliveryUpDelete(item);
                        }
                    }
                  
                    if (_ManualStockDeliveryDetail !=null|| _ManualStockDeliveryDetail.Count >0 )
                    {
                        foreach (inv_ManualStockDeliveryDetail ManualStockDeliveryDetail in _ManualStockDeliveryDetail)
                        {
                            ManualStockDeliveryDetail.ManualDeliveryId = Convert.ToInt64(ret);
                            Facade.StockDelivery.ManualStockDeliveryDetailAdd(ManualStockDeliveryDetail);
                        }
                    }


                    ts.Complete();

                }
               
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "DeliveryController";
                    new ErrorLogController().CreateErrorLog(error);

                    return 0;
                }
               
                return ret;

            }
        }




        [HttpGet]
        public JsonResult GetMaxStockDeliverySLNumber()
        {
            try
            {
                var maxNumber = Facade.StockDelivery.GetMaxStockDeliverySLNumber();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult GetMaxManualStockDeliverySLNumber()
        {
            try
            {
                var maxNumber = Facade.StockDelivery.GetMaxManualStockDeliverySLNumber();
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult GetMaxStockDeliveryOrderNumber(DateTime deliveryDate)
        {
            try
            {
                var maxNumber = Facade.StockDelivery.GetMaxStockDeliveryOrderNumber(deliveryDate);
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetDeliveryNoDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                var list = Facade.StockDelivery.GetDynamic(searchCriteria, orderBy);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetStockDeliveryByCompanyId(Int64 CompanyId)
        {
            try
            {
                var list = Facade.StockDelivery.GetStockDeliveryByCompanyId(CompanyId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetStockDeliveryBySalesInvoiceId(Int64 SalesInvoiceId)
        {
            try
            {
                var list = Facade.StockDelivery.GetStockDeliveryBySalesInvoiceId(SalesInvoiceId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetSalesOrderDetailDynamic(string searchCriteria, string orderBy)
        {
            try
            {
                //SOD.SalesOrderId = 30894 AND IWO.IsApproved = 1
                //Goes in SalesOrderDetail
                //AND(C.CategoryName <> 'Finished Goods' OR(SOD.[ItemId] IN(SELECT ItemId FROM pro_ProductionDetail PD INNER JOIN pro_Production P ON P.ProductionId = PD.ProductionId WHERE PD.ItemId = SOD.ItemId AND P.InternalWorkOrderId IN(SELECT InternalWorkOrderId FROM inv_InternalWorkOrder WHERE SalesOrderId = SOD.SalesOrderId))))
                //string searchCriteria = "SalesOrderId=" + salesOrderId + " AND (C.CategoryName<>'Finished Goods' OR (SOD.[ItemAddAttId] IN (SELECT ItemId FROM pro_ProductionDetail PD INNER JOIN pro_Production P ON P.ProductionId=PD.ProductionId WHERE PD.ItemId=SOD.ItemAddAttId AND P.InternalWorkOrderId=(SELECT TOP 1 InternalWorkOrderId FROM inv_InternalWorkOrder WHERE SalesOrderId=SOD.SalesOrderId)))) AND ( SELECT IsLastDelivery FROM inv_StockDeliveryDetail DD LEFT JOIN inv_StockDelivery D ON D.DeliveryId=DD.DeliveryId WHERE D.OrderId=SOD.SalesOrderId AND DD.ItemId=SOD.ItemAddAttId) = 0";
                //string searchCriteria = "SOD.[SalesOrderId]=" + salesOrderId + "AND (IWO.IsApproved=1 )";
                PosBLL.pos_SalesOrderDetailBLL salesOrderDetails = new PosBLL.pos_SalesOrderDetailBLL();
                var list = salesOrderDetails.GetDynamic(searchCriteria, orderBy);

                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

    

        public JsonResult GetPaged(int startRecordNo, int rowPerPage, string fromDate, string toDate, string wildCard, string sortColumn)
        {
            try
            {

                if (!String.IsNullOrEmpty(startRecordNo.ToString()) && !String.IsNullOrEmpty(fromDate) && !String.IsNullOrEmpty(toDate))
                {
                    string whereClause = "DeliveryDate BETWEEN '" + fromDate + "' AND '" + toDate + "' ";
                    if (!String.IsNullOrEmpty(wildCard.Trim()))
                    {
                        whereClause += " AND DeliveryNo LIKE '%" + wildCard + "%'";
                    }
                    var pbList = new
                    {
                        ListData = Facade.StockDelivery.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, "DESC", ref rowPerPage),
                        TotalRecord = rowPerPage
                    };
                    return Json(pbList, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult CheckDuplicateDeliveryNo(string DeliveryNo, string date)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(DeliveryNo) && !String.IsNullOrWhiteSpace(date))
                {
                    DateTime cDate = DateTime.ParseExact(date, "dd/MM/yyyy", null);

                    Common aCommon = new Common();
                    FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(cDate);
                    string formatedDeliveryNo = "DN/" + aFiscalYear.FromDate.Year.ToString().Substring(2, 2) + "-"
                                  + aFiscalYear.ToDate.Year.ToString().Substring(2, 2) + "/" + DeliveryNo;

                    var aDelivery = Facade.StockDelivery.GetDynamic("[DeliveryNo]= '" + formatedDeliveryNo + "'", "[DeliveryDate]");

                    return Json(aDelivery, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public int DeliveryUpdateApprove(List<inv_StockDelivery> lstStockDelivery)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                int ret = 0;
                try
                {
                    foreach (inv_StockDelivery item in lstStockDelivery)
                    {
                        ret = Facade.StockDelivery.UpdateApprove(item);                        
                    }
                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "DeliveryController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }

                return ret;
            }
        }

        [HttpGet]
        public JsonResult GetStockDeliveryDetailByDeliveryId(Int64 DeliveryId)
        {
            try
            {
                var deliveryReportList = Facade.StockDeliveryDetail.GetByDeliveryId(DeliveryId); //inv_StockDeliveryDetail
                return Json(deliveryReportList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }


        [HttpGet]
        public JsonResult GetManualStockDeliveryReport(Int64 DeliveryId)
        {
            try
            {
                var deliveryReportList = Facade.StockDeliveryDetail.GetManualStockDeliveryReport(DeliveryId); //inv_StockDeliveryDetail
                return Json(deliveryReportList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult GetAllDeliveryReport(Int64 DeliveryId)
        {
            try
            {
                var deliveryReportList = Facade.StockDeliveryDetail.xRpt_DeliveryGetByDeliveryId(DeliveryId); //inv_StockDeliveryDetail
                return Json(deliveryReportList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "DeliveryController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult GetPagedDelivery(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.StockDelivery.GetPaged(startRecordNo, rowPerPage, whereClause, "DeliveryId", "DESC", ref rows),
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
        //[HttpGet]
        //public JsonResult GetMaxDeliveryNo()
        //{
        //    try
        //    {

        //        var dt = new DataTable();
        //        dt.Load(Facade.StockDelivery.GetMaxDeliveryNumber());

        //        List<string[]> results =
        //            dt.Select()
        //                .Select(drr =>
        //                    drr.ItemArray
        //                        .Select(x => x.ToString())
        //                        .ToArray())
        //                .ToList();

        //        return Json(results, JsonRequestBehavior.AllowGet);

        //    }


        //    catch (Exception ex)
        //    {

        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "PurchaseBillController";
        //        new ErrorLogController().CreateErrorLog(error);
        //        return Json(null, JsonRequestBehavior.AllowGet);
        //    }
        //}



        [HttpGet]
        public JsonResult GetPagedManualDelivery(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.StockDelivery.GetManualStockPaged(startRecordNo, rowPerPage, whereClause, "[MSD].[ManualDeliveryId]", "DESC", ref rows),
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

        [HttpGet]
        public JsonResult GetMaxOrderNo()
        {
            try
            {

                var dt = new DataTable();
                dt.Load(Facade.StockDelivery.GetMaxOrderNumber());

                List<string[]> results =
                    dt.Select()
                        .Select(drr =>
                            drr.ItemArray
                                .Select(x => x.ToString())
                                .ToArray())
                        .ToList();

                return Json(results, JsonRequestBehavior.AllowGet);

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
        public JsonResult GetAllManualDeliveryNo()
        {
            try
            {
                var localGetById = Facade.StockDelivery.GetAllMnaualDelivery();
                return Json(localGetById, JsonRequestBehavior.AllowGet);
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
