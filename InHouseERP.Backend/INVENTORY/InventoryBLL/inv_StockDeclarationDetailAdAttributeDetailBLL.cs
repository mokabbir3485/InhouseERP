using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockDeclarationDetailAdAttributeDetailBLL //: IDisposible
    {
        public inv_StockDeclarationDetailAdAttributeDetailBLL()
        {
            //inv_StockDeclarationDetailAdAttributeDetailDAO = inv_StockDeclarationDetailAdAttributeDetail.GetInstanceThreadSafe;
            inv_StockDeclarationDetailAdAttributeDetailDAO = new inv_StockDeclarationDetailAdAttributeDetailDAO();
        }

        public inv_StockDeclarationDetailAdAttributeDetailDAO inv_StockDeclarationDetailAdAttributeDetailDAO
        {
            get;
            set;
        }

        public List<inv_StockDeclarationDetailAdAttributeDetail> GetByDeclarationDetailAdAttId(
            long declarationDetailAdAttId)
        {
            try
            {
                return inv_StockDeclarationDetailAdAttributeDetailDAO.GetByDeclarationDetailAdAttId(
                    declarationDetailAdAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockDeclarationDetailAdAttributeDetail _inv_StockDeclarationDetailAdAttributeDetail)
        {
            try
            {
                return inv_StockDeclarationDetailAdAttributeDetailDAO.Add(_inv_StockDeclarationDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}