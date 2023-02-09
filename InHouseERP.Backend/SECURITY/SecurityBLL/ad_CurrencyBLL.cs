using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_CurrencyBLL //: IDisposible
    {
        public ad_CurrencyBLL()
        {
            //ad_CurrencyDAO = ad_Currency.GetInstanceThreadSafe;
            ad_CurrencyDAO = new ad_CurrencyDAO();
        }

        public ad_CurrencyDAO ad_CurrencyDAO { get; set; }

        public List<ad_Currency> GetAll()
        {
            try
            {
                return ad_CurrencyDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Currency> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_CurrencyDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Currency> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_CurrencyDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Currency _ad_Currency)
        {
            try
            {
                return ad_CurrencyDAO.Add(_ad_Currency);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_Currency _ad_Currency)
        {
            try
            {
                return ad_CurrencyDAO.Update(_ad_Currency);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int currencyId)
        {
            try
            {
                return ad_CurrencyDAO.Delete(currencyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}