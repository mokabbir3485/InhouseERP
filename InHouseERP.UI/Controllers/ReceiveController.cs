using DbExecutor;
using InventoryEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using InventoryBLL;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Diagnostics;

namespace Security.UI.Controllers
{
    public class ReceiveController : Controller
    {
        #region Get

        public JsonResult GetHasPB()
        {
            try
            {
                var hasPB = System.Configuration.ConfigurationManager.AppSettings["HasPB"].ToString(); ;
                return Json(hasPB, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetHasFreeQtyInReceive()
        {
            try
            {
                var FreeQtyInReceive = System.Configuration.ConfigurationManager.AppSettings["FreeQtyInReceive"].ToString();
                return Json(FreeQtyInReceive, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetPriceInReceive()
        {
            try
            {
                var hasPB = System.Configuration.ConfigurationManager.AppSettings["PriceInReceive"].ToString(); ;
                return Json(hasPB, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

       [HttpGet]
        public JsonResult GetAllRecivedNo(Int32 ? SRID)
        {
            try
            {
                var pbList = InventoryBLL.Facade.PurchaseBill.GetAllRecivedNo(SRID);
                return Json(pbList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetTopPBByNumber(int number)
        {
            try
            {
                var pbList = InventoryBLL.Facade.PurchaseBill.GetTopForReceive(number);
                return Json(pbList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetStockStatus(DateTime StatusDate, string SubCategoryIds, Int32? CategoryId = null, Int32? DepartmentId = null)
        {
            var watch = Stopwatch.StartNew();
            try
            {
                
                var List = InventoryBLL.Facade.StockValuation.StockValuationLedgerStatusDate(StatusDate, SubCategoryIds, CategoryId, DepartmentId);
                
                return Json(List, JsonRequestBehavior.AllowGet);

                //string ConnectionString = ConfigurationManager.ConnectionStrings["dbCon"].ConnectionString;
                //SqlConnection connection = new SqlConnection(ConnectionString);



                //SqlCommand command = new SqlCommand("inv_StockValuationLedger_StockStatus", connection);
                //command.CommandType = CommandType.StoredProcedure;
                //command.Parameters.AddWithValue("@StatusDate", StatusDate);
                //command.Parameters.AddWithValue("@SubCategoryIds", SubCategoryIds);
                //command.Parameters.AddWithValue("@CategoryId", CategoryId);
                //command.Parameters.AddWithValue("@DepartmentId", DepartmentId);
                //connection.Open();
                //SqlDataReader reader = command.ExecuteReader();

                //List<inv_StockValuationLedger> StockValuationLedgerList = new List<inv_StockValuationLedger>();
                //inv_StockValuationLedger test = null;

                //while (reader.Read())
                //{
                //    test = new inv_StockValuationLedger();
                //    test.ItemId = int.Parse(reader["ItemId"].ToString());
                //    test.ItemCode = reader["ItemCode"].ToString();
                //    StockValuationLedgerList.Add(test);
                //}

                //gvGrid.DataSource = StockValuationLedger;
                //gvGrid.DataBind();

                //return Json(StockValuationLedgerList, JsonRequestBehavior.AllowGet);
                watch.Stop();
                Console.WriteLine($"The Execution time of the program is {watch.ElapsedMilliseconds}ms");
            }
            catch (Exception ex)
            {
                watch.Stop();
                Console.WriteLine($"The Execution time of the program is {watch.ElapsedMilliseconds}ms");
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            watch.Stop();
            Console.WriteLine($"The Execution time of the program is {watch.ElapsedMilliseconds}ms");
        }
        public JsonResult GetPBByQty(int qty)
        {
            try
            {
                var pbList = InventoryBLL.Facade.PurchaseBill.GetTopForReceive(qty);
                return Json(pbList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetLocalPBByQty(int qty)
        {
            try
            {
                var pbList = InventoryBLL.Facade.PurchaseBill.GetTopForLocalReceive(qty);
                return Json(pbList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPBDetail(Int64 PBId)
        {
            try
            {
                var pbDetailList = InventoryBLL.Facade.PurchaseBillDetail.GetByPBId(PBId);
                return Json(pbDetailList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetByStockRecivedId(Int64 SRId)
        {
            try
            {
                var pbDetailList =Facade.StockReceiveDetail.GetByRecivedId(SRId);
                return Json(pbDetailList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
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
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetTopReceiveForReturn(string whereCondition, string topQty)
        {
            try
            {
                var list = InventoryBLL.Facade.StockReceive.GetTopForReturn(whereCondition, topQty);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetReceiveById(Int64 srId)
        {
            try
            {
                var list = InventoryBLL.Facade.StockReceive.GetById(srId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetByLotNoWithStore(Int32 departmentId, DateTime receiveDate)
        {
         
            try
            {
                var list = InventoryBLL.Facade.StockReceive.GetByLotNoWithStore(departmentId,receiveDate);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }



      
        public JsonResult GetMaxReceiveNo()
        {
            try
            {
                var maxNumber = Facade.StockReceive.GetMaxReceiveNo();
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

        public int UpdateStockReceive(inv_StockReceive stockReceive)
        {
            stockReceive.CreateDate = DateTime.Now;
            stockReceive.UpdateDate = DateTime.Now;
            if (stockReceive.PONo == null)
                stockReceive.PONo = "";
            if (stockReceive.PBNo == null)
                stockReceive.PBNo = "";
            if (stockReceive.Remarks == null)
                stockReceive.Remarks = "";

            int ret = 0;

            try
            {
                ret = InventoryBLL.Facade.StockReceive.Update(stockReceive);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        public JsonResult GetItemAdditionalAttributeOperationalByItemId(int itemId)
        {
            try
            {
                var list = SecurityBLL.Facade.ItemAdditionalAttribute.GetOperationalByItemId(itemId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPurchaseBillDetailAdAttributeByPBDetailId(int pBDetailId)
        {
            try
            {
                var list = InventoryBLL.Facade.PurchaseBillDetailAdAttribute.GetByPBDetailId(pBDetailId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPurchaseBillDetailAdAttributeDetailByPBDetailAdAttId(int pBDetailAdAttId)
        {
            try
            {
                var list = InventoryBLL.Facade.PurchaseBillDetailAdAttributeDetail.GetByPBDetailAdAttId(pBDetailAdAttId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetReceiveDynamic(string whereCondition)
        {
            try
            {
                var list = InventoryBLL.Facade.StockReceive.GetDynamic(whereCondition, "");
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetMaxStockReciveIdByDate(string stockReciveDate)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(stockReciveDate))
                {
                    var date = DateTime.ParseExact(stockReciveDate, "dd/MM/yyyy", null);
                    var maxNumber = InventoryBLL.Facade.StockReceive.GetMaxStockReciveIdByDate(date);

                    return Json(maxNumber, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult CheckDuplicateSRNo(string ReceiveNo, string date)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(ReceiveNo) && !String.IsNullOrWhiteSpace(date))
                {
                    DateTime cDate = DateTime.ParseExact(date, "dd/MM/yyyy", null);

                    Common aCommon = new Common();
                    FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(cDate);
                    string formatedPBNo = "SR/" + aFiscalYear.FromDate.Year.ToString().Substring(2, 2) + "-"
                                  + aFiscalYear.ToDate.Year.ToString().Substring(2, 2) + "/" + ReceiveNo;

                    var stockRecive = InventoryBLL.Facade.StockReceive.GetDynamic("[ReceiveNo]= '" + formatedPBNo + "'", " [ReceiveDate]");

                    return Json(stockRecive, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Post

        [HttpPost]

        public string StockSave(inv_StockReceive stockReceive, List<inv_StockReceiveDetail> stockReceiveDetailLst, List<proc_ImportPurchaseBillDetailSerial> serialList,List<inv_LocalPurchaseBillDetailSerial>localSerialList)
         {
            string ret = "";
            string ret2 = "";
            try
            {
                stockReceive.CreateDate = DateTime.Now;
                stockReceive.UpdateDate = DateTime.Now;
                stockReceive.LotNo = stockReceive.LotNo == null ? "" : stockReceive.LotNo;
                stockReceive.Remarks = stockReceive.Remarks == null ? "" : stockReceive.Remarks;
                stockReceive.TotalReceiveQty = stockReceiveDetailLst
                                               .Where(item => item.SRQuantity > 0)
                                               .Sum(item => item.SRQuantity);

                ret = Facade.StockReceive.StockRCAdd(stockReceive);
                string[] words = ret.Split(',');
                ret = Convert.ToString(words[0]);
                ret2 = Convert.ToString(words[1]);
                Int64 retId = Convert.ToInt64(ret);
                if (retId > 0)
                {
                    if (stockReceiveDetailLst != null && stockReceiveDetailLst.Count > 0)
                    {
                        foreach (inv_StockReceiveDetail ainv_StockReceiveDetail in stockReceiveDetailLst)
                        {
                            if (ainv_StockReceiveDetail.SRQuantity > 0)
                            {
                                ainv_StockReceiveDetail.SRId = Convert.ToInt64(ret);
                                //ainv_StockReceiveDetail.SRUnitId = 1; 
                                Facade.StockReceiveDetail.Add(ainv_StockReceiveDetail);
                            }
                        }
                    }
                    if (serialList != null)
                    {      
                        foreach (var serial in serialList)
                        {
                                Facade.inv_PurchaseBillDetailSerialBLL.UpdateDepartment(serial.PBDetailSerialId, serial.DepartmentId);
                        }    
                    }
                    if (localSerialList !=null)
                    {
                        foreach (var LocalSerial in localSerialList)
                        {
                            Facade.inv_PurchaseBillDetailSerialBLL.LocalUpdateDepartment(LocalSerial.LPBDetailSerialId, LocalSerial.DepartmentId);
                        }
                    }
                   

                }

            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "ReceiveController";
                new ErrorLogController().CreateErrorLog(error);
                return "";

            }
            string SRIdWithSRNo = ret + "," + ret2;
            return SRIdWithSRNo;
        }

        [HttpPost]
        public ActionResult SaveStockReceive(inv_StockReceive stockReceive, List<inv_StockReceiveDetail> stockReceiveDetailLst, List<proc_ImportPurchaseBillDetailSerial> serialList)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                Int64 ret = 0;
                try
                {
                    stockReceive.CreateDate = DateTime.Now;
                    stockReceive.UpdateDate = DateTime.Now;
               
                    stockReceive.ReceiveDate = DateTime.Now;
                
                 
                    if (stockReceive.PBNo == null)
                        stockReceive.PBNo = "";
                 
                    if (stockReceive.Remarks == null)
                        stockReceive.Remarks = "";

                    stockReceive.PBNo = stockReceive.PBNo == null ? "" : stockReceive.PBNo;
                 
                    stockReceive.LotNo = stockReceive.LotNo == null ? "" : stockReceive.LotNo;
                
                    stockReceive.ReceiveNo = stockReceive.ReceiveNo == null ? "" : stockReceive.ReceiveNo;
                    stockReceive.Remarks = stockReceive.Remarks == null ? "" : stockReceive.Remarks;
                 
               
                   // stockReceive.IsApproved = stockReceive.IsApproved == 0 ? 1 : stockReceive.IsApproved;
                 
                   // stockReceive.ApprovedDate = stockReceive.ApprovedDate == null ? "" : stockReceive.ApprovedDate.ToShortDateString("");

                    if (stockReceive.SRId == 0)
                    {
                        string savedReceiveNo = "";
                        stockReceive.TotalReceiveQty = stockReceiveDetailLst
                                                .Where(item => item.SRQuantity > 0)
                                                .Sum(item => item.SRQuantity);
                        //, ref tring savedReceiveNo
                        ret =Facade.StockReceive.Add(stockReceive,ref savedReceiveNo);
                        if (ret > 0)
                        {
                            if (stockReceiveDetailLst != null && stockReceiveDetailLst.Count > 0)
                            {
                                foreach (inv_StockReceiveDetail ainv_StockReceiveDetail in stockReceiveDetailLst)
                                {
                                    if (ainv_StockReceiveDetail.SRQuantity > 0)
                                    {
                                        ainv_StockReceiveDetail.SRId = ret;
                                        ainv_StockReceiveDetail.SRUnitId = 1;
                                       Facade.StockReceiveDetail.Add(ainv_StockReceiveDetail);
                                    }
                                }
                            }

                        }
                        if (serialList != null)
                        {
                            foreach (var serial in serialList)
                            {
                              Facade.inv_PurchaseBillDetailSerialBLL.UpdateDepartment(serial.PBDetailSerialId, serial.DepartmentId);
                            }
                        }
                        var data = new
                        {
                            SRId = ret,
                            StockReciveNo = savedReceiveNo
                        };
                        ts.Complete();
                        return Json(data, JsonRequestBehavior.AllowGet);
                    }
                    ts.Complete();
                    var data2 = new
                    {
                        SRId = 0,
                        StockReciveNo = ""
                    };
                    return Json(data2, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "ReceiveController";
                    new ErrorLogController().CreateErrorLog(error);
                    //var data3 = new
                    //{
                    //    SRId = 0,
                    //    StockReciveNo = ""
                    //};
                    //return Json(data3, JsonRequestBehavior.AllowGet);
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [HttpGet]
        public JsonResult GetPagedStockRecive(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.StockReceive.StockRecivedGetPaged(startRecordNo, rowPerPage, whereClause, "[SR].[UpdateDate]", "DESC", ref rows),
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

        #endregion

    }
}