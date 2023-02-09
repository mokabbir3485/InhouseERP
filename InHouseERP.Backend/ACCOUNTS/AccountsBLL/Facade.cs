using AccountsDAL;

namespace AccountsBLL
{
    public static class Facade
    {
        public static ac_ChartOfAccountBLL chartOfAccountBLL => new ac_ChartOfAccountBLL();
        public static ac_TransactionDAO transactionDAO => new ac_TransactionDAO();
    }
}