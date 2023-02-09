using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_ReturnToSupplierDetailAdAttributeBLL //: IDisposible
    {
        public inv_ReturnToSupplierDetailAdAttributeBLL()
        {
            //inv_ReturnToSupplierDetailAdAttributeDAO = inv_ReturnToSupplierDetailAdAttribute.GetInstanceThreadSafe;
            inv_ReturnToSupplierDetailAdAttributeDAO = new inv_ReturnToSupplierDetailAdAttributeDAO();
        }

        public inv_ReturnToSupplierDetailAdAttributeDAO inv_ReturnToSupplierDetailAdAttributeDAO { get; set; }

        public List<inv_ReturnToSupplierDetailAdAttribute> GetByReturnDetailId(long returnDetailId)
        {
            try
            {
                return inv_ReturnToSupplierDetailAdAttributeDAO.GetByReturnDetailId(returnDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnToSupplierDetailAdAttribute _inv_ReturnToSupplierDetailAdAttribute)
        {
            try
            {
                return inv_ReturnToSupplierDetailAdAttributeDAO.Add(_inv_ReturnToSupplierDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}