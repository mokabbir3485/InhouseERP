using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_ReturnToSupplierDetailAdAttributeDetailBLL //: IDisposible
    {
        public inv_ReturnToSupplierDetailAdAttributeDetailBLL()
        {
            //inv_ReturnToSupplierDetailAdAttributeDetailDAO = inv_ReturnToSupplierDetailAdAttributeDetail.GetInstanceThreadSafe;
            inv_ReturnToSupplierDetailAdAttributeDetailDAO = new inv_ReturnToSupplierDetailAdAttributeDetailDAO();
        }

        public inv_ReturnToSupplierDetailAdAttributeDetailDAO inv_ReturnToSupplierDetailAdAttributeDetailDAO
        {
            get;
            set;
        }

        public List<inv_ReturnToSupplierDetailAdAttributeDetail> GetByReturnDetailAdAttId(long returnDetailAdAttId)
        {
            try
            {
                return inv_ReturnToSupplierDetailAdAttributeDetailDAO.GetByReturnDetailAdAttId(returnDetailAdAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnToSupplierDetailAdAttributeDetail _inv_ReturnToSupplierDetailAdAttributeDetail)
        {
            try
            {
                return inv_ReturnToSupplierDetailAdAttributeDetailDAO.Add(_inv_ReturnToSupplierDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}