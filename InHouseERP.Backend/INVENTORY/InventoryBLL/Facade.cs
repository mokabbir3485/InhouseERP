using DbExecutor;
using PayableBLL;
using SecurityEntity.INVENTORY.InventoryBLL;

namespace InventoryBLL
{
    public static class Facade
    {
        public static error_LogBLL ErrorLog => new error_LogBLL();
        public static inv_StockOpeningQuantityBLL StockOpeningQuantity => new inv_StockOpeningQuantityBLL();
        public static inv_StockAdjustmentBLL StockAdjustment => new inv_StockAdjustmentBLL();
        public static proc_ImportPurchaseBillBLL PurchaseBill => new proc_ImportPurchaseBillBLL();
        public static proc_ImportPurchaseBillDetailBLL PurchaseBillDetail => new proc_ImportPurchaseBillDetailBLL();

        public static proc_ImportPurchaseBillDetailAdAttributeBLL PurchaseBillDetailAdAttribute =>
            new proc_ImportPurchaseBillDetailAdAttributeBLL();

        public static proc_ImportPurchaseBillDetailAdAttributeDetailBLL PurchaseBillDetailAdAttributeDetail =>
            new proc_ImportPurchaseBillDetailAdAttributeDetailBLL();

        public static proc_ImportPurchaseBillDetailChargeBLL PurchaseBillDetailCharge => new proc_ImportPurchaseBillDetailChargeBLL();
        public static proc_ImportPurchaseBillOverHeadBLL PurchaseBillOverHead => new proc_ImportPurchaseBillOverHeadBLL();
        public static proc_AccessoriesPurchaseBLL proc_AccessoriesPurchaseBLL => new proc_AccessoriesPurchaseBLL();
        public static inv_PurchaseOrderBLL PurchaseOrder => new inv_PurchaseOrderBLL();
        public static inv_PurchaseOrderDetailBLL PurchaseOrderDetail => new inv_PurchaseOrderDetailBLL();

        public static inv_PurchaseOrderDetailAdAttributeBLL PurchaseOrderDetailAdAttribute =>
            new inv_PurchaseOrderDetailAdAttributeBLL();

        public static inv_PurchaseOrderDetailAdAttributeDetailBLL PurchaseOrderDetailAdAttributeDetail =>
            new inv_PurchaseOrderDetailAdAttributeDetailBLL();

        public static inv_RequisitionBLL Requisition => new inv_RequisitionBLL();
        public static inv_RequisitionDetailBLL RequisitionDetail => new inv_RequisitionDetailBLL();
        public static inv_ReturnFromDepartmentBLL ReturnFromDepartment => new inv_ReturnFromDepartmentBLL();

        public static inv_ReturnFromDepartmentDetailBLL ReturnFromDepartmentDetail =>
            new inv_ReturnFromDepartmentDetailBLL();

        public static inv_ReturnToSupplierBLL ReturnToSupplier => new inv_ReturnToSupplierBLL();
        public static inv_ReturnToSupplierDetailBLL ReturnToSupplierDetail => new inv_ReturnToSupplierDetailBLL();
        public static inv_StockAuditBLL StockAudit => new inv_StockAuditBLL();
        public static inv_StockAuditDetailBLL StockAuditDetail => new inv_StockAuditDetailBLL();
        public static inv_StockDeclarationBLL StockDeclaration => new inv_StockDeclarationBLL();
        public static inv_StockDeclarationDetailBLL StockDeclarationDetail => new inv_StockDeclarationDetailBLL();
        public static inv_StockIssueBLL StockIssue => new inv_StockIssueBLL();
        public static inv_JumboStockIssueBLL inv_JumboStockIssueBLL => new inv_JumboStockIssueBLL();
        public static inv_StockIssueDetailBLL StockIssueDetail => new inv_StockIssueDetailBLL();
        public static inv_StockReceiveBLL StockReceive => new inv_StockReceiveBLL();
        public static inv_StockReceiveDetailBLL StockReceiveDetail => new inv_StockReceiveDetailBLL();
        public static inv_StockTransferBLL inv_StockTransfer => new inv_StockTransferBLL();
        public static inv_StockValuationBLL StockValuation => new inv_StockValuationBLL();
        public static inv_StockValuationAttributeBLL StockValuationAttribute => new inv_StockValuationAttributeBLL();
        public static inv_StockValuationSetupBLL StockValuationSetup => new inv_StockValuationSetupBLL();
        public static inv_StockValuationTestBLL StockValuationTest => new inv_StockValuationTestBLL();

        public static inv_StoreWiseItemReorderLevelBLL StoreWiseItemReorderLevel =>
            new inv_StoreWiseItemReorderLevelBLL();

