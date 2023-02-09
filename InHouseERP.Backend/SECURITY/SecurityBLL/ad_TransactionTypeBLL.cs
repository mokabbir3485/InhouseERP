using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_TransactionTypeBLL //: IDisposible
    {
        public ad_TransactionTypeBLL()
        {
            //ad_TransactionTypeDAO = ad_TransactionType.GetInstanceThreadSafe;
            ad_TransactionTypeDAO = new ad_TransactionTypeDAO();
        }

        public ad_TransactionTypeDAO ad_TransactionTypeDAO { get; set; }

        public List<ad_TransactionType> GetAll()
        {
            try
            {
                return ad_TransactionTypeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_TransactionType ad_TransactionType)
        {
            try
            {
                return ad_TransactionTypeDAO.Add(ad_TransactionType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_TransactionType ad_TransactionType)
        {
            try
            {
                return ad_TransactionTypeDAO.Update(ad_TransactionType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int transactionTypeId)
        {
            try
            {
                return ad_TransactionTypeDAO.Delete(transactionTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}