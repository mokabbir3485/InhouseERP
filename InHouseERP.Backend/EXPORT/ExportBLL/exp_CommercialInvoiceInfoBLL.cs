using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_CommercialInvoiceInfoBLL //: IDisposible
    {
        public exp_CommercialInvoiceInfoBLL()
        {
            //exp_CommercialInvoiceInfoDAO = exp_CommercialInvoiceInfo.GetInstanceThreadSafe;
            exp_CommercialInvoiceInfoDAO = new exp_CommercialInvoiceInfoDAO();
        }

        public exp_CommercialInvoiceInfoDAO exp_CommercialInvoiceInfoDAO { get; set; }

        public List<exp_CommercialInvoiceInfo> GetAll(long? infoId = null)
        {
            try
            {
                return exp_CommercialInvoiceInfoDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoiceInfo> GetByCiId(int ciId)
        {
            try
            {
                return exp_CommercialInvoiceInfoDAO.GetByCiId(ciId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoiceInfo> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_CommercialInvoiceInfoDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoiceInfo> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_CommercialInvoiceInfoDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_CommercialInvoiceInfo _exp_CommercialInvoiceInfo)
        {
            try
            {
                return exp_CommercialInvoiceInfoDAO.Add(_exp_CommercialInvoiceInfo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(exp_CommercialInvoiceInfo _exp_CommercialInvoiceInfo)
        {
            try
            {
                return exp_CommercialInvoiceInfoDAO.Update(_exp_CommercialInvoiceInfo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(exp_CommercialInvoiceInfo _exp_CommercialInvoiceInfo)
        {
            try
            {
                return exp_CommercialInvoiceInfoDAO.Post(_exp_CommercialInvoiceInfo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int ciId)
        {
            try
            {
                return exp_CommercialInvoiceInfoDAO.Delete(ciId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}