        public static inv_StoreWiseItemReorderLevelLogBLL StoreWiseItemReorderLevelLog =>
            new inv_StoreWiseItemReorderLevelLogBLL();

        public static inv_StockDeliveryBLL StockDelivery => new inv_StockDeliveryBLL();
        public static inv_StockDeliveryDetailBLL StockDeliveryDetail => new inv_StockDeliveryDetailBLL();

        public static inv_StockDeclarationDetailAdAttributeBLL StockDeclarationDetailAdAttribute =>
            new inv_StockDeclarationDetailAdAttributeBLL();

        public static inv_StockDeclarationDetailAdAttributeDetailBLL StockDeclarationDetailAdAttributeDetail =>
            new inv_StockDeclarationDetailAdAttributeDetailBLL();

        public static inv_StockDeliveryDetailAdAttributeBLL StockDeliveryDetailAdAttribute =>
            new inv_StockDeliveryDetailAdAttributeBLL();

        public static inv_StockDeliveryDetailAdAttributeDetailBLL StockDeliveryDetailAdAttributeDetail =>
            new inv_StockDeliveryDetailAdAttributeDetailBLL();

        public static inv_RequisitionDetailAdAttributeBLL RequisitionDetailAdAttribute =>
            new inv_RequisitionDetailAdAttributeBLL();

        public static inv_RequisitionDetailAdAttributeDetailBLL RequisitionDetailAdAttributeDetail =>
            new inv_RequisitionDetailAdAttributeDetailBLL();

        public static inv_StockIssueDetailAdAttributeBLL StockIssueDetailAdAttribute =>
            new inv_StockIssueDetailAdAttributeBLL();

        public static inv_ReturnToSupplierDetailAdAttributeBLL ReturnToSupplierDetailAdAttribute =>
            new inv_ReturnToSupplierDetailAdAttributeBLL();

        public static inv_ReturnToSupplierDetailAdAttributeDetailBLL ReturnToSupplierDetailAdAttributeDetail =>
            new inv_ReturnToSupplierDetailAdAttributeDetailBLL();

        public static inv_ReturnFromDepartmentDetailAdAttributeBLL ReturnFromDepartmentDetailAdAttribute =>
            new inv_ReturnFromDepartmentDetailAdAttributeBLL();

        public static inv_ReturnFromDepartmentDetailAdAttributeDetailBLL ReturnFromDepartmentDetailAdAttributeDetail =>
            new inv_ReturnFromDepartmentDetailAdAttributeDetailBLL();

        public static inv_InternalWorkOrderBLL inv_InternalWorkOrderBLL => new inv_InternalWorkOrderBLL();

        public static inv_InternalWorkOrderDetailBLL inv_InternalWorkOrderDetailBLL =>
            new inv_InternalWorkOrderDetailBLL();

        public static inv_InternalWorkOrderDetailReportBLL inv_InternalWorkOrderDetailReportBLL =>
            new inv_InternalWorkOrderDetailReportBLL();

        public static inv_PurchaseRequisitionBLL inv_PurchaseRequisitionBLL => new inv_PurchaseRequisitionBLL();

        public static proc_ImportPurchaseBillDetailSerialBLL inv_PurchaseBillDetailSerialBLL =>
            new proc_ImportPurchaseBillDetailSerialBLL();

        public static pro_ProductionBLL pro_Production => new pro_ProductionBLL();
        public static Vat_SupplierVdsIssueBLL Vat_SupplierVdsIssueBLL => new Vat_SupplierVdsIssueBLL();
        public static pro_ProductionDetailBLL pro_ProductionDetail => new pro_ProductionDetailBLL();
        public static inv_StockDeliveryNonSOBLL StockDeliveryNonSO => new inv_StockDeliveryNonSOBLL();
        public static inv_StockDeliveryNonSODetailBLL StockDeliveryNonSODetail => new inv_StockDeliveryNonSODetailBLL();
        public static inv_BillOfMaterialBLL inv_BillOfMaterialBLL => new inv_BillOfMaterialBLL();
        public static inv_MaterialsDemandBLL inv_MaterialsDemandBLL => new inv_MaterialsDemandBLL();


        public static pay_SupplierPaymentAndAdjustmentBLL proc_SupplierPaymentAndAdjustmentBLL =>
            new pay_SupplierPaymentAndAdjustmentBLL();

       
        public static pro_ProductionDashboardBLL pro_ProductionDashboardBLL => new pro_ProductionDashboardBLL();
        public static proc_ProcurementDashboardBLL proc_ProcurementDashboardBLL => new proc_ProcurementDashboardBLL();
        public static inv_StockReceiveDashboardBLL inv_StockReceiveDashboardBLL => new inv_StockReceiveDashboardBLL();

    }
}