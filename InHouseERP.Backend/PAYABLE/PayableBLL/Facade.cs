using PayableEntity;

namespace PayableBLL
{
    public static class Facade
    {
        public static pay_SupplierOpeningBalanceBLL pay_SupplierOpeningBalance => new pay_SupplierOpeningBalanceBLL();

        //public static rcv_SaleAdjustmentBLL rcv_SaleAdjustment { get { return new rcv_SaleAdjustmentBLL(); } }
        public static pay_PurchaseRealizationBLL pay_PurchaseRealization => new pay_PurchaseRealizationBLL();
        public static pay_SupplierAdvanceBLL pay_SupplierAdvanceBLL => new pay_SupplierAdvanceBLL();
        public static pay_PayableDashboardBLL pay_PayableDashboardBLL => new pay_PayableDashboardBLL();
        public static pay_SupplierRefundBLL pay_SupplierRefund => new pay_SupplierRefundBLL();
        public static pay_PurchaseAcknowledgementBLL pay_PurchaseAcknowledgementBLL => new pay_PurchaseAcknowledgementBLL();
    }
}