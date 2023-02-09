using System;
using System.Collections.Generic;
using System.Linq;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_FactoryExpensesBLL
    {
        public ad_FactoryExpensesBLL()
        {
            //pay_SupplierOpeningBalanceDAO = pay_SupplierOpeningBalance.GetInstanceThreadSafe;
            ad_FactoryExpensesDAO = new ad_FactoryExpensesDAO();
        }

        public ad_FactoryExpensesDAO ad_FactoryExpensesDAO { get; set; }
        public Int64 GetFactoryExpensesMaxNo()
        {
            try
            {
                return ad_FactoryExpensesDAO.GetFactoryExpensesMaxNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long Post(ad_FactoryExpenses ad_FactoryExpenses)
        {
            try
            {
                return ad_FactoryExpensesDAO.Post(ad_FactoryExpenses);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_FactoryExpenses> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_FactoryExpensesDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_FactoryExpenses> GetAllFactoryExpensePurpose()
        {
            try
            {
                return ad_FactoryExpensesDAO.GetAllFactoryExpensePurpose();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
