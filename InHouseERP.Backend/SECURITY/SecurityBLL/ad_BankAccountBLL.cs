using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_BankAccountBLL //: IDisposible
    {
        public ad_BankAccountBLL()
        {
            //ad_BankAccountDAO = ad_BankAccount.GetInstanceThreadSafe;
            ad_BankAccountDAO = new ad_BankAccountDAO();
        }

        public ad_BankAccountDAO ad_BankAccountDAO { get; set; }

        public List<ad_BankAccount> GetAll()
        {
            try
            {
                return ad_BankAccountDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BankAccount> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_BankAccountDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BankAccount> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_BankAccountDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_BankAccount _ad_BankAccount)
        {
            try
            {
                return ad_BankAccountDAO.Add(_ad_BankAccount);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_BankAccount _ad_BankAccount)
        {
            try
            {
                return ad_BankAccountDAO.Update(_ad_BankAccount);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int bankAccountId)
        {
            try
            {
                return ad_BankAccountDAO.Delete(bankAccountId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}