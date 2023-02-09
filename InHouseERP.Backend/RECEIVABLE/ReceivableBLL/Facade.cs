using SecurityEntity.RECEIVABLE.ReceivableBLL;

namespace ReceivableBLL
{
    public static class Facade
    {
        public static rcv_CompanyOpeningBalanceBLL rcv_CompanyOpeningBalance => new rcv_CompanyOpeningBalanceBLL();
        public static rcv_SaleAdjustmentBLL rcv_SaleAdjustment => new rcv_SaleAdjustmentBLL();
        public static rcv_SaleRealizationBLL rcv_SaleRealization => new rcv_SaleRealizationBLL();
        public static rcv_CompanyAdvanceBLL rcv_CompanyAdvance => new rcv_CompanyAdvanceBLL();
        public static rcv_PaymentOnAccountBLL rcv_PaymentOnAccount => new rcv_PaymentOnAccountBLL();
        
        public static rcv_CompanyPaymentBLL rcv_CompanyPaymentBLL => new rcv_CompanyPaymentBLL();
        public static rcv_CompanyPaymentDetailBLL rcv_CompanyPaymentDetailBLL => new rcv_CompanyPaymentDetailBLL();
        public static rcv_CompanyPaymentAdjustmentBLL rcv_CompanyPaymentAdjustmentBLL => new rcv_CompanyPaymentAdjustmentBLL();
        public static rcv_CompanyPaymentAdjustmentDetailBLL rcv_CompanyPaymentAdjustmentDetailBLL => new rcv_CompanyPaymentAdjustmentDetailBLL();
        public static rcv_CompanyAdvanceRefundBLL rcv_CompanyAdvanceRefundBLL => new rcv_CompanyAdvanceRefundBLL();
        public static rcv_ReceivableDashboardBLL rcv_ReceivableDashboardBLL => new rcv_ReceivableDashboardBLL();
        public static rcv_AgingBLL rcv_AgingBLL => new rcv_AgingBLL();
        public static rcv_CompanyVatAitBLL rcv_CompanyVatAitBLL => new rcv_CompanyVatAitBLL();
    }
}