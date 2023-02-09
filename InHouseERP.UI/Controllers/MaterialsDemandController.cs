using InventoryBLL;
using InventoryEntity;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DbExecutor;
using System.Linq;
using System.Data;
using Security.UI.Controllers;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InHouseERP.UI.Controllers
{
    public class MaterialsDemandController : Controller
    {
        // GET: MaterialsDemand
        public ActionResult Index()
        {
            return View();
        }
     
        public JsonResult GetMaterialsDemandNo()
        {
            try
            {
                var maxNumber = Facade.inv_MaterialsDemandBLL.GetMaterialsDemandNo();
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


        [HttpPost]
        public Int64 Post(inv_MaterialsDemand inv_MaterialsDemand, List<inv_MaterialsDemandDetail> inv_MaterialsDemandDetail, List<inv_MaterialsDemandDetail> VoidList)
        {
            Int64 ret = 0;
            //string Tret2 = "";
            //string Iret = "";
            //string Iret2 = "";
            if (inv_MaterialsDemand.Remarks == null) { inv_MaterialsDemand.Remarks = ""; }
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {

                try
                {
                    ret = Facade.inv_MaterialsDemandBLL.Post(inv_MaterialsDemand);

                    //string[] Twords = Tret.Split(',');
                    //Tret = Convert.ToString(Twords[0]);
                    //Tret2 = Convert.ToString(Twords[1]);

                   

                    if (ret > 0)
                    {
                        foreach (var aMaterialsDemandDetail in inv_MaterialsDemandDetail)
                        {
                            if (aMaterialsDemandDetail.NameOfMaterials == null) { aMaterialsDemandDetail.NameOfMaterials = ""; }
                            if (aMaterialsDemandDetail.ItemSpecification == null) { aMaterialsDemandDetail.ItemSpecification = ""; }
                            if (aMaterialsDemandDetail.CustomerName == null) { aMaterialsDemandDetail.CustomerName = ""; }
                            if (aMaterialsDemandDetail.MCName == null) { aMaterialsDemandDetail.MCName = ""; }
                            if (aMaterialsDemandDetail.StockDetails == null) { aMaterialsDemandDetail.StockDetails = ""; }
                            aMaterialsDemandDetail.MaterialsDemandId = ret;
                            Facade.inv_MaterialsDemandBLL.DetailPost(aMaterialsDemandDetail);
                        }

                        if (VoidList != null && VoidList.Count > 0)
                        {
                            foreach (inv_MaterialsDemandDetail aVoid in VoidList)
                            {
                                Facade.inv_MaterialsDemandBLL.MatrialDeleteById(aVoid.MaterialsDemandDetailId);
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
                    error.FileName = "MaterialsDemandController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }

                return ret;
            }
        }

        [HttpPost]
        public Int64 ApprovalUpdate(List<inv_MaterialsDemand> inv_MaterialsDemandList)
        {
            Int64 ret = 0;
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {

                try
                {
                    foreach (var aMaterialsDemand in inv_MaterialsDemandList)
                    {
                        ret = Facade.inv_MaterialsDemandBLL.ApprovalUpdate(aMaterialsDemand);
                    }
                        

                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "MaterialsDemandController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }
                //inv_MaterialsDemand_ApprovalUpdate
                return ret;
            }
        }


        [HttpGet]
        public JsonResult MatrialDelete(Int64 MatDetailId)
        {
            try
            {

               var MaterialsDemand= Facade.inv_MaterialsDemandBLL.MatrialDeleteById(MatDetailId);
               return Json(MaterialsDemand, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "MaterialsDemandController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMaterialsDemandPaged(int startRecordNo, int rowPerPage, string whereClause, int rows)
        {
            // whereClause = "[SO].[SalesOrderDate] between '2020-10-16' and '2020-10-20'";
            //  whereClause = "[SO].[SalesOrderDate]'2020-10-17' between '20/11/2020'";
            try
            {

                var customMODEntity = new
                {

                    ListData = Facade.inv_MaterialsDemandBLL.GetPaged(startRecordNo, rowPerPage, whereClause, "MaterialsDemandId", "DESC", ref rows),
                    TotalRecord = rows
                };
                return Json(customMODEntity, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "MaterialsDemandController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult GetMaterialsDemandDetailByMaterialsDemandId(Int64 MaterialsDemandId)
        {
            try
            {
                var MaterialsDemandDetailList = Facade.inv_MaterialsDemandBLL.DetailGetByMaterialsDemandId(MaterialsDemandId);
                return Json(MaterialsDemandDetailList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "MaterialsDemandController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult GetMaterialsDemandUnApprovalList()
        {
            try
            {
                var MaterialsDemandList = Facade.inv_MaterialsDemandBLL.GetMaterialsDemandUnApprovalList();
                return Json(MaterialsDemandList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "MaterialsDemandController";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }



    }
}