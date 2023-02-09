using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_CommercialInvoice_PackingInfoBLL
    {
        public exp_CommercialInvoice_PackingInfoBLL()
        {
            exp_CommercialInvoice_PackingInfoDAO = new exp_CommercialInvoice_PackingInfoDAO();
        }

        public exp_CommercialInvoice_PackingInfoDAO exp_CommercialInvoice_PackingInfoDAO { get; set; }

        public List<exp_CommercialInvoice_PackingInfo> GetAll(long commercialInvoiceId)
        {
            try
            {
                return exp_CommercialInvoice_PackingInfoDAO.GetAll(commercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice_PackingInfo> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_CommercialInvoice_PackingInfoDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public long Add(exp_CommercialInvoice_PackingInfo _exp_CommercialInvoice_PackingInfo)
        {
            try
            {
                return exp_CommercialInvoice_PackingInfoDAO.Add(_exp_CommercialInvoice_PackingInfo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int Update(exp_CommercialInvoice_PackingInfo _exp_CommercialInvoice_PackingInfo)
        {
            try
            {
                return exp_CommercialInvoice_PackingInfoDAO.Update(_exp_CommercialInvoice_PackingInfo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}