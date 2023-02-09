using System.Web.Optimization;

namespace Security.UI
{
    public class BundleConfig
    {
       // string ApplicationVersion = System.Configuration.ConfigurationManager.AppSettings["AppVersion"];
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"
                        ));
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/vendors").Include(
                "~/Scripts/sitebar.js",
                 "~/Scripts/jquery.signalR-2.2.1.min.js",
                 "~/Scripts/multiple-select.js",
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-route.min.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-filter.min.js",
                "~/Scripts/angularjs-dropdown-multiselect.js",
                "~/Scripts/ngAutocomplete.js",
                "~/Scripts/moment.min.js",
                "~/Scripts/bootstrap-datetimepicker.js",
                "~/Scripts/daterangepicker.min.js",
                "~/Scripts/pikaday.js",
                "~/Scripts/alertify.js",
                "~/Scripts/awesomplete.js",
                "~/Scripts/ui-bootstrap-tpls-1.3.3.min.js",
                "~/Scripts/Chart.min.js",
                "~/Scripts/Custom.js",
                "~/Scripts/typeahead.js",
                "~/Scripts/CommonScript.js",
                "~/Scripts/xlsx.full.min.js",
                "~/Scripts/ods.js",
                "~/Scripts/linq.js",
                "~/Scripts/select2.min.js",
                "~/Scripts/select.js",
                "~/Scripts/alasql.min.js",
                "~/Scripts/jquery-3.5.1.min",
                "~/Scripts/jquery-ui.js",

                "~/Scripts/select.js",
                "~/Scripts/angular-sanitize.js",
                
                "~/Scripts/ng-file-upload.min.js",
                "~/Scripts/summernote.min.js",
                "~/Scripts/hotkeys.js",
                "~/Scripts/mousetrap.js",
                "~/Scripts/dataTables.bootstrap.min.js",
                "~/Scripts/jquery.rowspanizer.js",
                "~/Scripts/kendo.all.min.js",
                "~/Scripts/bootstrap3.4.1.js",
                "~/Scripts/FileSaver.js",
                "~/Scripts/jquery.wordexport.js"
                //"~/Scripts/mdb.min.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/spa").Include(
                
                "~/SPA/app.js",
                "~/SPA/IndexController.js",
                "~/Scripts/dirPagination.js",
                "~/SPA/Attendee/AttendeeController.js",
                "~/SPA/ADMIN/FiscalYear/FiscalYearEntryController.js",
                "~/SPA/SECURITY/SystemControl/SystemControlController.js",
                "~/SPA/ADMIN/PaymentType/PaymentTypeController.js",
                "~/SPA/ADMIN/PaymentSubType/PaymentSubTypeController.js",
                "~/SPA/ADMIN/CompanyEntry/CompanyEntryController.js",
                "~/SPA/ADMIN/OverheadEntry/OverheadEntryController.js",
                "~/SPA/ADMIN/SupplierEntry/SupplierEntryController.js",
                "~/SPA/ADMIN/BranchEntry/BranchEntryController.js",
                "~/SPA/EMAIL/ReportNotificationName/ReportNotificationNameController.js",
                "~/SPA/EMAIL/EmailNotificationSetup/EmailNotificationSetupController.js",
                "~/SPA/EMAIL/AppNotificationSetup/AppNotificationSetupController.js",
                "~/SPA/EMAIL/EmailSendEntry/EmailSendEntryController.js",
                "~/SPA/BranchTypeEntry/BranchTypeEntryController.js",
                "~/SPA/ADMIN/BankEntry/BankEntryController.js",
                "~/SPA/ADMIN/CategoryEntry/CategoryEntryController.js",
                "~/SPA/ChangePassword/ChangePasswordController.js",
                "~/SPA/Sync/Sync.js",
                "~/SPA/ADMIN/DepartmentEntry/DepartmentEntryController.js",
                "~/SPA/ADMIN/DepartmentTypeEntry/DepartmentTypeEntryController.js",
                "~/SPA/ADMIN/ItemAdditionalAttribute/ItemAdditionalAttributeController.js",
                "~/SPA/ADMIN/ItemAdditionalAttributeValue/ItemAdditionalAttributeValueController.js",
                "~/SPA/ADMIN/ItemAdditionalAttributePrice/ItemAdditionalAttributePriceController.js",
                //"~/SPA/ItemEntry/ItemEntryNewController.js",
                "~/SPA/ADMIN/ItemStatus/ItemStatusController.js",
                "~/SPA/ADMIN/BondEntry/BondEntryController.js",
                "~/SPA/ADMIN/BillOfMaterial/BillOfMaterialController.js",
                "~/SPA/ADMIN/ItemEntry/ItemEntryTwoController.js",
                "~/SPA/ADMIN/MaterialTypeEntry/MaterialTypeEntryController.js",
                "~/SPA/ReusableComponent/ItemEntryComponent/ItemDirective.js",
                "~/SPA/ReusableComponent/CompanyEntryComponent/CompanyDirective.js",
                "~/SPA/ModiulEntry/ModiulEntryController.js",
                "~/SPA/PermissionEntry/PermissionEntryController.js",
                "~/SPA/RoleEntry/RoleEntryController.js",
                "~/SPA/ScreenEntry/ScreenEntryController.js",
                "~/SPA/FunctionEntry/FunctionEntryController.js",
                "~/SPA/ADMIN/SubcategoryEntry/SubcategoryEntryController.js",
                "~/SPA/ADMIN/LabelBrand/LabelBrandController.js",
                "~/SPA/ADMIN/Unit/UnitController.js",
                "~/SPA/ADMIN/PaymentGroup/PaymentGroupController.js",
                "~/SPA/ADMIN/DesignationEntry/DesignationEntryController.js",

                "~/SPA/ADMIN/EmployeeEntry/EmployeeController.js",

                "~/SPA/ADMIN/CancelProcess/CancelProcessEntryController.js",

                "~/SPA/ADMIN/TerminalEntry/TerminalEntryController.js",
                "~/SPA/ADMIN/PriceTypeEntry/PriceTypeEntryController.js",
                "~/SPA/ADMIN/ChargeTypeEntry/ChargeTypeEntryController.js",
                "~/SPA/ADMIN/RequisitionPurposeEntry/RequisitionPurposeEntryController.js",
                "~/SPA/ReturnReasonEntry/ReturnReasonEntryController.js",
                "~/SPA/AuditTypeEntry/AuditTypeEntryController.js",
                "~/SPA/Approval/ApprovalController.js",
                "~/SPA/ADMIN/BankAccount/BankAccountController.js",
                "~/SPA/ADMIN/BankDocumentEntry/BankDocumentEntryController.js",
                "~/SPA/ADMIN/DeclarationTypeEntry/DeclarationTypeEntryController.js",

                "~/SPA/AdvanceAndLoan/AdvanceToEmployee/AdvanceToEmployeeController.js",
                "~/SPA/AdvanceAndLoan/AdvanceToEmployeeHistory/AdvanceToEmployeeHistoryController.js",
                "~/SPA/AdvanceAndLoan/AdvanceToEmployeeReport/AdvanceToEmployeeReportController.js",

                "~/SPA/Expenses/FactoryExpenses/FactoryExpensesController.js",
                "~/SPA/Expenses/FactoryExpensesReport/FactoryExpensesReportController.js",

                "~/SPA/ACCOUNTS/ChartOfAccounts/ChartOfAccountsController.js",
                "~/SPA/ACCOUNTS/ReceiptVoucher/ReceiptVoucherController.js",
                "~/SPA/ACCOUNTS/PaymentVoucher/PaymentVoucherController.js",
                "~/SPA/ACCOUNTS/JournalVoucher/JournalVoucherController.js",
                "~/SPA/ACCOUNTS/TransferVoucher/TransferVoucherController.js",
                "~/SPA/ACCOUNTS/Reports/ReportsController.js",

                "~/SPA/INVENTORY/PurchaseBillEntry/PurchaseBillEntryController.js",
                "~/SPA/Procurement/PurchaseOrder/PurchaseOrderEntryController.js",
                "~/SPA/Procurement/PurchaseOrderReport/PurchaseOrderReportController.js",
                "~/SPA/Procurement/ImportPurchaseOrderReport/ImportPurchaseOrderReportController.js",
                "~/SPA/Procurement/PurchaseOrderApprove/PurchaseOrderApproveController.js",
                "~/SPA/INVENTORY/ReceiveEntry/ReceiveEntryController.js",
                "~/SPA/INVENTORY/StockReceive/StockReceiveController.js",
                "~/SPA/INVENTORY/StockReceiveDashboard/StockReceiveDashboardController.js",
                "~/SPA/INVENTORY/StockStatus/StockStatusController.js",
                "~/SPA/INVENTORY/MaterialsDemand/MaterialsDemandController.js",
                "~/SPA/INVENTORY/MaterialsDemandApprove/MaterialsDemandApproveController.js",
                "~/SPA/PRODUCTION/ProductionStatus/ProductionStatusController.js",
                "~/SPA/PRODUCTION/ProductionReportsUI/ProductionReportsUIController.js",
                "~/SPA/PRODUCTION/ProductionDashboard/ProductionDashboardController.js",
                "~/SPA/PRODUCTION/RequisitionEntry/RequisitionEntryController.js",
                "~/SPA/INVENTORY/Setup/SetupController.js",
                "~/SPA/INVENTORY/StockOpeningQtyEntry/StockOpeningQtyEntryController.js",
                "~/SPA/INVENTORY/StockAdjustment/StockAdjustmentController.js",
                "~/SPA/INVENTORY/IssueEntry/IssueEntryController.js",
                "~/SPA/INVENTORY/JumboStockIssueEntry/JumboStockIssueEntryController.js",
                "~/SPA/INVENTORY/JumboStockIssueReport/JumboStockIssueReportController.js",
                "~/SPA/INVENTORY/IssueWithoutRequisition/IssueWithoutRequisitionController.js",
                "~/SPA/INVENTORY/IssueApprove/IssueApproveController.js",
                "~/SPA/INVENTORY/InventoryReports/InventoryReportsController.js",
                "~/SPA/INVENTORY/InventoryReportsMushak/InventoryReportsMushakController.js",
                "~/SPA/PAYABLE/SupplierPaymentHistoryReport/SupplierPaymentHistoryReportController.js",
                "~/SPA/PAYABLE/PayableReports/PayableReportsController.js",//Shuvo
                "~/SPA/INVENTORY/ExportReports/ExportReportsController.js",//rakin
                "~/SPA/INVENTORY/StockDeclarationReport/StockDeclarationReportController.js",
                "~/SPA/INVENTORY/InternalStockIssue/InternalStockIssueController.js",
                "~/SPA/INVENTORY/InternalStockIssueReport/InternalStockIssueReportController.js",

                "~/SPA/VAT/SupplierVat/SupplierVatController.js",
                "~/SPA/VAT/CompanyVAT/CompanyVATController.js",
                 "~/SPA/VAT/Mushak_6_6_Generate/Mushak_6_6_GenerateController.js",


                "~/SPA/INVENTORY/MaterialReturnSlipReport/MaterialReturnSlipReportController.js",
                "~/SPA/INVENTORY/MaterialsDemandReport/MaterialsDemandReportController.js",
                "~/SPA/INVENTORY/MaterialDemandedIssuedReport/MaterialDemandedIssuedReportController.js",
                "~/SPA/INVENTORY/ISTMReport/ISTMReportController.js",
                "~/SPA/INVENTORY/StoreAndItemTransfer/StoreAndItemTransferController.js",
                "~/SPA/INVENTORY/Delivery/DeliveryController.js",

                "~/SPA/INVENTORY/ManualDelivery/ManualDeliveryEntryController.js",
                
                "~/SPA/INVENTORY/AdjustmentEntry/AdjustmentEntryController.js",
                "~/SPA/INVENTORY/ReorderLevelSetup/ReorderLevelSetupController.js",
                "~/SPA/INVENTORY/ReturnToSupplier/ReturnToSupplierController.js",
                "~/SPA/INVENTORY/ReturnFromDepartment/ReturnFromDepartmentController.js",
                "~/SPA/INVENTORY/StockAuditEntry/StockAuditEntryController.js",
                "~/SPA/INVENTORY/StockDeclarationEntry/StockDeclarationEntryController.js",
                "~/SPA/POS/InventoryApprovals/InventoryApprovalsController.js",
                "~/SPA/INVENTORY/PurchaseRequisition/PurchaseRequisitionEntryController.js",
                "~/SPA/INVENTORY/InventroyReportsUI/InventroyReportsControlller.js",

                  "~/SPA/INVENTORY/StockTransferLog/StockTransferLogController.js",
                    "~/SPA/INVENTORY/StockTransferLogReport/StockTransferLogReportController.js",

                 "~/SPA/Procurement/ProcurementDashboard/ProcurementDashboardController.js",
                 "~/SPA/Procurement/PurchaseDashboard/PurchaseDashboardController.js",
                 "~/SPA/Procurement/ImportPurchaseBill/ImportPurchaseBillEntryController.js",
              
                "~/SPA/Procurement/LocalPurchaseBillEntry/LocalPurchaseBillController.js",
                "~/SPA/Procurement/AccessoriesPurchase/AccessoriesPurchaseController.js",


                "~/SPA/Procurement/WarrentyAndSerialNo/WarrentyAndSerialNoEntryController.js",
                "~/SPA/Procurement/ImportReportUI/ImportReportUIController.js",
                "~/SPA/POS/InternalWorkOrder/InternalWorkOrderEntryController.js",
                "~/SPA/PRODUCTION/ProductionEntry/ProductionEntryController.js",
                "~/SPA/POS/CIFReport/CIFReportController.js",
                "~/SPA/POS/CompanyPaymentStatusReport/CompanyPaymentStatusReportController.js",
                "~/SPA/POS/SalesInvoice/SalesInvoiceController.js",
                "~/SPA/POS/ManualSalesInvoice/ManualSalesInvoiceController.js",
                "~/SPA/POS/SalesInvoiceReport/SalesInvoiceReportController.js",
                "~/SPA/POS/SaleVoid/SaleVoidController.js",

                "~/SPA/POS/SalesTracking/SalesTrackingController.js",
                "~/SPA/POS/SalesReport/SalesReportUIController.js",
                "~/SPA/POS/SalesRegisterReport/SalesRegisterReportController.js",
                "~/SPA/POS/CompanyWiseTotalSalesReport/CompanyWiseTotalSalesReportController.js",

                "~/SPA/POS/SalesProductivityReport/SalesProductivityReportController.js",


                "~/SPA/RECEIVABLE/SaleAcknowledgeReport/SaleAcknowledgeReportControlller.js",

                "~/SPA/INVENTORY/StockIssueHistory/StockIssueHistoryController.js",
                "~/SPA/INVENTORY/DeliveryHistory/DeliveryHistoryReportController.js",
                "~/SPA/INVENTORY/StockStatusReport/StockStatusReportController.js",

                "~/SPA/POS/CashTransfer/CashTransferController.js",
                "~/SPA/Home/HomeController.js",
                "~/SPA/POS/PosDashboard/PosDashboardController.js",
                "~/SPA/POS/SalesOrder/SalesOrderEntryController.js",
                "~/SPA/POS/ReviseSalesOrder/ReviseSalesOrderEntryController.js",
                "~/SPA/POS/CIFDashboard/CIFDashboardController.js",
                "~/SPA/POS/SalesOrderApprove/SalesOrderApproveController.js",
                "~/SPA/POS/SalesOrderReport/SalesOrderReportController.js",
                "~/SPA/POS/SalesInvoiceAditionalCost/SalesInvoiceAditionalCostController.js",
                "~/SPA/HR/AttendancePolicy/AttendancePolicyController.js",

                "~/SPA/HRAndPayroll/LeaveBalanceReport/LeaveBalanceController.js",
                "~/SPA/HRAndPayroll/SalarySheet/SalarySheetController.js",
                "~/SPA/HRAndPayroll/SalarySheetSreepur/SalarySheetSreepurController.js",
                "~/SPA/HRAndPayroll/SalarySheetEPZ/SalarySheetEPZController.js",
                "~/SPA/HRAndPayroll/SalaryHistory/SalaryHistoryController.js",

                // Receiveable ///

                "~/SPA/RECEIVABLE/CompanyAdvance/CompanyAdvanceEntryController.js",
                "~/SPA/RECEIVABLE/PaymentOnAccount/PaymentOnAccountController.js",
                "~/SPA/RECEIVABLE/PaymentOnAccountReport/PaymentOnAccountReportController.js",
                "~/SPA/RECEIVABLE/CompanyDashboard/CompanyDashboardController.js",
                "~/SPA/RECEIVABLE/CompanyPayment/CompanyPaymentController.js",
                "~/SPA/RECEIVABLE/ReceivableDashboard/ReceivableDashboardController.js",
                "~/SPA/RECEIVABLE/ReceivableReportsUI/ReceivableReportsUIController.js",
                "~/SPA/RECEIVABLE/CompanyAdjustment/CompanyAdjustmentController.js",
                "~/SPA/RECEIVABLE/CompanyRefund/CompanyRefundEntryController.js",
                "~/SPA/RECEIVABLE/AgingReport/AgingReportController.js",
                "~/SPA/RECEIVABLE/CompanyVatAit/CompanyVatAitController.js",
                 "~/SPA/RECEIVABLE/CompanyRefundReport/CompanyRefundReportController.js",
                 "~/SPA/RECEIVABLE/CompanyOpening/CompanyOpeningController.js",
                 "~/SPA/RECEIVABLE/BankStatementReport/BankStatementReportController.js",
                 "~/SPA/RECEIVABLE/CompanyOpeningReport/CompanyOpeningReportController.js",
                 "~/SPA/RECEIVABLE/CompanyAdvanceReport/CompanyAdvanceReportController.js",
                "~/SPA/RECEIVABLE/SaleAcknowledgement/SaleAcknowledgementController.js",
                "~/SPA/RECEIVABLE/SaleAdjustment/SaleAdjustmentController.js",
                "~/SPA/RECEIVABLE/ReceiptVoucherReport/ReceiptVoucherReportController.js",
                "~/SPA/PAYABLE/SupplierRefund/SupplierRefundEntryController.js",
                "~/SPA/PAYABLE/SupplierAdvance/SupplierAdvanceEntryController.js",
                "~/SPA/PAYABLE/SupplierAdvanceReport/SupplierAdvanceReportController.js",
                "~/SPA/PAYABLE/SupplierAdjustment/SupplierAdjustmentController.js",
                "~/SPA/PAYABLE/SupplierAdjustmentReport/SupplierAdjustmentReportController.js",
                "~/SPA/PAYABLE/SupplierOpeningBalance/SupplierOpeningBalanceEntryController.js",
                "~/SPA/PAYABLE/SupplierOpeningBalanceReport/SupplierOpeningBalanceReportController.js",
                "~/SPA/PAYABLE/PurchaseAcknowledgement/PurchaseAcknowledgementController.js",
                "~/SPA/PAYABLE/PurchaseAdjustment/PurchaseAdjustmentController.js",
                "~/SPA/PAYABLE/SupplierRefundReport/SupplierRefundReportController.js",
                "~/SPA/PAYABLE/SupplierDashboard/SupplierDashboardController.js",
                "~/SPA/PAYABLE/PayableDashboard/PayableDashboardController.js",
                "~/SPA/PAYABLE/PaymentVoucherReport/PaymentVoucherReportController.js",
                "~/SPA/PAYABLE/PurchaseAcknowledgementReport/PurchaseAcknowledgementReportController.js",

                "~/SPA/PAYABLE/PaybleAgingReport/AgingPayableReportController.js",
                "~/SPA/ACCOUNTS/AccountsWindow/AccountsWindowController.js",

                "~/SPA/EXPORT/ProformaInvoice/ProformaInvoiceController.js",
                "~/SPA/EXPORT/ExportDashboard/ExportDashboardController.js",
                "~/SPA/EXPORT/ExpGenerate/ExpGenerateController.js",
                "~/SPA/EXPORT/CommercialInvoice/CommercialInvoiceController.js",
                "~/SPA/EXPORT/ProformaInvoiceApprove/ProformaInvoiceApproveController.js",
                "~/SPA/EXPORT/ExpGenerateApprove/ExpGenerateApproveController.js",
                "~/SPA/EXPORT/CommercialInvoiceApprove/CommercialInvoiceApproveController.js",
                "~/SPA/EXPORT/PostCiProcess/PostCiProcessController.js",
                "~/SPA/EXPORT/ExportDocumentUpload/ExportDocumentUploadController.js",
                "~/SPA/EXPORT/ReviseProformaInvoice/ReviseProformaInvoiceController.js",
                "~/SPA/EXPORT/ReviseExpGenerate/ReviseExpGenerateController.js",
                "~/SPA/EXPORT/ReviseCommercialInvoice/ReviseCommercialInvoiceController.js",
                "~/SPA/EXPORT/ProformaInvoiceReport/ProformaInvoiceReportController.js",
                "~/SPA/EXPORT/CommercialInvoiceReport/CommercialInvoiceReportController.js",
                "~/SPA/EXPORT/DeliveryChallanReport/DeliveryChallanReportController.js",
                "~/SPA/EXPORT/PackingReport/PackingReportController.js",
                "~/SPA/EXPORT/PackingDocumentReport/PackingDocumentReportController.js",
                "~/SPA/EXPORT/TruckChallanReport/TruckChallanReportController.js",
                "~/SPA/EXPORT/BankReport/BankReportController.js",

                "~/SPA/EXPORT/BillOfExchangeReport/BillOfExchangeReportController.js",
                "~/SPA/EXPORT/BillOfExchangeReport2/BillOfExchangeReport2Controller.js",
                "~/SPA/EXPORT/BeneficiaryCertificateReport/BeneficiaryCertificateReportController.js",
                "~/SPA/EXPORT/ConsumptionCertificateReport/ConsumptionCertificateReportController.js",
                 "~/SPA/EXPORT/CertificateReport/CertificateOfOriginController.js",
                 "~/SPA/EXPORT/CertificatePreReport/CertifaciateOfPreInspectionController.js",
                "~/SPA/EXPORT/DeliveryChalan/DeliveryChalanController.js",

                  "~/SPA/POS/IWOReport/InternalWorkOrderReportController.js",

                 "~/SPA/INVENTORY/DeliveryReport/DeliveryReportController.js",
                 

                  "~/SPA/VAT/Mushak4_3/Mushak4_3ReportController.js",
                  "~/SPA/VAT/TreasuryChallan/TreasuryChallanReportController.js",
                 "~/SPA/VAT/Mushak6_1/Mushak6_1ReportController.js",
                "~/SPA/VAT/Mushak6_2/Mushak6_2ReportController.js",

                "~/SPA/VAT/Mushak6_6/Mushak_6_6_ReportController.js",

                "~/SPA/VAT/Mushak6_3/Mushak6_3ReportController.js",
                "~/SPA/VAT/SupplierAIT/SupplierAITController.js",


                 "~/SPA/POS/ReviseInternalWorkOrder/ReviseInternalWorkOrderController.js",
                  "~/SPA/Procurement/LocalPurchaseReport/LocalPBReportController.js",
                  "~/SPA/Procurement/AccessoriesPurchaseReport/AccessoriesPurchaseReportController.js",

                  "~/SPA/PAYABLE/SupplierPaymentEntry/SuppilerPaymentController.js",


                   "~/SPA/PAYABLE/SupplierLedgerReport/SupplierLedgerReportController.js",
                   "~/SPA/RECEIVABLE/CompanyLedgerReport/CompanyLedgerReportController.js",
                   "~/SPA/PAYABLE/SupplierLedger/SupplierLedgersController.js",
                   "~/SPA/RECEIVABLE/CompanyLedger/CompanyLedgerController.js",

                   "~/SPA/HRAndPayroll/HRReports/HRReportsController.js",
                   "~/SPA/HRAndPayroll/WagesSlipReport/WagesSlipReportController.js",
                   "~/SPA/HRAndPayroll/PaySlipReport/PaySlipReportController.js",
                   "~/SPA/HRAndPayroll/AttendanceSummaryWithOTReport/AttendanceSummaryWithOTReportController.js",
                   "~/SPA/HRAndPayroll/AttendanceDetailReport/AttendanceDetailReportController.js",

                     "~/SPA/PAYABLE/SupplierPaymentReport/SupplierPaymentReportController.js",

                     "~/SPA/EXPORT/LabelRibbonExportReport/LabelRibbonExportReportController.js",
                     "~/SPA/EXPORT/BondImportExportBalanceReport/BondImportExportBalanceReportController.js",
                     "~/SPA/EXPORT/ExportReportUI/ExportReportUIController.js",
                     "~/SPA/Procurement/ImportReport/ImportRecordReportController.js",
                     "~/SPA/INVENTORY/StockReciveReport/StockReciveReportController.js",

                     "~/SPA/RECEIVABLE/CompanyPaymentReport/CompanyPaymentReportController.js",
                     "~/SPA/RECEIVABLE/CompanyAdjustmentReport/CompanyAdjustmentReportController.js",

                     "~/SPA/Procurement/WarrentyAndSerialNoReport/WarrentyAndSerialReportController.js",



                    "~/SPA/PRODUCTION/ProductionReport/ProductionReportController.js",
                    "~/SPA/PRODUCTION/ProductionHistoryReport/ProductionHistoryReportController.js",
                    "~/SPA/Procurement/ImportPurchaseReport/ImportPurchaseReportController.js",
                 

                   "~/SPA/LazyLoad/LazyController.js",


                 
                 "~/SPA/Test/TestEntryController.js"
                ));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      //"~/Scripts/bootstrap-timepicker.min.js",
                      "~/Scripts/respond.js"

                     ));
            bundles.Add(new StyleBundle("~/Content/css").Include(

                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap3.4.1.min.css",
                      "~/Content/bootstrap-datetimepicker.css",
                       "~/Content/summernote.min.css",
                      //"~/Content/bootstrap-timepicker.min.css",
                      "~/Content/multiple-select.css",
                      "~/Content/font-awesome.min.css",
                       "~/Content/pikaday.css",
                       "~/Content/jquery-ui.css",
                      "~/Content/theme.css",
                      "~/Content/skins.css",
                      "~/Content/sitebar.css",
                      "~/Content/alertify.core.css",
                      "~/Content/alertify.default.css",
                      "~/Content/select2.css",
                       "~/Content/select.css",
                      "~/Content/awesomplete.css",
                       "~/Content/dataTables.min.css",
                        "~/Content/dataTables.bootstrap.min.css",
                           "~/Content/kendo.common.min.css",
                              "~/Content/kendo.blueopal.min.css",
                          "~/Content/select.css",
                          "~/Content/Custom.css",
                          "~/Content/daterangepicker.css",
                          "~/Content/Loading.css"
                          //"~/Content/mdb.min.css"

                      //"~/Content/dx.common.css",
                      //"~/Content/dx.light.css"
                      //"~/Content/dist/css/select2.css",
                      //"~/Content/dist/css/select2.min.css"
                      ));
            BundleTable.EnableOptimizations = false;
        }
    }
}