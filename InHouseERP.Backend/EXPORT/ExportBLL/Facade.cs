namespace ExportBLL
{
    public static class Facade
    {
        public static exp_BankDocumentBLL exp_BankDocument => new exp_BankDocumentBLL();
        public static exp_BankDocumentDetailBLL exp_BankDocumentDetail => new exp_BankDocumentDetailBLL();
        public static exp_CommercialInvoiceBLL exp_CommercialInvoice => new exp_CommercialInvoiceBLL();
        public static exp_CommercialInvoiceInfoBLL expCommercialInvoiceInfo => new exp_CommercialInvoiceInfoBLL();
        public static exp_ConsumptionCertificateBLL exp_ConsumptionCertificate => new exp_ConsumptionCertificateBLL();
        public static exp_InvoiceBLL exp_Invoice => new exp_InvoiceBLL();
        public static exp_PackingInfoBLL exp_PackingInfo => new exp_PackingInfoBLL();

        public static exp_CommercialInvoice_PackingInfoBLL exp_CommercialInvoice_PackingInfo =>
            new exp_CommercialInvoice_PackingInfoBLL();

        public static exp_PaymentProcessBLL exp_PaymentProcess => new exp_PaymentProcessBLL();
        public static exp_ExporterBLL exp_Exporter => new exp_ExporterBLL();
        public static exp_AmendmentReasonBLL exp_AmendmentReason => new exp_AmendmentReasonBLL();
        public static exp_ApprovalBLL exp_Approval => new exp_ApprovalBLL();
        public static exp_ExportReportsBLL exp_ExpReports => new exp_ExportReportsBLL();
        public static xRpt_ExpImp_LabelExportBLL xRpt_ExpImp_LabelExportBLL => new xRpt_ExpImp_LabelExportBLL();
        public static exp_PutSubmissionBLL exp_PutSubmission => new exp_PutSubmissionBLL();
        public static exp_UploadAttachmentBLL exp_UploadAttachment => new exp_UploadAttachmentBLL();
        public static exp_TruckChallanBLL exp_TruckChallan => new exp_TruckChallanBLL();
        public static exp_POReferenceBLL exp_POReferenceBLL => new exp_POReferenceBLL();
        public static exp_ExportDashboardBLL exp_ExportDashboardBLL => new exp_ExportDashboardBLL();
    }
}