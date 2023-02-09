using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_POReferenceBLL
    {
        public exp_POReferenceBLL()
        {
            exp_POReferenceDAO = new exp_POReferenceDAO();
        }

        public exp_POReferenceDAO exp_POReferenceDAO { get; set; }

        public List<exp_POReference> GetPOReference(string DocType, long DocumentId)
        {
            try
            {
                return exp_POReferenceDAO.GetPOReference(DocType, DocumentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_POReference _exp_POReference)
        {
            try
            {
                return exp_POReferenceDAO.Add(_exp_POReference);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}