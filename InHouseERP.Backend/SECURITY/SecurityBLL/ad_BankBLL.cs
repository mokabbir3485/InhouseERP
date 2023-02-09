using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_BankBLL //: IDisposible
    {
        public ad_BankBLL()
        {
            //ad_BankDAO = ad_Bank.GetInstanceThreadSafe;
            ad_BankDAO = new ad_BankDAO();
        }

        public ad_BankDAO ad_BankDAO { get; set; }

        public List<ad_Bank> GetAll()
        {
            try
            {
                return ad_BankDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Bank> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_BankDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Bank> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_BankDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Bank _ad_Bank)
        {
            try
            {
                return ad_BankDAO.Add(_ad_Bank);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_Bank _ad_Bank)
        {
            try
            {
                return ad_BankDAO.Update(_ad_Bank);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int bankId)
        {
            try
            {
                return ad_BankDAO.Delete(bankId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}