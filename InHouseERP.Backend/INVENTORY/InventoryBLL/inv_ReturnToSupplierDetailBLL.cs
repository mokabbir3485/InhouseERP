using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_ReturnToSupplierDetailBLL //: IDisposible
    {
        public inv_ReturnToSupplierDetailBLL()
        {
            //inv_ReturnToSupplierDetailDAO = inv_ReturnToSupplierDetail.GetInstanceThreadSafe;
            inv_ReturnToSupplierDetailDAO = new inv_ReturnToSupplierDetailDAO();
        }

        public inv_ReturnToSupplierDetailDAO inv_ReturnToSupplierDetailDAO { get; set; }

        public List<inv_ReturnToSupplierDetail> GetByReturnId(long returnId)
        {
            try
            {
                return inv_ReturnToSupplierDetailDAO.GetByReturnId(returnId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnToSupplierDetail _inv_ReturnToSupplierDetail)
        {
            try
            {
                return inv_ReturnToSupplierDetailDAO.Add(_inv_ReturnToSupplierDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}