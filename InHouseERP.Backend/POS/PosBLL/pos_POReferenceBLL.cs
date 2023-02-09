using System;
using System.Collections.Generic;
using PosDAL;
using PosEntity;

namespace PosBLL
{
    public class pos_POReferenceBLL
    {
        public pos_POReferenceBLL()
        {
            pos_POReferenceDAO = new pos_POReferenceDAO();
        }

        public pos_POReferenceDAO pos_POReferenceDAO { get; set; }


        public List<pos_POReference> GetPOReference(string DocType, long DocumentId)
        {
            try
            {
                return pos_POReferenceDAO.GetPOReference(DocType, DocumentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(pos_POReference _pos_POReference)
        {
            try
            {
                return pos_POReferenceDAO.Add(_pos_POReference);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}