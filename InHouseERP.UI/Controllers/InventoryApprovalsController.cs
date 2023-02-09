using System;
using System.Web.Mvc;
using InventoryEntity;
using DbExecutor;
using System.Collections.Generic;
using PosEntity;
using ExportEntity;

namespace Security.UI.Controllers
{
    public class InventoryApprovalsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetModuleExAdminSecurity()
        {
            try
            {
                var list = SecurityBLL.Facade.Approval.GetApprovedInventoryScreen();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InventoryApprovals";
                new ErrorLogController().CreateErrorLog(error);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public int Approve(Int64 PkId, int ApproveBy, DateTime ApproveDate, Int64 ScreenId)
        {
            int ret = 0;
            try
            {
                switch (ScreenId)
                {

                    case 21:            //Pursase Bill
                        proc_ImportPurchaseBill _inv_PurchaseBill = new proc_ImportPurchaseBill();
                        _inv_PurchaseBill.PBId = PkId;
                        _inv_PurchaseBill.ApprovedBy = ApproveBy;
                        _inv_PurchaseBill.ApprovedDate = ApproveDate;
                        _inv_PurchaseBill.IsApproved = true;
                        ret = InventoryBLL.Facade.PurchaseBill.UpdateApprove(_inv_PurchaseBill);
                        break;


                    case 20:            //Pursase Receive
                        inv_StockReceive _inv_StockReceive = new inv_StockReceive();
                        _inv_StockReceive.SRId = PkId;
                        _inv_StockReceive.ApprovedBy = ApproveBy;
                        _inv_StockReceive.ApprovedDate = ApproveDate;
                        _inv_StockReceive.IsApproved = true;
                        ret = InventoryBLL.Facade.StockReceive.UpdateApprove(_inv_StockReceive);
                        break;


                    case 25:            //Requsition List
                        inv_Requisition _inv_Requisition = new inv_Requisition();
                        _inv_Requisition.RequisitionId = PkId;
                        _inv_Requisition.ApprovedBy = ApproveBy;
                        _inv_Requisition.ApprovedDate = ApproveDate;
                        _inv_Requisition.IsApproved = true;
                        ret = InventoryBLL.Facade.Requisition.UpdateApprove(_inv_Requisition);
                        break;


                    case 27:            //Issue List from Requsition
                        inv_StockIssue _inv_StockIssue = new inv_StockIssue();
                        _inv_StockIssue.IssueId = PkId;
                        _inv_StockIssue.ApprovedBy = ApproveBy;
                        _inv_StockIssue.ApprovedDate = ApproveDate;
                        _inv_StockIssue.IsApproved = true;
                        ret = InventoryBLL.Facade.StockIssue.UpdateApprove(_inv_StockIssue);
                        break;


                    case 41:            //Issue List without Requsition
                        inv_StockIssue _inv_StockWithoutIssue = new inv_StockIssue();
                        _inv_StockWithoutIssue.IssueId = PkId;
                        _inv_StockWithoutIssue.ApprovedBy = ApproveBy;
                        _inv_StockWithoutIssue.ApprovedDate = ApproveDate;
                        _inv_StockWithoutIssue.IsApproved = true;
                        ret = InventoryBLL.Facade.StockIssue.UpdateApprove(_inv_StockWithoutIssue);
                        break;


                    case 33:            //Return to Supplier List
                        inv_ReturnToSupplier _inv_ReturnToSupplier = new inv_ReturnToSupplier();
                        _inv_ReturnToSupplier.ReturnId = PkId;
                        _inv_ReturnToSupplier.ApprovedBy = ApproveBy;
                        _inv_ReturnToSupplier.ApprovedDate = ApproveDate;
                        _inv_ReturnToSupplier.IsApproved = true;
                        ret = InventoryBLL.Facade.ReturnToSupplier.UpdateApprove(_inv_ReturnToSupplier);
                        break;


                    case 34:            //Return from Depertment List
                        inv_ReturnFromDepartment _inv_ReturnFromDepartment = new inv_ReturnFromDepartment();
                        _inv_ReturnFromDepartment.ReturnId = PkId;
                        _inv_ReturnFromDepartment.ApprovedBy = ApproveBy;
                        _inv_ReturnFromDepartment.ApprovedDate = ApproveDate;
                        _inv_ReturnFromDepartment.IsApproved = true;
                        ret = InventoryBLL.Facade.ReturnFromDepartment.UpdateApprove(_inv_ReturnFromDepartment);
                        break;


                    case 45:            //Delivery List
                        inv_StockDelivery _inv_StockDelivery = new inv_StockDelivery();
                        _inv_StockDelivery.DeliveryId = PkId;
                        _inv_StockDelivery.ApprovedBy = ApproveBy;
                        _inv_StockDelivery.ApprovedDate = ApproveDate;
                        _inv_StockDelivery.IsApproved = true;
                        ret = InventoryBLL.Facade.StockDelivery.UpdateApprove(_inv_StockDelivery);
                        break;


                    case 30:            //Declaration List
                        inv_StockDeclaration _inv_StockDeclaration = new inv_StockDeclaration();
                        _inv_StockDeclaration.DeclarationId = PkId;
                        _inv_StockDeclaration.ApprovedBy = ApproveBy;
                        _inv_StockDeclaration.ApprovedDate = ApproveDate;
                        _inv_StockDeclaration.IsApproved = true;
                        ret = InventoryBLL.Facade.StockDeclaration.UpdateApprove(_inv_StockDeclaration);
                        break;

                    case 62:
                        inv_InternalWorkOrder _inv_InternalWorkOrder = new inv_InternalWorkOrder();
                        _inv_InternalWorkOrder.InternalWorkOrderId = PkId;
                        _inv_InternalWorkOrder.IsApproved = true;
                        _inv_InternalWorkOrder.ApprovedBy = ApproveBy;
                        _inv_InternalWorkOrder.ApprovedDate = ApproveDate;
                        ret = InventoryBLL.Facade.inv_InternalWorkOrderBLL.UpdateApprove(_inv_InternalWorkOrder);
                        break;
                }
            }
            catch (Exception ex)
            {
                error_Log error = new error_Log();
                error.ErrorMessage = ex.Message;
                error.ErrorType = ex.GetType().ToString();
                error.FileName = "InventoryApprovalsController";
                new ErrorLogController().CreateErrorLog(error);
                return 0;
            }
            return ret;
        }

        [HttpPost]
        public Int64 ApproveIWO(inv_InternalWorkOrder _inv_InternalWorkOrder, List<inv_InternalWorkOrderDetail> _inv_InternalWorkOrderDetailList)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                Int64 ret = 0;
               
                try
                {
                    if (_inv_InternalWorkOrder.InternalWorkOrderId != 0)
                    {
                        _inv_InternalWorkOrder.UpdateDate = DateTime.Now;
                        if (String.IsNullOrEmpty(_inv_InternalWorkOrder.Remarks))
                        {
                            _inv_InternalWorkOrder.Remarks = String.Empty;
                        }
                        _inv_InternalWorkOrder.IsApproved = true;
                        //if (_inv_InternalWorkOrder.IsApproved == false)
                        //{
                        //    _inv_InternalWorkOrder.IsApproved = true;
                        //}

                        InventoryBLL.Facade.inv_InternalWorkOrderBLL.UpdateApprove(_inv_InternalWorkOrder);
                        ret = _inv_InternalWorkOrder.InternalWorkOrderId;
                        if (ret > 0)
                        {
                            if (_inv_InternalWorkOrderDetailList != null && _inv_InternalWorkOrderDetailList.Count > 0)
                            {
                                foreach (var _inv_InternalWorkOrderDetail in _inv_InternalWorkOrderDetailList)
                                {
                                    if (String.IsNullOrEmpty(_inv_InternalWorkOrderDetail.DetailRemarks))
                                    {
                                        _inv_InternalWorkOrderDetail.DetailRemarks = "";
                                    }
                                    InventoryBLL.Facade.inv_InternalWorkOrderDetailBLL.Update(_inv_InternalWorkOrderDetail);

                                    pos_SalesOrderDetail soDetail = new pos_SalesOrderDetail();
                                    soDetail.SalesOrderId = _inv_InternalWorkOrder.SalesOrderId;
                                    soDetail.ItemAddAttId = _inv_InternalWorkOrderDetail.FinishedItemId;
                                    soDetail.OrderQty = _inv_InternalWorkOrderDetail.OrderQty;
                                    soDetail.SalesOrderDetailId = _inv_InternalWorkOrderDetail.SalesOrderDetailId;

                                    PosBLL.Facade.pos_SalesOrderDetailBLL.UpdateOrderQty(soDetail);
                                }
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
                    error.FileName = "InventoryApprovalsController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }
                return ret;
            }
        }


        [HttpPost]
        public Int64 SaveIWOApprove(List<inv_InternalWorkOrder> _inv_InternalWorkOrder, List<exp_Approval> expApproval)
        {
            using (System.Transactions.TransactionScope ts = new System.Transactions.TransactionScope())
            {
                Int64 ret = 0;
                Int64 ret2 = 0;
                try
                {
                    foreach (inv_InternalWorkOrder inv_InternalWorkOrderwo in _inv_InternalWorkOrder)
                    {
                        ret2= InventoryBLL.Facade.inv_InternalWorkOrderBLL.UpdateApprove(inv_InternalWorkOrderwo);
                    }

                    foreach (exp_Approval approval in expApproval)
                    {
                        approval.ApprovedDate = DateTime.Now;
                        approval.UpdateDate = DateTime.Now;
                        if (approval.ApprovalPassword == null) approval.ApprovalPassword = "";
                        ret = ExportBLL.Facade.exp_Approval.Update(approval); 
                        //Facade.exp_Approval.Update(approval);
                    }


                    ts.Complete();
                }
                catch (Exception ex)
                {
                    error_Log error = new error_Log();
                    error.ErrorMessage = ex.Message;
                    error.ErrorType = ex.GetType().ToString();
                    error.FileName = "InventoryApprovalsController";
                    new ErrorLogController().CreateErrorLog(error);
                    return 0;
                }
                return ret2;
            }
        }
    }
}