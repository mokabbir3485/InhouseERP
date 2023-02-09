using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_BankDocumentBLL //: IDisposible
    {
        public exp_BankDocumentBLL()
        {
            //exp_BankDocumentDAO = exp_BankDocument.GetInstanceThreadSafe;
            exp_BankDocumentDAO = new exp_BankDocumentDAO();
        }

        public exp_BankDocumentDAO exp_BankDocumentDAO { get; set; }

        public List<exp_BankDocument> GetAll()
        {
            try
            {
                return exp_BankDocumentDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_BankDocument> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_BankDocumentDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_BankDocument> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return exp_BankDocumentDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_BankDocument _exp_BankDocument)
        {
            try
            {
                return exp_BankDocumentDAO.Add(_exp_BankDocument);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(exp_BankDocument _exp_BankDocument)
        {
            try
            {
                return exp_BankDocumentDAO.Update(_exp_BankDocument);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long bankDocumentId)
        {
            try
            {
                return exp_BankDocumentDAO.Delete(bankDocumentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_BankDocument> BankDocumentGetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_BankDocumentDAO.BankDocumentGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}