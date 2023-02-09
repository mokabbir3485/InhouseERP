using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockDeclarationDetailAdAttributeBLL //: IDisposible
    {
        public inv_StockDeclarationDetailAdAttributeBLL()
        {
            //inv_StockDeclarationDetailAdAttributeDAO = inv_StockDeclarationDetailAdAttribute.GetInstanceThreadSafe;
            inv_StockDeclarationDetailAdAttributeDAO = new inv_StockDeclarationDetailAdAttributeDAO();
        }

        public inv_StockDeclarationDetailAdAttributeDAO inv_StockDeclarationDetailAdAttributeDAO { get; set; }

        public List<inv_StockDeclarationDetailAdAttribute> GetByDeclarationDetailId(long declarationDetailId)
        {
            try
            {
                return inv_StockDeclarationDetailAdAttributeDAO.GetByDeclarationDetailId(declarationDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockDeclarationDetailAdAttribute _inv_StockDeclarationDetailAdAttribute)
        {
            try
            {
                return inv_StockDeclarationDetailAdAttributeDAO.Add(_inv_StockDeclarationDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}