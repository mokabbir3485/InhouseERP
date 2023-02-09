using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_BankDocumentEntryBLL
    {
        public ad_BankDocumentEntryBLL()
        {
            //ad_BankDAO = ad_Bank.GetInstanceThreadSafe;
            ad_BankDocumentEntryDAO = new ad_BankDocumentEntryDAO();
        }

        public ad_BankDocumentEntryDAO ad_BankDocumentEntryDAO { get; set; }

        public List<ad_BankDocumentEntry> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_BankDocumentEntryDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_BankDocumentEntry> GetBankDocumentEntryListByBankAccountId(long BankAccountId)
        {
            try
            {
                return ad_BankDocumentEntryDAO.GetBankDocumentEntryListByBankAccountId(BankAccountId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteBankDocumentEntryByBankAccountId(long BankAccountId)
        {
            try
            {
                return ad_BankDocumentEntryDAO.DeleteBankDocumentEntryByBankAccountId(BankAccountId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(ad_BankDocumentEntry ad_BankDocumentEntry)
        {
            try
            {
                return ad_BankDocumentEntryDAO.Post(ad_BankDocumentEntry);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}