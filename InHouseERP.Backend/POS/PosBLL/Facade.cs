using DbExecutor;
using SecurityEntity.POS.PosBLL;

namespace PosBLL
{
    public static class Facade
    {
        public static error_LogBLL ErrorLog => new error_LogBLL();
        public static pos_CashDepositBLL pos_CashDeposit => new pos_CashDepositBLL();
        public static pos_ShiftBLL pos_Shift => new pos_ShiftBLL();
        public static pos_SalesOrderBLL pos_SalesOrderBLL => new pos_SalesOrderBLL();
        public static pos_SalesOrderDetailBLL pos_SalesOrderDetailBLL => new pos_SalesOrderDetailBLL();
        public static pos_POReferenceBLL pos_POReferenceBLL => new pos_POReferenceBLL();
        public static pos_SalesInvoiceBLL pos_SalesInvoiceBLL => new pos_SalesInvoiceBLL();
        public static pos_PosDashboardBLL pos_PosDashboardBLL => new pos_PosDashboardBLL();
        public static pos_InvoicePaymentBLL pos_InvoicePaymentBLL => new pos_InvoicePaymentBLL();
    }
}