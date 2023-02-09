using DbExecutor;
using InventoryBLL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;

namespace Security.UI.Controllers
{
    public class PurchaseBillController : Controller
    {
        public JsonResult GetHasPO()
        {
            try
            {
                var HasPo = System.Configuration.ConfigurationManager.AppSettings["HasPO"].ToString();
                return Json(HasPo, JsonRequestBehavior.AllowGet);
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
        public JsonResult Get_Mushak6_1(int PBId, bool IsLocal)
        {
            try
            {
                var list = Facade.PurchaseBill.Get_Mushak6_1(PBId, IsLocal);
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
        public JsonResult Get_Mushak6_2(int PBId)
        {
            try
            {
                var list = Facade.PurchaseBill.Get_Mushak6_2(PBId);
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

        [HttpPost]
        public string Save(proc_ImportPurchaseBillOwn ainv_PurchaseBill, List<proc_ImportPurchaseBillDetail> inv_PurchaseBillDetailLst,List<int>ItemRemoveIdList)
        {
         
            //, List<proc_ImportPurchaseBillDetailSerial> inv_PurchaseBillDetailSerial
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                
                string ret = "";
                string ret2 = "";
                ainv_PurchaseBill.CreateDate = DateTime.Now;
                ainv_PurchaseBill.UpdateDate = DateTime.Now;
                ainv_PurchaseBill.ApprovedDate = DateTime.Now;
                //ainv_PurchaseBill.PBDate = DateTime.Now;
                //ainv_PurchaseBill.VoucherNo = ainv_PurchaseBill.VoucherNo == null ? "" : ainv_PurchaseBill.VoucherNo;
                ainv_PurchaseBill.Address = ainv_PurchaseBill.Address == null ? "" : ainv_PurchaseBill.Address;
                ainv_PurchaseBill.LCorPONo = ainv_PurchaseBill.LCorPONo == null ? "" : ainv_PurchaseBill.LCorPONo;
                ainv_PurchaseBill.ShipmentInfo = ainv_PurchaseBill.ShipmentInfo == null ? "" : ainv_PurchaseBill.ShipmentInfo;
                ainv_PurchaseBill.Remarks = ainv_PurchaseBill.Remarks == null ? "" : ainv_PurchaseBill.Remarks;
                //ainv_PurchaseBill.ChallanNo = ainv_PurchaseBill.ChallanNo == null ? "" : ainv_PurchaseBill.ChallanNo;

                if (ItemRemoveIdList !=null)
                {
                    foreach (var item in ItemRemoveIdList)
                    {
                        Facade.PurchaseBillDetail.Delete(item);
                    }
                }
               


                try
                {
                    if (ainv_PurchaseBill.PBId == 0)
                    {
                        ret = Facade.PurchaseBill.Add(ainv_PurchaseBill);
                        string[] words = ret.Split(',');
                        ret = Convert.ToString(words[0]);
                        ret2 = Convert.ToString(words[1]);

                        ainv_PurchaseBill.PBId= Convert.ToInt64(ret);
                    }
                    else
                    {
    
                        var RetVal = 0;
                        RetVal = Facade.PurchaseBill.Update(ainv_PurchaseBill);
                        ret = Convert.ToString(RetVal);

                    }

                    if (ainv_PurchaseBill.StockRecivedReference == true)
                    {
                        proc_ImportPurchaseBillWithStockReceivedReference Ref = new proc_ImportPurchaseBillWithStockReceivedReference();
                        Ref.SRId = ainv_PurchaseBill.SRId;
                        Ref.PBId = Convert.ToInt64(ret);
                        Ref.IsLocalPurchase = ainv_PurchaseBill.IsLocalPurchase;
                        Ref.CreateDate = DateTime.Now;
                        Ref.UpdateDate = DateTime.Now;
                        Facade.PurchaseBill.PurchaseBillWithStockReceivedReferenceSave(Ref);

                        //inv_StockReceive SR = new inv_StockReceive();
                        //SR.SRId = ainv_PurchaseBill.SRId;
                        //SR.PBId = Convert.ToInt64(ret);

                        proc_ImportPurchaseBillWithStockReceivedReference RefObj = new proc_ImportPurchaseBillWithStockReceivedReference();
                        RefObj.SRId = ainv_PurchaseBill.SRId;
                        RefObj.PBId = Convert.ToInt64(ret);
                        RefObj.UpdateDate = DateTime.Now;
                        RefObj.IsLocalPurchase = ainv_PurchaseBill.IsLocalPurchase;
                        Facade.StockReceive.UpdateForStockReceiveRef(RefObj);




                    }

                    if (inv_PurchaseBillDetailLst != null && inv_PurchaseBillDetailLst.Count > 0)
                    {
                        foreach (proc_ImportPurchaseBillDetail ainv_PurchaseBillDetail in inv_PurchaseBillDetailLst)
                        {
                            ainv_PurchaseBillDetail.HsCodeId = ainv_PurchaseBillDetail.HsCodeId == 0 ? 0 : ainv_PurchaseBillDetail.HsCodeId;
                            ainv_PurchaseBillDetail.RollAreaInSqMeter = ainv_PurchaseBillDetail.RollAreaInSqMeter == 0 ? 0 : ainv_PurchaseBillDetail.RollAreaInSqMeter;
                            ainv_PurchaseBillDetail.RollLenghtInMeter = ainv_PurchaseBillDetail.RollLenghtInMeter == 0 ? 0 : ainv_PurchaseBillDetail.RollLenghtInMeter;
                            ainv_PurchaseBillDetail.RollWidthInMeter = ainv_PurchaseBillDetail.RollWidthInMeter == 0 ? 0 : ainv_PurchaseBillDetail.RollWidthInMeter;
                            ainv_PurchaseBillDetail.PackageWeight = ainv_PurchaseBillDetail.PackageWeight == 0 ? 0 : ainv_PurchaseBillDetail.PackageWeight;


                            //if (ainv_PurchaseBillDetail.PBDetailId == 0)
                            //{
                                ainv_PurchaseBillDetail.PBId = ainv_PurchaseBill.PBId;
                                InventoryBLL.Facade.PurchaseBillDetail.Add(ainv_PurchaseBillDetail);
                           // }
                            //else
                            //{
                            //    ainv_PurchaseBillDetail.PBId = ainv_PurchaseBill.PBId;
                            //    InventoryBLL.Facade.PurchaseBillDetail.Update(ainv_PurchaseBillDetail); 
                            //}
                            //  long pBDetailId = 0;
                            //if (inv_PurchaseBillDetailSerial != null)
                            //{
                            //    var serialListByItemAttId = inv_PurchaseBillDetailSerial.Where(x => x.ItemId == ainv_PurchaseBillDetail.ItemId).ToList();

                            //    foreach (var serialtem in serialListByItemAttId)
                            //    {
                            //        serialtem.PBDetailId = pBDetailId;
                            //        serialtem.ItemId = ainv_PurchaseBillDetail.ItemId;
                            //        InventoryBLL.Facade.inv_PurchaseBillDetailSerialBLL.Add(serialtem);
                            //    }
                            //}


                        }
                    }


                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "PurchaseBillController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }

                string PBIdWithPBNo = ret + "," + ret2;
                return PBIdWithPBNo;
            }
        }

      


        [HttpPost]
        public string LocalPBSave(inv_LocalPurchaseBill Local_inv_PurchaseBill, List<proc_LocalPurchaseBillDetailSave> Local_inv_PurchaseBillDetailLst, List<int> LocalPurchaseBillRemoveIdList)
        {
           // List<inv_LocalPurchaseBillDetailSerial> inv_LocalPurchaseBillDetailSerial,
            string ret = "";
            string ret2 = "";
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                
                Local_inv_PurchaseBill.CreateDate = DateTime.Now;
                Local_inv_PurchaseBill.UpdateDate = DateTime.Now;
                //Local_inv_PurchaseBill.PBDate = DateTime.Now;
                // Local_inv_PurchaseBill.PBDate = DateTime.Now;
                Local_inv_PurchaseBill.ApprovedDate = DateTime.Now;
                Local_inv_PurchaseBill.Address = Local_inv_PurchaseBill.Address == null ? "" : Local_inv_PurchaseBill.Address;
                Local_inv_PurchaseBill.ManualPONo = Local_inv_PurchaseBill.ManualPONo == null ? "" : Local_inv_PurchaseBill.ManualPONo;
                Local_inv_PurchaseBill.PreparedBy = Local_inv_PurchaseBill.PreparedBy = "" == null ? "" : Local_inv_PurchaseBill.PreparedBy;
                Local_inv_PurchaseBill.VoucherNo = Local_inv_PurchaseBill.VoucherNo == null ? "" : Local_inv_PurchaseBill.VoucherNo;
                Local_inv_PurchaseBill.ShipmentInfo = Local_inv_PurchaseBill.ShipmentInfo == null ? "" : Local_inv_PurchaseBill.ShipmentInfo;
                Local_inv_PurchaseBill.Remarks = Local_inv_PurchaseBill.Remarks == null ? "" : Local_inv_PurchaseBill.Remarks;
                Local_inv_PurchaseBill.ChallanNo = Local_inv_PurchaseBill.ChallanNo == null ? "" : Local_inv_PurchaseBill.ChallanNo;
                Local_inv_PurchaseBill.MaterialsDemandIds = Local_inv_PurchaseBill.MaterialsDemandIds == null ? "" : Local_inv_PurchaseBill.MaterialsDemandIds;
                Local_inv_PurchaseBill.PreparedBy = Local_inv_PurchaseBill.PreparedBy == null ? "" : Local_inv_PurchaseBill.PreparedBy;
                Local_inv_PurchaseBill.SupplierName = Local_inv_PurchaseBill.SupplierName == null ? "" : Local_inv_PurchaseBill.SupplierName;
                Local_inv_PurchaseBill.PriceTypeName = Local_inv_PurchaseBill.PriceTypeName == null ? "" : Local_inv_PurchaseBill.PriceTypeName;

                if (LocalPurchaseBillRemoveIdList != null)
                {
                    foreach (var item in LocalPurchaseBillRemoveIdList)
                    {
                        Facade.PurchaseBillDetail.LocalPBDelete(item);
                    }
                }

                try
                {
                   

                    if (Local_inv_PurchaseBill.LPBId == 0)
                    {
                        ret = Facade.PurchaseBill.LocalPBAdd(Local_inv_PurchaseBill);
                        string[] words = ret.Split(',');
                        ret = Convert.ToString(words[0]);
                        ret2 = Convert.ToString(words[1]);

                        Local_inv_PurchaseBill.LPBId = Convert.ToInt64(ret);
                    }
                    else
                    {
                        // var RetVal = 0;
                        ret = Facade.PurchaseBill.LocalPBUpdate(Local_inv_PurchaseBill);
                        //ret = Convert.ToString(RetVal);
                    }


                    if (Local_inv_PurchaseBillDetailLst != null && Local_inv_PurchaseBillDetailLst.Count > 0)
                    {
                        foreach (proc_LocalPurchaseBillDetailSave Localainv_PurchaseBillDetail in Local_inv_PurchaseBillDetailLst)
                        {
                            Localainv_PurchaseBillDetail.HsCodeId = Localainv_PurchaseBillDetail.HsCodeId == 0 ? 0 : Localainv_PurchaseBillDetail.HsCodeId;
                           // Localainv_PurchaseBillDetail.LPBId = Convert.ToInt64(ret);
                            long pBDetailId = 0;
                            if (Localainv_PurchaseBillDetail.LPBDetailId == 0)
                            {
                                Localainv_PurchaseBillDetail.LPBId = Local_inv_PurchaseBill.LPBId;
                                pBDetailId = InventoryBLL.Facade.PurchaseBillDetail.LocalPBDetailAdd(Localainv_PurchaseBillDetail);
                            }
                            else
                            {
                                 InventoryBLL.Facade.PurchaseBillDetail.UpdateForLocalPurchaseBill(Localainv_PurchaseBillDetail);
                            }


                            //if (inv_LocalPurchaseBillDetailSerial != null)
                            //{
                            //    var serialListByItemAttId = inv_LocalPurchaseBillDetailSerial.Where(x => x.ItemId == Localainv_PurchaseBillDetail.ItemId).ToList();

                            //    foreach (var serialtem in serialListByItemAttId)
                            //    {
                            //        serialtem.LPBDetailId = pBDetailId;
                            //        serialtem.ItemId = Localainv_PurchaseBillDetail.ItemId;
                            //        InventoryBLL.Facade.inv_PurchaseBillDetailSerialBLL.AddForLocalPurchaseBill(serialtem);
                            //    }
                            //}


                        }
                    }


                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "PurchaseBillController";
                    new ErrorLogController().CreateErrorLog(error);
                    return "";
                }
                string PBIdWithPBNo = ret + "," + ret2;
                return PBIdWithPBNo;
            }
        }


        //[HttpPost]
        //public long SavePB(inv_PurchaseBill pb)
        //{
        //    long ret = 0;
        //    pb.CreateDate = DateTime.Now;
        //    pb.UpdateDate = DateTime.Now;
        //    if (pb.PONo == null)
        //        pb.PONo = "";
        //    if (pb.ShipmentInfo == null)
        //        pb.ShipmentInfo = "";
        //    if (pb.Remarks == null)
        //        pb.Remarks = "";
        //    try
        //    {
        //        ret = Facade.PurchaseBill.Add(pb);
        //    }
        //    catch (Exception ex)
        //    {
        //        error_Log error = new error_Log();
        //        error.ErrorMessage = ex.Message;
        //        error.ErrorType = ex.GetType().ToString();
        //        error.FileName = "PurchaseBillController";
        //        new ErrorLogController().CreateErrorLog(error);
        //    }
        //    return ret;
        //}

        [HttpPost]
        public int RevisePB(proc_ImportPurchaseBillOwn pb)
        {
            int ret = 0;
            pb.CreateDate = DateTime.Now;
            pb.UpdateDate = DateTime.Now;
            if (pb.LCorPONo == null)
                pb.LCorPONo = "";
            if (pb.ShipmentInfo == null)
                pb.ShipmentInfo = "";
            if (pb.Remarks == null)
                pb.Remarks = "";
            try
            {
                ret = Facade.PurchaseBill.Update(pb);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseBillController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        [HttpPost]
        public long SavePBDetail(proc_ImportPurchaseBillDetail pbDetail)
        {
            long ret = 0;
            try
            {
                ret = Facade.PurchaseBillDetail.Add(pbDetail);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseBillController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        [HttpPost]
        public int SaveOverHead(proc_ImportPurchaseBillOverHead overHead)
        {
            int ret = 0;
            try
            {
                ret = Facade.PurchaseBillOverHead.Add(overHead);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseBillController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }
        [HttpPost]
        public int SavePBCharge(proc_ImportPurchaseBillDetailCharge pdCharge)
        {
            int ret = 0;
            try
            {
                ret = Facade.PurchaseBillDetailCharge.Add(pdCharge);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseBillController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpPost]
        public Int64 SavePurchaseBillDetailAdAttribute(proc_ImportPurchaseBillDetailAdAttribute inv_PurchaseBillDetailAdAttribute)
        {
            Int64 ret = 0;
            try
            {
                ret = InventoryBLL.Facade.PurchaseBillDetailAdAttribute.Add(inv_PurchaseBillDetailAdAttribute);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseBillController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpPost]
        public Int64 SavePurchaseBillDetailAdAttributeDetail(proc_ImportPurchaseBillDetailAdAttributeDetail inv_PurchaseBillDetailAdAttributeDetail)
        {
            Int64 ret = 0;
            try
            {
                if (inv_PurchaseBillDetailAdAttributeDetail.AttributeValue == null)
                    inv_PurchaseBillDetailAdAttributeDetail.AttributeValue = "";
                ret = InventoryBLL.Facade.PurchaseBillDetailAdAttributeDetail.Add(inv_PurchaseBillDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "PurchaseBillController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        public JsonResult proc_PurchaseBillNo_GetForVDSIssue()
        {
            try
            {
                return Json(Facade.PurchaseBillDetail.proc_PurchaseBillNo_GetForVDSIssue(), JsonRequestBehavior.AllowGet);
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

        public JsonResult GetPBById(int id)
        {
            try
            {
                return Json(Facade.PurchaseBillDetail.GetByPBId(id), JsonRequestBehavior.AllowGet);
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
        public JsonResult GetByPbIdForUpdate(long IPBId)
        {
            try
            {
                var pbList = Facade.PurchaseBillDetail.UpdateForPurchaseBill(IPBId);
                return Json(pbList, JsonRequestBehavior.AllowGet);
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
        public JsonResult UpdateForLocalPurchaseBillGetById(long LPBId)
        {
            try
            {
                var pbList = Facade.PurchaseBillDetail.UpdateForLocalPurchaseBillGetById(LPBId);
                return Json(pbList, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetLocalPBById(int id)
        {
            try
            {
                var localGetById = Facade.PurchaseBillDetail.LocalGetByPBId(id);
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


       
        [HttpGet]
        public JsonResult LocalSuppilerPBId(int supId)
        {
            try
            {
                var localSupplierGetById = Facade.PurchaseBill.GetByLocalSupplierId(supId);
                return Json(localSupplierGetById, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetAllPurchaseBillWithStockReceivedReference(Int64 ? SRId)
        {
            try
            {
                var BillWithStockReceivedReferenceList = Facade.PurchaseBill.GetPurchaseBillWithStockReceivedReferenceAfterSave(SRId);
                return Json(BillWithStockReceivedReferenceList, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetAllSuppilerPBId(int supId)
        {
            try
            {
                var localSupplierGetById = Facade.PurchaseBill.GetBySupplierId(supId);
                return Json(localSupplierGetById, JsonRequestBehavior.AllowGet);
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
        public JsonResult PurchaseMaterialTypeGet()
        {
            try
            {
                var PurchaseMaterialTypeGetList = Facade.PurchaseBill.PurchaseMaterialTypeGet();
                return Json(PurchaseMaterialTypeGetList, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetAllMaterialsDemandNo()
        {
            try
            {
                var MaterialsDemandList = Facade.PurchaseBill.GetAllMaterialsDemandNo();
                return Json(MaterialsDemandList, JsonRequestBehavior.AllowGet);
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
        public JsonResult LocalGetAll()
        {
            try
            {
                var localGetAll = Facade.PurchaseBill.LocalGetAll();
                return Json(localGetAll, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetPurchaseAcknowledgement(long SupplierId, DateTime FromDate, DateTime ToDate)
        {
            try
            {
                var PurchaseList = Facade.PurchaseBill.GetPurchaseAcknowledgement(SupplierId, FromDate, ToDate);
                return Json(PurchaseList, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetPBDynamic(string where, string orderBy)
        {
            try
            {
                var list = Facade.PurchaseBill.GetDynamic(where, orderBy);
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
        public JsonResult GetTopForReceive(int TopQty)
        {
            try
            {
                var list = Facade.PurchaseBill.GetTopForReceive(TopQty);
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

        public JsonResult GetTopForLocalReceive(int TopQty)
        {
            try
            {
                var list = Facade.PurchaseBill.GetTopForLocalReceive(TopQty);
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

        public JsonResult GetTopForLocalWarrentyAndSerialNo(int top)
        {
            try
            {
                var list = Facade.PurchaseBill.GetTopForLocalWarrentyAndSerialNo(top);
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

        public JsonResult GetTopForImportWarrentyAndSerialNo(int top)
        {
            try
            {
                var list = Facade.PurchaseBill.GetTopForImportWarrentyAndSerialNo(top);
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

        public JsonResult GetAllPBById(int id)
        {
            try
            {
                var list = Facade.PurchaseBillDetail.GetByPBId(id);
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
        public JsonResult GetAllPBOverHeadById(int id)
        {
            try
            {
                var list = Facade.PurchaseBillOverHead.GetByPBId(id);
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
        public JsonResult GetPBDetailChargeByPbDetailId(Int64 pbDetailId)
        {
            try
            {
                var list = Facade.PurchaseBillDetailCharge.GetByPBDetailId(pbDetailId);
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
        public JsonResult GetPurchaseBillNo()
        {
            try
            {
                var maxNumber = Facade.PurchaseBill.GetMaxPurchaseBillNo();
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
        //public JsonResult GetMaxPurchaseBillNo()
        //{
        //    try
        //    {

        //        var dt = new DataTable();
        //        dt.Load(Facade.PurchaseBill.GetMaxPurchaseBillNo());

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

        public JsonResult GetMaxLocalPurchaseBillNo()
        {
            try
            {
                var maxNumber = Facade.PurchaseBill.GetMaxLocalPBNo();
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

        //public JsonResult GetMaxLocalPurchaseBillNo()
        //{
        //    try
        //    {

        //        var dt = new DataTable();
        //        dt.Load(Facade.PurchaseBill.GetMaxLocalPurchaseBillNo());

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

        public JsonResult CheckDuplicatePBNo(string PBNo, string date)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(PBNo) && !String.IsNullOrWhiteSpace(date))
                {
                    DateTime cDate = DateTime.ParseExact(date, "dd/MM/yyyy", null);

                    Common aCommon = new Common();
                    FiscalYear aFiscalYear = aCommon.GetFiscalFormDateAndToDateForEPZ(cDate);
                    string formatedPBNo = "PB/" + aFiscalYear.FromDate.Year.ToString().Substring(2, 2) + "-"
                                  + aFiscalYear.ToDate.Year.ToString().Substring(2, 2) + "/" + PBNo;

                    var purchaseBill = Facade.PurchaseBill.GetDynamic("[PBNo]= '" + formatedPBNo + "'", " [PBNo]");

                    return Json(purchaseBill, JsonRequestBehavior.AllowGet);
                }
                return Json(null, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetLocalPBReport(Int64 LPBId)
        {
            try
            {

                var localPBList = Facade.PurchaseBill.GetLocalPB(LPBId);
                return Json(localPBList, JsonRequestBehavior.AllowGet);
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
        public JsonResult ImportPurchaseBillReport(Int64 PBId)
        {
            try
            {

                var localPBList = Facade.PurchaseBillDetail.ImportPurchaseBillReport(PBId);
                return Json(localPBList, JsonRequestBehavior.AllowGet);
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

        //public JsonResult GetPaged(int startRecordNo, int rowPerPage, string fromDate, string toDate, string wildCard, string sortColumn)
        //{
        //    try
        //    {

        //        if (!String.IsNullOrEmpty(startRecordNo.ToString()) && !String.IsNullOrEmpty(fromDate) && !String.IsNullOrEmpty(toDate))
        //        {
        //            string whereClause = "PBDate BETWEEN '"+ fromDate +"' AND '"+ toDate +"' ";
        //            if (!String.IsNullOrEmpty(wildCard.Trim()))
        //            {
        //                whereClause += " AND PBNo LIKE '%" + wildCard +"%'";
        //            }
        //            var pbList = new
        //            {
        //                ListData = Facade.PurchaseBill.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, "DESC", ref rowPerPage),
        //                TotalRecord = rowPerPage
        //            };
        //            return Json(pbList, JsonRequestBehavior.AllowGet);
        //        }
        //        return Json(null, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetForRealization(int financialCycleId, int supplierId)
        {
            try
            {
                var list = Facade.PurchaseBill.GetForRealization(financialCycleId, supplierId);
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
        public JsonResult GetPagedPB(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.PurchaseBill.GetPaged(startRecordNo, rowPerPage, whereClause, "PBId", "desc", ref rows),
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
        public JsonResult ImportPagedPB(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.PurchaseBill.ImportGetPaged(startRecordNo, rowPerPage, whereClause, "PBId", "desc", ref rows),
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
        public JsonResult LocalPagedPB(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.PurchaseBill.LocalGetPaged(startRecordNo, rowPerPage, whereClause, "LPBId", "desc", ref rows),
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
        public JsonResult WarrantyAndSerialGetPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            try
            {

                var customMODEntity = new
                {
                    ListData = Facade.PurchaseBill.WarrantyAndSerialGetPaged(startRecordNo, rowPerPage, whereClause, "PBNo", "desc", ref rows),
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
        public JsonResult PurchaseBillDetailGetByPBId(int pbId)
        {
            try
            {
                var list = Facade.PurchaseBillDetail.GetByPBId(pbId);
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
        public JsonResult GetAllWarrentyAndSerial()
        {
            try
            {
                var list = Facade.inv_PurchaseBillDetailSerialBLL.GetAll();
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
        public JsonResult PurchaseBillDetailSerialSerialId(Int64 SerialId)
        {
            try
            {
                var list = Facade.inv_PurchaseBillDetailSerialBLL.GetBySerialAndWarrantyId(SerialId);
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
        public JsonResult PurchaseBillDetailGetByOverHead(Int64 PbId)
        {
            try
            {
                var list = Facade.PurchaseBillOverHead.GetByPBId(PbId);
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
